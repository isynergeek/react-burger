import styles from './AppMain.module.css';

interface AppMainPropsType {
    children: JSX.Element
}

const AppMain = (props: AppMainPropsType) => {
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
