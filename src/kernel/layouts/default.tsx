'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoogleIcon } from '~/shared/view/icons/google';
import { ThemeToggle } from '~/shared/view/theme/toggle';
import { Button } from '~/shared/view/ui/button';
import { Transition } from '~/shared/view/ui/transition';
import { cn } from '~/shared/view/ui/utils';
import { useEffectState, useViewer } from '~/core/auth/selectors';
import { useAppDispatch } from '../store/mod';
import { openSignInEffect } from '~/core/auth/effects/open-sign-in';
import { useRouter } from 'next/navigation';

export function DefaultLayout(props: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const viewerAuthorized = useViewer();
  const authorizationChecked = useEffectState('whoami').status === 'fulfilled';

  function signIn() {
    dispatch(openSignInEffect());
  }

  function openDashboard() {
    router.push('/dashboard');
  }

  return (
    <main className="bg-background flex min-h-[100dvh] w-full flex-col items-center justify-start overflow-hidden">
      <header className="bg-background/70 fixed top-0 left-0 z-50 w-full overflow-hidden backdrop-blur">
        <div className="mx-auto flex h-[60px] w-full items-center px-3 lg:px-4">
          <Link
            href="/"
            tabIndex={-1}
            className="text-primary -mt-[1px] mr-auto block rounded-lg font-mono text-lg font-medium sm:text-xl md:mr-6"
          >
            goodrive
          </Link>

          <Transition
            show={authorizationChecked}
            className={cn(
              'ml-auto flex items-center justify-center space-x-3 transition-transform duration-200 ease-in-out',
              pathname.includes('dashboard') && 'lg:translate-x-2'
            )}
          >
            <Link href="/docs" tabIndex={-1}>
              <Button variant="link" className="px-2">
                Docs
              </Button>
            </Link>
            {viewerAuthorized ? (
              <Link href="/dashboard" onClick={openDashboard}>
                <Button variant="secondary">Dashboard</Button>
              </Link>
            ) : (
              <Button variant="secondary" onClick={signIn}>
                <GoogleIcon />
                Connect
              </Button>
            )}
            <ThemeToggle />
          </Transition>
        </div>
      </header>

      <section className="h-full w-full">{props.children}</section>
    </main>
  );
}
