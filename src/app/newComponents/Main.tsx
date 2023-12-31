import { useLocation } from 'react-router-dom';
import FullLatestLIst from './MobileComponents/FullLatestList';
import LatestLIst from './MobileComponents/LatestLIst';
import TabMain from './TabComponent/TabMain';
import MainPageNav from './mainPageNav/mainPageNav';
import styles from 'src/app/app.module.css';

export default function Main() {
  const location = useLocation();
  return (
    <>
      <div className={styles.mobileViewWrapper}>
        <div className={styles.mobilePageWrapper}>
        <div className={styles.divider24}></div>
          <div className={styles.mainTitle}> 
          Content</div>
          <div className={styles.divider24}></div>
          <div className={styles.latestWrapper}>
            <div className={styles.latestContainer}>
              <FullLatestLIst />
            </div>
          </div>
        </div>
      </div>
      <div className="main-page-wrapper ">
        <MainPageNav />
        <TabMain />
      </div>
    </>
  );
}
