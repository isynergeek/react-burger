import {useEffect} from 'react';
import styles from './Modal.module.css';
import ReactDOM from "react-dom";
import ModalOverlay from "components/modal-overlay/ModalOverlay";
import ModalCloseButton from "components/modal/modal-close-button/ModalCloseButton";

type TModalProps = {
    children: JSX.Element | JSX.Element[],
    close: () => void,
}

const modalRoot = document.getElementById('app-modals');

const Modal = (props: TModalProps) => {
    const {children, close} = props;
    const closeHandler = () => {
        return close();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            return closeHandler();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [])

    return modalRoot ? ReactDOM.createPortal(
        (
            <>
                <section className={styles.Root}>
                    <div className={`${styles.Content} p-10 pb-15`}>
                        {children}
                    </div>
                    <ModalCloseButton onClick={closeHandler}/>
                </section>
                <ModalOverlay onClick={closeHandler}/>
            </>
        ), modalRoot) : null;
};

export default Modal;
