"use client";

import { useEffect, type ReactNode } from "react";
import { useEffectState, useViewer } from "../selectors";
import { Loader } from "~/shared/view/ui/loader";
import { Transition } from "~/shared/view/ui/transition";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AuthorizedView(props: { children: ReactNode }) {
  const router = useRouter();

  const viewer = useViewer();
  const authorizationChecked = useEffectState("whoami").status === "fulfilled";

  useEffect(
    function handleUnauthorized() {
      if (authorizationChecked && !viewer) {
        router.replace("/");
        toast.error("Access denied.");
      }
    },
    [authorizationChecked, viewer, router],
  );

  return (
    <>
      <Transition show={!authorizationChecked}>
        <figure className="fixed top-0 left-0 min-h-dvh h-dvh w-full pt-[400px]">
          <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2" />
        </figure>
      </Transition>
      <Transition show={Boolean(viewer)}>{props.children}</Transition>;
    </>
  );
}
