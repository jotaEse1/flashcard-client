import "./CardFront.css"
import { motion } from "framer-motion";
import { cardRotationVariant, wordAnimation } from "../../animations/cardRotation";

const CardFront = ({word} : {word: string}) => {
    return (
        <motion.div
            className="front"
            variants={cardRotationVariant}
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
        </motion.div>
    );
}

export default CardFront;