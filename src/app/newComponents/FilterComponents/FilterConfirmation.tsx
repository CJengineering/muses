import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import styles from './filterStyle.module.css'

export default function FilterConfirmation() {
  return (
    <div className="filter-confirmation-wrapper">
      <div className={styles.filter_confirmations_buttons_conatainer}>
        <Button variant='contained' sx={{backgroundColor:'gray', marginRight:"1rem"}}>Cancel</Button>
         <Button variant='contained'sx={{backgroundColor:'blue'}}>  <FilterListIcon/>Filter</Button>
      </div>
    </div>
  );
}
