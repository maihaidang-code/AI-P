import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase JSON payload limit for high-res product images
app.use(express.json({ limit: "25mb" }));

// Initialize Gemini AI client server-side
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "dummy-key-for-build",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const DIRECTOR_SYSTEM_PROMPT = `
Bạn là một Giám đốc sáng tạo nhiếp ảnh sản phẩm (Senior Product Photography Creative Director) với 15 năm kinh nghiệm chụp ảnh thương mại cho các thương hiệu cao cấp, sàn TMĐT (Shopee, Lazada, Amazon), và quảng cáo lifestyle.

Nhiệm vụ của bạn:
1. Phân tích ảnh sản phẩm được người dùng tải lên và JSON tùy chọn.
2. Xác định chính xác: loại sản phẩm, chất liệu bề mặt, màu sắc chủ đạo, kích thước tương đối, phong cách thương hiệu, đối tượng khách hàng, góc chụp.
3. Dựa trên các TÙY CHỌN của người dùng (human_presence, scene_style, decoration_props, lighting_mood, camera_style, aspect_ratio, target_platform), viết ra chính xác 4 PROMPT TẠO ẢNH biến thể chuyên nghiệp, chi tiết theo đúng cấu trúc tiêu chuẩn thương mại.
4. QUY TẮC TỐI CAO - BẢO TOÀN SẢN PHẨM 100%: Tuyệt đối không được thay đổi kết cấu, tỷ lệ, màu sắc, chất liệu bề mặt, chi tiết nhãn mác hay logo của sản phẩm gốc từ ảnh tải lên. Mô tả sản phẩm phải cực kỳ chi tiết, chân thực, tái hiện chính xác 100%. Ánh sáng và màu sắc phải vô cùng tươi sáng, chân thật như chụp bằng máy ảnh chuyên nghiệp cao cấp (Hasselblad/Leica) với hệ thống setup studio chuyên nghiệp, không bị sai lệch tông màu hay mờ nhòe.
5. Luôn bổ sung cụm từ bảo toàn vào prompt: "exact product as reference, do not alter shape, texture, material, logo, text or color of the product, professional high-end commercial studio lighting, vibrant true-to-life colors, shot on Hasselblad 100MP".

Hãy trả về kết quả định dạng JSON thuần túy (không bọc trong markdown codeblock nếu có thể, hoặc chuẩn JSON hợp lệ) với cấu trúc sau:
{
  "analysis": {
    "product_category": "...",
    "surface_material": "...",
    "color_palette": "...",
    "relative_scale": "...",
    "brand_style": "...",
    "target_audience": "...",
    "camera_angle": "...",
    "brand_fidelity_notes": "..."
  },
  "variants": [
    {
      "id": "variant-1",
      "title": "E-commerce Studio Hero",
      "subtitle": "Chụp studio nền trơn, sắc nét tối đa, màu sắc tươi sáng chuẩn thương mại",
      "subject": "...",
      "human_element": "...",
      "composition": "...",
      "scene_background": "...",
      "lighting": "...",
      "camera_lens": "...",
      "style_reference": "...",
      "color_grading": "...",
      "quality_boosters": "...",
      "negative_prompt": "...",
      "raw_midjourney_prompt": "...",
      "raw_flux_prompt": "...",
      "raw_dalle_prompt": "..."
    },
    ... (tổng cộng 4 biến thể với phong cách khác nhau: 1. Studio thương mại sắc nét, 2. Lifestyle tươi sáng trong nhà/ngoài trời, 3. Tối giản cao cấp / Editorial, 4. Sáng tạo nghệ thuật / Cinematic)
  ]
}
`;

// API routes
app.post("/api/generate-prompts", async (req, res) => {
  try {
    const { image, options } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Thiếu ảnh sản phẩm (product_image)" });
    }

    // Extract base64 and mime type if data url
    let mimeType = "image/jpeg";
    let base64Data = image;
    if (image.startsWith("data:")) {
      const matches = image.match(/^data:(.+?);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        base64Data = matches[2];
      }
    }

    const userPromptPayload = `
    ĐÂY LÀ YÊU CẦU TỪ NGƯỜI DÙNG & TÙY CHỌN (OPTIONS):
    ${JSON.stringify(options, null, 2)}
    
    Hãy phân tích bức ảnh sản phẩm đính kèm và tạo ra bộ 4 prompt nhiếp ảnh thương mại đỉnh cao tuân thủ tuyệt đối quy tắc bảo toàn sản phẩm và các tùy chọn trên.
    `;

    const modelsToTry = ["gemini-3.6-flash", "gemini-3.8-flash", "gemini-flash-lite-latest"];
    let response: any = null;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
            {
              text: userPromptPayload,
            },
          ],
          config: {
            systemInstruction: DIRECTOR_SYSTEM_PROMPT,
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });
        if (response && response.text) {
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} failed or quota exceeded:`, err?.message || err);
        lastError = err;
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error("Không nhận được phản hồi từ mô hình AI (đã thử tất cả model). Vui lòng thử lại sau.");
    }

    const responseText = response.text;
    // Clean up potential markdown formatting if model wrapped json
    let jsonString = responseText.trim();
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonString.startsWith("```")) {
      jsonString = jsonString.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const resultData = JSON.parse(jsonString);
    res.json(resultData);
  } catch (error: any) {
    console.error("Lỗi khi gọi API phân tích & sinh prompt:", error);
    res.status(500).json({ error: error.message || "Lỗi server nội bộ" });
  }
});

// Optional: Generate AI Image Preview with graceful quota handling
app.post("/api/generate-preview", async (req, res) => {
  try {
    const { prompt, aspectRatio = "1:1" } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Thiếu prompt sinh ảnh" });
    }

    let previewUrl = "";
    let isQuotaFallback = false;

    try {
      const imageResponse = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-image",
        contents: {
          parts: [
            {
              text: `Professional high-end commercial product photography, ${prompt}, ultra realistic, 8K resolution, studio lighting`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: "1K",
          },
        },
      });

      if (imageResponse.candidates?.[0]?.content?.parts) {
        for (const part of imageResponse.candidates[0].content.parts) {
          if (part.inlineData) {
            previewUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }
    } catch (apiErr: any) {
      console.warn("Image generation API error or quota exceeded, using high-end commercial stock preview:", apiErr?.message || apiErr);
      isQuotaFallback = true;
    }

    if (!previewUrl) {
      // Fallback to high-end commercial sample images if quota exceeded or generation failed
      const fallbacks = [
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
      ];
      const randomIndex = Math.floor(Math.random() * fallbacks.length);
      previewUrl = fallbacks[randomIndex];
    }

    res.json({ previewUrl, isQuotaFallback });
  } catch (error: any) {
    console.error("Lỗi khi sinh ảnh preview:", error);
    res.status(500).json({ error: error.message || "Lỗi server khi sinh ảnh" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server AI Product Photography Director đang chạy trên http://localhost:${PORT}`);
  });
}

startServer();
