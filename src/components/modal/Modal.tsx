import React, {useEffect} from 'react';
import styles from './Modal.module.css';
import ReactDOM from "react-dom";
import ModalOverlay from "components/modal-overlay/ModalOverlay";
import ModalCloseButton from "components/modal/modal-close-button/ModalCloseButton";

type TModalPropsType = {
    children: JSX.Element | JSX.Element[],
    close: Function,
}

const modalRoot = document.getElementById('app-modals');

const Modal = (props: TModalPropsType) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
