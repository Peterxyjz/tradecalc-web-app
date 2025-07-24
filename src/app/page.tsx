"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import UserForm from "./components/UserForm";
import Calculator from "./components/Calculator";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(0);
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem("tradingAppUser");
    if (userData) {
      const { name, balance } = JSON.parse(userData);
      setUserName(name);
      setBalance(balance);
      setIsSetup(true);
    }
  }, []);

  const handleUserSetup = (name: string, initialBalance: number) => {
    setUserName(name);
    setBalance(initialBalance);
    setIsSetup(true);
  };

  const handleUpdateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with dark mode toggle */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-md">
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">TradeCalc</h1>
            <p className="text-sm text-muted-foreground">Máy Tính Giá Vào Lệnh Thông Minh</p>
          </div>
          <ModeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 max-w-md">
        {!isSetup ? (
          <UserForm onComplete={handleUserSetup} />
        ) : (
          <Calculator
            userName={userName}
            balance={balance}
            onUpdateBalance={handleUpdateBalance}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8">
        <div className="container mx-auto px-4 py-6 max-w-md">
          <div className="text-center space-y-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/guide" className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Hướng dẫn sử dụng
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Copyright © 2025 Peterxyjz - Lê Quang Huy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
