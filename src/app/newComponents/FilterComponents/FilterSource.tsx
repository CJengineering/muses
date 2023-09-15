import Checkbox from '@mui/material/Checkbox'
import React from 'react'
import SourceCheck from './SourceCheck'
import styles from "./filterStyle.module.css"
export default function FilterSource() {
  return (
    <div className={styles.filter_by_container}>

    <div className="filter-by-checkbox-container">
      <div className="checkbox-title">Source</div>
      <SourceCheck url={'google'} title={'Google API'}></SourceCheck>
      <SourceCheck url={'bing'} title={'Bing API'}></SourceCheck>
      <SourceCheck url={'google-alert'} title={'Google Alerts'}></SourceCheck>
      <SourceCheck url={'custom'} title={'Custom Pages'}></SourceCheck>
    </div>
  </div>

  )
}
