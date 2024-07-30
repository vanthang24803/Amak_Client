'use client';

import { Suspense } from 'react';

import VerifyAccountHandler from './components/verify-handler';

export default function VerifyAccount() {
  return (
    <Suspense fallback>
      <VerifyAccountHandler />
    </Suspense>
  );
}
