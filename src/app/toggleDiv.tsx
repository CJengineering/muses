import React, { useState } from 'react';
import { Button, Divider } from '@mui/material';

interface ToggleDivProps {
  selectedRow: any;
}

const ToggleDiv: React.FC<ToggleDivProps> = ({ selectedRow }) => {
  const [showDiv, setShowDiv] = useState(false);

  const handleToggle = () => {
    setShowDiv(!showDiv);
  };

  return (
    <div>
      <Button onClick={handleToggle} variant="outlined" color="primary">
        Toggle Div
      </Button>
      {showDiv && (
        <>
          <Divider />
          <div>
            Selected Row: {selectedRow} {/* Display the selected row information */}
          </div>
          <Divider />
        </>
      )}
    </div>
  );
};

export default ToggleDiv;
