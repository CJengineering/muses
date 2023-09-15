import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import SearchKeyword from './SearchKeyword';
import TabSelctor from './TabSlector';
import styles from './tabComponent.module.css';
import FilterListIcon from '@mui/icons-material/FilterList';
import { createPresentationFilterToggle } from 'src/presentation/createPresentation';
import { filterToggled } from 'src/features/filterToggle/filterToggleSlice';
export default function TabNav() {
   
    const dispatch = useAppDispatch()
    const currentStatus= useAppSelector(createPresentationFilterToggle)
    const toggle = ()=>{
        dispatch(filterToggled(!currentStatus.status));
    
      }
  return (
    <div className="tab-nav-container ">
      <div className="tab-nav-item">
        <TabSelctor />
      </div>
      <div className="tab-nav-item">
        <div className={styles.tab_search_filter_container}>
          <SearchKeyword />
          <div className={styles.icon}>

            <FilterListIcon onClick={toggle} sx={{color: currentStatus.status ? 'blue' : 'gray' }}></FilterListIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
