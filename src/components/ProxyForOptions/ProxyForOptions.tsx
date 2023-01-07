import { useAppSelector } from "../../hooks/tsHooks";
import { RiDeleteBinLine } from "react-icons/ri"
import { FiEdit } from "react-icons/fi"
import Modal from "../Modal/Modal";
import OptionUpload from "../OptionUpload/OptionUpload";
import OptionContent from "../OptionContent/OptionContent";
import OptionAdd from "../OptionAdd/OptionAdd";
import OptionEdit from "../OptionEdit/OptionEdit";
import OptionCreate from "../OptionCreate/OptionCreate";
import Confirmation from "../Confirmation/Confirmation";
import { deleteDeck } from "../DeckPage/DeckPageSlice";
import OptionRename from "../OptionRename/OptionRename";
import OptionStudy from "../OptionStudy/OptionStudy";
import { AnimatePresence } from "framer-motion";

const ProxyForOptions = () => {
    const { modalOpened } = useAppSelector(state => state.modal)
    const { currentDeck: { id } } = useAppSelector(state => state.deckState)

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {modalOpened === "create_D" && (
                    <Modal height="50vh" width="90vw">
                        <OptionCreate />
                    </Modal>
                )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {modalOpened === "add_W" && (
                    <Modal height="50vh">
                        <OptionAdd />
                    </Modal>
                )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {modalOpened === "remove_W" && (
                    <Modal>
                        <OptionContent
                            title="Remove words"
                            Icon={RiDeleteBinLine}
                            action="delete"
                        />
                    </Modal>
                )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {modalOpened === "search_W" && (
                    <Modal>
                        <OptionContent
                            title="Search words"
                            Icon={FiEdit}
                            action="update"
                        />
                    </Modal>
                )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {modalOpened === "upload_W" && (
                    <Modal height="50vh">
                        <OptionUpload />
                    </Modal>
                )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {modalOpened === "update_W" && (
                    <Modal height="50vh">
                        <OptionEdit />
                    </Modal>
                )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {modalOpened === "remove_D" && (
                    <Modal height="30vh" width="20rem !important">
                        <Confirmation
                            description="Are you sure you want to delete this Deck?"
                            action={() => deleteDeck(id)}
                        />
                    </Modal>
                )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {modalOpened === "rename_D" && (
                    <Modal height="30vh" width="20rem !important">
                        <OptionRename />
                    </Modal>
                )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {modalOpened === "study_D" && (
                    <Modal height="40vh" width="20rem !important">
                        <OptionStudy />
                    </Modal>
                )}
            </AnimatePresence>
        </>
    )
    switch (modalOpened) {
        case "create_D":
            return (
                <AnimatePresence exitBeforeEnter>
                    <Modal height="50vh" width="90vw">
                        <OptionCreate />
                    </Modal>
                </AnimatePresence>
            )
        case "add_W":
            return (
                <Modal height="50vh">
                    <OptionAdd />
                </Modal>
            )
        case "remove_W":
            return (
                <Modal>
                    <OptionContent
                        title="Remove words"
                        Icon={RiDeleteBinLine}
                        action="delete"
                    />
                </Modal>
            )
        case "search_W":
            return (
                <Modal>
                    <OptionContent
                        title="Search words"
                        Icon={FiEdit}
                        action="update"
                    />
                </Modal>
            )
        case "upload_W":
            return (
                <Modal height="50vh">
                    <OptionUpload />
                </Modal>
            )
        case "update_W":
            return (
                <Modal height="50vh">
                    <OptionEdit />
                </Modal>
            )
        case "remove_D":
            return (
                <Modal height="30vh" width="20rem !important">
                    <Confirmation
                        description="Are you sure you want to delete this Deck?"
                        action={() => deleteDeck(id)}
                    />
                </Modal>
            )
        case "rename_D":
            return (
                <Modal height="30vh" width="20rem !important">
                    <OptionRename />
                </Modal>
            )
        case "study_D":
            return (
                <Modal height="40vh" width="20rem !important">
                    <OptionStudy />
                </Modal>
            )
        default:
            return null;
    }
}

export default ProxyForOptions;