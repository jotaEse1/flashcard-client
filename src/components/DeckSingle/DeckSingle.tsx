import { IoArrowBackCircleOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/tsHooks';
import { Deck } from '../../interfaces/dataStructure';
import { setCurrentDeck } from '../DeckPage/DeckPageSlice';
import './DeckSingle.css'

interface Props {
    deck: Deck
}

const DeckSingle: React.FC<Props> = ({ deck }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const openDeck = () => {
        dispatch(setCurrentDeck(deck))
        navigate(`/decks/${deck.name}`)
    }

    return (
        <div
            className='single-deck-container'
            title={`Click to open Deck ${deck.name}`}
            onClick={openDeck}
        >
            <div className='deck-name'>
                <h5>{deck.name}</h5>
            </div>
            <div className='deck-description'>
                <div className='deck-description-learning'>
                    <p>Learning Words </p>
                    <p>{deck.deck.learningWords}</p>
                </div>
                <div className='deck-description-mature'>
                    <p>Mature Words </p>
                    <p>{deck.deck.matureWords}</p>
                </div>
            </div>
            <div className='deck-footer'>
                <h5>
                    <p>Words: </p> {deck.deck.totalWords}
                </h5>
            </div>
        </div>
    );
}

export default DeckSingle;