# 進階技巧

在掌握了 Markdown 的基本語法後，讓我們探索一些進階技巧，這些技巧將讓您的文件更加專業和實用。

## 水平分隔線

使用三個或更多的連字號、星號或底線來創建水平分隔線：

```preview
title: 水平分隔線範例

這是第一部分的內容。

---

這是第二部分的內容。

***

這是第三部分的內容。

___

這是第四部分的內容。
```

## 跳脫字符

當你需要顯示 Markdown 的特殊字符時，使用反斜線進行跳脫：

```preview
title: 跳脫字符範例

\*這不是斜體\*

\#這不是標題

\`這不是程式碼\`

\[這不是連結\](URL)

如果要顯示反斜線本身：\\
```

## 內嵌 HTML

Markdown 支援內嵌 HTML，讓您可以實現更複雜的格式：

```preview
title: 內嵌 HTML 範例

<div style="color: red; font-weight: bold;">
這是紅色粗體文字
</div>

<details>
<summary>點擊展開詳細內容</summary>

這是被隱藏的內容，點擊上方可以展開或收合。

可以包含任何 Markdown 語法：

- 列表項目
- **粗體文字**
- `程式碼`

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd> 複製

<mark>這是高亮文字</mark>
```

## 腳注 (Footnotes)

許多 Markdown 處理器支援腳注功能：

```preview
title: 腳注範例

這是一段包含腳注的文字[^1]。

這裡還有另一個腳注[^note]。

[^1]: 這是第一個腳注的內容。

[^note]: 這是命名腳注的內容，可以包含多行。
    
    甚至可以包含程式碼：
    
    ```javascript
    console.log('Hello from footnote!');
    ```
```

## 定義清單

創建詞彙定義清單：

```preview
title: 定義清單範例

HTML
:   超文本標記語言，用於創建網頁的標準標記語言。

CSS
:   階層式樣式表，用於描述文件外觀和格式的樣式表語言。

JavaScript
:   一種動態程式語言，主要用於網頁開發。
    可以在瀏覽器和伺服器端執行。
```

## 縮寫

某些處理器支援縮寫定義：

```preview
title: 縮寫範例

*[HTML]: 超文本標記語言
*[CSS]: 階層式樣式表
*[API]: 應用程式設計介面

HTML 和 CSS 是網頁開發的基礎。
API 讓不同的軟體系統能夠溝通。
```

## 數學公式

使用 LaTeX 語法來添加數學公式（需要支援 MathJax 或 KaTeX）：

```preview
title: 數學公式範例

內聯公式：$E = mc^2$

區塊公式：
$$\sum_{i=1}^{n} x_i = \frac{a+b}{2}$$
```

## 練習時間

```exercise
title: 練習 1：跳脫字符
description: 顯示這段文字：*這不是斜體* 和 #這不是標題
initial: 
answer: \*這不是斜體\* 和 \#這不是標題
hint: 使用反斜線 \ 來跳脫特殊字符
```

```exercise
title: 練習 2：水平分隔線
description: 在兩段文字之間插入一條水平分隔線
initial: 這是第一段。

這是第二段。
answer: 這是第一段。

---

這是第二段。
hint: 使用三個連字號 --- 創建分隔線
```

```exercise
title: 練習 3：HTML 標籤
description: 使用 HTML 創建一個紅色的粗體文字「重要提醒」
initial: 
answer: <span style="color: red; font-weight: bold;">重要提醒</span>
hint: 使用 <span> 標籤配合 style 屬性
```

```exercise
title: 練習 4：腳注
description: 創建一個包含腳注的句子，腳注內容為「這是腳注說明」
initial: 
answer: 這是一個重要的概念[^1]。

[^1]: 這是腳注說明
hint: 使用 [^1] 標記腳注，並在下方定義 [^1]: 內容
```

## 進階格式技巧

### 1. 文字對齊

雖然標準 Markdown 不直接支援文字對齊，但可以使用 HTML：

```html
<div align="center">置中文字</div>
<div align="right">右對齊文字</div>
```

### 2. 文字顏色和樣式

```html
<span style="color: blue;">藍色文字</span>
<span style="background-color: yellow;">黃色背景</span>
<span style="font-size: 20px;">大字體</span>
```

### 3. 圖片進階控制

```html
<img src="image.jpg" alt="說明" width="300" height="200">
<img src="image.jpg" alt="說明" style="float: left; margin: 10px;">
```

## 文件結構最佳實踐

### 1. 使用一致的標題層級

```markdown
# 文件標題 (H1)

## 主要章節 (H2)

### 子章節 (H3)

#### 詳細內容 (H4)
```

### 2. 目錄（TOC）

```markdown
## 目錄

- [介紹](#介紹)
- [安裝](#安裝)
  - [系統需求](#系統需求)
  - [安裝步驟](#安裝步驟)
- [使用方法](#使用方法)
- [常見問題](#常見問題)
```

### 3. 元數據和前言

在文件開頭添加 YAML 前言：

```yaml
---
title: "文件標題"
author: "作者名稱"
date: "2024-01-01"
tags: ["markdown", "教學"]
---
```

## 可訪問性考慮

### 1. 替代文字

```markdown
![螢幕截圖顯示登入表單，包含用戶名和密碼欄位](screenshot.png)
```

### 2. 語義化標記

```markdown
**重要**：這是關鍵資訊。

*強調*：這需要注意。
```

### 3. 清晰的連結文字

```markdown
// 好的做法
查看我們的[使用者指南](user-guide.html)

// 避免
點擊[這裡](user-guide.html)查看指南
```

## 效能優化

### 1. 圖片優化

- 使用適當的圖片格式（WebP、JPEG、PNG）
- 壓縮圖片大小
- 使用 lazy loading

### 2. 文件結構

- 將長文件分割成多個章節
- 使用目錄和錨點導航
- 避免過深的巢狀結構

## 小結

在這一課中，我們探索了 Markdown 的進階技巧：

1. **水平分隔線**：使用 `---` 分割內容區塊
2. **跳脫字符**：使用 `\` 顯示特殊字符
3. **內嵌 HTML**：實現更複雜的格式和互動元素
4. **腳注**：添加補充說明和參考資料
5. **定義清單**：創建詞彙解釋
6. **數學公式**：使用 LaTeX 語法
7. **圖表**：使用 Mermaid 創建流程圖和時序圖
8. **最佳實踐**：文件結構、可訪問性和效能優化

這些進階技巧讓您能夠創建更專業、更實用的文件。根據您的需求選擇合適的技巧，不要過度使用複雜功能。

在下一課中，我們將學習 Markdown 的各種擴充語法，包括 GitHub Flavored Markdown 等流行的擴展！