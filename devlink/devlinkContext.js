import React from 'react';
import { InteractionsProvider } from './interactions';
// @ts-ignore
import { createIX2Engine } from './devlink';
export const DevLinkContext = React.createContext({});
export const DevLinkProvider = ({ children, ...context }) => (
  <DevLinkContext.Provider value={context}>
    <InteractionsProvider createEngine={createIX2Engine}>
      {children}
    </InteractionsProvider>
  </DevLinkContext.Provider>
);
