import React from 'react';
import KeywordSelector from './KeywordSelecto';
import styles from './filterStyle.module.css';
import { useAppSelector } from 'src/app/hooks';
import { createPresentationSearchAttributes } from 'src/presentation/createPresentation';
import KeywordBox from './KeywordBox';


export default function FilterKeyword() {

  const presentation = useAppSelector(createPresentationSearchAttributes);

  return (
    <div className={styles.keywords_filter_wrapper}>
      <div>Keywords</div>
      <div className={styles.keyword_filter_dropdown_container}>
        <KeywordSelector></KeywordSelector>
        <div className={styles.keywords_selected_container}>
          {presentation.searchAttributes.keywords?.map((keyword) => (
            <KeywordBox key={keyword} keyword={keyword} />
          ))}
        </div>
      </div>
    </div>
  );
}
