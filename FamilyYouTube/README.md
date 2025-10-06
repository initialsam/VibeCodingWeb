# 🎬 全家一起看 YouTube

> 精選適合闔家觀賞的優質 YouTube 頻道

## 📖 專案簡介

這是一個純靜態網站，收錄了各類適合全家人一起觀賞的 YouTube 頻道。網站提供簡潔易用的分類導航與搜尋功能，讓使用者快速找到感興趣的頻道。

## ✨ 特色功能

- 🎯 **六大分類**：綜合娛樂、教育學習、科普知識、音樂藝術、兒童專區、生活風格
- 🔍 **即時搜尋**：支援頻道名稱與描述搜尋
- 🎨 **活潑設計**：色彩豐富、動畫流暢的使用者介面
- 📱 **完全響應式**：完美支援手機、平板、桌機各種裝置
- ⚡ **純靜態架構**：不依賴任何框架，載入速度超快
- ♿ **無障礙設計**：支援鍵盤操作與螢幕閱讀器

## 🚀 快速開始

### 線上預覽

直接在瀏覽器開啟 `index.html` 即可使用。

### 本地部署

1. 下載或複製此專案
2. 使用任何 Web 伺服器（如 VS Code Live Server）開啟
3. 或直接在瀏覽器開啟 `index.html`

### GitHub Pages 部署

1. 將專案推送到 GitHub
2. 在 Repository Settings > Pages 中啟用 GitHub Pages
3. 選擇分支與資料夾
4. 稍等片刻即可透過網址存取

## 📁 專案結構

```
FamilyYouTube/
├── index.html              # 主頁面
├── css/
│   └── style.css          # 樣式表
├── js/
│   └── app.js             # JavaScript 邏輯
├── data/                  # 頻道資料
│   ├── entertainment.json # 綜合娛樂
│   ├── education.json     # 教育學習
│   ├── science.json       # 科普知識
│   ├── music.json         # 音樂藝術
│   ├── kids.json          # 兒童專區
│   └── lifestyle.json     # 生活風格
└── README.md              # 專案說明
```

## 🎨 技術規格

- **HTML5**：語意化標籤、無障礙屬性
- **CSS3**：Flexbox、Grid、動畫效果、響應式設計
- **原生 JavaScript (ES6)**：Fetch API、動態渲染、事件處理

## 📊 資料格式

每個 JSON 檔案包含頻道陣列，格式如下：

```json
[
  {
    "name": "頻道名稱",
    "link": "https://youtube.com/@channelname",
    "description": "頻道簡介（1-2行）"
  }
]
```

## 🎯 響應式斷點

| 裝置類型 | 寬度範圍 | Grid 欄數 |
|---------|---------|-----------|
| 手機 | < 768px | 1 欄 |
| 平板 | 768px - 1023px | 2-3 欄 |
| 桌機 | ≥ 1024px | 4 欄 |

## ⌨️ 鍵盤快捷鍵

- `Ctrl/Cmd + K`：聚焦搜尋框
- `ESC`：清除搜尋

## 🔧 自訂與擴充

### 新增頻道

編輯對應分類的 JSON 檔案，加入新的頻道物件。

### 新增分類

1. 在 `data/` 資料夾建立新的 JSON 檔案
2. 在 `index.html` 加入分類按鈕
3. 在 `js/app.js` 的 `categories` 物件中註冊新分類

### 修改樣式

編輯 `css/style.css` 中的 CSS 變數即可快速調整主題色彩。

## 📝 授權

本專案採用 MIT 授權條款。

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request 來改進此專案！

## 📧 聯絡資訊

如有任何問題或建議，歡迎透過 GitHub Issues 聯繫。

---

**用心整理，與家人共享美好時光** ✨
