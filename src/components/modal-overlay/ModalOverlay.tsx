import React, {MouseEventHandler} from 'react';
import styles from './ModalOverlay.module.css';

type ModalOverlayPropsType = {
    onClick: MouseEventHandler
}

const ModalOverlay = (props: ModalOverlayPropsType) => {
    const {onClick} = props;

    return (
        <div className={styles.Root} onClick={onClick}>
        </div>
    );
};


export default ModalOverlay;
