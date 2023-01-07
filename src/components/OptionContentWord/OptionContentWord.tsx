import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";
import { IconType } from "react-icons/lib";
import { MODAL } from "../../constants/constants";
import { useAppDispatch } from "../../hooks/tsHooks";
import { Card } from "../../interfaces/dataStructure";
import { deleteWord, removeWord, setCurrentCard } from "../DeckPage/DeckPageSlice";
import { openModalOf } from "../Modal/ModalSlice";
import "./OptionContentWord.css"

interface Props {
    card: Card;
    Icon: IconType;
    action: string;
}

const OptionContentWord: React.FC<Props> = ({ card, Icon, action }) => {
    const { nativeWord, targetWord, id, modality } = card;
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()

    const handleAction = (e: React.MouseEvent<HTMLParagraphElement>) => {
        if(action === "delete"){
            dispatch(deleteWord(id))
                .then(ok => ok && dispatch(removeWord({id, modality})))
        }
        if(action === "update"){
            dispatch(setCurrentCard(card))
            dispatch(openModalOf(MODAL.UPDATE_WORD))
        }
    }

    return (
        <div className="word-list-container" key={card.nativeWord}>
            <div className="word-list-front">
                <p className={modality === "learning_words" ? "t-word-modality-learning" : "t-word-modality-mature"}>
                    {modality === "learning_words" ? "L" : "M"} </p>
                <p className="t-word">{targetWord}</p>
                <div
                    title="Click to open"
                    onClick={() => setIsOpen(prev => !prev)}
                    className={!isOpen? "word-closed" : "word-opened"}
                >
                    <IoIosArrowDown />
                </div>
            </div>
            {isOpen && (
                <p className="w-word">
                    <p>{nativeWord}</p>
                    <p onClick={handleAction} ><Icon /></p>
                </p>
            )}
        </div>
    );
}

export default OptionContentWord;