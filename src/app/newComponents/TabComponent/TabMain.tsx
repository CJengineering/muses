import Filter from '../FilterComponents/Filter';
import TabNav from './TabNav';
import TableNew from './Table';


export function TabMain() {
  return (
    <div className="tab-wrapper">
      <TabNav />
      <Filter/>
      <TableNew/>
    </div>
  );
}

export default TabMain;
