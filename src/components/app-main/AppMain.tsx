import styles from './AppMain.module.css';

const AppMain = (props: { children: any; }) => {
    const {children} = props;
    return (
        <main className={styles.main}>
            <div className={styles.content}>
            {children}
            </div>
        </main>
    );
};

export default AppMain;
