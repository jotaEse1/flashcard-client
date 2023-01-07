import { useAppSelector } from "../../hooks/tsHooks";
import "./ModalMsg.css"

const ModalMsg = () => {
    const {msg} = useAppSelector(state => state.modalMsg)

    return ( 
        <div className="modalMsg-container">
            <p>
                {msg}
            </p>
        </div>
     );
}
 
export default ModalMsg;