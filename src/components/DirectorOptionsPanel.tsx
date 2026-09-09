import React from 'react';
import { UserOptions } from '../types';
import { Sliders, Users, Sun, Camera, Layout, Globe, Sparkles } from 'lucide-react';

interface DirectorOptionsPanelProps {
  options: UserOptions;
  onChange: (newOptions: UserOptions) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isReady: boolean;
}

const DECORATION_PROPS_LIST = [
  'hoa tươi',
  'nến',
  'vải lụa nền',
  'ánh sáng neon',
  'cây xanh',
  'bục trưng bày đá cẩm thạch',
  'sách nghệ thuật',
  'không có phụ kiện',
];

const SCENE_STYLES = [
  'studio nền trơn',
  'lifestyle trong nhà',
  'ngoài trời/thiên nhiên',
  'đô thị/đường phố',
  'sự kiện sang trọng',
  'flat lay/top-down',
  'tối giản Bắc Âu',
  'cổ điển vintage',
];

const LIGHTING_MOODS = [
  'ánh sáng studio dịu (softbox)',
  'ánh sáng tự nhiên ban ngày',
  'golden hour hoàng hôn',
  'tương phản cao/dramatic',
  'neon/cyberpunk',
];

const CAMERA_STYLES = [
  'macro cận cảnh chi tiết',
  'góc rộng toàn cảnh',
  'góc ngang eye-level',
  'góc từ trên xuống (flat lay)',
  'góc thấp hero shot',
];

const TARGET_PLATFORMS = [
  'Shopee/Lazada',
  'Instagram',
  'Website thương hiệu',
  'Quảng cáo Facebook/TikTok',
  'Catalogue in ấn',
];

