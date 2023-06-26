import React, { useState, ChangeEvent } from 'react';
import { Tab, Tabs, Typography } from '@mui/material';
import StickyHeadTable from './stickyheadtable';
interface statusProps {
  status: string | null;
}
export const TestTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (
    event: ChangeEvent<{}>,
    newValue: React.SetStateAction<number>
  ) => {
    setValue(newValue);
  };

  

  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Pending" />
        <Tab label="Published" />
        <Tab label="Archived" />
      </Tabs>
      <Typography>
        {value === 0 && <StickyHeadTable status="pending" />}
        {value === 1 && <StickyHeadTable status="published" />}
        {value === 2 && <StickyHeadTable status="archived" />}
      </Typography>
    </div>
  );
};
