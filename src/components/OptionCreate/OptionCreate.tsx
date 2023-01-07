import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/tsHooks";
import { Card, Deck } from "../../interfaces/dataStructure";
import { createDeck, pushNewDeck } from "../DeckPage/DeckPageSlice";
import { closeModal } from "../Modal/ModalSlice";
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice";
import { paginate } from "../Pagination/PaginationSlice";
import "./OptionCreate.css"

const OptionCreate = () => {
    const [form, setForm] = useState({ name: "" });
    const {user} = useAppSelector(state => state.authentication)
    const { decks } = useAppSelector(state => state.deckState)
    const dispatch = useAppDispatch();

    const handleForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.name) {
            dispatch(displayModalMsgWith('You should provide a name.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return
        }

        dispatch(createDeck(form.name.trim()))
            .then(({ payload: { ok, idDeck } }: any) => {
                if (ok) {
                    const deck : Deck = {
                        id: idDeck as string,
                        id_user: user.id,
                        name: form.name.trim(),
                        deck: {
                            totalWords: 0,
                            learningWords: 0,
                            matureWords: 0,
                            cards: [] as Card[]
                        }
                    }, decksArr = decks.concat(deck)
                    dispatch(pushNewDeck(deck))
                    dispatch(paginate({totalElements: decksArr.length, elements: decksArr, section: "home"}))
                    dispatch(closeModal())
                }
            })

    }


    return (
        <form
            className="option-create-container"
            onSubmit={handleSubmit}
        >
            <h2>Create a new Deck</h2>
            <div>
                <label htmlFor="name">Name</label>
                <textarea
                    name="name"
                    value={form.name}
                    onChange={handleForm}
                    cols={25}
                    rows={2}
                    autoFocus
                    required
                ></textarea>
            </div>
            <button>Create</button>
        </form>
    );
}

export default OptionCreate;