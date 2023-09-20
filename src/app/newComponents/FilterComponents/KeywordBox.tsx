import { useAppDispatch } from 'src/app/hooks';
import styles from './filterStyle.module.css';
import { keywordRemoved } from 'src/features/searchAttributes/searchAttributesSlice';
export interface KeywordBoxProps {
    keyword:string;
}
export default function KeywordBox({keyword}: KeywordBoxProps) {
    const dispatch = useAppDispatch()
    const handleRemoveKeyword = () => {
        dispatch(keywordRemoved(keyword))
      };
  return (
    <div className={styles.keywords_selected}>
      <div className={styles.keyword_selected}>{keyword}</div>
      <span className={styles.closeX} onClick={handleRemoveKeyword}>X</span>
    </div>
  );
}
