# Markdown 擴充語法

標準 Markdown 之外，還有許多擴充語法提供額外功能。在這一課中，我們將學習最流行的擴充語法，特別是 GitHub Flavored Markdown (GFM)。

## GitHub Flavored Markdown (GFM)

GitHub 是最大的程式碼託管平台，其擴充的 Markdown 語法已成為事實上的標準。

### 刪除線

使用兩個波浪號來創建刪除線：

```preview
title: 刪除線範例

~~這段文字被刪除了~~

原價：~~$100~~ 現價：$80

任務清單：
- [x] 完成設計
- [x] ~~開發功能A~~ (已取消)
- [ ] 開發功能B
```

### 語法高亮程式碼

GFM 支援豐富的語法高亮：

```preview
title: 語法高亮範例

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

### 任務清單增強

GFM 的任務清單支援更多狀態：

```preview
title: 增強任務清單

## 專案進度

- [x] 需求分析
- [x] 系統設計  
- [ ] 前端開發
  - [x] 登入頁面
  - [ ] 主頁面
  - [ ] 設定頁面
- [ ] 後端開發
- [ ] 測試
- [ ] 部署

## 問題追蹤

- [x] 修復登入bug #123
- [ ] 優化效能 #124
- [ ] 添加新功能 #125
```

### 表格增強功能

GFM 的表格支援更豐富的內容：

```preview
title: GFM 表格增強

| 功能      | 支援程度 | 說明                    | 連結                    |
|-----------|:--------:|------------------------|------------------------|
| 基本語法  | ✅       | 完全支援               | [文檔](link)           |
| 表格      | ✅       | 支援對齊和格式          | [範例](link)           |
| 程式碼    | ⚠️       | 部分限制               | [問題](link)           |
| 圖片      | ❌       | 暫不支援               | [請求](link)           |
| 數學公式  | 🔄       | 開發中                 | [進度](link)           |

**圖例：**
- ✅ 完全支援
- ⚠️ 部分支援  
- ❌ 不支援
- 🔄 開發中
```

## 自動連結增強

GFM 自動識別更多類型的連結：

```preview
title: 自動連結範例

網址會自動成為連結：
https://github.com
www.google.com

電子郵件也會自動連結：
admin@example.com

GitHub 特定的參考：
- 問題：#123
- Pull Request：#456  
- 提交：commit abc1234
- 使用者：@username
- 儲存庫：user/repo
```

## 圍欄程式碼區塊

除了三個反引號，還支援其他方式：

```preview
title: 圍欄程式碼範例

~~~javascript
// 使用波浪號
function hello() {
    console.log('Hello World!');
}
~~~

```diff
  function calculate(a, b) {
-     return a + b;
+     return (a + b) * 1.1;
  }
```

```javascript {1,3-4}
// 高亮特定行
function process() {
    const data = getData();     // 高亮
    const result = transform(data); // 高亮  
    const final = validate(result); // 高亮
    return final;
}
```
```

## 練習時間

```exercise
title: 練習 1：刪除線
description: 將「舊版本」標記為刪除線，並在後面加上「新版本」
initial: 這是舊版本的功能說明。
answer: 這是~~舊版本~~新版本的功能說明。
hint: 使用兩個波浪號 ~~ 來創建刪除線
```

```exercise
title: 練習 2：增強任務清單
description: 創建一個包含已完成和未完成項目的學習計畫任務清單
initial: 
answer: - [x] 學會基本語法
- [x] 完成練習題
- [ ] 學會進階技巧
- [ ] 完成專案
hint: 使用 [x] 表示完成，[ ] 表示未完成
```

```exercise
title: 練習 3：表格with表情符號
description: 創建一個功能支援表，使用表情符號表示不同的支援狀態
initial: 
answer: | 功能 | 狀態 |
|------|------|
| 基本 | ✅   |
| 進階 | ⚠️   |
| 實驗 | ❌   |
hint: 使用 ✅ ⚠️ ❌ 等表情符號
```

## CommonMark 擴展

CommonMark 是 Markdown 的標準化版本，也有一些擴展：

### 腳注

```preview
title: CommonMark 腳注

這是一個包含腳注的句子[^1]。

還有另一個腳注[^long-note]。

[^1]: 簡短的腳注。

[^long-note]: 這是一個較長的腳注。
    
    可以包含多個段落。
    
    ```
    甚至可以包含程式碼
    ```
    
    - 或是清單
    - 項目
```

### 定義清單

```preview
title: 定義清單範例

Apple
:   水果的一種，通常是紅色或綠色。

