import styles from './IngredientsContent.module.css';
import React, {LegacyRef} from "react";

interface IngredientsContentPropsType {
    title: string,
    children: JSX.Element | JSX.Element[]
}

const IngredientsContent = React.forwardRef((props: IngredientsContentPropsType, ref:LegacyRef<HTMLDivElement>) => {
    const {title, children} = props;
    return (
        <section className="mt-10">
            <div className="text text_type_main-medium" ref={ref}>{title}</div>
            <div className="pt-6 pl-4">
                <div className={styles.contentItems}>
                    {children}
                </div>
            </div>
        </section>
    );
});

export default IngredientsContent;
