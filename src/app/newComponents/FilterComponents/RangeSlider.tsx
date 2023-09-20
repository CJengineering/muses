import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { scoreAttributesSelected } from 'src/features/searchAttributes/searchAttributesSlice';
import { createPresentationSearchAttributes } from 'src/presentation/createPresentation';

function valuetext(value: number) {
  return `${value}`;
}

export default function RangeSlider() {
  
  const dispatch = useAppDispatch()
  const presentation = useAppSelector(createPresentationSearchAttributes)
  const handleChange = (event: Event, newValue: number | number[]) => {
    
    dispatch(scoreAttributesSelected(newValue as [number, number]))
  };

  return (
    <Box sx={{ width: 150 }}>
      <Slider
        getAriaLabel={() => 'Score'}
        value={presentation.searchAttributes.score || [0, 100]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    
      <div></div>
    </Box>
  );
}
