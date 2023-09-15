import styles from "./filterStyle.module.css"
import DatePickerNew from './DatePicker'

export default function FilterDate() {
  return (
    <div className={styles.filter_date_wrapper}>
        <div className="filter-date-title">Date</div>
        <div className="filter-date-picker-container">
       
          <DatePickerNew/>
        </div>
      </div>
  )
}
