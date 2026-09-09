import React from 'react';
import { X, HelpCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-white/40">
        <div className="px-6 py-5 border-b border-stone-200/80 flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-sm">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">Hướng Dẫn Sử Dụng - AI Product Director</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="flex items-start space-x-3.5 bg-amber-50/80 backdrop-blur-md p-4.5 rounded-2xl border border-amber-200/80 shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-stone-900 mb-1">Giám đốc sáng tạo nhiếp ảnh sản phẩm chuyên nghiệp</h4>
              <p className="text-stone-600">
                Hệ thống AI phân tích kỹ lưỡng sản phẩm của bạn, cam kết bảo toàn 100% hình dáng, kết cấu bề mặt, tỷ lệ và logo, đồng thời tạo ra bộ prompt thương mại cao cấp với ánh sáng studio tươi sáng, chân thật như chụp bằng máy chuyên nghiệp Hasselblad.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Quy trình 3 bước đơn giản:</h4>
            
            <div className="flex items-start space-x-3.5 p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                1
              </div>
              <div>
                <span className="font-bold text-stone-900 block">Tải ảnh hoặc chọn mẫu cao cấp</span>
                <span className="text-stone-600">Tải lên ảnh sản phẩm thực tế của bạn hoặc chọn nhanh từ thư viện mẫu chuẩn studio.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                2
              </div>
              <div>
                <span className="font-bold text-stone-900 block">Thiết lập tùy chọn sáng tạo</span>
                <span className="text-stone-600">Tùy chọn người mẫu, bối cảnh, ánh sáng studio, góc máy, tỷ lệ khung hình và nền tảng mục tiêu.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                3
              </div>
              <div>
                <span className="font-bold text-stone-900 block">Nhận bộ Prompt & Render Preview</span>
                <span className="text-stone-600">Sao chép prompt chuẩn Midjourney/Flux/DALL-E, xem trước ảnh render bằng AI hoặc xuất file JSON dự án.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white/80 backdrop-blur-md border-t border-stone-200/80 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-sm"
          >
            Đã hiểu, bắt đầu ngay
          </button>
        </div>
      </div>
    </div>
  );
};
