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
        {/* Introduction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 {t('sections.introduction.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('sections.introduction.content')}
            </p>
          </CardContent>
        </Card>

        {/* Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ {t('sections.setup.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('sections.setup.content')}
            </p>
          </CardContent>
        </Card>

        {/* Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 {t('sections.usage.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">{t('sections.usage.title')}:</h3>
              <div className="space-y-2">
                {Array.isArray(t.raw('sections.usage.steps')) && 
                  t.raw('sections.usage.steps').map((step: string, index: number) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <p className="text-sm">• {step}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚡ {t('sections.features.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">{t('sections.features.title')}:</h3>
              <div className="space-y-2">
                {Array.isArray(t.raw('sections.features.list')) && 
                  t.raw('sections.features.list').map((feature: string, index: number) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <p className="text-sm">• {feature}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-blue-200 dark:from-blue-950/30 dark:to-purple-950/30 dark:border-blue-800/50">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">🎉 Happy Trading!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Remember: Risk management is more important than profit. Stay safe! 📚✨
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">Start using TradeCalc</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
