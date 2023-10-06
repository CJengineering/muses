import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import styles from './filterStyle.module.css';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  createPresentationFilterState,
  createPresentationFilterToggle,
  createPresentationNewTab,
  createPresentationSearchAttributes,
} from 'src/presentation/createPresentation';
import { postsFiltred } from 'src/features/posts/postsSlice';
import { filterToggled } from 'src/features/filterToggle/filterToggleSlice';
import { filterStateChanged } from 'src/features/filterState/filterStateSlice';
import { fetchPosts } from 'src/features/posts/fetchPosts';
import { useLocation, useParams } from 'react-router-dom';

export default function FilterConfirmation() {
  const dispatch = useAppDispatch();
  const presentationState = useAppSelector(createPresentationFilterState);
  const presentationFilter = useAppSelector(createPresentationSearchAttributes);
  const presentationToggle = useAppSelector(createPresentationFilterToggle);
  const presentationTable = useAppSelector(createPresentationNewTab);
  const location = useLocation();
  const { id } = useParams();
  const confirmFilter = () => {
    dispatch(postsFiltred(presentationFilter.searchAttributes));
    dispatch(filterToggled(!presentationToggle.status));
    dispatch(filterStateChanged(true));
  };

  const resetFilter = async () => {
    if (location.pathname === `/keywords-beta/${id}`) {
      await dispatch<any>(fetchPosts(presentationTable.status, Number(id)));
      dispatch(filterStateChanged(false));
      dispatch(filterToggled(!presentationToggle.status));
    }
    if (location.pathname === '/content') {
        await dispatch<any>(fetchPosts(presentationTable.status));
      dispatch(filterStateChanged(false));
      dispatch(filterToggled(!presentationToggle.status));
    }
  };

  const closeFilter = () => {
    dispatch(filterToggled(!presentationToggle.status));
  };
  return (
    <div className="filter-confirmation-wrapper">
      <div className={styles.filter_confirmations_buttons_conatainer}>
        <Button
          onClick={resetFilter}
          variant="contained"
          color="error"
          sx={{ marginRight: '1rem' }}
        >
          Reset
        </Button>
        <Button
          onClick={closeFilter}
          variant="contained"
          sx={{ backgroundColor: 'gray', marginRight: '1rem' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'blue' }}
          onClick={confirmFilter}
        >
          <FilterListIcon />
          Filter
        </Button>
      </div>
    </div>
  );
}
