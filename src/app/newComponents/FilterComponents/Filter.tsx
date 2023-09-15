import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react';
import FilterSource from './FilterSource';
import SourceCheck from './SourceCheck';
import KeywordSelector from './KeywordSelecto';
import FilterKeyword from './FilterKeyword';
import FilterDate from './FilterDate';
import RangeSlider from './RangeSlider';
import FilterScore from './FilterScore';
import { Button, Fade } from '@mui/material';
import FilterConfirmation from './FilterConfirmation';
import styles from './filterStyle.module.css';
import { createPresentationFilterToggle } from 'src/presentation/createPresentation';
import { useAppSelector } from 'src/app/hooks';

export default function Filter() {

  const presentationToggle= useAppSelector(createPresentationFilterToggle)

  return (
    <>

  <Fade in={presentationToggle.status} style={{ display: presentationToggle.status? 'block' : 'none' }}>

    <div className={styles.filter_wrapper}>
      <div className={styles.filter_title}>Filter By </div>
      <FilterSource></FilterSource>
      <FilterKeyword />
      <FilterDate />
      <FilterScore />
      <FilterConfirmation />
    </div>
  </Fade>
    </>
  );
}
