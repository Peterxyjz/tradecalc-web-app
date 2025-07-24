"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ModeToggle";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-2xl">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Hướng dẫn sử dụng</h1>
          </div>
          <ModeToggle />
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 Bắt đầu sử dụng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-medium mb-2">Bước 1: Thiết lập tài khoản</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Khi lần đầu mở ứng dụng, bạn sẽ thấy form thiết lập:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Nhập <strong>tên</strong> của bạn</li>
                <li>• Nhập <strong>số dư tài khoản</strong> (USDT)</li>
                <li>• Nhấn <strong>"Tiếp tục"</strong></li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-medium mb-2">Bước 2: Tính toán giá vào lệnh</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Sau khi thiết lập, bạn sẽ thấy màn hình tính toán chính:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Nhập <strong>mức rủi ro (%)</strong> - ví dụ: 2</li>
                <li>• Nhập <strong>đòn bẩy (x)</strong> - ví dụ: 10</li>
                <li>• Nhập <strong>SL (%)</strong> - ví dụ: 2</li>
                <li>• Nhấn <strong>"Tính giá vào lệnh"</strong></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Basic Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Tính toán cơ bản
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">Ý nghĩa các thông số:</h3>
              <div className="space-y-3">
                <Card className="bg-secondary">
                  <CardContent className="p-3">
                    <h4 className="font-medium text-primary mb-1">Mức rủi ro (%)</h4>
                    <p className="text-sm text-muted-foreground">
                      % số dư tài khoản bạn sẵn sàng mất nếu lệnh chạm SL
                    </p>
                    <p className="text-xs mt-1">
                      <strong>Ví dụ:</strong> Tài khoản 1000 USDT, rủi ro 2% = sẵn sàng mất 20 USDT
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-secondary">
                  <CardContent className="p-3">
                    <h4 className="font-medium text-primary mb-1">Đòn bẩy (x)</h4>
                    <p className="text-sm text-muted-foreground">
                      Hệ số nhân từ sàn giao dịch
                    </p>
                    <p className="text-xs mt-1">
                      <strong>Ví dụ:</strong> 10x = có thể trade với số tiền gấp 10 lần
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-secondary">
                  <CardContent className="p-3">
                    <h4 className="font-medium text-primary mb-1">SL (%)</h4>
                    <p className="text-sm text-muted-foreground">
                      % giá có thể đi ngược lại trước khi cắt lỗ
                    </p>
                    <p className="text-xs mt-1">
                      <strong>Ví dụ:</strong> SL 2% = nếu giá giảm 2% thì tự động cắt lỗ
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-blue-50/50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Ví dụ cụ thể:</h4>
                <div className="text-sm space-y-1">
                  <p>• Số dư: <strong>1,000 USDT</strong></p>
                  <p>• Rủi ro: <strong>2%</strong> (= 20 USDT)</p>
                  <p>• Đòn bẩy: <strong>10x</strong></p>
                  <p>• SL: <strong>2%</strong></p>
                  <div className="mt-3 p-3 bg-background/80 rounded border">
                    <p className="font-medium">
                      → Kết quả: <span className="text-primary">Giá vào lệnh 100 USDT</span>
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
              ⚡ Tính năng nâng cao
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Tính SL% từ giá thực tế</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Thay vì nhập SL%, bạn có thể tính từ giá Entry và giá SL cụ thể:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Chuyển sang tab <strong>"Nâng cao"</strong></li>
                <li>• Nhập <strong>giá Entry</strong> (ví dụ: 100.5)</li>
                <li>• Nhập <strong>giá SL</strong> (ví dụ: 98.5)</li>
                <li>• Nhấn <strong>"Tính SL%"</strong></li>
                <li>• SL% sẽ được tự động tính và điền vào</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. Giảm Position Size</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Sau khi tính xong, bạn có thể giảm position nếu cảm thấy quá lớn:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Nhấn <strong>"0.5R"</strong> để giảm 50% ngay lập tức</li>
                <li>• Hoặc nhấn <strong>"Tùy chỉnh"</strong> và nhập % muốn giảm</li>
                <li>• Giá vào lệnh sẽ cập nhật tự động</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ Cài đặt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Truy cập cài đặt:</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Nhấn vào biểu tượng <strong>⚙️</strong> ở góc trên bên phải
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Có thể thay đổi:</h3>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <strong>Số dư tài khoản:</strong> Cập nhật khi có thay đổi</li>
                <li>• <strong>Mức rủi ro mặc định:</strong> Giá trị sẵn có khi mở app</li>
                <li>• <strong>Đòn bẩy mặc định:</strong> Đòn bẩy thường dùng</li>
                <li>• <strong>SL mặc định:</strong> SL% thường dùng</li>
              </ul>
            </div>

            <Card className="bg-yellow-50/50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800/50">
              <CardContent className="p-3">
                <h4 className="font-medium mb-1">💡 Mẹo</h4>
                <p className="text-sm">
                  Thiết lập giá trị mặc định phù hợp để không phải nhập lại nhiều lần
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 Mẹo sử dụng hiệu quả
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Card className="bg-green-50/50 border-green-200 dark:bg-green-950/30 dark:border-green-800/50">
              <CardContent className="p-3">
                <h4 className="font-medium mb-1">✅ Nên làm</h4>
                <ul className="text-sm space-y-1">
                  <li>• Không risk quá 2-5% account cho 1 lệnh</li>
                  <li>• Cập nhật số dư account định kỳ</li>
                  <li>• Kiểm tra kết quả trước khi vào lệnh</li>
                  <li>• Sử dụng 0.5R khi không chắc chắn</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50/50 border-red-200 dark:bg-red-950/30 dark:border-red-800/50">
              <CardContent className="p-3">
                <h4 className="font-medium mb-1">❌ Tránh làm</h4>
                <ul className="text-sm space-y-1">
                  <li>• Không dùng leverage quá cao nếu chưa có kinh nghiệm</li>
                  <li>• Không bỏ qua stop loss vì cảm xúc</li>
                  <li>• Không trade hết số dư account</li>
                  <li>• Không thay đổi SL liên tục</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50/50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800/50">
              <CardContent className="p-3">
                <h4 className="font-medium mb-1">🎯 Khuyến nghị cho người mới</h4>
                <ul className="text-sm space-y-1">
                  <li>• Risk: 1-2% mỗi lệnh</li>
                  <li>• Leverage: 5-10x</li>
                  <li>• SL: 2-5%</li>
                  <li>• Tập trung học quản lý rủi ro</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ❓ Câu hỏi thường gặp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium mb-1">Position size quá lớn?</h4>
              <p className="text-sm text-muted-foreground">
                Giảm % risk hoặc tăng % SL. Hoặc sử dụng tính năng giảm position.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium mb-1">Position size quá nhỏ?</h4>
              <p className="text-sm text-muted-foreground">
                Tăng % risk (trong giới hạn an toàn) hoặc giảm % SL.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-medium mb-1">Mất dữ liệu cài đặt?</h4>
              <p className="text-sm text-muted-foreground">
                Dữ liệu lưu trong browser. Tránh xóa cache hoặc dùng chế độ ẩn danh.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium mb-1">Dữ liệu có an toàn không?</h4>
              <p className="text-sm text-muted-foreground">
                Hoàn toàn an toàn. Tất cả dữ liệu chỉ lưu trong máy của bạn, không gửi lên server.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-blue-200 dark:from-blue-950/30 dark:to-purple-950/30 dark:border-blue-800/50">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">🎉 Chúc bạn trading thành công!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Discipline và risk management quan trọng hơn profit. Stay safe! 📚✨
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">Bắt đầu sử dụng TradeCalc</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
