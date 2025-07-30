'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

interface UserFormProps {
  onComplete: (name: string, balance: number) => void;
}

export default function UserForm({ onComplete }: UserFormProps) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const t = useTranslations('userForm');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError(t('validation.nameRequired'));
      return;
    }
    
    const balanceValue = parseFloat(balance);
    if (isNaN(balanceValue) || balanceValue <= 0) {
      setError(t('validation.balanceRequired'));
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('tradingAppUser', JSON.stringify({
      name: name.trim(),
      balance: balanceValue
    }));
    
    onComplete(name.trim(), balanceValue);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('nameLabel')}</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="balance">{t('balanceLabel')}</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder={t('balancePlaceholder')}
            />
          </div>
          
          {error && (
            <div className="text-sm text-destructive">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full">
            {t('submitButton')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
