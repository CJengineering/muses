import Button from '@mui/material/Button/Button';
import styles from './MainPageNav.module.css';
export function MainPageNav() {
  return (
    <div className="main-page-nav-wrapper ">
      <div className={styles.main_page_nav_container}>
        <div className="main_page_nav_item">
          <h1>Pages </h1>
        </div>
        <div className="main_page_nav_item">
          <div className={styles.nav_item_buttons_container}>
            <Button variant="contained" color="success">
              + article
            </Button>
            <Button variant="contained" sx={{backgroundColor:'blue'}}>
              + keyword
            </Button>
            <div className={styles.nav_icon_user}>ND</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageNav;
