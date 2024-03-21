// board Detail
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { deleteColumnDetailsAPI, moveCardToDifferentColumnAPI, updateColumnDetailsAPI, fetchBoardDetailsAPI, createNewColumnApi, createNewCardApi, updateBoardDetailsAPI } from '~/apis'
import { generatePlacehoderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'


function Board() {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    // react router-dom ( tim hieu lay board id tu url)
    const boardId = '65f6b88e562d8e34f7f018cc'
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Sắp xếp thứ tự column trong board luôn
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        // Xử lý kéo thả nếu column rỗng
        if (isEmpty(column.cards)) {
          column.cards = [generatePlacehoderCard(column)]
          column.cardOrderIds = [generatePlacehoderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  // Call api tạo column và refesh lại dữ liệu state
  const createNewColumn = async( newColumnData ) => {

    // call api tạo column
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id
    })

    // Thêm vào column 1 card FE fake giữ chỗ (card này không lưu vào db)
    createdColumn.cards = [generatePlacehoderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlacehoderCard(createdColumn)._id]

    // Clone board hiện tại và thêm giá trị mới vào vào sau đó update lại state board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // Call api tạo card và refesh lại dữ liệu state
  const createNewCard = async( newCardData ) => {
    // call api tạo card
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id
    })

    // Tìm xem trong column có card vừa tạo không
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    // Nếu có thì update lại card vừa tạo vào
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    //update lại state board
    setBoard(newBoard)
  }

  // Call api Update lại dữ liệu columnOrderIds sau khi thay đổi vị trí column
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    // Clone board hiện tại và update lại orderColumn + orderColumnIds và state board
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  // Call api Update lại dữ liệu cardOrderIds sau khi thay đổi vị trí card
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {

    //Update lại dữ liệu cho state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    // Nếu có thì update lại card vừa tạo vào
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    //update lại state board
    setBoard(newBoard)


    //Call api update columnOrderIds
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds } )
  }

  // Cập nhập lại cardOrderIds ban đầu (xóa card đang kéo đi)
  // Cập nhật lại cardOrderIds của column mới
  // Cập nhật lại trường columnId của card đã kéo
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    // Clone board hiện tại và update lại orderColumn + orderColumnIds và state board
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Call api
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })

  }

  const deleteColumn = (columnId) => {
    //Update state board
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)

    // Call API delete column
    deleteColumnDetailsAPI(columnId)
      .then(res => {
        toast.success('Delete successfully')
      })
      .catch( () => {
        toast.error('Some thing wrong!')
      } )
  }

  if (!board) {
    return (
      <Box sx={{ height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (

    <Container disableGutters maxWidth={false} sx={{ height:'100vh', backgroundColor:'primary.main' }}>

      <AppBar/>

      <BoardBar board ={board} />

      <BoardContent
        board ={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumn={deleteColumn}
      />

    </Container>

  )
}

export default Board
