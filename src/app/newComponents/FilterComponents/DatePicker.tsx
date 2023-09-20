import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { createPresentationSearchAttributes } from 'src/presentation/createPresentation';
import { dateEndAttributesSelected, dateStartAttributesSelected } from 'src/features/searchAttributes/searchAttributesSlice';

export default function DatePickerNew() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
 const dispatch =useAppDispatch()
 const presentation= useAppSelector(createPresentationSearchAttributes)
 const handleStartDate = (value: Dayjs | null) => {
    if (value) {
      const dateString = value.format('YYYY-MM-DD'); // Convert to string
      dispatch(dateStartAttributesSelected(dateString));
    }
  }
  
  const handleEndDate = (value: Dayjs | null) => {
    if (value) {
      const dateString = value.format('YYYY-MM-DD'); // Convert to string
      dispatch(dateEndAttributesSelected(dateString));
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <div style={{ marginTop: '1rem' }}>FROM</div>
        <DatePicker
          label="Date"
          value={presentation.searchAttributes.dateStart ? dayjs(presentation.searchAttributes.dateStart) : null}          onChange={handleStartDate}
        />
        <div style={{ marginTop: '1rem' }}>TO</div>
        <DatePicker
          label="Date"
          value={presentation.searchAttributes.dateEnd ? dayjs(presentation.searchAttributes.dateEnd) : null}
          onChange={handleEndDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
