import { useState, useEffect, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { getFirstCollision, pointerWithin, closestCorners, defaultDropAnimationSideEffects, DndContext, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import CardItem from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
// import { Container } from '@mui/material'
import { generatePlacehoderCard } from '~/utils/formatters'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}


function BoardContent({ board, createNewColumn, createNewCard, moveColumns, moveCardInTheSameColumn, moveCardToDifferentColumn, deleteColumn }) {


  // chuột di chuyển quá 10px mới kích hoạt event
  const mouseSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // dữ tay vào màn hình 250ms thì mới kích hoạt
  const touchSensor = useSensor(MouseSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState([null])
  const [activeDragItemType, setActiveDragItemType] = useState([null])
  const [activeDragItemData, setActiveDragItemData] = useState([null])
  const [oldColumnWhenDdraggingCard, setOldColumnWhenDdraggingCard] = useState([null])


  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumnsState(board.columns)
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumnsState.find(column => column?.cards.map(card => card._id)?.includes(cardId))
  }

  // funtion chung xử lý cập nhật state trong handleDragOver và handleDragEnd
  const moveCardBetWeenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumnsState(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // column cũ
      if (nextActiveColumn) {
        // xóa card khi kéo card ra khỏi column
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Thêm placehodercard giữ chỗ ở FE
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlacehoderCard(nextActiveColumn)]
        }

        // update lại mảng cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // column mới
      if (nextOverColumn) {
        // Nếu đã có card ở column thì xóa nó đi trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // cập nhật lại column id của card khi đã đổi chỗ
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        // Thêm card đó vào column
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        // Xóa placeholderCard đi nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlacehoderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

      }

      // 
      if (triggerFrom === 'handleDragEnd') {
        moveCardToDifferentColumn(
          activeDraggingCardId,
          oldColumnWhenDdraggingCard._id,
          nextOverColumn._id,
          nextColumns
        )
      }

      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu kéo card thì mới lưu lại giá trị cũ
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDdraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    // Không làm gì nếu như kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return


    const { active, over } = event

    if (!over || !active) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // Nếu 2 column khác nhau thì mới chạy
    if (activeColumn._id !== overColumn._id) {
      moveCardBetWeenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }


  }

  const handleDragEnd = (event) => {


    const { active, over } = event
    // console.log('active: ', active)
    // console.log('over: ', over)
    // console.log('orderedColumnsState: ', orderedColumnsState)

    // Nếu kéo vào chỗ nào k lấy đc vị trí và over null thì return
    if (!over && !active) return

    //Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDdraggingCard._id !== overColumn._id) {
        // Xử lý card kéo thả 2 column khác nhau
        moveCardBetWeenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )

      } else {
        // Xử lý card kéo thả trong cùng column
        const oldCardIndex = oldColumnWhenDdraggingCard?.cards.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards.findIndex(c => c._id === overCardId)
        const dndOrderedCard = arrayMove(oldColumnWhenDdraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndOrderedCard.map(c => c._id)
        // console.log(dndOrderedCard, 'dndor')
        setOrderedColumnsState(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)

          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCard
          targetColumn.cardOrderIds = dndOrderedCardIds
          return nextColumns
        })

        moveCardInTheSameColumn(dndOrderedCard, dndOrderedCardIds, oldColumnWhenDdraggingCard._id)
      }

    }

    //Xử lý kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // thay đổi vị trí column
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumnsState.findIndex(c => c._id === active.id)
        // console.log('oldIndex: ', oldIndex)
        const newColumnIndex = orderedColumnsState.findIndex(c => c._id === over.id)
        // console.log('newIndex: ', newIndex)

        const dndOrderedColumns = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex)

        // Gọi hàm xử lý update lại dữ liệu sau khi kéo thay đổi vị trí column
        moveColumns(dndOrderedColumns)

        setOrderedColumnsState(dndOrderedColumns)

      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDdraggingCard(null)
  }


  const dropAnimationCustom= {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  // Thuật toán xử lý và trạm của card giữa 2 column
  const collisionDetectionStrategy = useCallback((args) => {

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }


    // Tìm các điểm giao nhau, va chạm
    const pointerIntersections = pointerWithin(args)

    // const intersection = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : rectIntersection(args)

    if (!pointerIntersections.length) return

    // Tìm overId đầu tiên trong pointerIntersection
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      const checkColumn = orderedColumnsState.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }
      lastOverId.current = overId
      return [{ id:overId }]
    }

    // Nếu overId là null thì trả về mảng rỗng
    return lastOverId.current ? [{ id:lastOverId.current }] :[]
  }, [activeDragItemType, orderedColumnsState])

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      sensors={sensors}

    >
      <Box sx={{
        width:'100%',
        height: (theme) => theme.trello.boardContentHeight,
        bgcolor:(theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1565c0'),
        p:'10px 0'
      }}>

        {/* Box container column*/}
        <ListColumns columns={orderedColumnsState} createNewColumn={createNewColumn} createNewCard={createNewCard} deleteColumn={deleteColumn}/>
        <DragOverlay dropAnimation={dropAnimationCustom}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <CardItem card={activeDragItemData} />}

        </DragOverlay>
      </Box>
    </DndContext>
  )

}

export default BoardContent
