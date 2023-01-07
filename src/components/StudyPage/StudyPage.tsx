import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/tsHooks";
import AnimatePages from "../AnimatePages/AnimatePages";
import ButtonBack from "../ButtonBack/ButtonBack";
import Card from "../Card/Card";
import { showBack, showFront } from "../Card/CardSlice";
import { updateStudy } from "../DeckPage/DeckPageSlice";
import { closeLoader, openLoader } from "../Loader/LoaderSlice";
import StudyPageButtons from "../StudyPageButtons/StudyPageButtons";
import "./StudyPage.css"
import { resetStudyCounter, saveWordsChanges } from "./StudyPageSlice";

const StudyPage = () => {
    const {currentDeck : {name}} = useAppSelector(state => state.deckState)
    const {currentModalityWord, studyFinished, totalWords, cardsChanged, modality} = useAppSelector(state => state.studyState)
    const {isRotated} = useAppSelector(state => state.cardState)
    const dispatch = useAppDispatch();

    const handleRotation = () => isRotated? dispatch(showFront()) : dispatch(showBack()) 

    const modifyStudy = () => {
        dispatch(openLoader())

        if(Object.keys(cardsChanged).length){
            dispatch(saveWordsChanges(cardsChanged))
                .then(() => {
                    dispatch(updateStudy(cardsChanged))
                    setTimeout(() => dispatch(closeLoader()), 1000)
                })
        }else{
            setTimeout(() => dispatch(closeLoader()), 1000)
        }

        dispatch(resetStudyCounter())
    }
    

    return (
        <AnimatePages> 
            <div className="study-page-container">
                <h1>{name.toLocaleUpperCase()}</h1>
                <div 
                    className="button-back-row"
                    onClick={() => dispatch(showFront())}
                >
                    <ButtonBack action={() => modifyStudy()} isAction={true} />
                </div>
                {!studyFinished? (
                    <>
                        <div className="study-page-words">
                            <h3>{modality === "all_words"? "Total Words" : "Words left"}</h3>
                            <p>{totalWords}</p> 
                        </div>
                        <Card target={currentModalityWord.targetWord} native={currentModalityWord.nativeWord} />
                        {!isRotated ? (
                            <button onClick={handleRotation}>
                                Rotate
                            </button>
                        ):(
                            <StudyPageButtons card={currentModalityWord} modality={modality}/>
                        )}
                    </>
                ):(
                    <div className="study-msg-container">
                        <h2>Congratulations!</h2>
                        <p>
                            You've just finished this sesion of study of the {name} deck. If 
                            you want to do another sesion just go back and start rigth now!
                        </p>
                    </div>
                )}
            </div>
        </AnimatePages>
    );
}
 
export default StudyPage;