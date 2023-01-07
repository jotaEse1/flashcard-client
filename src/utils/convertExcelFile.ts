import { read, utils } from "xlsx";
import { Card } from "../interfaces/dataStructure"
import { convertUnix } from "./convertUnix"
import { generateId } from "./generateId";

export const convertExcelFile = (file: File): Promise<Card[]> => {
    return new Promise( async (resolve, reject) => {
        try {
            let f = await(file).arrayBuffer(),
                wb = read(f),
                data = utils.sheet_to_json<any>(wb.Sheets[wb.SheetNames[0]]),
                keys = Object.keys(data[0]),
                { minutes, hour, date, month, year, unix } = convertUnix(Date.now()),
                finalArray: Card[] = [];

            data.forEach(word => {
                const id = generateId();

                finalArray.push({
                    id,
                    targetWord: word[keys[0]],
                    nativeWord: word[keys[1]],
                    dayAddedUnix: unix,
                    dayAddedStr: `${date}-${month}-${year} ${hour}:${minutes}`,
                    points: 0,
                    dayRepeatUnix: unix,
                    dayRepeatStr: `${date}-${month}-${year} ${hour}:${minutes}`,
                    state: "active",
                    modality: "learning_words"
                })
            });

            //console.log(finalArray)
            resolve(finalArray)

        } catch (error) {
            if (error instanceof Error) reject(error.message)
            else reject(String(error))
        }

    })
}
