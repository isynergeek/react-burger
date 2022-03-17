import styles from './IngredientIcon.module.css';

interface IIngredientIconProps {
  icon: string,
  position?: number,
  text?: string
}

const IngredientIcon = (props: IIngredientIconProps) => {
  const { icon, position = 0, text = '' } = props;
  return (
    <div className={styles.Root} style={{
      zIndex: position > 0 ? 6 - position : 0,
    }}>
      <div className={styles.Icon} style={{
        backgroundImage: `url(${icon})`,
      }}>
        {text.length > 0 ? <div className={`${styles.IconOverlay} text text_type_main-default`}>{text}</div> : null}
      </div>
    </div>
  );
};


export default IngredientIcon;
