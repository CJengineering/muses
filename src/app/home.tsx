import React from 'react';
import { useAuthentication } from './useAuthetication';

export default function Home() {
  useAuthentication() 
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>Home hello </h1>

      <p>Still under construction !</p>
      <p>For now only Alerts are working next update in few hours ...</p>
    </div>
  );
}
