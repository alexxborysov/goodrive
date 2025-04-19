import { useEffect, useState, type ReactNode } from "react";
import { useAppDispatch } from "~/kernel/store/mod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/shared/view/ui/alert-dialog";
import { logoutEffect } from "../effects/logout";
import { delay } from "~/shared/lib/delay";
import { useRouter } from "next/navigation";

export function LogoutModal(props: { triggerSlot: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  async function logout() {
    close();
    await delay();
    router.replace("/");
    await delay();
    dispatch(logoutEffect());
  }

  useEffect(() => {
    if (!isOpen) return;
    function handleEnterPressed(event: KeyboardEvent) {
      if (event.key === "Enter") logout();
    }
    window.addEventListener("keydown", handleEnterPressed);
    return () => window.removeEventListener("keydown", handleEnterPressed);
  }, [isOpen]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild onClick={open}>
        {/* TODO: upgrade radix-ui.. */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {props.triggerSlot as any}
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={close}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You{"'"}re about to log out from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
