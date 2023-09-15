import Checkbox from '@mui/material/Checkbox';
import styles from './filterStyle.module.css';
import { Typography } from '@mui/material';
import BingIcon from '../Icons/BingIcon';
import GoogleIcon from '../Icons/GoogleIcon';
import BellIcon from '../Icons/BellIcon';
import HeartIcon from '../Icons/HeartIcon';
type IconType = "bing" | "google" | "google-alert" | "custom";
type SourceCheckProps = {
    url: IconType;
    title: string;
  };

export default function SourceCheck({ url, title }: SourceCheckProps) {
    const typeIcon: Record<IconType, JSX.Element> = {
        "bing": <BingIcon/>,
        "google": <GoogleIcon/>,
        "google-alert": <BellIcon/>,
        "custom": <HeartIcon/>
      };
  return (
    <div className={styles.checkbox_actions_container}>
      <div className={styles.checkbox_name_action}>
        {typeIcon[url]}
        <Typography>{title}</Typography>
      </div>
      <Checkbox />
    </div>
  );
}
