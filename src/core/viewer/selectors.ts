import { useSelector } from 'react-redux';

export const useViewer = () => {
  return useSelector((state: AppState) => state['viewer-model'].viewer);
};

export const useEffectState = <
  Effect extends keyof AppState['viewer-model']['effects'],
>(
  effect: Effect
) => {
  return useSelector(
    (state: AppState) => state['viewer-model'].effects[effect]
  );
};
