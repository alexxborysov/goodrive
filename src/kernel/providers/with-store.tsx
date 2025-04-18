"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/mod";

export function WithStore(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
