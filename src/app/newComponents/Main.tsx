import TabMain from './TabComponent/TabMain';
import MainPageNav from './mainPageNav/mainPageNav';

export default function Main() {
  return (
    <>
 
        <div className="main-page-wrapper ">
          <MainPageNav />
          <TabMain />
        </div>
   
    </>
  );
}
