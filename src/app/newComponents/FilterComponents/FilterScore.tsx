import styles from './filterStyle.module.css'
import RangeSlider from './RangeSlider'

export default function FilterScore() {
  return (
    <div className={styles.filter_score_wrapper}>
    <div className="filter-score-title">Score</div>
    <div className={styles.filter_score_range_container}>
      <div>26</div>
      <RangeSlider />
      <div>45</div>
    </div>
  </div>
  )
}
