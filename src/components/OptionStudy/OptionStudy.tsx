import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/tsHooks";
import { generateStudyWords } from "../../utils/generateStudyWords";
import { closeModal } from "../Modal/ModalSlice";
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice";
import { modalityType, setStudyElements } from "../StudyPage/StudyPageSlice";
import "./OptionStudy.css"

const initialState: {
    modality: modalityType, 
    totalWords: number
} = {modality: "" as modalityType, totalWords: 0}

const OptionStudy = () => {
    const [form, setForm] = useState(initialState);
    const {currentDeck: {deck : {cards}}} = useAppSelector(state => state.deckState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleForm = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!form.modality || !form.totalWords){
            dispatch(displayModalMsgWith("You should complete all fields."))
            return setTimeout(() => dispatch(hideModalMsg()), 3500)
        }
        if(!cards.length){
            dispatch(displayModalMsgWith("This Deck has no cards."))
            return setTimeout(() => dispatch(hideModalMsg()), 3500)
        }

        const result = generateStudyWords(cards, Number(form.totalWords), form.modality)

        if(!result.success){
            dispatch(displayModalMsgWith(`This Deck has no cards with this modality.`))
            return setTimeout(() => dispatch(hideModalMsg()), 3500)
        }

        dispatch(setStudyElements({
            modality: form.modality, 
            totalWords: result.words.length,
            limitArr: result.words.length - 1,  
            modalityWords: result.words,
            currentModalityWord: result.words[0]
        }))
        dispatch(closeModal())
        navigate("/study")
    }

    return ( 
        <form 
            className="option-study-container"
            onSubmit={handleSubmit}
        >
            <h2>Study</h2>
            <div className="option-study-fields">
                <div className="option-study-fields-row">
                    <label htmlFor="modality">Study modality</label>
                    <select 
                        name="modality" 
                        value={form.modality}
                        placeholder="Select a modality..."
                        onChange={handleForm}
                        required
                    >
                        <option value="" disabled>Select a modality...</option>
                        <option value="learning_words">Learning Words</option>
                        <option value="mature_words">Mature Words</option>
                        <option value="all_words">All words</option>
                    </select>
                </div>
                <div className="option-study-fields-row">
                    <label htmlFor="totalWords">Limit words</label>
                    <input 
                        type="number" 
                        name="totalWords" 
                        min='1'
                        step='1'
                        value={!form.totalWords? "" : form.totalWords}
                        onChange={handleForm}
                        required
                    />
                </div>
            </div>
            <button>Study!</button>
        </form>
    );
}
 
export default OptionStudy;