"use client";

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsModal from "./SettingsModal";

interface CalculatorProps {
  userName: string;
  balance: number;
  onUpdateBalance: (newBalance: number) => void;
}

interface Settings {
  defaultRiskPercentage: number;
  defaultLeverage: number;
  defaultStopLossPercentage: number;
}

export default function Calculator({
  userName,
  balance,
  onUpdateBalance,
}: CalculatorProps) {
  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    defaultRiskPercentage: 5,
    defaultLeverage: 100,
    defaultStopLossPercentage: 1,
  });

  // Form values
  const [riskPercentage, setRiskPercentage] = useState(
    settings.defaultRiskPercentage.toString()
  );
  const [leverage, setLeverage] = useState(settings.defaultLeverage.toString());
  const [stopLossPercentage, setStopLossPercentage] = useState(
    settings.defaultStopLossPercentage.toString()
  );

  // Advanced mode for calculating SL%
  const [entryPriceInput, setEntryPriceInput] = useState("");
  const [stopLossPriceInput, setStopLossPriceInput] = useState("");

  // Result
  const [entryPrice, setEntryPrice] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  // Position reduction
  const [showPositionOptions, setShowPositionOptions] = useState(false);
  const [customRiskReduction, setCustomRiskReduction] = useState("");
  const [reducedEntryPrice, setReducedEntryPrice] = useState<number | null>(
    null
  );
  const [reductionType, setReductionType] = useState<"0.5R" | "custom">("0.5R");

  // Function to calculate SL% from entry and SL prices
  const calculateSLPercentage = () => {
    const entry = parseFloat(entryPriceInput);
    const sl = parseFloat(stopLossPriceInput);

    if (!isNaN(entry) && !isNaN(sl) && entry > 0 && sl > 0 && entry !== sl) {
      const slPercentage = Math.abs(((entry - sl) / entry) * 100);
      setStopLossPercentage(slPercentage.toFixed(2));
    } else {
      setError("Vui lòng nhập giá Entry và SL hợp lệ");
    }
  };

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("tradingAppSettings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);

      // Set initial form values from saved settings
      setRiskPercentage(parsedSettings.defaultRiskPercentage.toString());
      setLeverage(parsedSettings.defaultLeverage.toString());
      setStopLossPercentage(
        parsedSettings.defaultStopLossPercentage.toString()
      );
    }
  }, []);

  // Calculate entry price
  const calculateEntryPrice = () => {
    const riskAmount = (parseFloat(riskPercentage) / 100) * balance;
    const leverageValue = parseFloat(leverage);
    const slPercentage = parseFloat(stopLossPercentage) / 100;

    if (
      isNaN(riskAmount) ||
      isNaN(leverageValue) ||
      isNaN(slPercentage) ||
      slPercentage === 0
    ) {
      return null;
    }

    // Formula: R / Leverage / SL
    const entry = riskAmount / leverageValue / slPercentage;
    return entry;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!riskPercentage.trim()) {
      setError("Vui lòng nhập mức rủi ro");
      return;
    }

    if (!leverage.trim()) {
      setError("Vui lòng nhập đòn bẩy");
      return;
    }

    if (!stopLossPercentage.trim()) {
      setError("Vui lòng nhập SL");
      return;
    }

    const rValue = parseFloat(riskPercentage);
    const lValue = parseFloat(leverage);
    const slValue = parseFloat(stopLossPercentage);

    if (isNaN(rValue) || rValue <= 0) {
      setError("Mức rủi ro phải là số dương");
      return;
    }

    if (isNaN(lValue) || lValue <= 0) {
      setError("Đòn bẩy phải là số dương");
      return;
    }

    if (isNaN(slValue) || slValue <= 0) {
      setError("SL phải là số dương");
      return;
    }

    const calculatedEntry = calculateEntryPrice();
    setEntryPrice(calculatedEntry);
    setShowPositionOptions(true);
    setReducedEntryPrice(null);
  };

  // Calculate reduced position entry price
  const calculateReducedPosition = (
    type: "0.5R" | "custom",
    customValue?: number
  ) => {
    if (!entryPrice) return;

    let reductionFactor: number;

    if (type === "0.5R") {
      reductionFactor = 0.5;
    } else {
      const value = customValue || parseFloat(customRiskReduction);
      if (isNaN(value) || value <= 0 || value >= 100) {
        setError("Vui lòng nhập tỷ lệ giảm hợp lệ (0-100%)");
        return;
      }
      reductionFactor = value / 100;
    }

    // Calculate new entry price with reduced risk
    const reducedEntry = entryPrice * reductionFactor;
    setReducedEntryPrice(reducedEntry);
    setError("");
  };

  // Get the display entry price (original or reduced)
  const getDisplayEntryPrice = () => {
    return reducedEntryPrice !== null ? reducedEntryPrice : entryPrice;
  };

  // Get the reduction info text
  const getReductionInfo = () => {
    if (reducedEntryPrice === null) return null;
    const percentage =
      reductionType === "0.5R" ? "50%" : `${customRiskReduction}%`;
    return `Giảm ${percentage} so với position gốc`;
  };

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem("tradingAppSettings", JSON.stringify(newSettings));
    setShowSettings(false);

    // Apply new settings to current form if user wants
    setRiskPercentage(newSettings.defaultRiskPercentage.toString());
    setLeverage(newSettings.defaultLeverage.toString());
    setStopLossPercentage(newSettings.defaultStopLossPercentage.toString());
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 z-10"
        onClick={() => setShowSettings(true)}
        aria-label="Mở cài đặt"
      >
        <Settings className="h-4 w-4" />
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start pr-12">
            <CardTitle className="text-xl">TradeCalc</CardTitle>
            <div className="text-right text-sm">
              <div className="font-medium">
                Xin chào, <strong>{userName}</strong>
              </div>
              <div className="text-muted-foreground">
                Số dư:{" "}
                <span className="text-primary font-semibold">
                  {balance.toFixed(2)} USDT
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="riskPercentage">Mức rủi ro (%)</Label>
              <Input
                id="riskPercentage"
                type="number"
                step="0.1"
                min="0.1"
                value={riskPercentage}
                onChange={(e) => setRiskPercentage(e.target.value)}
                placeholder="Ví dụ: 2"
              />
              {parseFloat(riskPercentage) > 0 && (
                <div className="text-sm text-muted-foreground">
                  ={" "}
                  <span className="font-semibold text-primary">
                    {((parseFloat(riskPercentage) / 100) * balance).toFixed(2)}{" "}
                    USDT
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="leverage">Đòn bẩy (x)</Label>
              <Input
                id="leverage"
                type="number"
                step="0.1"
                min="1"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
                placeholder="Ví dụ: 10"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="stopLossPercentage">SL (%)</Label>
              </div>

              <Tabs defaultValue="simple" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="simple">Đơn giản</TabsTrigger>
                  <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
                </TabsList>
                
                <TabsContent value="simple" className="mt-2">
                  <Input
                    id="stopLossPercentage"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={stopLossPercentage}
                    onChange={(e) => setStopLossPercentage(e.target.value)}
                    placeholder="Ví dụ: 2"
                  />
                </TabsContent>
                
                <TabsContent value="advanced" className="mt-2">
                  <Card className="p-3">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="entryPriceInput">Giá Entry</Label>
                        <Input
                          id="entryPriceInput"
                          type="number"
                          step="0.00000001"
                          min="0"
                          value={entryPriceInput}
                          onChange={(e) => setEntryPriceInput(e.target.value)}
                          placeholder="Ví dụ: 100.5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stopLossPriceInput">Giá SL</Label>
                        <Input
                          id="stopLossPriceInput"
                          type="number"
                          step="0.00000001"
                          min="0"
                          value={stopLossPriceInput}
                          onChange={(e) => setStopLossPriceInput(e.target.value)}
                          placeholder="Ví dụ: 98.5"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={calculateSLPercentage}
                          className="flex-1"
                          size="sm"
                        >
                          Tính SL %
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEntryPriceInput("");
                            setStopLossPriceInput("");
                          }}
                          className="flex-1"
                          size="sm"
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}

            <Button type="submit" className="w-full">
              Tính giá vào lệnh
            </Button>

            {entryPrice !== null && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Kết quả</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg mb-4">
                    <span className="font-medium">Giá vào lệnh: </span>
                    <span className="text-primary font-bold">
                      {getDisplayEntryPrice()?.toFixed(2)} USDT
                    </span>
                    {getReductionInfo() && (
                      <div className="text-xs mt-1 text-muted-foreground">
                        {getReductionInfo()}
                      </div>
                    )}
                  </div>

                  {showPositionOptions && (
                    <div className="space-y-3 pt-3 border-t">
                      <Label className="text-base font-semibold">
                        Giảm Position
                      </Label>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={reductionType === "0.5R" ? "default" : "outline"}
                          onClick={() => {
                            setReductionType("0.5R");
                            calculateReducedPosition("0.5R");
                          }}
                          className="flex-1"
                          size="sm"
                        >
                          0.5R
                        </Button>
                        <Button
                          type="button"
                          variant={reductionType === "custom" ? "default" : "outline"}
                          onClick={() => {
                            setReductionType("custom");
                            setReducedEntryPrice(null);
                            setCustomRiskReduction("");
                          }}
                          className="flex-1"
                          size="sm"
                        >
                          Tùy chỉnh
                        </Button>
                      </div>

                      {reductionType === "custom" && (
                        <div className="space-y-2">
                          <Label htmlFor="customRiskReduction">
                            Tỷ lệ giảm (%)
                          </Label>
                          <Input
                            id="customRiskReduction"
                            type="number"
                            step="0.1"
                            min="0.1"
                            max="99"
                            value={customRiskReduction}
                            onChange={(e) => {
                              setCustomRiskReduction(e.target.value);
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value) && value > 0 && value < 100) {
                                calculateReducedPosition("custom", value);
                              } else {
                                setReducedEntryPrice(null);
                              }
                            }}
                            placeholder="Ví dụ: 30"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </form>
        </CardContent>
      </Card>

      <SettingsModal
        open={showSettings}
        balance={balance}
        settings={settings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        onUpdateBalance={onUpdateBalance}
      />
    </div>
  );
}