export const DirectorOptionsPanel: React.FC<DirectorOptionsPanelProps> = ({
  options,
  onChange,
  onGenerate,
  isLoading,
  isReady,
}) => {
  const handleHumanPresenceChange = (presence: UserOptions['human_presence']) => {
    onChange({ ...options, human_presence: presence });
  };

  const handleDetailChange = (field: keyof UserOptions['human_details'], value: any) => {
    onChange({
      ...options,
      human_details: {
        ...options.human_details,
        [field]: value,
      },
    });
  };

  const toggleProp = (prop: string) => {
    const current = [...options.decoration_props];
    if (prop === 'không có phụ kiện') {
      onChange({ ...options, decoration_props: ['không có phụ kiện'] });
      return;
    }
    const filtered = current.filter((p) => p !== 'không có phụ kiện');
    if (filtered.includes(prop)) {
      onChange({ ...options, decoration_props: filtered.filter((p) => p !== prop) });
    } else {
      onChange({ ...options, decoration_props: [...filtered, prop] });
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200/60 pb-5">
        <h2 className="text-base font-semibold text-stone-900 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-sm">
            <Sliders className="w-4 h-4" />
          </div>
          2. Thiết lập Tùy chọn Sáng tạo (Director Options)
        </h2>
        <span className="text-xs font-medium bg-stone-200/70 text-stone-700 px-3 py-1 rounded-full backdrop-blur-xs">
          Apple Pro v2.5
        </span>
      </div>

      {/* Human Presence */}
      <div>
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
          <Users className="w-4 h-4 text-stone-700" />
          Sự hiện diện của con người (Human Presence)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'none', label: 'Không có người' },
            { id: 'one_person', label: '1 Người mẫu' },
            { id: 'multiple_people', label: 'Nhiều người' },
            { id: 'hands_only', label: 'Chỉ cận cảnh tay' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleHumanPresenceChange(item.id as any)}
              className={`py-3 px-3 text-xs font-semibold rounded-2xl border transition-all text-center ${
                options.human_presence === item.id
                  ? 'bg-stone-900 border-stone-900 text-white shadow-md scale-[1.02]'
                  : 'bg-white/60 border-stone-200/80 text-stone-700 hover:bg-white hover:border-stone-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Human Details if applicable */}
        {options.human_presence !== 'none' && (
          <div className="mt-4 p-4.5 bg-white/70 backdrop-blur-md rounded-2xl border border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3.5 shadow-sm">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1.5">Giới tính</label>
              <select
                value={options.human_details.gender}
                onChange={(e) => handleDetailChange('gender', e.target.value)}
                className="w-full text-xs bg-white/80 border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-medium"
              >
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
                <option value="không xác định">Không xác định / Phi giới tính</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1.5">Độ tuổi</label>
              <select
                value={options.human_details.age_range}
                onChange={(e) => handleDetailChange('age_range', e.target.value)}
                className="w-full text-xs bg-white/80 border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-medium"
              >
                <option value="trẻ em">Trẻ em</option>
                <option value="teen">Teen (13-19)</option>
                <option value="20-30">20 - 30 tuổi</option>
                <option value="30-45">30 - 45 tuổi</option>
                <option value="45+">45+ tuổi</option>
                <option value="người cao tuổi">Người cao tuổi</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1.5">Phong cách/Chủng tộc</label>
              <select
                value={options.human_details.ethnicity_style}
                onChange={(e) => handleDetailChange('ethnicity_style', e.target.value)}
                className="w-full text-xs bg-white/80 border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-medium"
              >
                <option value="Á Đông">Á Đông</option>
                <option value="Âu Mỹ">Âu Mỹ</option>
                <option value="đa dạng/không chỉ định">Đa dạng / Không chỉ định</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-stone-700 mb-1.5">Tư thế / Tương tác (Pose)</label>
              <select
                value={options.human_details.pose}
                onChange={(e) => handleDetailChange('pose', e.target.value)}
                className="w-full text-xs bg-white/80 border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-medium"
              >
                <option value="đứng">Đứng tạo dáng</option>
                <option value="ngồi">Ngồi thư thái</option>
                <option value="đi bộ">Đang di chuyển / Đi bộ</option>
                <option value="tương tác trực tiếp với sản phẩm">Tương tác trực tiếp với sản phẩm</option>
                <option value="cận cảnh tay">Cận cảnh tay cầm sản phẩm</option>
              </select>
            </div>
            {options.human_presence === 'multiple_people' && (
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1.5">Số lượng người</label>
                <input
                  type="number"
                  min={2}
                  max={6}
                  value={options.human_details.count_if_multiple}
                  onChange={(e) => handleDetailChange('count_if_multiple', parseInt(e.target.value) || 2)}
                  className="w-full text-xs bg-white/80 border border-stone-300 rounded-xl p-2.5 focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-medium"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Scene Style & Lighting Mood */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Layout className="w-4 h-4 text-stone-700" />
            Phong cách bối cảnh (Scene Style)
          </label>
          <select
            value={options.scene_style}
            onChange={(e) => onChange({ ...options, scene_style: e.target.value })}
            className="w-full text-xs bg-white/70 border border-stone-300 rounded-2xl p-3 focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-semibold text-stone-900 shadow-2xs"
          >
            {SCENE_STYLES.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Sun className="w-4 h-4 text-stone-700" />
            Ánh sáng & Tâm trạng (Lighting Mood)
          </label>
          <select
            value={options.lighting_mood}
            onChange={(e) => onChange({ ...options, lighting_mood: e.target.value })}
            className="w-full text-xs bg-white/70 border border-stone-300 rounded-2xl p-3 focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-semibold text-stone-900 shadow-2xs"
          >
            {LIGHTING_MOODS.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Camera Style & Target Platform */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Camera className="w-4 h-4 text-stone-700" />
            Góc máy & Ống kính (Camera Style)
          </label>
          <select
            value={options.camera_style}
            onChange={(e) => onChange({ ...options, camera_style: e.target.value })}
            className="w-full text-xs bg-white/70 border border-stone-300 rounded-2xl p-3 focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-semibold text-stone-900 shadow-2xs"
          >
            {CAMERA_STYLES.map((cam) => (
              <option key={cam} value={cam}>
                {cam}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Globe className="w-4 h-4 text-stone-700" />
            Nền tảng mục tiêu (Target Platform)
          </label>
          <select
            value={options.target_platform}
            onChange={(e) => onChange({ ...options, target_platform: e.target.value })}
            className="w-full text-xs bg-white/70 border border-stone-300 rounded-2xl p-3 focus:ring-2 focus:ring-stone-900 focus:outline-hidden font-semibold text-stone-900 shadow-2xs"
          >
            {TARGET_PLATFORMS.map((plat) => (
              <option key={plat} value={plat}>
                {plat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Aspect Ratio */}
      <div>
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
          Tỷ lệ khung hình (Aspect Ratio)
        </label>
        <div className="grid grid-cols-4 gap-2.5">
          {(['1:1', '4:5', '9:16', '16:9'] as const).map((ratio) => (
            <button
              key={ratio}
              type="button"
              onClick={() => onChange({ ...options, aspect_ratio: ratio })}
              className={`py-2.5 text-xs font-bold rounded-2xl border transition-all ${
                options.aspect_ratio === ratio
                  ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                  : 'bg-white/60 border-stone-200/80 text-stone-700 hover:bg-white'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* Decoration Props */}
      <div>
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
          Phụ kiện trang trí (Decoration Props)
        </label>
        <div className="flex flex-wrap gap-2">
          {DECORATION_PROPS_LIST.map((prop) => {
            const isSelected = options.decoration_props.includes(prop);
            return (
              <button
                key={prop}
                type="button"
                onClick={() => toggleProp(prop)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                    : 'bg-white/60 border-stone-200/80 text-stone-700 hover:bg-white'
                }`}
              >
                {prop}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!isReady || isLoading}
          onClick={onGenerate}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2.5 shadow-xl transition-all ${
            !isReady || isLoading
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
              : 'bg-stone-900 hover:bg-stone-800 text-white shadow-stone-900/25 cursor-pointer active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Đang phân tích & Sáng tạo bộ Prompt (Hasselblad Pro)...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Chạy Giám Đốc Sáng Tạo (Generate 4 Prompt Chuẩn Thương Mại)</span>
            </>
          )}
        </button>
        {!isReady && (
          <p className="text-center text-xs text-stone-400 mt-2.5">
            Vui lòng chọn hoặc tải lên ảnh sản phẩm ở bước 1 để kích hoạt.
          </p>
        )}
      </div>
    </div>
  );
};
