export type TipAction = 'like' | 'comment' | 'repost' | 'bookmark' | 'follow';

export interface TipConfig {
  enabled: boolean;
  amount: number;
}

export interface UserTipSettings {
  dailyLimit: number;
  actions: Record<TipAction, TipConfig>;
}
