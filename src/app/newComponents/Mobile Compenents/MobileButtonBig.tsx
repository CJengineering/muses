import AddItemIcon from '../Icons/AddItemIcon';
import styles from './mobileComponent.module.css';
interface MobileButtonBigProps {
  onClick: () => void;
  iconComponent: React.ElementType;
  text: string;
  color: string;
}

export default function MobileButtonBig({
  onClick,
  iconComponent: IconComponent,
  text,
  color,
}: MobileButtonBigProps) {
  return (
    <div
      className={styles.buttonContainerBig}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {IconComponent && <IconComponent />}

      <div className={styles.text}>{text}</div>
    </div>
  );
}
