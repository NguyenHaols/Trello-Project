// board Detail
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnApi, createNewCardApi } from '~/apis'
import { generatePlacehoderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    // react router-dom ( tim hieu lay board id tu url)
    const boardId = '65f6b88e562d8e34f7f018cc'
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Xử lý kéo thả nếu column rỗng
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlacehoderCard(column)]
          column.cardOrderIds = [generatePlacehoderCard(column)._id]
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

  return (

    <Container disableGutters maxWidth={false} sx={{ height:'100vh', backgroundColor:'primary.main' }}>

      <AppBar/>

      <BoardBar board ={board} />

      <BoardContent board ={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />

    </Container>

  )
}

export default Board
