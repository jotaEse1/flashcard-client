import { useState } from "react";
import { useAppDispatch } from "../../hooks/tsHooks";
import { changeDeckame, renameDeck } from "../DeckPage/DeckPageSlice";
import { closeModal } from "../Modal/ModalSlice";
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice";
import "./OptionRename.css"

const OptionRename = () => {
    const [form, setForm] = useState({name: ""});
    const dispatch = useAppDispatch();

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form, 
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()

        if(!form.name){
            dispatch(displayModalMsgWith("You should complete all fields."))
            return setTimeout(() => dispatch(hideModalMsg()), 3500)
        }

        dispatch(renameDeck(form.name.trim()))
            .then(ok => {
                if(ok){
                    dispatch(changeDeckame(form.name))
                    dispatch(closeModal())
                } 
            })
    }

    return ( 
        <form 
            className="option-rename-container"
            onSubmit={handleSubmit}
        >
            <h2>Rename Deck</h2>
            <input 
                type="text" 
                name="name"
                value={form.name} 
                onChange={handleForm}
                required
                autoFocus
            />
            <button>Rename</button>
        </form>
     );
}
 
export default OptionRename;