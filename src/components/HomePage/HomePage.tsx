import DeckSingle from "../DeckSingle/DeckSingle";
import { FiLogOut, FiPlusSquare } from 'react-icons/fi'
import "./HomePage.css"
import { useAppDispatch, useAppSelector } from "../../hooks/tsHooks";
import { openModalOf } from "../Modal/ModalSlice";
import { getDecks } from "../DeckPage/DeckPageSlice";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { Deck } from "../../interfaces/dataStructure";
import ProxyForLoaders from "../ProxyForLoaders/ProxyForLoaders";
import ProxyForOptions from "../ProxyForOptions/ProxyForOptions";
import { MODAL } from "../../constants/constants";
import { logOut, logOutUser } from "../Authentication/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
import AnimatePages from "../AnimatePages/AnimatePages";

const HomePage = () => {
    const {decks} = useAppSelector(state => state.deckState)
    const { user } = useAppSelector(state => state.authentication)
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    useEffect(() => { 
        dispatch(getDecks(user.id)) 
            .then(()=> {
                setIsLoading(false)
            })
    }, [])
    
    if (isLoading) return <ProxyForLoaders type="big"/>
    
    const handleLogOut = () => {
        dispatch(logOut())
            .then(ok => {
                if(ok){
                    dispatch(logOutUser())
                    navigate("/signin")
                }
            })
    }

    console.log("renders HomePage")
    return (
        <AnimatePages>
            <div className="home-container">
                <h1>Decks</h1>
                <button 
                    className="log-out-button"
                    onClick={handleLogOut}
                >
                    <FiLogOut />
                </button>
                <button
                    className="create-deck-button"
                    onClick={() => dispatch(openModalOf(MODAL.CREATE_DECK))}
                >
                    <FiPlusSquare title="Create a new Deck" />
                </button>
                <Pagination
                    Component={(prop: Deck) => <DeckSingle deck={prop}/>}
                    elements={decks}
                    section="home"
                    elName="decks"
                    classNameContainer="decks-container"
                />
                <ProxyForOptions />
            </div>
        </AnimatePages>
    );
}

export default HomePage;