
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// Tạo ra 1 card rỗng để giữ chỗ ở column vì nếu column trống sẽ không thể đưa lại card vào
export const generatePlacehoderCard = (column) => {
  return {
    _id : `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlacehoderCard:true
  }
}