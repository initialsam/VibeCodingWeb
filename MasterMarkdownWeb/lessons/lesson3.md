# 連結與圖片

連結和圖片是讓 Markdown 文件更豐富、更有用的重要元素。在這一課中，我們將學習如何添加各種類型的連結和圖片。

## 連結 (Links)

### 內聯連結 (Inline Links)

最基本的連結語法是 `[連結文字](URL)`：

```preview
title: 內聯連結範例

[Google](https://www.google.com)

[GitHub](https://github.com)

[連結到外部網站](https://www.example.com "這是可選的標題")
```

### 參考連結 (Reference Links)

當同一個連結要使用多次時，參考連結更方便：

```preview
title: 參考連結範例

我常用的搜尋引擎是 [Google][1] 和 [Bing][2]。
[Google][1] 是世界上最受歡迎的搜尋引擎。

[1]: https://www.google.com "Google 搜尋"
[2]: https://www.bing.com "Microsoft Bing"
```

### 自動連結

URL 可以直接寫成連結：

```preview
title: 自動連結範例

https://www.google.com

<https://www.google.com>

<admin@example.com>
```

### 錨點連結 (Anchor Links)

連結到同一頁面的其他部分：

```preview
title: 錨點連結範例

[跳到小結](#小結)

[回到頂部](#連結與圖片)
```

## 圖片 (Images)

### 內聯圖片

圖片語法類似連結，但前面加上驚嘆號：

```preview
title: 圖片範例

![替代文字](https://via.placeholder.com/150x100 "可選標題")

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

### 參考圖片

類似參考連結：

```preview
title: 參考圖片範例

![GitHub Logo][github-logo]
![Placeholder][placeholder]

[github-logo]: https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png "GitHub"
[placeholder]: https://via.placeholder.com/100x50 "示例圖片"
```

### 圖片連結

將圖片包在連結中：

```preview
title: 圖片連結範例

[![GitHub](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)](https://github.com)
```

## 進階技巧

### 相對路徑

使用相對路徑連結到本地文件：

```preview
title: 相對路徑範例

[另一個頁面](./page2.html)
[上級目錄](../index.html)
[圖片](./images/photo.jpg)
```

### 連結到檔案的特定行數

在 GitHub 等平台，可以連結到程式碼的特定行：

```preview
title: 程式碼行數連結

[查看第 10 行](https://github.com/user/repo/blob/main/file.js#L10)
[查看第 10-20 行](https://github.com/user/repo/blob/main/file.js#L10-L20)
```

## 練習時間

```exercise
title: 練習 1：創建基本連結
description: 創建一個指向 https://markdown.tw 的連結，連結文字為「Markdown 台灣」
initial: 
answer: [Markdown 台灣](https://markdown.tw)
hint: 使用 [文字](網址) 格式
```

```exercise
title: 練習 2：帶標題的連結
description: 創建一個指向 https://github.com 的連結，文字為「GitHub」，並加上標題「世界最大的程式碼託管平台」
initial: 
answer: [GitHub](https://github.com "世界最大的程式碼託管平台")
hint: 在網址後加空格和引號包圍的標題
```

```exercise
title: 練習 3：參考連結
description: 使用參考連結方式創建兩個連結：「Google」和「GitHub」，並在文件底部定義參考
initial: 
answer: [Google][1] 和 [GitHub][2] 是我常用的網站。

[1]: https://www.google.com
[2]: https://github.com
hint: 先寫 [文字][標籤]，然後在底部定義 [標籤]: 網址
```

```exercise
title: 練習 4：插入圖片
description: 插入一張圖片，替代文字為「示例圖片」，圖片網址為「https://via.placeholder.com/200x100」
initial: 
answer: ![示例圖片](https://via.placeholder.com/200x100)
hint: 圖片語法是 ![替代文字](圖片網址)
```

## 最佳實踐

### 1. 有意義的連結文字

```markdown
// 好的做法
查看我們的 [用戶指南](./user-guide.html) 以獲得詳細說明。

// 避免
點擊 [這裡](./user-guide.html) 查看用戶指南。
```

### 2. 圖片替代文字

始終為圖片提供有意義的替代文字：

```markdown
// 好的做法
![產品展示圖：紅色背包的正面照](./images/red-backpack.jpg)

// 避免
![圖片](./images/red-backpack.jpg)
```

### 3. 組織參考連結

將參考連結定義放在文件末尾，按字母順序排列：

```markdown
文件內容...

[1]: https://www.apple.com "Apple"
[2]: https://www.google.com "Google"  
[3]: https://github.com "GitHub"
```

### 4. 檢查連結有效性

定期檢查外部連結是否仍然有效，避免死連結。

## 連結和圖片的安全性

### 外部連結安全

對於外部連結，考慮添加安全屬性：

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">外部連結</a>
```

### 圖片載入優化

- 使用適當的圖片格式和大小
- 考慮使用 CDN 來提高載入速度
- 為大圖片提供縮略圖

## 小結

在這一課中，我們學習了：

1. **內聯連結**：直接在文字中嵌入連結
2. **參考連結**：使用參考方式創建可重用的連結
3. **自動連結**：直接顯示 URL 作為連結
4. **錨點連結**：連結到同一頁面的其他部分
5. **圖片語法**：插入圖片和設置替代文字
6. **圖片連結**：將圖片設為可點擊的連結
7. **最佳實踐**：如何編寫安全、有意義的連結和圖片

掌握連結和圖片的使用，能讓你的 Markdown 文件更加生動和實用。這些技能在編寫文檔、部落格文章和技術說明時都非常重要。

在下一課中，我們將學習如何使用引用和程式碼區塊，讓文件更加專業和易讀！