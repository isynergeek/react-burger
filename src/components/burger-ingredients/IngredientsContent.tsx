import styles from './IngredientsContent.module.css';
import PropTypes from "prop-types";

const IngredientsContent = (props: { title: any; children: any }) => {
    const {title, children} = props;
    return (
        <section className="mt-10">
            <div className="text text_type_main-medium">{title}</div>
            <div className="pt-6 pl-4">
                <div className={styles.contentItems}>
                    {children}
                </div>
            </div>
        </section>
    );
};

IngredientsContent.propTypes = {
    title: PropTypes.string.isRequired,
};

export default IngredientsContent;
