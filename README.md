# 聊聊程式 - Vibe Coding

一個充滿活力的程式學習平台，分享程式設計的美好時刻，探索技術的無限可能。

## 📂 專案架構

```
TestSDD/
├── index.html                    # 主入口頁面（聊聊程式 Vibe Coding）
├── MasterMarkdownWeb/            # Markdown 教學網站
│   ├── markdown-index.html       # Markdown 網站首頁
│   ├── lesson.html               # 課程頁面
│   ├── test.html                 # 功能測試頁面
│   ├── css/                      # 樣式檔案
│   ├── js/                       # JavaScript 檔案
│   └── lessons/                  # 課程內容
├── FamilyYouTube/                # 全家一起看 YouTube
│   ├── index.html                # YouTube 頻道推薦首頁
│   ├── css/                      # 樣式檔案
│   ├── js/                       # JavaScript 檔案
│   └── data/                     # 頻道資料 JSON 檔案
└── README.md                     # 專案說明
```

## 🎯 專案介紹

### 聊聊程式 - Vibe Coding

這是一個入口網站，展示各種程式教學專案。目前包含：

- **精通 Markdown**：互動式 Markdown 學習平台，提供完整的課程體系和實時練習功能
- **全家一起看 YouTube**：精選適合闔家觀賞的優質 YouTube 頻道推薦網站

更多精彩專案正在籌備中，敬請期待！

---

# 全家一起看 YouTube 🎬

一個純靜態網站，收錄了各類適合全家人一起觀賞的 YouTube 頻道。

## 🌟 專案特色

- **六大分類**：綜合娛樂、教育學習、科普知識、音樂藝術、兒童專區、生活風格
- **60+ 精選頻道**：每個分類 10 個優質頻道推薦
- **即時搜尋功能**：快速找到感興趣的頻道
- **活潑趣味設計**：色彩豐富、動畫流暢的使用者介面
- **完全響應式**：完美支援手機、平板、桌機各種裝置
- **純原生技術**：HTML + CSS + JavaScript，不依賴任何框架

## 🚀 快速使用

直接開啟 `FamilyYouTube/index.html` 即可使用，或透過主頁面的連結進入。

詳細說明請參考 [FamilyYouTube/README.md](FamilyYouTube/README.md)

---

# 精通 Markdown - 互動式教學網站

一個使用純 JavaScript 構建的互動式 Markdown 學習平台，提供完整的課程體系和實時練習功能。

現在已經整合到 `MasterMarkdownWeb` 資料夾中。

## 🚀 功能特色

- **8 堂完整課程**：從基礎到進階，涵蓋所有 Markdown 語法
- **互動式練習**：內建 CodeMirror 編輯器，支援即時答案驗證
- **實時預覽**：Markdown 程式碼與渲染結果對比顯示
- **響應式設計**：適配桌面和手機設備
- **企業級 UI**：深藍配色方案，專業簡潔
- **無依賴框架**：純 JavaScript 實現，載入快速

## 📚 課程內容

1. **Markdown 基礎入門** - 標題、段落、文字強調
2. **清單與列表** - 有序清單、無序清單、巢狀清單、任務清單
3. **連結與圖片** - 內聯連結、參考連結、圖片插入
4. **引用與程式碼** - 區塊引用、內聯程式碼、程式碼區塊
5. **表格製作** - 基本表格、對齊控制、格式化
6. **進階技巧** - 水平線、跳脫字符、HTML 嵌入、腳注
7. **擴充語法** - GitHub Flavored Markdown、CommonMark 擴展
8. **實戰應用** - README 撰寫、API 文檔、部落格寫作

## 🛠 技術架構

### 前端技術
- **HTML5** - 語義化標記結構
- **CSS3** - 現代化樣式和響應式布局
- **JavaScript ES6+** - 模組化程式架構
- **CodeMirror** - 程式編輯器
- **Marked.js** - Markdown 解析器

### 核心模組
- `renderer.js` - Markdown 渲染引擎
- `editor.js` - 互動練習管理
- `lesson.js` - 課程載入與導航
- `main.js` - 主頁面互動邏輯

## 🎯 快速開始

### 本地開發

1. **克隆專案**
   ```bash
   git clone <repository-url>
   cd markdown-learning-site
   ```

2. **啟動開發伺服器**
   ```bash
   # 使用 Python (Python 3)
   python -m http.server 8000
   
   # 使用 Node.js (如果已安裝)
   npx serve .
   
   # 使用 PHP (如果已安裝)
   php -S localhost:8000
   ```

3. **開啟瀏覽器**
   ```
   http://localhost:8000
   ```

### GitHub Pages 部署

1. **推送到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **啟用 GitHub Pages**
   - 進入 Repository Settings
   - 找到 Pages 設定
   - Source 選擇 "Deploy from a branch"
   - Branch 選擇 "main"
   - Folder 選擇 "/ (root)"
   - 點擊 Save

