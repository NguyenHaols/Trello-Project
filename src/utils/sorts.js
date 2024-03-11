// sorts column or card item
export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  // clone lại array để không bị thay đổi array gốc
  const clonedArray = [...originalArray]

  // Sắp xếp array đã clone lại dựa theo mảng thứ 2 và theo key (key ở đây có thể là id,name,....)
  const orderedArray = clonedArray.sort((a, b) => {
    // Sắp xếp mảng clone dựa trên kết quả return của mảng thứ 2
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}