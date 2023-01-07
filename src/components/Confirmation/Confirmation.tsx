import { AsyncThunkAction } from "@reduxjs/toolkit";
import { IoMdClose } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/tsHooks";
import { closeModal } from "../Modal/ModalSlice";
import "./Confirmation.css"

interface Props {
    description: string;
    action: () => AsyncThunkAction<boolean, string, {}>
}

const Confirmation = ({description, action} : Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleConfirmation = () => { 
        dispatch(closeModal())
        dispatch(action()) 
        navigate("/home")
    }

    const handleRejection = () => dispatch(closeModal()) 

    return ( 
        <div className="confirmation-container">
            <h2>{description}</h2>
            <div className="confirmation-buttons">
                <button type="button" onClick={handleConfirmation}>
                    <MdCheck />
                </button>
                <button type="button" onClick={handleRejection}>
                    <IoMdClose />
                </button>
            </div>
        </div>
     );
}
 
export default Confirmation;