3. **訪問網站**
   ```
   https://username.github.io/repository-name
   ```

## 📁 專案結構

```
markdown-learning-site/
├── index.html              # 主頁面
├── lesson.html             # 課程頁面
├── css/
│   └── style.css          # 主樣式表
├── js/
│   ├── main.js            # 主頁面邏輯
│   ├── renderer.js        # Markdown 渲染器
│   ├── editor.js          # 編輯器管理
│   └── lesson.js          # 課程管理
├── lessons/
│   ├── lesson1.md         # 課程 1：基礎入門
│   ├── lesson2.md         # 課程 2：清單
│   ├── lesson3.md         # 課程 3：連結圖片
│   ├── lesson4.md         # 課程 4：引用程式碼
│   ├── lesson5.md         # 課程 5：表格
│   ├── lesson6.md         # 課程 6：進階技巧
│   ├── lesson7.md         # 課程 7：擴充語法
│   └── lesson8.md         # 課程 8：實戰應用
└── README.md              # 專案說明
```

## 🎨 設計特色

### 視覺設計
- **企業風格**：深藍主色調 (#1a365d)，搭配淺灰背景
- **現代化 UI**：圓角卡片設計，適度陰影效果
- **清晰層次**：明確的資訊架構和視覺層級

### 互動設計
- **左側導航**：固定式課程目錄，清楚標示學習進度
- **響應式布局**：手機版自動收合側邊欄
- **即時反饋**：練習題答案驗證，成功/錯誤狀態提示

### 使用者體驗
- **鍵盤導航**：支援方向鍵切換課程
- **書籤支援**：URL 參數記錄當前課程
- **載入動畫**：優雅的載入狀態提示

## 🔧 自定義設置

### 修改主題色彩

編輯 `css/style.css` 中的 CSS 變數：

```css
:root {
    --primary-blue: #1a365d;      /* 主要藍色 */
    --secondary-blue: #2b77ad;    /* 次要藍色 */
    --success: #38a169;           /* 成功綠色 */
    --error: #e53e3e;             /* 錯誤紅色 */
}
```

### 添加新課程

1. 在 `lessons/` 目錄創建新的 `.md` 文件
2. 更新 `js/lesson.js` 中的課程列表
3. 更新 `index.html` 和 `lesson.html` 中的導航選單

### 自定義練習格式

在 Markdown 文件中使用特殊程式碼區塊：

```markdown
```exercise
title: 練習標題
description: 練習描述
initial: 初始程式碼
answer: 正確答案
hint: 提示內容
```
```

## 🚀 進階功能

### 支援的 Markdown 擴展

- **GitHub Flavored Markdown (GFM)**
- **語法高亮程式碼**
- **任務清單**
- **表格對齊**
- **自動連結**

### 互動元素

- **程式碼編輯器**：語法高亮、自動完成
- **實時預覽**：Markdown 程式碼對比渲染結果
- **答案驗證**：智慧比對，忽略空白差異
- **提示系統**：漸進式學習輔助

## 📱 瀏覽器支援

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- 手機瀏覽器支援

## 🤝 貢獻指南

歡迎貢獻課程內容、修復錯誤或新增功能！

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/new-lesson`)
3. 提交變更 (`git commit -am 'Add new lesson'`)
4. 推送分支 (`git push origin feature/new-lesson`)
5. 創建 Pull Request

## 📄 版本資訊

### v1.0.0 (2024-01-XX)
- ✅ 完整的 8 課程內容
- ✅ 互動式編輯器與答案檢驗系統
- ✅ 數學公式渲染支援 (KaTeX)
- ✅ 響應式企業級 UI 設計
- ✅ 智能錯誤提示與解答系統
- ✅ 移動設備完全適配

### 修復記錄
- ✅ 修復 marked.js 初始化和載入順序問題
- ✅ 修復課程載入失敗與 "Markdown renderer not initialized" 錯誤
- ✅ 優化練習題互動體驗，修復重複輸入框問題
- ✅ 改善數學公式顯示版面，壓縮原始碼區域高度
- ✅ 移除 Mermaid 圖表渲染功能，加入官方參考連結
- ✅ 新增連續答錯三次後的解答提示功能
- ✅ 優化答案渲染結果顯示，同時顯示原始語法和渲染結果

## 👨‍💻 關於作者

**Initials** - 致力於技術教育與知識分享

- 📘 [Facebook 粉絲專頁](https://www.facebook.com/initials4u)
- ✍️ [技術部落格](https://dotblogs.com.tw/initials)

## 📄 授權協議

本專案採用 [MIT 授權協議](LICENSE)。

## 🙏 致謝

- [Marked.js](https://marked.js.org/) - Markdown 解析器
- [CodeMirror](https://codemirror.net/) - 程式編輯器
- [Inter Font](https://rsms.me/inter/) - 現代化字體

---

**開始學習 Markdown，成為文件寫作專家！** 🎉