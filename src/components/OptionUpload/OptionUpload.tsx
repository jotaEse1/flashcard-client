import { useState } from "react";
import { useAppDispatch } from "../../hooks/tsHooks";
import { convertExcelFile } from "../../utils/convertExcelFile";
import { convertTxtFile } from "../../utils/convertTxtFile";
import { pushUploadedhWords, uploadDeck } from "../DeckPage/DeckPageSlice";
import { closeModal } from "../Modal/ModalSlice";
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice";
import "./OptionUpload.css"

const OptionUpload = () => {
    const [file, setFile] = useState<File>();
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return

        setFile(e.target.files[0])
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!file){
            dispatch(displayModalMsgWith("You have to upload a file."))
            setTimeout(() => dispatch(hideModalMsg()), 3500);
            return
        }

        if(file.type !== "text/plain") {

            convertExcelFile(file)
                .then((cards) => {
                    dispatch(uploadDeck(cards))
                        .then(ok => {
                            if(ok){
                                dispatch(pushUploadedhWords(cards))
                                dispatch(closeModal())
                            }
                        })
                })
                .catch(err => {
                    console.log(err)
                    dispatch(displayModalMsgWith("An error ocurred. Try again later."))
                    setTimeout(() => dispatch(hideModalMsg()), 3500);
                })

            return
        }
        
        convertTxtFile(file)
            .then(cards => {
                dispatch(uploadDeck(cards))
                    .then(ok => {
                        if(ok){
                            dispatch(pushUploadedhWords(cards))
                            dispatch(closeModal())
                        }
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(displayModalMsgWith("An error ocurred. Try again later."))
                setTimeout(() => dispatch(hideModalMsg()), 3500);
            })
    
    }

    return (
        <form
            className="option-upload-container "
            onSubmit={handleSubmit}
        >
            <h3>Upload words from an external file</h3>
            <input
                type="file"
                accept=".txt, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleChange}
            />
            <button type="submit">Upload</button>
        </form>
    );
}

export default OptionUpload;