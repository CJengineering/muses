import React from 'react';
import { useAuthentication } from './useAuthetication';
import { useGetSimpleTestQuery } from 'src/features/api/apiSlice';

export default function Home() {
  useAuthentication() 
  const {data, isFetching} =  useGetSimpleTestQuery('') 
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>Home hello </h1>
      <h1>{data ? data.message : 'undefined'}</h1>
      <p>Still under construction !</p>
      <p>For now only Alerts are working next update in few hours ...</p>
    </div>
  );
}
