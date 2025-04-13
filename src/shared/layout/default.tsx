"use client";

import Link from "next/link";
import { Transition } from "../view/ui/transition";
import { Button } from "../view/ui/button";
import { GoogleIcon } from "../view/icons/google";
import { ThemeToggle } from "../view/theme/toggle";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "../view/ui/utils";

export function DefaultLayout(props: { children: ReactNode }) {
  const pathname = usePathname();

  const viewerAuthorized = false;
  const authorizationChecked = true;

  return (
    <main className="flex min-h-[100dvh] h-[100dvh] w-full flex-col items-center justify-start overflow-hidden bg-background">
      <header className="fixed left-0 top-0 z-50 w-full overflow-hidden bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-[60px] w-full items-center px-3 lg:px-4">
          <Link
            href="/"
            className="-mt-[1px] mr-auto block font-mono text-base sm:text-lg font-medium md:mr-6 text-primary"
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
            <Link href="/docs">
              <Button variant="link" className="px-2">
                Docs
              </Button>
            </Link>
            {viewerAuthorized ? (
              <Link href="/dashboard">
                <Button variant="secondary">Dashboard</Button>
              </Link>
            ) : (
              <Button variant="secondary">
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
