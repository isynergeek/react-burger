import styles from './IngredientIconRow.module.css';
import IngredientIcon from '../ingredient-icon/IngredientIcon';

interface IIngredientIconRowProps {
  icons: string[];
}

const IngredientIconRow = (props: IIngredientIconRowProps) => {
  const { icons } = props;
  const maxToShow = 5;
  const iconsToShow = icons.slice(0, maxToShow);
  const restIconsCount = icons.length - 5;
  return (
    <div className={styles.Root}>
      {iconsToShow.map((icon, key) => {
        return <IngredientIcon icon={icon} key={key} position={key + 1}/>;
      })}
      {restIconsCount > 0 ?
        <IngredientIcon icon={icons[maxToShow]} text={`+${restIconsCount}`}/> : null}
    </div>
  );
};

export default IngredientIconRow;
