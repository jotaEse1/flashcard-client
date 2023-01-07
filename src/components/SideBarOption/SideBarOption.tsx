import { BsArrowReturnRight } from "react-icons/bs";
import { useAppDispatch } from "../../hooks/tsHooks";
import { modalAction } from "../Modal/ModalSlice";
import { closeBar } from "../SideBar/SideBarSlice";
import "./SideBarOption.css"

interface Props {
    title: string;
    action: () => {
        payload: modalAction;
        type: string;
    }
}

const SideBarOption = ({title, action} : Props) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(closeBar())
        dispatch(action())
    }

    return (
        <div
            className='sidebar-options'
            onClick={handleClick}
        >
            {title}
            <button className='view-button'>
                <BsArrowReturnRight />
            </button>
        </div>
    );
}

export default SideBarOption;