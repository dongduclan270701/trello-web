//Hàm kéo thả trong arr
export const applyDrap = (arr, drapResult) => {
    const { removedIndex, addedIndex, payload } = drapResult
    if (removedIndex === null && addedIndex === null) return arr
    const result = [...arr]
    
    let itemToAdd = payload

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }
    return result
}