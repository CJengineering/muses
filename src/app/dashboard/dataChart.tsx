import { PieChart } from '@mui/x-charts/PieChart/PieChart';
import * as React from 'react';

const data = [
    { value: 10, label: 'Published' },
    { value: 15, label: 'Archived' },
    { value: 20, label: 'Pending' },
  ];
  
  const size = {
    width: 600,
    height: 300,
  };
  
export default function DataChart() {
  return (
    <>
      <div className="chart-container">
     <div className="chart-total">
        <div className="chart-name">
          Google alert total
        </div>
        <div className="padding_vertical_small"></div>
        <div className="count">25000</div>
     </div>
     <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} `,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      

      {...size}
    />
      </div>
    </>
  );
}
