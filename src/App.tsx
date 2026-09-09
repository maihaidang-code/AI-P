import React, { useState, useEffect } from 'react';
import { UserOptions, DirectorResponse, SavedProject } from './types';
import { SAMPLE_PRODUCTS } from './data/samples';
import { Navbar } from './components/Navbar';
import { ProductUploader } from './components/ProductUploader';
import { DirectorOptionsPanel } from './components/DirectorOptionsPanel';
import { PromptResultsView } from './components/PromptResultsView';
import { SavedLibraryModal } from './components/SavedLibraryModal';
import { GuideModal } from './components/GuideModal';
import { Sparkles, Camera, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const INITIAL_OPTIONS: UserOptions = {
  product_image: '',
  human_presence: 'none',
  human_details: {
    gender: 'nữ',
    age_range: '20-30',
    ethnicity_style: 'Á Đông',
    pose: 'tương tác trực tiếp với sản phẩm',
    count_if_multiple: 2,
  },
  scene_style: 'studio nền trơn',
  decoration_props: ['hoa tươi', 'vải lụa nền'],
  lighting_mood: 'ánh sáng studio dịu (softbox)',
  camera_style: 'góc ngang eye-level',
  aspect_ratio: '4:5',
  output_count: 4,
  target_platform: 'Instagram',
};

export default function App() {
  const [options, setOptions] = useState<UserOptions>(INITIAL_OPTIONS);
  const [result, setResult] = useState<DirectorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState<Record<string, boolean>>({});
  
  // Saved Projects state
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [isSavedLibraryOpen, setIsSavedLibraryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loaded = localStorage.getItem('ai_product_director_saved');
    if (loaded) {
      try {
        setSavedProjects(JSON.parse(loaded));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleImageSelected = (base64OrUrl: string) => {
    setOptions((prev) => ({ ...prev, product_image: base64OrUrl }));
    setResult(null); // Reset result when new image selected
    setErrorMessage(null);
  };

  const handleGenerate = async () => {
    if (!options.product_image) {
      setErrorMessage('Vui lòng chọn hoặc tải lên ảnh sản phẩm trước.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: options.product_image,
          options,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi phân tích ảnh sản phẩm.');
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Lỗi kết nối tới server AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePreview = async (variantId: string, promptText: string) => {
    setIsGeneratingPreview((prev) => ({ ...prev, [variantId]: true }));
    try {
      const res = await fetch('/api/generate-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          aspectRatio: options.aspect_ratio,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không tạo được ảnh preview');

      if (result) {
        const updatedVariants = result.variants.map((v) =>
          v.id === variantId ? { ...v, preview_image_url: data.previewUrl } : v
        );
        setResult({ ...result, variants: updatedVariants });
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Lỗi khi sinh ảnh preview');
    } finally {
      setIsGeneratingPreview((prev) => ({ ...prev, [variantId]: false }));
    }
  };

  const handleSaveProject = () => {
    if (!result) return;
    const sampleFound = SAMPLE_PRODUCTS.find((s) => s.imageUrl === options.product_image);
    const productName = sampleFound ? sampleFound.name : `Dự án sản phẩm ${new Date().toLocaleTimeString()}`;

    const newProj: SavedProject = {
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      productName,
      thumbnail: options.product_image,
      options,
      result,
    };

    const updated = [newProj, ...savedProjects];
    setSavedProjects(updated);
    localStorage.setItem('ai_product_director_saved', JSON.stringify(updated));
  };

  const handleDeleteProject = (id: string) => {
    const updated = savedProjects.filter((p) => p.id !== id);
    setSavedProjects(updated);
    localStorage.setItem('ai_product_director_saved', JSON.stringify(updated));
  };

  const handleLoadProject = (proj: SavedProject) => {
    setOptions(proj.options);
    setResult(proj.result);
  };

  const handleReset = () => {
    setOptions(INITIAL_OPTIONS);
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900 selection:bg-amber-500 selection:text-white">
      <Navbar
        onOpenSavedLibrary={() => setIsSavedLibraryOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onReset={handleReset}
        savedCount={savedProjects.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Senior Product Photography Creative Director</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Chuyển Đổi Ảnh Sản Phẩm Thành Bộ Prompt Thương Mại Đỉnh Cao
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Hệ thống AI phân tích chất liệu, màu sắc và góc chụp, bảo toàn 100% hình dáng & logo, đồng thời sinh prompt chi tiết cho Midjourney, Flux và DALL-E.
          </p>
        </div>

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm flex items-center justify-between">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="text-rose-600 font-bold hover:underline">Đóng</button>
          </div>
        )}

        {/* Input & Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-6">
            <ProductUploader
              selectedImage={options.product_image}
              onImageSelected={handleImageSelected}
            />
          </div>

          <div className="lg:col-span-7">
            <DirectorOptionsPanel
              options={options}
              onChange={setOptions}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              isReady={Boolean(options.product_image)}
            />
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="pt-4 border-t border-stone-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <PromptResultsView
              result={result}
              options={options}
              onSaveProject={handleSaveProject}
              onGeneratePreview={handleGeneratePreview}
              isGeneratingPreview={isGeneratingPreview}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <SavedLibraryModal
        isOpen={isSavedLibraryOpen}
        onClose={() => setIsSavedLibraryOpen(false)}
        projects={savedProjects}
        onLoadProject={handleLoadProject}
        onDeleteProject={handleDeleteProject}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 mt-12 text-center text-xs text-stone-500">
        <p>© 2026 AI Product Photography Director • Powered by Gemini 3.8 Flash & Google AI Studio</p>
      </footer>
    </div>
  );
}
