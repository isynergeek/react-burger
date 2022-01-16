import styles from './AppMain.module.css';

type TAppMainPropsType ={
    children: JSX.Element | JSX.Element[]
}

const AppMain = ({children}: TAppMainPropsType) => {
    return (
        <main className={styles.main}>
            <div className={styles.content}>
                {children}
            </div>
        </main>
    );
};

export default AppMain;
