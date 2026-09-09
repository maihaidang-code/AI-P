import React, { useState } from 'react';
import { PromptVariant } from '../types';
import { Copy, Check, Sparkles, Image as ImageIcon, Layers, Terminal, ShieldCheck } from 'lucide-react';

interface PromptCardProps {
  variant: PromptVariant;
  aspectRatio: string;
  onGeneratePreview: (variantId: string, promptText: string) => void;
  isGeneratingPreview: boolean;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  variant,
  aspectRatio,
  onGeneratePreview,
  isGeneratingPreview,
}) => {
  const [activeTab, setActiveTab] = useState<'structured' | 'midjourney' | 'flux' | 'dalle'>('structured');
  const [copied, setCopied] = useState(false);

  const getFullPromptForCopy = () => {
    if (activeTab === 'midjourney') {
      return `${variant.raw_midjourney_prompt} --ar ${aspectRatio} --v 6.0`;
    }
    if (activeTab === 'flux') {
      return variant.raw_flux_prompt;
    }
    if (activeTab === 'dalle') {
      return variant.raw_dalle_prompt;
    }
    return `[SUBJECT]: ${variant.subject}\n[HUMAN ELEMENT]: ${variant.human_element}\n[COMPOSITION]: ${variant.composition}\n[SCENE]: ${variant.scene_background}\n[LIGHTING]: ${variant.lighting}\n[CAMERA]: ${variant.camera_lens}\n[STYLE]: ${variant.style_reference}\n[COLOR]: ${variant.color_grading}\n[QUALITY]: ${variant.quality_boosters}\n[NEGATIVE]: ${variant.negative_prompt}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullPromptForCopy());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden flex flex-col shadow-lg border border-stone-200/80">
      {/* Card Header */}
      <div className="bg-stone-50/80 backdrop-blur-md border-b border-stone-200/80 px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-900 ring-4 ring-stone-900/10"></span>
            <h3 className="font-serif font-bold text-stone-900 text-lg tracking-tight">{variant.title}</h3>
          </div>
          <p className="text-xs text-stone-600 mt-0.5 font-medium">{variant.subtitle}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-stone-800 bg-white/90 border border-stone-200/80 rounded-xl hover:bg-stone-50 transition-all shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
            <span>{copied ? 'Đã sao chép!' : 'Sao chép Prompt'}</span>
          </button>
        </div>
      </div>

      {/* Format Tabs */}
      <div className="flex border-b border-stone-200/80 bg-stone-100/50 px-4 pt-2 gap-1 overflow-x-auto">
        {[
          { id: 'structured', label: 'Cấu trúc Chi tiết' },
          { id: 'midjourney', label: 'Midjourney v6' },
          { id: 'flux', label: 'Flux.1 Pro' },
          { id: 'dalle', label: 'DALL-E 3' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-stone-900 border-t border-x border-stone-200/80 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 space-y-4.5 bg-white/40 backdrop-blur-sm">
        {activeTab === 'structured' ? (
          <div className="space-y-3.5 text-xs">
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs">
              <span className="font-bold text-stone-900 block mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                SUBJECT (Bảo toàn 100% kết cấu, chất liệu, màu sắc gốc):
              </span>
              <p className="text-stone-700 leading-relaxed font-medium">{variant.subject}</p>
            </div>

            {variant.human_element && (
              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs">
                <span className="font-bold text-stone-900 block mb-1.5">👤 HUMAN ELEMENT (Nhân vật & Tương tác):</span>
                <p className="text-stone-700 leading-relaxed">{variant.human_element}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs">
                <span className="font-bold text-stone-900 block mb-1.5">🖼️ COMPOSITION & SCENE:</span>
                <p className="text-stone-700 leading-relaxed">{variant.composition} — {variant.scene_background}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs">
                <span className="font-bold text-stone-900 block mb-1.5">💡 LIGHTING & CAMERA:</span>
                <p className="text-stone-700 leading-relaxed">{variant.lighting} | {variant.camera_lens}</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs">
              <span className="font-bold text-stone-900 block mb-1.5">🎨 STYLE & COLOR GRADING:</span>
              <p className="text-stone-700 leading-relaxed">{variant.style_reference} | {variant.color_grading}</p>
            </div>

            <div className="bg-amber-50/70 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
              <span className="font-bold text-amber-900 block mb-1.5">✨ QUALITY BOOSTERS (True-to-life studio colors):</span>
              <p className="text-amber-800 leading-relaxed font-medium">{variant.quality_boosters}</p>
            </div>

            <div className="bg-rose-50/70 backdrop-blur-xs p-3.5 rounded-2xl border border-rose-200/80 shadow-2xs">
              <span className="font-bold text-rose-900 block mb-1.5">🚫 NEGATIVE PROMPT:</span>
              <p className="text-rose-800 leading-relaxed">{variant.negative_prompt}</p>
            </div>
          </div>
        ) : (
          <div className="glass-card-dark text-stone-100 p-4.5 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed relative shadow-inner">
            <pre className="whitespace-pre-wrap font-mono">
              {activeTab === 'midjourney' && `${variant.raw_midjourney_prompt} --ar ${aspectRatio} --v 6.0`}
              {activeTab === 'flux' && variant.raw_flux_prompt}
              {activeTab === 'dalle' && variant.raw_dalle_prompt}
            </pre>
          </div>
        )}

        {/* AI Preview Section */}
        <div className="pt-3 border-t border-stone-200/60">
          {variant.preview_image_url ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  Ảnh Preview Thương Mại (Studio Setup)
                </span>
                <a
                  href={variant.preview_image_url}
                  download={`product-preview-${variant.id}.png`}
                  className="text-xs font-semibold text-stone-800 hover:text-stone-900 underline"
                >
                  Tải ảnh về
                </a>
              </div>
              <div className="aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 relative group max-h-[380px] shadow-md">
                <img
                  src={variant.preview_image_url}
                  alt={variant.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-stone-800 font-semibold">Xem trước kết quả render ánh sáng studio chân thật?</span>
              </div>
              <button
                type="button"
                disabled={isGeneratingPreview}
                onClick={() => onGeneratePreview(variant.id, variant.subject + ", " + variant.scene_background + ", " + variant.lighting)}
                className="px-4 py-2 text-xs font-bold bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all shadow-sm disabled:bg-stone-300 cursor-pointer"
              >
                {isGeneratingPreview ? 'Đang render...' : 'Tạo Preview AI'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
