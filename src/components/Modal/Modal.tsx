import "./Modal.css"
import {IoMdClose} from "react-icons/io"
import { useAppDispatch } from "../../hooks/tsHooks";
import { closeModal } from "./ModalSlice";
import { motion } from "framer-motion";
import { modalAnimation, opacityAnimation } from "../../animations/modal";


interface Props {
    children: React.ReactNode;
    height?: string;
    width?: string;
}

const Modal: React.FC<Props> = ({children, height = "80vh", width = "85vw"}) => {
    const dispatch = useAppDispatch();

    return ( 
        <motion.div 
            className="options-window-modal"
            variants={opacityAnimation}
            initial="hide"
            animate="visible"
            exit="exit"
        >
            <motion.div 
                className="options-window-container" 
                style={{ height, width }}
                variants={modalAnimation}
                initial="hide"
                animate="visible"
                exit="exit"
            >
                <div className="options-window-content">
                    {children}
                </div>
                <button 
                    className="options-window-button"
                    onClick={() => dispatch(closeModal())}
                >
                    <IoMdClose />
                </button>
            </motion.div>
        </motion.div>
     );
}
 
export default Modal;