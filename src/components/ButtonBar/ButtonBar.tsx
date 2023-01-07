import { useAppDispatch } from "../../hooks/tsHooks";
import "./ButtonBar.css"
import { CgMenuGridO } from "react-icons/cg";
import { openBar } from "../SideBar/SideBarSlice";

const ButtonBar = () => {
    const dispatch = useAppDispatch();

    return ( 
        <div
            className="upload-button"
            title="Upload words"
            onClick={() => dispatch(openBar())}
        >
            <CgMenuGridO />
        </div>
     );
}
 
export default ButtonBar;