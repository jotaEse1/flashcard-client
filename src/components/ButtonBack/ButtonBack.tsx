import { useNavigate } from "react-router-dom";
import {IoArrowBackCircleOutline} from "react-icons/io5"
import "./ButtonBack.css"

interface Props {
    action?: () => void;
    isAction?: boolean;
}

const ButtonBack: React.FC<Props> = ({action, isAction = false}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if(isAction){
            action!()
        }
        navigate(-1)
    }

    return (
        <div
            className="back-button"
            onClick={handleClick}
        >
            <IoArrowBackCircleOutline />
        </div>
    );
}

export default ButtonBack;