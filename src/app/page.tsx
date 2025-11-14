
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/projects/dashboard');
  }, [router]);

  return (
    <main className="container mx-auto flex h-screen items-center justify-center p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Redirigiendo al Agent Dashboard...
        </h1>
      </div>
    </main>
  );
}
