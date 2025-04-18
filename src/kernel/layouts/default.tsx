"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoogleIcon } from "~/shared/view/icons/google";
import { ThemeToggle } from "~/shared/view/theme/toggle";
import { Button } from "~/shared/view/ui/button";
import { Transition } from "~/shared/view/ui/transition";
import { cn } from "~/shared/view/ui/utils";
import { useEffectState, useViewer } from "~/core/auth/selectors";
import type { ReactNode } from "react";
import { useAppDispatch } from "../store/mod";
import { openSignInEffect } from "~/core/auth/effects/open-sign-in";
import { useRouter } from "next/navigation";

export function DefaultLayout(props: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const viewerAuthorized = useViewer();
  const authorizationChecked = useEffectState("whoami").status === "fulfilled";

  function signIn() {
    dispatch(openSignInEffect());
  }

  function openDashboard() {
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-[100dvh] h-[100dvh] w-full flex-col items-center justify-start overflow-hidden bg-background">
      <header className="fixed left-0 top-0 z-50 w-full overflow-hidden bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-[60px] w-full items-center px-3 lg:px-4">
          <Link
            href="/"
            tabIndex={-1}
            className="-mt-[1px] rounded-lg mr-auto block font-mono text-base sm:text-xl font-medium md:mr-6 text-primary"
          >
            goodrive
          </Link>

          <Transition
            show={authorizationChecked}
            className={cn(
              "ml-auto flex items-center justify-center space-x-3 transition-transform duration-200 ease-in-out",
              pathname.includes("dashboard") && "lg:translate-x-2",
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

      <section className="w-full">{props.children}</section>
    </main>
  );
}
