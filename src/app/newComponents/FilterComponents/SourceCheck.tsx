import Checkbox from '@mui/material/Checkbox';
import styles from './filterStyle.module.css';
import { Typography } from '@mui/material';

interface SourceCheckProps {
  url: string;
  title: string;
}

export default function SourceCheck({ url, title }: SourceCheckProps) {
  return (
    <div className={styles.checkbox_actions_container}>
      <div className={styles.checkbox_name_action}>
        <img src={url} alt="" style={{ width: '24px', height: '24px' }} />
        <Typography>{title}</Typography>
      </div>
      <Checkbox />
    </div>
  );
}
