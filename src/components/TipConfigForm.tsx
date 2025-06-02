"use client";

import { useEffect, useState } from "react";
import { defaultConfig } from "@/lib/config";
import { TipAction, TipConfig, UserTipSettings } from "@/types/tip";

const actionLabels: Record<TipAction, string> = {
  like: "Like",
  comment: "Comment",
  repost: "Repost",
  bookmark: "Bookmark",
  follow: "Follow",
};

export function TipConfigForm() {
  const [config, setConfig] = useState<UserTipSettings>(defaultConfig);

  useEffect(() => {
    fetch("/api/load-config")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => console.warn("Using default config"));
  }, []);

  const handleToggle = (action: TipAction) => {
    setConfig((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        [action]: {
          ...prev.actions[action],
          enabled: !prev.actions[action].enabled,
        },
      },
    }));
  };

  const handleAmountChange = (action: TipAction, amount: number) => {
    setConfig((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        [action]: {
          ...prev.actions[action],
          amount,
        },
      },
    }));
  };

  const handleDailyLimitChange = (limit: number) => {
    setConfig((prev) => ({
      ...prev,
      dailyLimit: limit,
    }));
  };

  const handleSave = async () => {
    await fetch("/api/save-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    alert("Config saved.");
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Tip Configuration</h2>

      <div>
        <label className="block text-sm font-medium mb-1">
          Daily Spend Limit (USDC)
        </label>
        <input
          type="number"
          value={config.dailyLimit}
          onChange={(e) =>
            handleDailyLimitChange(parseFloat(e.target.value || "0"))
          }
          className="w-full border rounded p-2"
        />
      </div>

      {Object.entries(config.actions).map(([key, val]) => {
        const action = key as TipAction;
        return (
          <div key={action} className="flex items-center justify-between border-t pt-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={val.enabled}
                onChange={() => handleToggle(action)}
              />
              {actionLabels[action]}
            </label>
            <input
              type="number"
              className="w-24 p-1 border rounded"
              value={val.amount}
              min={0}
              step={0.001}
              disabled={!val.enabled}
              onChange={(e) =>
                handleAmountChange(action, parseFloat(e.target.value || "0"))
              }
            />
          </div>
        );
      })}

      <button
        onClick={handleSave}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Save Configuration
      </button>
    </div>
  );
}
