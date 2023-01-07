import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/tsHooks";
import { Card } from "../../interfaces/dataStructure";
import { convertUnix } from "../../utils/convertUnix";
import { showFront } from "../Card/CardSlice";
import { changeToNextCard, changeToNextCardAllWords, modalityType } from "../StudyPage/StudyPageSlice";
import "./StudyPageButtons.css"

const edits : {
    "-1": number;
    "0": number;
    "1": number;
    time: { [key: string] : {unix: number, str: string} },
} = {
    "-1": -1,
    "0": 0,
    "1": 1,
    time: {
        base: {unix: 600000, str: "10 m"}, 
        "0": {unix: 900000, str: "15 m"}, 
        "1": {unix: 86400000, str: "1 d"}, 
        "2": {unix: 172800000, str: "2 ds"}, 
        "3": {unix: 259200000, str: "3 ds"}, 
        "4": {unix: 345600000, str: "4 ds"}, 
        "5": {unix: 432000000, str: "5 ds"}, 
        roof: {unix: 864000000, str:  "> 5 ds"} 
    }
}

const StudyPageButtons = ({card, modality} : {card: Card, modality: modalityType}) => {
    const dispatch = useAppDispatch(),
        minusOne = card.points - 1 > 5 ? "roof" : card.points - 1 < 0? "base" : card.points - 1,
        cero = card.points > 5 ? "roof" : card.points < 0? "base" : card.points,
        one = card.points + 1 > 5 ? "roof" : card.points + 1 < 0? "base" : card.points + 1;

    const handleClick = (difficulty: "-1" | "0" | "1") => {
        if(modality === "all_words"){
            dispatch(changeToNextCardAllWords())
            dispatch(showFront())
            return
        }

        const editedPoints = card.points + edits[difficulty],
            today = Date.now(),
            baseOrRoofOrPoints = editedPoints > 5 ? "roof" : editedPoints < 0? "base" : String(editedPoints),
            editedDayRepeatUnix = today + edits.time[baseOrRoofOrPoints].unix,
            cardState = editedPoints >= 5 || editedDayRepeatUnix - today >= edits.time["1"].unix? "inactive" : "active",
            modalityEdited = editedPoints >= 5? "mature_words" : "learning_words",
            {seconds, minutes, hour, date, month, year} = convertUnix(editedDayRepeatUnix),
            editedCard : Card = {
                id: card.id,
                nativeWord: card.nativeWord,
                targetWord: card.targetWord,
                dayAddedUnix: card.dayAddedUnix,
                dayAddedStr: card.dayAddedStr,
                points: editedPoints,
                dayRepeatUnix: editedDayRepeatUnix,
                dayRepeatStr: `${date}-${month}-${year} ${hour}:${minutes}:${seconds}`,
                state: cardState,
                modality: modalityEdited
            }

        let wordDeleted = 0
        if(cardState) wordDeleted = 1

        dispatch(changeToNextCard({card: editedCard, wordDeleted}))
        dispatch(showFront())
    }
    
    return ( 
        <div className="study-page-buttons-container">
            <div className="study-page-buttons-row">
                <p
                    style={modality === "all_words" ? {color: "transparent"} : undefined }
                >{edits.time[minusOne].str}</p>
                <button onClick={() => handleClick("-1")}>
                    Difficult
                </button>
            </div>
            <div className="study-page-buttons-row">
                <p
                    style={modality === "all_words" ? {color: "transparent"} : undefined }
                >{edits.time[cero].str}</p>
                <button onClick={() => handleClick("0")}>
                    Intermidiate
                </button>
            </div>
            <div className="study-page-buttons-row">
                <p
                    style={modality === "all_words" ? {color: "transparent"} : undefined }
                >{edits.time[one].str}</p>
                <button onClick={() => handleClick("1")}>
                    Easy
                </button>
            </div>
        </div>
    );
}
 
export default StudyPageButtons;