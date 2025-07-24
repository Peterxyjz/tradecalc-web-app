'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserFormProps {
  onComplete: (name: string, balance: number) => void;
}

export default function UserForm({ onComplete }: UserFormProps) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }
    
    const balanceValue = parseFloat(balance);
    if (isNaN(balanceValue) || balanceValue <= 0) {
      setError('Vui lòng nhập số dư tài khoản hợp lệ');
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
        <CardTitle className="text-xl">Thiết lập tài khoản</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên của bạn</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="balance">Số dư tài khoản (USDT)</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Ví dụ: 1000"
            />
          </div>
          
          {error && (
            <div className="text-sm text-destructive">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full">
            Tiếp tục
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
