# 引用與程式碼

引用和程式碼區塊是技術文檔中不可或缺的元素。在這一課中，我們將學習如何使用這些功能來更好地組織和呈現內容。

## 引用 (Blockquotes)

### 基本引用

使用 `>` 符號來創建引用：

```preview
title: 基本引用範例

> 這是一段引用文字。
> 可以跨越多行。

> 這是另一段引用。
```

### 巢狀引用

引用可以巢狀使用：

```preview
title: 巢狀引用範例

> 這是第一層引用。
> 
> > 這是第二層引用。
> > 
> > > 這是第三層引用。
> 
> 回到第一層引用。
```

### 引用中的其他元素

引用中可以包含其他 Markdown 元素：

```preview
title: 複雜引用範例

> ## 重要提醒
> 
> 這是一個**重要**的引用，包含：
> 
> 1. 有序列表項目
> 2. *斜體文字*
> 
> 還有一些程式碼：`console.log('Hello')`
> 
> > 這是巢狀引用。
```

## 程式碼 (Code)

### 內聯程式碼

使用反引號來標記內聯程式碼：

```preview
title: 內聯程式碼範例

使用 `console.log()` 來輸出訊息到控制台。

在 HTML 中，`<div>` 是一個常用的容器元素。

使用 `git commit -m "message"` 來提交更改。
```

### 程式碼區塊

使用三個反引號來創建程式碼區塊：

```preview
title: 程式碼區塊範例

```
這是一個簡單的程式碼區塊
沒有語法高亮
```

```javascript
// JavaScript 程式碼
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet('World');
```

```python
# Python 程式碼
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```
```

### 縮排程式碼區塊

也可以使用 4 個空格或 1 個 Tab 來創建程式碼區塊：

```preview
title: 縮排程式碼區塊範例

這是正常文字。

    這是程式碼區塊
    使用縮排創建
    function hello() {
        console.log('Hello');
    }

回到正常文字。
```

## 常用程式語言範例

### JavaScript

```preview
title: JavaScript 範例

```javascript
// 變數宣告
const message = 'Hello, World!';
let count = 0;

// 函式定義
function increment() {
    count++;
    return count;
}

// 箭頭函式
const greet = (name) => `Hello, ${name}!`;

// 物件
const user = {
    name: 'John',
    age: 30,
    isActive: true
};
```
```

### Python

```preview
title: Python 範例

```python
# 變數賦值
message = "Hello, World!"
count = 0

# 函式定義
def increment():
    global count
    count += 1
    return count

# 類別定義
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}"

# 列表理解
numbers = [x**2 for x in range(10)]
```
```

### CSS

```preview
title: CSS 範例

```css
/* 基本選擇器 */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Flexbox 布局 */
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* 響應式設計 */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
}
```
```

## 練習時間

```exercise
title: 練習 1：基本引用
description: 創建一個引用，內容為「學而時習之，不亦說乎」
initial: 
answer: > 學而時習之，不亦說乎
hint: 使用 > 符號開始引用
```

```exercise
title: 練習 2：內聯程式碼
description: 在這句話中將「console.log」標記為內聯程式碼：「使用 console.log 輸出訊息」
initial: 使用 console.log 輸出訊息
answer: 使用 `console.log` 輸出訊息
hint: 使用反引號包圍程式碼
```

```exercise
title: 練習 3：JavaScript 程式碼區塊
description: 創建一個 JavaScript 程式碼區塊，內容為簡單的 hello world 函式
initial: 
answer: ```javascript
function hello() {
    console.log('Hello, World!');
}
```
hint: 使用 ```javascript 開始，``` 結束
```

```exercise
title: 練習 4：引用中的格式
description: 創建一個引用，包含粗體文字「注意」和內聯程式碼「npm install」
initial: 
answer: > **注意**：請先執行 `npm install` 安裝依賴。
hint: 在引用中可以使用其他 Markdown 語法
```

## 程式碼區塊的進階用法

### 指定檔案名稱

某些 Markdown 解析器支援顯示檔案名稱：

```javascript
// file: app.js
function main() {
    console.log('Application started');
}
```

### 高亮特定行

```javascript {2,4}
function calculate(a, b) {
    const sum = a + b;  // 這行被高亮
    const product = a * b;
    return { sum, product };  // 這行也被高亮
}
```

### 差異顯示

```diff
function greet(name) {
-   console.log('Hello ' + name);
+   console.log(`Hello ${name}!`);
}
```

## 引用的實際應用

### 1. 警告和提示

```preview
title: 警告引用範例

> ⚠️ **警告**
> 
> 執行此命令前請確保已備份重要資料。

> 💡 **提示**
> 
> 使用 `Ctrl+C` 可以中斷正在執行的程式。

> ✅ **成功**
> 
> 設定已儲存並套用。
```

### 2. 引用他人言論

```preview
title: 引用言論範例

正如 Steve Jobs 所說：

> Stay hungry, stay foolish.
> 
> — Steve Jobs, 2005 Stanford Commencement

這句話激勵了無數創業者。
```

### 3. FAQ 格式

```preview
title: FAQ 引用範例

**Q: 如何安裝這個套件？**

> 使用 npm 安裝：
> ```
> npm install package-name
> ```

**Q: 支援哪些瀏覽器？**

> 支援所有現代瀏覽器：
> - Chrome 80+
> - Firefox 75+
> - Safari 13+
```

## 最佳實踐

### 1. 選擇合適的程式碼標記方式

```markdown
// 短程式碼使用內聯
使用 `Array.map()` 方法來轉換陣列。

// 長程式碼使用區塊
```javascript
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n * n);
console.log(squared);
```
```

### 2. 指定語言以獲得語法高亮

```markdown
// 好的做法
```javascript
console.log('Hello');
```

// 避免（沒有語法高亮）
```
console.log('Hello');
```
```

### 3. 保持引用的簡潔

```markdown
// 好的做法
> 這是一個重要的提醒。

// 避免過長的引用
> 這是一個非常非常長的引用，包含了太多不必要的資訊...
```

## 小結

在這一課中，我們學習了：

1. **基本引用**：使用 `>` 創建引用區塊
2. **巢狀引用**：創建多層級的引用
3. **內聯程式碼**：使用反引號標記程式碼
4. **程式碼區塊**：使用三個反引號創建程式碼區塊
5. **語法高亮**：指定程式語言以獲得語法高亮
6. **實際應用**：警告提示、引用他人言論、FAQ 等
7. **最佳實踐**：如何有效使用引用和程式碼

掌握引用和程式碼的語法，對於撰寫技術文檔、教學材料和程式說明非常重要。這些工具能讓你的文件更加專業和易讀。

在下一課中，我們將學習如何創建和格式化表格，這是另一個重要的內容組織工具！