import { modalityType } from "../components/StudyPage/StudyPageSlice";
import { Card } from "../interfaces/dataStructure";

export const generateStudyWords = (words: Card[], totalWords: number, modality: modalityType) => {
    const wordCopy: Card[] = JSON.parse(JSON.stringify(words)),
        sliceEnd = totalWords > words.length ? words.length : totalWords,
        today = Date.now();

    let finalWords: Card[];

    if (modality === "all_words") {
        finalWords = wordCopy.sort(() => 0.5 - Math.random()).slice(0, sliceEnd);
        finalWords.forEach(word => word.state = "active")
    }
    else if (modality === "mature_words") {
        finalWords = wordCopy
            .filter((word) => word.modality === "mature_words")
            .sort(() => 0.5 - Math.random())
            .slice(0, sliceEnd)    
        finalWords.forEach(word => word.state = "active");
    }
    else {
        finalWords = wordCopy
            .filter(word => word.modality === modality && word.dayRepeatUnix < today)
            .sort(() => 0.5 - Math.random())
            .slice(0, sliceEnd)
        finalWords.forEach(word => word.state = "active")
    }

    if (!finalWords.length) return {
        success: false,
        words: []
    }
    else return {
        success: true,
        words: finalWords
    }

}