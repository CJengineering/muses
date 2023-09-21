import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import SourceCheck from './SourceCheck';
import styles from './filterStyle.module.css';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { sourceAttributedToggled } from 'src/features/searchAttributes/searchAttributesSlice';
import { IconType } from 'src/app/interfaces';
import { createPresentationSearchAttributes } from 'src/presentation/createPresentation';

export default function FilterSource() {
  const dispatch = useAppDispatch();
  const presentationTest = useAppSelector(createPresentationSearchAttributes);
  const [selectedUrls, setSelectedUrls] = useState<IconType[]>(['bing','custom','google','google_alert']);

  useEffect(() => {
    dispatch(sourceAttributedToggled(selectedUrls));
  }, [selectedUrls, presentationTest.searchAttributes.source]);
  const handleCheckboxChange = (url: IconType) => {
    setSelectedUrls((prevSelectedUrls) => {
      const updatedSelectedUrls = prevSelectedUrls.includes(url)
        ? prevSelectedUrls.filter((selectedUrl) => selectedUrl !== url)
        : [...prevSelectedUrls, url];

      return updatedSelectedUrls;
    });
  };

  return (
    <div className={styles.filter_by_container}>
      <div className="filter-by-checkbox-container">
        <div className="checkbox-title">Source</div>
        <SourceCheck
          url={'google'}
          title={'Google API'}
          onChange={() => handleCheckboxChange('google')}
          checked={selectedUrls.includes('google')}
        ></SourceCheck>
        <SourceCheck
          url={'bing'}
          title={'Bing API'}
          onChange={() => handleCheckboxChange('bing')}
          checked={selectedUrls.includes('bing')}
        ></SourceCheck>
        <SourceCheck
          url={'google_alert'}
          title={'Google Alerts'}
          onChange={() => handleCheckboxChange('google_alert')}
          checked={selectedUrls.includes('google_alert')}
        ></SourceCheck>
        <SourceCheck
          url={'custom'}
          title={'Custom Pages'}
          onChange={() => handleCheckboxChange('custom')}
          checked={selectedUrls.includes('custom')}
        ></SourceCheck>
      </div>
    </div>
  );
}
