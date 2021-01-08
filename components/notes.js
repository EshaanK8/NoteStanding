const NUM_NOTES = 10

const notes = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ",
]


//create a note
export const createNote = () => ({
    title: "Title",
    message: notes[0],//May want to change this later for adding a note
    checked: false
})

//assign keys
export const addKeyToNote = (note, key) => ({
    key: key,
    ...note //allows for more keys to be added to note
})

export const addKeys = (val, key) => ({key: key, ...val})


let notesArray = Array.from({length: NUM_NOTES}, createNote).map(addKeys)
console.log(notesArray)

export default notesArray

