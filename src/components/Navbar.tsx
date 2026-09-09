import React from 'react';
import { Camera, Sparkles, FolderOpen, HelpCircle, RefreshCw } from 'lucide-react';

interface NavbarProps {
  onOpenSavedLibrary: () => void;
  onOpenGuide: () => void;
  onReset: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSavedLibrary,
  onOpenGuide,
  onReset,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div 
          onClick={onReset}
          className="flex items-center space-x-3.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-stone-900 to-stone-800 flex items-center justify-center text-white shadow-md shadow-stone-900/10 group-hover:scale-105 transition-transform">
            <Camera className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-base sm:text-lg text-stone-900 tracking-tight flex items-center gap-2">
              AI Product Director
              <span className="text-[11px] font-sans px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200 font-medium">
                Apple Studio
              </span>
            </h1>
            <p className="text-[11px] text-stone-500 hidden sm:block tracking-wide">
              Giám đốc sáng tạo nhiếp ảnh sản phẩm thương mại cao cấp
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 rounded-xl transition-all"
            title="Tạo dự án mới"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Làm mới</span>
          </button>

          <button
            onClick={onOpenSavedLibrary}
            className="relative flex items-center space-x-2 px-4 py-2 text-xs font-medium text-stone-800 bg-stone-100/80 hover:bg-stone-200/80 backdrop-blur-md rounded-xl transition-all border border-stone-200/60 shadow-2xs"
          >
            <FolderOpen className="w-4 h-4 text-stone-700" />
            <span>Dự án đã lưu</span>
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-amber-400 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenGuide}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 rounded-xl transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden md:inline">Hướng dẫn</span>
          </button>
        </div>
      </div>
    </header>
  );
};
