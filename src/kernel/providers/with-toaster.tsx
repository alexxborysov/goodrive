"use client";

import type { ReactNode } from "react";
import { Toaster } from "~/shared/view/ui/sonner";

export function WithToaster(props: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      {props.children}
    </>
  );
}
