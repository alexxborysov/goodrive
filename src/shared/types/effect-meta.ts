export type EffectStatus = "idle" | "pending" | "fulfilled" | "rejected";

export type EffectMeta = {
  status: EffectStatus;
};

export const EFFECT_META_INITIAL = {
  status: "idle" as EffectStatus,
};
