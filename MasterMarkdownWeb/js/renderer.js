// Markdown Renderer with Exercise Support - Using Custom Renderer
class MarkdownRenderer {
    constructor() {
        console.log('Initializing MarkdownRenderer...');
        this.isInitialized = false;
        this.initPromise = this.init();
    }
    
    async init() {
        try {
            // 等待所有必要的庫載入
            await this.waitForLibraries();
            
            // 設置自定義 renderer
            const renderer = {
                code(code, infoString) {
                    const language = infoString || '';
                    console.log('Custom code renderer called with language:', language);
                    
                    if (language === 'exercise') {
                        console.log('Processing exercise block');
                        return window.markdownRenderer.createExerciseBlock(code);
                    } else if (language === 'preview') {
                        console.log('Processing preview block');
                        return window.markdownRenderer.createPreviewBlock(code);
                    }
                    
                    // 普通代碼區塊
                    return `<pre><code class="language-${language}">${window.markdownRenderer.escapeHtml(code)}</code></pre>`;
                }
            };
            
            marked.use({ renderer });
            window.markdownRenderer = this;
            
            this.isInitialized = true;
            console.log('MarkdownRenderer initialized successfully');
        } catch (error) {
            console.error('Error initializing MarkdownRenderer:', error);
            this.isInitialized = false;
            throw error;
        }
    }
    
    async waitForLibraries() {
        const maxAttempts = 50;
        let attempts = 0;
        
        while (attempts < maxAttempts) {
            if (typeof marked !== 'undefined') {
                console.log('marked.js loaded successfully');
                return;
            }
            
            console.log(`Waiting for marked.js... attempt ${attempts + 1}/${maxAttempts}`);
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        throw new Error('marked.js failed to load after maximum attempts');
    }
    
    async render(markdown) {
        console.log('Rendering markdown with custom renderer...');
        try {
            // 等待初始化完成
            if (!this.isInitialized) {
                console.log('Waiting for renderer initialization...');
                await this.initPromise;
            }
            
            if (!this.isInitialized) {
                throw new Error('Markdown renderer initialization failed');
            }
            
            // 首先處理數學公式
            markdown = this.processMathFormulas(markdown);
            
            // 使用 marked 進行渲染
            let html = marked.parse(markdown);
            
            console.log('Rendering completed, HTML length:', html.length);
            
            return html;
        } catch (error) {
            console.error('Error in render:', error);
            return `<div class="error">Render Error: ${error.message}</div>`;
        }
    }
    
    processMathFormulas(markdown) {
        // 處理塊級數學公式 $$...$$
        markdown = markdown.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
            const formulaId = 'math-block-' + Math.random().toString(36).substr(2, 9);
            return `<div class="math-block" id="${formulaId}" data-formula="${this.escapeHtml(formula.trim())}"></div>`;
        });
        
