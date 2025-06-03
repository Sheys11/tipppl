import { UserTipSettings } from "~/types/tip";

export const defaultConfig: UserTipSettings = {
  dailyLimit: 1.0,
  actions: {
    like: { enabled: true, amount: 0.001 },
    comment: { enabled: true, amount: 0.002 },
    repost: { enabled: true, amount: 0.002 },
    bookmark: { enabled: false, amount: 0.001 },
    follow: { enabled: true, amount: 0.003 },
  },
};
