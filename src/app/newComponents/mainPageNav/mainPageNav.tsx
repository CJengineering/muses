import Button from '@mui/material/Button/Button';
import styles from './MainPageNav.module.css';
import { useAppSelector } from 'src/app/hooks';
import { createPresentationSearchAttributes } from 'src/presentation/createPresentation';
import KeywordModal from '../modals/KeywordModal';
import CustomArticle from '../modals/CustomArticle';
export function MainPageNav() {
  const presentationFilter = useAppSelector(createPresentationSearchAttributes);

  return (
    <div className="main-page-nav-wrapper ">
      <div className={styles.main_page_nav_container} >
        <h1>Content </h1>

        <div className="main_page_nav_item">
          <div className={styles.nav_item_buttons_container}>
            {/* <Button variant="contained" color="success">
              + article
            </Button>
            <Button variant="contained" sx={{backgroundColor:'blue'}}>
              + keyword
            </Button> */}
            <CustomArticle />
            <KeywordModal />
            <div className={styles.nav_icon_user}>ND</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageNav;
