import Checkbox from '@mui/material/Checkbox'
import React from 'react'
import SourceCheck from './SourceCheck'
import styles from "./filterStyle.module.css"
export default function FilterSource() {
  return (
    <div className={styles.filter_by_container}>

    <div className="filter-by-checkbox-container">
      <div className="checkbox-title">Source</div>
      <SourceCheck url={'src/assets/ICONS/google_icon.svg'} title={'Google API'}></SourceCheck>
      <SourceCheck url={'src/assets/ICONS/bing_icon.svg'} title={'Bing API'}></SourceCheck>
      <SourceCheck url={'src/assets/ICONS/googleAlerts_icon.svg'} title={'Google Alerts'}></SourceCheck>
      <SourceCheck url={'src/assets/ICONS/heart_icon.svg'} title={'Custom Pages'}></SourceCheck>
    </div>
  </div>

  )
}
