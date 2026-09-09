export interface HumanDetails {
  gender: 'nam' | 'nữ' | 'không xác định';
  age_range: 'trẻ em' | 'teen' | '20-30' | '30-45' | '45+' | 'người cao tuổi';
  ethnicity_style: 'Á Đông' | 'Âu Mỹ' | 'đa dạng/không chỉ định';
  pose: 'đứng' | 'ngồi' | 'đi bộ' | 'tương tác trực tiếp với sản phẩm' | 'cận cảnh tay';
  count_if_multiple: number;
}

export interface UserOptions {
  product_image: string; // base64 or URL
  human_presence: 'none' | 'one_person' | 'multiple_people' | 'hands_only';
  human_details: HumanDetails;
  scene_style: string;
  decoration_props: string[];
  lighting_mood: string;
  camera_style: string;
  aspect_ratio: '1:1' | '4:5' | '9:16' | '16:9';
  output_count: number;
  target_platform: string;
}

export interface ProductAnalysis {
  product_category: string;
  surface_material: string;
  color_palette: string;
  relative_scale: string;
  brand_style: string;
  target_audience: string;
  camera_angle: string;
  brand_fidelity_notes: string;
}

export interface PromptVariant {
  id: string;
  title: string;
  subtitle: string;
  subject: string;
  human_element: string;
  composition: string;
  scene_background: string;
  lighting: string;
  camera_lens: string;
  style_reference: string;
  color_grading: string;
  quality_boosters: string;
  negative_prompt: string;
  raw_midjourney_prompt: string;
  raw_flux_prompt: string;
  raw_dalle_prompt: string;
  preview_image_url?: string;
}

export interface DirectorResponse {
  analysis: ProductAnalysis;
  variants: PromptVariant[];
}

export interface SavedProject {
  id: string;
  createdAt: string;
  productName: string;
  thumbnail: string;
  options: UserOptions;
  result: DirectorResponse;
}
