import { useAppSelector } from 'src/app/hooks';
import styles from './filterStyle.module.css';
import RangeSlider from './RangeSlider';
import { createPresentationSearchAttributes } from 'src/presentation/createPresentation';

export default function FilterScore() {
  const presentation = useAppSelector(createPresentationSearchAttributes);
  return (
    <div className={styles.filter_score_wrapper}>
      <div className="filter-score-title">Score</div>
      <div className={styles.filter_score_range_container}>
        <div style={{width:'1rem'}}>{presentation.searchAttributes.score?.[0]}</div>

        <RangeSlider />
        <div style={{width:'1rem'}}>{presentation.searchAttributes.score?.[1]}</div>
      </div>
    </div>
  );
}
