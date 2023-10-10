import {
  useAppDispatch,
  useAppSelector,
  useUpdateArchive,
} from 'src/app/hooks';
import SearchKeyword from './SearchKeyword';
import TabSelctor from './TabSlector';
import styles from './tabComponent.module.css';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  createPresentationFilterState,
  createPresentationFilterToggle,
  createPresentationNewTab,
  createPresentationSelectedRows,
} from 'src/presentation/createPresentation';
import { filterToggled } from 'src/features/filterToggle/filterToggleSlice';
import { fetchPosts } from 'src/features/posts/fetchPosts';
import { filterStateChanged } from 'src/features/filterState/filterStateSlice';
import Button from '@mui/material/Button';
import { clearSelectedRows } from 'src/features/rowSelection/rowSlice';
import { selectedPostFiltred } from 'src/features/posts/postsSlice';
import ActionSelector from '../bulk actions/ActionSelector';
export default function TabNav() {
  const dispatch = useAppDispatch();
  const presentationBulk = useAppSelector(createPresentationSelectedRows);
  const { updateArchive } = useUpdateArchive();
  const currentStatus = useAppSelector(createPresentationFilterToggle);
  const presentationState = useAppSelector(createPresentationFilterState);
  const toggle = () => {
    dispatch(filterToggled(!currentStatus.status));
  };
  const presentationTableStatus = useAppSelector(createPresentationNewTab);


  return (
    <div className="tab-nav-container sticky">
      <div className="tab-nav-item">
        <TabSelctor />
        
      </div>
      {presentationBulk.selectedRows.length > 0 ? (
            <ActionSelector/>
        
        ) : (
          ''
        )}
      <div className="tab-nav-item">
        <div className={styles.tab_search_filter_container}>
          <SearchKeyword />
          <div className={styles.icon}>
            <FilterListIcon
              onClick={toggle}
              sx={{
                color: currentStatus.status ? 'blue' : 'gray',
                backgroundColor: presentationState.status ? 'lightgreen' : '',
                borderRadius: '5px',
              }}
            ></FilterListIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
