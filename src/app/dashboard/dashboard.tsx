import React, { useEffect } from 'react';
import CountBox from './countBox';
import TableArticle from './tableArticle';
import DataChart from './dataChart';
import { useDispatch, useSelector } from 'react-redux';
import { createPresentationDashboardData } from 'src/presentation/createPresentation';
import { fetchDashboard } from 'src/features/dashboard/fetchDashboard';
export default function Dashboard() {
  const presentation = useSelector(createPresentationDashboardData);
  const dashboards = presentation.dashboard;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(fetchDashboard());
  }, []);
  if (dashboards.length == 0) {
    return <div>is loading</div>;
  }
  return (
    <>
      <div className="dashboard-container">
        <h3 className="dashboard-title-big">Dashboard</h3>
        <div className="dashboard-title-medium">Todays article </div>
        <div className="padding_vertical_small"></div>
        <div className="dashboard-news-container">
          <CountBox
            count={dashboards[0].count}
            name={dashboards[0].name}
            color="#F9CFF2"
          ></CountBox>
          <CountBox
            count={dashboards[1].count}
            name={dashboards[1].name}
            color="#DAE0F2"
          ></CountBox>
          <CountBox
            count={dashboards[2].count}
            name={dashboards[2].name}
            color="#EFE9E7"
          ></CountBox>
        </div>
        <div className="padding_vertical_medium"></div>

        <div className="dashboard-title-medium">Top articles </div>
        <div className="padding_vertical_small"></div>
        <div className="table-wrapper">
          <div className="table-container">
            <div className="padding_vertical_small"></div>
            <div className="dashboard-title-small">
              <span style={{ borderBottom: ' 2px solid #F9CFF2' }}>
                Top Google alerts{' '}
              </span>
            </div>
            <div className="padding_vertical_small"></div>
            <TableArticle color="#F9CFF2" name="alerts" />
            <DataChart />
          </div>
          <div className="padding_vertical_small"></div>
          <div className="dashboard-title-small">
            <span style={{ borderBottom: ' 2px solid #DAE0F2' }}>
              Top Google search{' '}
            </span>
          </div>
          <div className="padding_vertical_small"></div>
          <TableArticle color="#DAE0F2" name="gosearts" />
          <DataChart />
          <div className="padding_vertical_small"></div>
          <div className="dashboard-title-small">
            <span style={{ borderBottom: ' 2px solid #EFE9E7' }}>
              Top Bing news{' '}
            </span>{' '}
          </div>
          <div className="padding_vertical_small"></div>
          <TableArticle color="#EFE9E7" name="bing_articles" />
          <DataChart />
        </div>
      </div>
    </>
  );
}
//style={{ backgroundColor: '#DAE0F2' }}             style={{ backgroundColor: '#F9CFF2' }}
