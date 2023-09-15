import styles from './hello-button.module.css';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
/* eslint-disable-next-line */
export interface HelloButtonProps {}

export function HelloButton(props: HelloButtonProps) {
  return (
    <div className={styles.backgroundtest}>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default HelloButton;
