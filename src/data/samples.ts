export interface SampleProduct {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
}

export const SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    id: 'perfume-luxury',
    name: 'Chai Nước Hoa Cao Cấp (Golden Luxe No.5)',
    category: 'Mỹ phẩm & Nước hoa',
    imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    description: 'Chai thủy tinh trụ trong suốt, nắp kim loại vàng đồng, nhãn đen tối giản sang trọng.'
  },
  {
    id: 'skincare-serum',
    name: 'Serum Dưỡng Da Vitamin C',
    category: 'Mỹ phẩm & Skincare',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    description: 'Lọ thủy tinh hổ phách với ống bóp giọt (pipette), nhãn trắng cam trẻ trung.'
  },
  {
    id: 'craft-coffee',
    name: 'Cà Phê Hạt Đặc Sản (Artisan Beans)',
    category: 'Thực phẩm & Đồ uống',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    description: 'Túi kraft giấy craft màu nâu mờ với van một chiều và tem nhãn thủ công.'
  },
  {
    id: 'minimalist-watch',
    name: 'Đồng Hồ Đeo Tay Tối Giản',
    category: 'Thời trang & Phụ kiện',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    description: 'Mặt tròn mỏng viền thép không gỉ bạc, dây da bò Ý màu nâu đậm.'
  }
];
