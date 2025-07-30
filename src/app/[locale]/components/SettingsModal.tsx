"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';

interface SettingsModalProps {
  open: boolean;
  balance: number;
  settings: {
    defaultRiskPercentage: number;
    defaultLeverage: number;
    defaultStopLossPercentage: number;
  };
  onClose: () => void;
  onSave: (settings: {
    defaultRiskPercentage: number;
    defaultLeverage: number;
    defaultStopLossPercentage: number;
  }) => void;
  onUpdateBalance: (newBalance: number) => void;
}

export default function SettingsModal({
  open,
  balance,
  settings,
  onClose,
  onSave,
  onUpdateBalance,
}: SettingsModalProps) {
  const t = useTranslations('settings');
  
  const [riskPercentage, setRiskPercentage] = useState(
    settings.defaultRiskPercentage.toString()
  );
  const [leverage, setLeverage] = useState(settings.defaultLeverage.toString());
  const [stopLossPercentage, setStopLossPercentage] = useState(
    settings.defaultStopLossPercentage.toString()
  );
  const [newBalance, setNewBalance] = useState(balance.toString());
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const riskValue = parseFloat(riskPercentage);
    const leverageValue = parseFloat(leverage);
    const slValue = parseFloat(stopLossPercentage);
    const balanceValue = parseFloat(newBalance);

    if (isNaN(riskValue) || riskValue <= 0) {
      setError(t('validation.riskPositive'));
      return;
    }

    if (isNaN(leverageValue) || leverageValue < 1) {
      setError(t('validation.leverageMin'));
      return;
    }

    if (isNaN(slValue) || slValue <= 0) {
      setError(t('validation.stopLossPositive'));
      return;
    }

    if (isNaN(balanceValue) || balanceValue <= 0) {
      setError(t('validation.balancePositive'));
      return;
    }

    // Update balance in localStorage if changed
    if (balanceValue !== balance) {
      const userData = JSON.parse(
        localStorage.getItem("tradingAppUser") || "{}"
      );
      userData.balance = balanceValue;
      localStorage.setItem("tradingAppUser", JSON.stringify(userData));
      onUpdateBalance(balanceValue);
    }

    onSave({
      defaultRiskPercentage: riskValue,
      defaultLeverage: leverageValue,
      defaultStopLossPercentage: slValue,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="settingsBalance">{t('balance')}</Label>
            <Input
              id="settingsBalance"
              type="number"
              step="0.01"
              min="0"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultRiskPercentage">{t('defaultRisk')}</Label>
            <Input
              id="defaultRiskPercentage"
              type="number"
              step="0.1"
              min="0.1"
              value={riskPercentage}
              onChange={(e) => setRiskPercentage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultLeverage">{t('defaultLeverage')}</Label>
            <Input
              id="defaultLeverage"
              type="number"
              step="0.1"
              min="1"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultStopLossPercentage">{t('defaultStopLoss')}</Label>
            <Input
              id="defaultStopLossPercentage"
              type="number"
              step="0.1"
              min="0.1"
              value={stopLossPercentage}
              onChange={(e) => setStopLossPercentage(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive">
              {error}
            </div>
          )}

          <DialogFooter className="flex-col space-y-2 sm:flex-col sm:space-y-2 sm:space-x-0">
            <div className="flex gap-2 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                className="flex-1"
              >
                {t('save')}
              </Button>
            </div>
            
            <div className="w-full pt-2 border-t">
              <Button
                type="button"
                variant="destructive"
                onClick={handleLogout}
                className="w-full"
              >
                {t('logout')}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
