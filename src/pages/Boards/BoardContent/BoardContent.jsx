import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {defaultDropAnimationSideEffects, DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import CardItem from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}


function BoardContent({ board }) {


  // chuột di chuyển quá 10px mới kích hoạt event
  const mouseSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // dữ tay vào màn hình 250ms thì mới kích hoạt
  const touchSensor = useSensor(MouseSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState([null])
  const [activeDragItemType, setActiveDragItemType] = useState([null])
  const [activeDragItemData, setActiveDragItemData] = useState([null])

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board])

  const findColumnByCarddId = (cardId) => {
    return orderedColumnsState.find(column => column?.cards.map(card => card._id)?.includes(cardId))
  }  

  const handleDragEnd = (event) => {
    // console.log('drag end', event)
    const { active, over } = event

    // Nếu kéo vào chỗ nào k lấy đc vị trí và over null thì return
    if (!over) return

    // thay đổi vị trí column
    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id)
      const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)
      const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex)
      setOrderedColumnsState(dndOrderedColumns)

      // dòng này để cập nhật dữ liệu cột sau khi thay đổi vào db
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    }

    // if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
    //   console.log('test')
    // }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const handleDragOver = (event) => {
    // Không làm gì nếu như kéo column
    if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    

    const { active, over } = event

    if(!over || !active) return

    const { id: activeDraggingCardId, data: {current: activeDraggingCardData} } = active 
    const { id: overCardId } = over

    const activeColumn = findColumnByCarddId(activeDraggingCardId)
    const overColumn = findColumnByCarddId(overCardId)

    if (!activeColumn || !overColumn) return

    // Nếu 2 column khác nhau thì mới chạy
    if (activeColumn._id !== overColumn._id) {
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
          
          // update lại mảng cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        // column mới
        if (nextOverColumn) {
          // Nếu đã có card ở column thì xóa nó đi trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // Thêm card đó vào column
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
          
        }
        return nextColumns
      })
    }


  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    
  }

  const dropAnimationCustom= {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        }
      }
    })
  }

  return (
    <DndContext 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} 
      sensors={sensors}

    >
      <Box sx={{
        width:'100%',
        height: (theme) => theme.trello.boardContentHeight,
        bgcolor:(theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1565c0'),
        p:'10px 0'
      }}>

        {/* Box container column*/}
        <ListColumns columns={orderedColumnsState} />
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
