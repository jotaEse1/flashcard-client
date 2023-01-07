import { AnimatePresence, motion } from "framer-motion";
import { cardRotationVariant, wordAnimation } from "../../animations/cardRotation";
import { useAppDispatch, useAppSelector } from "../../hooks/tsHooks";
import CardBack from "../CardBack/CardBack";
import CardFront from "../CardFront/CardFront";
import "./Card.css"

const Card = ({ target, native }: { target: string, native: string }) => {
    const { isRotated } = useAppSelector(state => state.cardState)

    return (
        <div className="card">
            <AnimatePresence exitBeforeEnter>
                {!isRotated && <CardFront word={target} />}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {isRotated && <CardBack word={native}/>}
            </AnimatePresence>
        </div>
    );
}

export default Card;