//select all input value when click
export const selectAllInlineText = (e) => {
    e.target.focus()
    e.target.select()
}
//on Keydown
export const saveContentAfterPressEnter = (e) => {
    if (e.key === 'Enter') {
        e.target.blur()
    }
}