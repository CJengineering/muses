import React from 'react';
import KeywordSelector from './KeywordSelecto';
import styles from './filterStyle.module.css';
export default function FilterKeyword() {
  return (
    <div className={styles.keywords_filter_wrapper}>
      <div>Keywords</div>
      <div className={styles.keyword_filter_dropdown_container}>
        <KeywordSelector></KeywordSelector>
        <div className={styles.keywords_selected_container}>
          <div className={styles.keywords_selected}>
            <div className="keyword-selected">Regina Barzilya</div>
            <span className="close_x">X</span>
          </div>
          <div className={styles.keywords_selected}>
            <div className="keyword-selected">Dina Katabi</div>
            <span className="close_x">X</span>
          </div>
        </div>
      </div>
    </div>
  );
}
