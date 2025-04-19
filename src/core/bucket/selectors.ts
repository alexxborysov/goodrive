import { useSelector } from "react-redux";

export const useBucketsCount = () => {
  return useSelector(
    (state: AppState) => state["bucket-model"].buckets?.length || 0,
  );
};
