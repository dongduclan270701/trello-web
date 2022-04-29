//Bôi đậm tất cả ký tự khi chọn vào thẻ input
export const selectAllInlineText = (e) => {
    //Focus vào thẻ input
    e.target.focus()
    //Chọn tất cả value tồn tại trong thẻ input
    e.target.select()
}
// Ấn Enter để hoàn thành input thay vì click button
export const saveContentAfterPressEnter = (e) => {
    if (e.key === 'Enter') {
        e.target.blur()
    }
}