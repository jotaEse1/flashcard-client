import { Card } from "../interfaces/dataStructure"
import { convertUnix } from "./convertUnix";
import { generateId } from "./generateId";

export const convertTxtFile = (file: File): Promise<Card[]> => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = () => {
            const result = reader.result as string,
                finalArray: Card[] = [],
                { minutes, hour, date, month, year, unix } = convertUnix(Date.now())

            result
                .trim()
                .split('\n')
                .forEach(arr => {
                    const [targetWord, nativeWord] = arr.split("\t", 2),
                        id = generateId()

                    finalArray.push({
                        id,
                        targetWord,
                        nativeWord,
                        dayAddedUnix: unix,
                        dayAddedStr: `${date}-${month}-${year} ${hour}:${minutes}`,
                        points: 0,
                        dayRepeatUnix: unix,
                        dayRepeatStr: `${date}-${month}-${year} ${hour}:${minutes}`,
                        state: "active",
                        modality: "learning_words"
                    })
                });

            //console.log(finalArray);
            resolve(finalArray)
        };

        reader.onerror = () => {
            //console.log(reader.error)
            reject(reader.error)
        };

    })
}
