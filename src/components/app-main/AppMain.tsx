import styles from './AppMain.module.css';

type TAppMain ={
    children: JSX.Element | JSX.Element[]
}

const AppMain = ({children}: TAppMain) => {
    return (
        <main className={styles.main}>
            <div className={styles.content}>
                {children}
            </div>
        </main>
    );
};

export default AppMain;
