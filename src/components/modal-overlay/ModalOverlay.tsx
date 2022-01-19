import React, {MouseEventHandler} from 'react';
import styles from './ModalOverlay.module.css';

type TModalOverlayProps = {
    onClick: MouseEventHandler
}

const ModalOverlay = ({onClick}: TModalOverlayProps) => {
    return (
        <div className={styles.Root} onClick={onClick}>
        </div>
    );
};

export default ModalOverlay;

