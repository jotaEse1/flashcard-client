import './SideBar.css'
import {IoMdClose} from "react-icons/io"
import { closeBar} from './SideBarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/tsHooks';
import SideBarOption from '../SideBarOption/SideBarOption';
import { openModalOf } from '../Modal/ModalSlice';
import { MODAL } from '../../constants/constants';
import { opacityAnimation } from '../../animations/modal';
import { sidebarAnimation } from '../../animations/sidebar';
import { motion } from 'framer-motion';

const SideBar = () => {
    const { currentDeck } = useAppSelector(state => state.deckState)
    const dispatch = useAppDispatch()

    return (
        <motion.div
            className='sidebar-modal'
            variants={opacityAnimation}
            initial="hide"
            animate="visible"
            exit="exit"
        >
            <motion.div
                className='sidebar-container'
                variants={sidebarAnimation}
                initial="hide"
                animate="visible"
                exit="exit"
            >
                <div className='sidebar-content'>
                    <h4>{currentDeck.name}</h4>
                    <button 
                        onClick={() => dispatch(closeBar())}
                    >
                        <IoMdClose />
                    </button>
                </div>
                <div className='sidebar-content-menu'>
                    <SideBarOption title='Rename Deck' action={() => openModalOf(MODAL.RENAME_DECK)}/>
                    <SideBarOption title='Delete Deck' action={() => openModalOf(MODAL.REMOVE_DECK)}/>
                    <SideBarOption title='Upload a Deck' action={() => openModalOf(MODAL.UPLOAD_WORD)} />
                    
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SideBar;