import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../hooks/tsHooks";
import AnimatePages from "../AnimatePages/AnimatePages";
import ButtonBack from "../ButtonBack/ButtonBack";
import ButtonBar from "../ButtonBar/ButtonBar";
import DeckOptions from "../DeckOptions/DeckOptions";
import ProxyForOptions from "../ProxyForOptions/ProxyForOptions";
import SideBar from "../SideBar/SideBar";
import "./DeckPage.css"

const DeckPage = () => {
    const {currentDeck: {name}} = useAppSelector(state => state.deckState)
    const {isSidebarOpen} = useAppSelector(state => state.sideBar)

    return (
        <AnimatePages>
            <div className="deck-page-container">
                <div className="deck-page-navbar">
                    <ButtonBack />
                    <h1>{name?.toLocaleUpperCase()}</h1>
                    <ButtonBar />
                </div>
                <DeckOptions />
                <ProxyForOptions />
                <AnimatePresence exitBeforeEnter>
                    {isSidebarOpen && <SideBar />} 
                </AnimatePresence>
            </div>
        </AnimatePages>
     );
}
 
export default DeckPage;