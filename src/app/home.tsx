import React from 'react';
import { useAuthentication } from './useAuthetication';

export default function Home() {
  useAuthentication() 
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1>Home </h1>
    </div>
  );
}
