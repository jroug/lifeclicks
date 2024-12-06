'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Updated prefix to reflect a broader scope
const SiteDataContext = createContext<any>(null);

export const SiteDataProvider = ({ data, children }: { data: any; children: ReactNode }) => {
  return (
    <SiteDataContext.Provider value={data}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};