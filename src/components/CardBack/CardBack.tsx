import { cardChange, wordAnimation } from "../../animations/cardRotation";
import { motion } from "framer-motion";
import "./CardBack.css"
import { AiOutlineRotateLeft } from "react-icons/ai";
import {FcRotateToLandscape} from "react-icons/fc";
import { MdRotate90DegreesCcw } from "react-icons/md";
import { showFront } from "../Card/CardSlice";
import { useAppDispatch } from "../../hooks/tsHooks";

const CardBack = ({word} : {word: string}) => {
    const dispatch = useAppDispatch();
    
    return (
        <motion.div
            className="back"
            variants={cardChange}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.p
                className="word"
                variants={wordAnimation}
            >
                {word}
            </motion.p>
            <button 
                title="Click to rotate the card"
                onClick={() => dispatch(showFront())}
            >
                <MdRotate90DegreesCcw />
            </button>
        </motion.div>
    );
}

export default CardBack;