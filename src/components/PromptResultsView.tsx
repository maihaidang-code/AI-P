import React, { useState } from 'react';
import { DirectorResponse, UserOptions } from '../types';
import { PromptCard } from './PromptCard';
import { Sparkles, Download, Bookmark, Check, ShieldCheck, Layers, FileText, Share2 } from 'lucide-react';

interface PromptResultsViewProps {
  result: DirectorResponse;
  options: UserOptions;
  onSaveProject: () => void;
  onGeneratePreview: (variantId: string, promptText: string) => void;
  isGeneratingPreview: Record<string, boolean>;
}

export const PromptResultsView: React.FC<PromptResultsViewProps> = ({
  result,
  options,
  onSaveProject,
  onGeneratePreview,
  isGeneratingPreview,
}) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSaveProject();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ai-product-director-prompts-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Analysis */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300/80 shadow-2xs">
                Bảo toàn 100% kết cấu & màu sắc gốc
              </span>
              <span className="text-xs font-medium text-stone-500">Model: Gemini Flash Director v2.5</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1.5 tracking-tight">
              Bộ 4 Biến Thể Prompt Ánh Sáng Studio Chuyên Nghiệp
            </h2>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleExportJSON}
              className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-bold text-stone-800 bg-white/80 hover:bg-white rounded-2xl transition-all border border-stone-200/80 shadow-2xs"
            >
              <Download className="w-4 h-4 text-stone-700" />
              <span>Xuất JSON</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4.5 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-2xl transition-all shadow-md"
            >
              {saved ? <Check className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
              <span>{saved ? 'Đã lưu dự án!' : 'Lưu dự án'}</span>
            </button>
          </div>
        </div>

        {/* Analysis Summary Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Loại sản phẩm</span>
            <p className="text-xs font-bold text-stone-900 mt-1">{result.analysis.product_category}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Chất liệu bề mặt</span>
            <p className="text-xs font-bold text-stone-900 mt-1">{result.analysis.surface_material}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Bảng màu chủ đạo</span>
            <p className="text-xs font-bold text-stone-900 mt-1">{result.analysis.color_palette}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Phong cách thương hiệu</span>
            <p className="text-xs font-bold text-stone-900 mt-1">{result.analysis.brand_style}</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-emerald-50/80 backdrop-blur-md rounded-2xl border border-emerald-200/80 flex items-start space-x-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-900 font-medium">
            <span className="font-bold">Cam kết bảo toàn tuyệt đối:</span> {result.analysis.brand_fidelity_notes}
          </p>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {result.variants.map((variant) => (
          <PromptCard
            key={variant.id}
            variant={variant}
            aspectRatio={options.aspect_ratio}
            onGeneratePreview={onGeneratePreview}
            isGeneratingPreview={!!isGeneratingPreview[variant.id]}
          />
        ))}
      </div>
    </div>
  );
};
