import { MODAL } from "../../constants/constants";
import { useAppDispatch } from "../../hooks/tsHooks";
import { openModalOf } from "../Modal/ModalSlice";
import { motion } from "framer-motion";
import "./DeckOptions.css"

const DeckOptions = () => {
    const dispatch = useAppDispatch();
    
    return (
        <div className="deck-options-wrapper">
            <div className="deck-options-row">
                <motion.div 
                    className="deck-option"
                    onClick={() => dispatch(openModalOf(MODAL.STUDY_DECK))}
                >
                    <p className="deck-option-text">Study</p>
                </motion.div>
                <div 
                    className="deck-option"
                    onClick={() => dispatch(openModalOf(MODAL.SEARCH_WORD))}
                >
                    <p className="deck-option-text">Search</p>
                </div>
            </div>
            <div className="deck-options-row">
                <div 
                    className="deck-option"
                    onClick={() => dispatch(openModalOf(MODAL.REMOVE_WORD))}
                >
                    <p className="deck-option-text">Remove</p>
                </div>
                <div 
                    className="deck-option"
                    onClick={() => dispatch(openModalOf(MODAL.ADD_WORD))}
                >
                    <p className="deck-option-text">Add</p>
                </div>
            </div>
        </div>
    );
}

export default DeckOptions;