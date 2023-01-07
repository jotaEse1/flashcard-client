import { useState } from "react";
import { useAppDispatch} from "../../hooks/tsHooks";
import { Card } from "../../interfaces/dataStructure";
import { convertUnix } from "../../utils/convertUnix";
import { generateId } from "../../utils/generateId";
import { addWord, pushWord } from "../DeckPage/DeckPageSlice";
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice";
import "./OptionAdd.css"

const initialState = {
    word: "", 
    translation: "" 
}

const OptionAdd = () => {
    const [newWord, setNewWord] = useState(initialState)
    const dispatch = useAppDispatch()

    const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewWord({
            ...newWord,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newWord.word || !newWord.translation) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return
        }

        const {date, month, year, hour, minutes, unix} = convertUnix(Date.now()),
            id = generateId(),
            word: Card = {
                id,
                targetWord: newWord.word,
                nativeWord: newWord.translation,
                dayAddedUnix: unix,
                dayAddedStr: `${date}-${month}-${year} ${hour}:${minutes}`,
                points: 0,
                dayRepeatUnix: unix,
                dayRepeatStr: `${date}-${month}-${year} ${hour}:${minutes}`,
                state: "active",
                modality: "learning_words"
            }

        dispatch(addWord(word))
            .then(ok => {
                if(ok){
                    dispatch(pushWord(word))
                    setNewWord(initialState)
                }
            })
    }

    return (
        <form
            className="option-add-container"
            onSubmit={handleSubmit}
        >
            <h2>Add a Word</h2>
            <div className="option-add-row">
                <label htmlFor="word">Word</label>
                <textarea
                    name="word"
                    cols={25}
                    rows={2}
                    required
                    autoFocus
                    value={newWord.word}
                    onChange={handleTextArea}
                />
                <label htmlFor="translation">Translation</label>
                <textarea
                    name="translation"
                    cols={25}
                    rows={2}
                    required
                    value={newWord.translation}
                    onChange={handleTextArea}
                />
            </div>
            <div className="option-add-row">
                <button>Add Word</button>
            </div>
        </form>
    );
}

export default OptionAdd;