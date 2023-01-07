import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/tsHooks"
import { editWord, updateWord } from "../DeckPage/DeckPageSlice"
import { closeModal } from "../Modal/ModalSlice"
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice"
import "./OptionEdit.css"

const initialState = {word: "", translation: ""}

const OptionEdit = () => {
    const {currentCard: {targetWord, nativeWord, id}} = useAppSelector(state => state.deckState)
    const [editedWord, setEditedWord] = useState({word: targetWord, translation: nativeWord});
    const dispatch = useAppDispatch()

    const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedWord({
            ...editedWord,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(closeModal())

        if (!editedWord.word || !editedWord.translation) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return
        }

        const word = {...editedWord, id}

        dispatch(updateWord(word))
            .then(ok => {
                if(ok){
                    dispatch(editWord(word))
                    setEditedWord(initialState)
                }
            })
    }

    return (
        <form
            className="option-add-container"
            onSubmit={handleSubmit}
        >
            <h2>Modify the Word</h2>
            <div className="option-add-row">
                <label htmlFor="word">Word</label>
                <textarea
                    name="word"
                    cols={25}
                    rows={2}
                    required
                    autoFocus
                    value={editedWord.word}
                    onChange={handleTextArea}
                />
                <label htmlFor="translation">Translation</label>
                <textarea
                    name="translation"
                    cols={25}
                    rows={2}
                    required
                    value={editedWord.translation}
                    onChange={handleTextArea}
                />
            </div>
            <div className="option-add-row">
                <button>Modify</button>
            </div>
        </form>
    );
}
 
export default OptionEdit;