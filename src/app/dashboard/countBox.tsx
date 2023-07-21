import React from 'react';
type CountBoxProps ={
    color: string;
    name: string;
    count: number;
}
export default function CountBox(props:CountBoxProps) {
  return (
    <>
      
      <div
        className="article-count-container"
        style={{ backgroundColor: props.color }}
      >
        <div className="dashboard-title-small">{props.name}</div>
        <div className="padding_vertical_tiny"></div>
        <div className="count">{props.count}</div>
      </div>
    </>
  );
}
