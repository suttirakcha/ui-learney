'use client';

import ErrorComp from '@/components/custom/ErrorComp';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <ErrorComp onReset={reset} />;
}
