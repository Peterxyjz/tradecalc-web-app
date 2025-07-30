"use client";

import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ModeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function GuidePage() {
  const t = useTranslations('guide');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-2xl">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('backHome')}
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <h1 className="text-lg font-semibold">{t('title')}</h1>
          </div>
          <div className="flex gap-2">
            <LanguageToggle />
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 {t('gettingStarted')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-medium mb-2">{t('sections.setup.title')}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {t('sections.setup.content')}
              </p>
              <ul className="text-sm space-y-1 ml-4">
                {t.raw('sections.setup.steps').map((step: string, index: number) => (
                  <li key={index}>• {step}</li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-medium mb-2">{t('sections.usage.title')}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {t('sections.usage.description')}
              </p>
              <ul className="text-sm space-y-1 ml-4">
                {t.raw('sections.usage.steps').map((step: string, index: number) => (
                  <li key={index}>• {step}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Basic Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 {t('basicCalculation')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">{t('sections.parameters.title')}:</h3>
              <div className="space-y-3">
                <Card className="bg-secondary">
                  <CardContent className="p-3">
                    <h4 className="font-medium text-primary mb-1">{t('sections.parameters.risk.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('sections.parameters.risk.description')}
                    </p>
                    <p className="text-xs mt-1">
                      <strong>Ví dụ:</strong> {t('sections.parameters.risk.example')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-secondary">
                  <CardContent className="p-3">
                    <h4 className="font-medium text-primary mb-1">{t('sections.parameters.leverage.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('sections.parameters.leverage.description')}
                    </p>
                    <p className="text-xs mt-1">
                      <strong>Ví dụ:</strong> {t('sections.parameters.leverage.example')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-secondary">
                  <CardContent className="p-3">
                    <h4 className="font-medium text-primary mb-1">{t('sections.parameters.stopLoss.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('sections.parameters.stopLoss.description')}
                    </p>
                    <p className="text-xs mt-1">
                      <strong>Ví dụ:</strong> {t('sections.parameters.stopLoss.example')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-blue-50/50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">{t('sections.example.title')}:</h4>
                <div className="text-sm space-y-1">
                  <p>• {t('sections.example.balance')}</p>
                  <p>• {t('sections.example.risk')}</p>
                  <p>• {t('sections.example.leverage')}</p>
                  <p>• {t('sections.example.stopLoss')}</p>
                  <div className="mt-3 p-3 bg-background/80 rounded border">
                    <p className="font-medium">
                      → {t('sections.example.result')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Advanced Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚡ {t('advancedFeatures')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{t('sections.features.slCalculation.title')}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t('sections.features.slCalculation.description')}
              </p>
              <ul className="text-sm space-y-1 ml-4">
                {t.raw('sections.features.slCalculation.steps').map((step: string, index: number) => (
                  <li key={index}>• {step}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">{t('sections.features.positionReduction.title')}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t('sections.features.positionReduction.description')}
              </p>
              <ul className="text-sm space-y-1 ml-4">
                {t.raw('sections.features.positionReduction.steps').map((step: string, index: number) => (
                  <li key={index}>• {step}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ {t('settingsGuide')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{t('sections.settings.title')}:</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t('sections.settings.access')}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Có thể thay đổi:</h3>
              <ul className="text-sm space-y-1 ml-4">
                {t.raw('sections.settings.options').map((option: string, index: number) => (
                  <li key={index}>• {option}</li>
                ))}
              </ul>
            </div>

            <Card className="bg-yellow-50/50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800/50">
              <CardContent className="p-3">
                <h4 className="font-medium mb-1">💡 Mẹo</h4>
                <p className="text-sm">
                  {t('sections.settings.tip')}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 {t('tips')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Card className="bg-green-50/50 border-green-200 dark:bg-green-950/30 dark:border-green-800/50">
              <CardContent className="p-3">
                <h4 className="font-medium mb-1">✅ Nên làm</h4>
                <ul className="text-sm space-y-1">
                  {t.raw('sections.tips.dos').map((tip: string, index: number) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50/50 border-red-200 dark:bg-red-950/30 dark:border-red-800/50">
              <CardContent className="p-3">
                <h4 className="font-medium mb-1">❌ Tránh làm</h4>
                <ul className="text-sm space-y-1">
                  {t.raw('sections.tips.donts').map((tip: string, index: number) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50/50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800/50">
              <CardContent className="p-3">
                <h4 className="font-medium mb-1">🎯 Khuyến nghị cho người mới</h4>
                <ul className="text-sm space-y-1">
                  {t.raw('sections.tips.beginners').map((tip: string, index: number) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ❓ {t('faq')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium mb-1">{t('sections.faq.positionTooLarge.question')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('sections.faq.positionTooLarge.answer')}
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium mb-1">{t('sections.faq.positionTooSmall.question')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('sections.faq.positionTooSmall.answer')}
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-medium mb-1">{t('sections.faq.dataLoss.question')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('sections.faq.dataLoss.answer')}
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium mb-1">{t('sections.faq.dataSafety.question')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('sections.faq.dataSafety.answer')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-blue-200 dark:from-blue-950/30 dark:to-purple-950/30 dark:border-blue-800/50">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">🎉 {t('sections.conclusion.title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('sections.conclusion.message')}
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">{t('sections.conclusion.cta')}</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
