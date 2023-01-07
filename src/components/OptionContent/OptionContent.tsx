import "./OptionContent.css"
import OptionContentWord from "../OptionContentWord/OptionContentWord";
import { IconType } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/tsHooks";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import { Card } from "../../interfaces/dataStructure";
import { paginate } from "../Pagination/PaginationSlice";

interface Props {
    title: string;
    Icon: IconType;
    action: string;
}

const OptionContent: React.FC<Props> = ({ title, Icon, action }) => {
    const [searchWord, setSearchWord] = useState(""), 
        { currentDeck: { deck: { cards } } } = useAppSelector(state => state.deckState),
        dispatch = useAppDispatch();

    const letterTyped = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value)
    }

    const dynamicSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result: Card[],
            term = e.target.value;

        if (!cards) return;
        if (!term) return dispatch(paginate({totalElements: cards.length, elements: cards, section: "deck"}))

        result = cards.filter(card => card.targetWord.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
        //result = filterSearch(allBudgets, term.toLocaleLowerCase(), 'title')

        return dispatch(paginate({totalElements: result.length, elements: result, section: "deck"}))
    }

    return (
        <div className="search-option-container">
            <h2>{title}</h2>
            <input 
                type="search" 
                name="word" 
                value={searchWord}
                onChange={e => {dynamicSearch(e); letterTyped(e)}}
                autoFocus 
            />
            <div className="list-words-container">
                {cards.length ? (
                    <Pagination
                        Component={(prop: Card) => <OptionContentWord card={prop} Icon={Icon} action={action}/>}
                        elements={cards}
                        section="deck"
                        elName="cards"
                    />
                    //deck.map(card => <OptionContentWord card={card} Icon={Icon}/>)
                ) : (
                    <p>No words found</p>
                )}

            </div>
        </div>
    );
}

export default OptionContent;