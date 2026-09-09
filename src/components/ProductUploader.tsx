import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { SAMPLE_PRODUCTS, SampleProduct } from '../data/samples';

interface ProductUploaderProps {
  selectedImage: string;
  onImageSelected: (base64OrUrl: string) => void;
}

export const ProductUploader: React.FC<ProductUploaderProps> = ({
  selectedImage,
  onImageSelected,
}) => {
  const [activeTab, setActiveTab] = useState<'samples' | 'upload'>('samples');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: SampleProduct) => {
    onImageSelected(sample.imageUrl);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-stone-900 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-sm">
            <ImageIcon className="w-4 h-4" />
          </div>
          1. Tải lên hoặc chọn ảnh sản phẩm mẫu
        </h2>
        <div className="flex bg-stone-200/70 p-1 rounded-2xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('samples')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'samples'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Ảnh mẫu cao cấp
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tải ảnh của bạn
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-300 hover:border-stone-900 rounded-2xl p-8 text-center cursor-pointer bg-white/40 hover:bg-white/80 backdrop-blur-sm transition-all flex flex-col items-center justify-center min-h-[260px] group shadow-inner"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
            <Upload className="w-7 h-7" />
          </div>
          <p className="text-sm font-semibold text-stone-900 mb-1">
            Kéo thả ảnh sản phẩm vào đây, hoặc <span className="text-amber-600 underline">bấm để tải lên</span>
          </p>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Hỗ trợ PNG, JPG, WEBP. Đảm bảo ảnh sản phẩm rõ nét để bảo toàn 100% kết cấu và tỷ lệ.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5">
          {SAMPLE_PRODUCTS.map((sample) => {
            const isSelected = selectedImage === sample.imageUrl;
            return (
              <div
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`relative group rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-stone-900 ring-4 ring-stone-900/10 shadow-lg scale-[1.02]'
                    : 'border-stone-200/80 hover:border-stone-400 bg-white/60'
                }`}
              >
                <div className="aspect-square bg-stone-100 relative overflow-hidden">
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 bg-stone-900 text-amber-400 rounded-full p-1.5 shadow-md">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="p-3 bg-white/90 backdrop-blur-md">
                  <p className="text-xs font-bold text-stone-900 truncate">{sample.name}</p>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">{sample.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedImage && (
        <div className="p-4 bg-emerald-50/80 backdrop-blur-md border border-emerald-200/80 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 rounded-xl bg-white overflow-hidden border border-emerald-300 shadow-sm shrink-0">
              <img src={selectedImage} alt="Selected Product" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Đã khóa ảnh sản phẩm nguồn
              </p>
              <p className="text-[11px] text-emerald-800">Sẵn sàng bảo toàn 100% kết cấu & màu sắc chân thật</p>
            </div>
          </div>
          <span className="text-xs font-semibold bg-emerald-600 text-white px-3.5 py-1.5 rounded-full shadow-xs">
            Đã sẵn sàng
          </span>
        </div>
      )}
    </div>
  );
};
