import React, {KeyboardEvent, SyntheticEvent, useEffect, useRef} from 'react';
import styles from './Modal.module.css';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import ModalCloseButton from "./ModalCloseButton";

type ModalPropsType = {
    children: JSX.Element | JSX.Element[],
    close: Function,
}

const modalRoot = document.getElementById('app-modals');

const Modal = (props: ModalPropsType) => {
    const {children, close} = props;

    const modalRef = useRef<HTMLElement>(null);

    useEffect(() => {
        modalRef.current && modalRef.current.focus();
    },[])

    const closeHandler = (e: SyntheticEvent) => {
        return close(e);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            return closeHandler(e);
        }
    }

    return modalRoot ? ReactDOM.createPortal(
        (
            <>
                <section className={styles.Root} onKeyDown={onKeyDown} tabIndex={-1} ref={modalRef}>
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