        // 處理內聯數學公式 $...$
        markdown = markdown.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
            const formulaId = 'math-inline-' + Math.random().toString(36).substr(2, 9);
            return `<span class="math-inline" id="${formulaId}" data-formula="${this.escapeHtml(formula.trim())}"></span>`;
        });
        
        return markdown;
    }
    
    createExerciseBlock(exerciseData) {
        console.log('Creating exercise block, data length:', exerciseData.length);
        const lines = exerciseData.trim().split('\n');
        
        let title = '練習題';
        let description = '';
        let initialCode = '';
        let answer = '';
        let hint = '';
        
        let currentSection = '';
        
        // 解析練習數據
        for (const line of lines) {
            if (line.startsWith('title:')) {
                title = line.substring(6).trim();
                currentSection = '';
            } else if (line.startsWith('description:')) {
                description = line.substring(12).trim();
                currentSection = '';
            } else if (line.startsWith('initial:')) {
                currentSection = 'initial';
                initialCode = line.substring(8).trim();
            } else if (line.startsWith('answer:')) {
                currentSection = 'answer';
                answer = line.substring(7).trim();
            } else if (line.startsWith('hint:')) {
                hint = line.substring(5).trim();
                currentSection = '';
            } else if (currentSection && line.trim()) {
                // 處理多行內容
                if (currentSection === 'initial') {
                    initialCode += (initialCode ? '\n' : '') + line;
                } else if (currentSection === 'answer') {
                    answer += (answer ? '\n' : '') + line;
                }
            }
        }

        const exerciseId = 'exercise-' + Math.random().toString(36).substr(2, 9);
        
        console.log('Exercise data parsed:', {
            title: title,
            description: description.substring(0, 50) + '...',
            initialCode: initialCode || '(empty)',
            answer: answer.substring(0, 30) + '...',
            hint: hint || '(none)'
        });
        
        // 生成 HTML
        return `
<div class="exercise-block" data-exercise-id="${exerciseId}">
    <div class="exercise-title">${this.escapeHtml(title)}</div>
    <div class="exercise-description">${this.escapeHtml(description)}</div>
    <div class="editor-container">
        <textarea class="exercise-editor" data-exercise-id="${exerciseId}" data-answer="${this.escapeHtml(answer)}" data-hint="${this.escapeHtml(hint)}">${this.escapeHtml(initialCode)}</textarea>
        <div class="editor-actions">
            <div>
                ${hint ? `<button class="btn-hint" onclick="showHint('${exerciseId}')">💡 提示</button>` : ''}
                <button class="btn-reset" onclick="resetExercise('${exerciseId}')">重設</button>
            </div>
            <button class="btn-check" onclick="checkAnswer('${exerciseId}')">檢查答案</button>
        </div>
        <div class="result-message" id="result-${exerciseId}"></div>
        <div class="exercise-preview" id="preview-${exerciseId}" style="display: none;">
            <div class="preview-header">✅ 您的答案渲染結果：</div>
            <div class="preview-content" id="preview-content-${exerciseId}"></div>
        </div>
    </div>
</div>`;
    }
    
    createPreviewBlock(previewData) {
        console.log('Creating preview block');
        const lines = previewData.trim().split('\n');
        let title = 'Markdown 預覽';
        let markdown = '';
        
        for (const line of lines) {
            if (line.startsWith('title:')) {
                title = line.substring(6).trim();
            } else {
                markdown += (markdown ? '\n' : '') + line;
            }
        }

        // 使用簡化的渲染器處理預覽內容
        const htmlContent = this.renderPreviewContent(markdown);
        
      
        
        return `
<div class="preview-block">
    <div class="preview-header">${this.escapeHtml(title)}</div>
    <div class="preview-content">
        <div class="preview-grid">
            <div class="preview-source">
                <strong style="color: #cbd5e0; display: block; margin-bottom: 0.5rem;">Markdown 原始碼：</strong>
                <pre style="margin: 0; white-space: pre-wrap; font-size: inherit;">${this.escapeHtml(markdown)}</pre>
            </div>
            <div class="preview-result">
                <strong style="color: var(--text-secondary); display: block; margin-bottom: 1rem;">渲染結果：</strong>
                <div class="markdown-preview">${htmlContent}</div>
            </div>
        </div>
    </div>
</div>`;
    }
    
    renderPreviewContent(markdown) {
        // 處理數學公式
        const processedMarkdown = this.processMathFormulas(markdown);
        
        // 使用預設渲染器進行預覽
        return marked.parse(processedMarkdown);
    }
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
    
    // 初始化數學公式渲染
    static initializeMathAndDiagrams() {
        // 渲染頁面上的數學公式
        MarkdownRenderer.renderMathAndDiagrams();
    }
    
    static renderMathAndDiagrams() {
        // 渲染數學公式
        if (typeof katex !== 'undefined') {
            // 渲染塊級數學公式
            document.querySelectorAll('.math-block:not([data-rendered])').forEach(element => {
                try {
                    const formula = element.getAttribute('data-formula');
                    katex.render(formula, element, {
                        displayMode: true,
                        throwOnError: false
                    });
                    element.setAttribute('data-rendered', 'true');
                } catch (error) {
                    console.error('KaTeX block render error:', error);
                    element.innerHTML = `<span style="color: red;">數學公式渲染錯誤: ${error.message}</span>`;
                }
            });
            
            // 渲染內聯數學公式
            document.querySelectorAll('.math-inline:not([data-rendered])').forEach(element => {
                try {
                    const formula = element.getAttribute('data-formula');
                    katex.render(formula, element, {
                        displayMode: false,
                        throwOnError: false
                    });
                    element.setAttribute('data-rendered', 'true');
                } catch (error) {
                    console.error('KaTeX inline render error:', error);
                    element.innerHTML = `<span style="color: red;">數學公式渲染錯誤</span>`;
                }
            });
            console.log('Math formulas rendered');
        }
    }
}
