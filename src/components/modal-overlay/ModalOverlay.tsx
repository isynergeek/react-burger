import React, {MouseEventHandler} from 'react';
import styles from './ModalOverlay.module.css';

type TModalOverlayPropsType = {
    onClick: MouseEventHandler
}

const ModalOverlay = ({onClick}: TModalOverlayPropsType) => {
    return (
        <div className={styles.Root} onClick={onClick}>
        </div>
    );
};

export default ModalOverlay;

