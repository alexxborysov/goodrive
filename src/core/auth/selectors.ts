import { useSelector } from "react-redux";

export const useViewer = () => {
  return useSelector((state: AppState) => state["auth-model"].viewer);
};

export const useEffectState = <
  Effect extends keyof AppState["auth-model"]["effects"],
>(
  effect: Effect,
) => {
  return useSelector((state: AppState) => state["auth-model"].effects[effect]);
};
