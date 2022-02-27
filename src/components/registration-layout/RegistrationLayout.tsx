import styles from './RegistrationLayout.module.css';


interface IRegistrationLayout {
    children: JSX.Element | JSX.Element[]
}

const RegistrationLayout = ({ children }: IRegistrationLayout) => {
    
    return (
        <section className={styles.Root}>
            {children}
        </section>
    );
};

export default RegistrationLayout;
