import { dispatch } from "~/kernel/store/mod";
import { whoamiEffect } from "./effects/whoami";

export function init() {
  dispatch(whoamiEffect());
}