Orange  
:   柑橘類水果。

:   也可以指橙色。
```

## Pandoc Markdown

Pandoc 是強大的文件轉換工具，支援豐富的 Markdown 擴展：

### 表格標題

```preview
title: Pandoc 表格標題

: 季度銷售數據

| 季度 | 銷售額 | 成長率 |
|------|--------|--------|
| Q1   | 100萬  | +5%    |
| Q2   | 120萬  | +20%   |
| Q3   | 110萬  | -8%    |
| Q4   | 140萬  | +27%   |
```

### 圖片標題

```preview
title: 圖片標題範例

![系統架構圖](architecture.png "系統整體架構"){#fig:architecture}

如圖 @fig:architecture 所示，系統分為三個主要模組。
```

## MultiMarkdown 擴展

### 元數據

```yaml
Title: 我的文件
Author: 張三
Date: 2024-01-01
Keywords: markdown, 教學
```

### 數學公式

```preview
title: MultiMarkdown 數學公式

內聯數學：\\(E = mc^2\\)

區塊數學：
\\[
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
\\]
```

## 選擇適合的擴展

### 根據平台選擇

| 平台         | 推薦擴展          | 特色功能            |
|--------------|-------------------|-------------------|
| GitHub       | GFM              | 任務清單、表格     |
| GitLab       | GFM + 額外        | Mermaid 圖表      |
| Notion       | 自定義            | 資料庫、嵌入       |
| Typora       | GFM + 數學       | 實時預覽          |
| Pandoc       | Pandoc Markdown  | 多格式轉換        |

```preview
title: 圖表語法參考

**Mermaid 序列圖語法範例：**

\`\`\`mermaid
sequenceDiagram
    participant A as 使用者
    participant B as 系統
    A->>B: 登入請求
    B-->>A: 驗證回應
    A->>B: 操作請求
    B-->>A: 操作結果
\`\`\`

**學習資源：**
- [Mermaid 序列圖官方文檔](https://mermaid.js.org/syntax/sequenceDiagram.html)
- [其他圖表類型](https://mermaid.js.org/)

**注意：** 本教學平台不提供 Mermaid 圖表渲染功能，請參考上述連結學習完整的圖表語法。
```

## 練習時間

```exercise
title: 練習 4：平台選擇
description: 根據使用場景，選擇合適的 Markdown 擴展和平台
initial: 我想要寫技術文檔，包含程式碼和數學公式
answer: 我想要寫技術文檔，包含程式碼和數學公式

推薦平台：**Typora** 或 **Pandoc**
- 支援 GFM 語法高亮
- 支援數學公式渲染
- 實時預覽功能
hint: 考慮需要的功能：程式碼高亮、數學公式、實時預覽
```

### 根據需求選擇

- **技術文檔**：GFM + 數學公式
- **學術論文**：Pandoc + 引用管理
- **部落格**：GFM + 自定義擴展
- **專案文檔**：GFM + Mermaid

## 相容性考慮

### 保持向下相容

```markdown
<!-- 好的做法：使用標準語法 -->
**重要**：這段文字很重要。

<!-- 謹慎使用：擴展語法 -->
==高亮文字==（可能不被所有解析器支援）
```

### 提供替代方案

```markdown
<!-- 如果支援數學公式 -->
$$E = mc^2$$

<!-- 不支援時的替代方案 -->
E = mc²（愛因斯坦的質能方程式）
```

## 測試工具

### 線上測試

- [Dillinger](https://dillinger.io/)
- [StackEdit](https://stackedit.io/)
- [Markdown Live Preview](https://markdownlivepreview.com/)

### 本地測試

```bash
# 安裝 markdown-it
npm install -g markdown-it

# 測試文檔
markdown-it README.md > README.html
```

## 小結

在這一課中，我們學習了各種 Markdown 擴充語法：

1. **GitHub Flavored Markdown (GFM)**：最流行的擴展
   - 刪除線、語法高亮、增強任務清單
   - 自動連結、表格增強功能

2. **CommonMark 擴展**：標準化的擴展功能
   - 腳注、定義清單

3. **Pandoc Markdown**：學術和專業文檔
   - 表格標題、圖片標題、交叉引用

4. **選擇策略**：根據平台和需求選擇合適的擴展

5. **相容性**：保持向下相容並提供替代方案

了解這些擴展語法能讓你在不同平台上更有效地使用 Markdown。記住，不要過度依賴特定平台的擴展，保持基本的相容性是很重要的。

在最後一課中，我們將學習 Markdown 的實戰應用，包括如何在實際專案中使用 Markdown！