// Exercise Editor Management
class ExerciseEditor {
    constructor() {
        this.editors = new Map();
        this.answers = new Map();
        this.hints = new Map();
        this.initialCodes = new Map();
        this.wrongAttempts = new Map(); // 記錄錯誤次數
    }

    clearAllEditors() {
        console.log('Clearing all existing editors...');
        // 清理所有現有的 CodeMirror 實例
        this.editors.forEach((editor, exerciseId) => {
            try {
                if (editor && editor.toTextArea) {
                    editor.toTextArea();
                    console.log(`Cleared editor for ${exerciseId}`);
                }
            } catch (error) {
                console.error(`Error clearing editor ${exerciseId}:`, error);
            }
        });
        
        // 清空 Maps
        this.editors.clear();
        this.answers.clear();
        this.hints.clear();
        this.initialCodes.clear();
        this.wrongAttempts.clear(); // 清空錯誤計數
        
        console.log('All editors cleared');
    }

    initializeEditors() {
        console.log('Initializing editors...');
        const textareas = document.querySelectorAll('.exercise-editor');
        console.log('Found textareas:', textareas.length);
        
        textareas.forEach((textarea, index) => {
            console.log(`Processing textarea ${index}:`, textarea);
            const exerciseId = textarea.getAttribute('data-exercise-id');
            
            // 檢查是否已經初始化過
            if (this.editors.has(exerciseId)) {
                console.log(`Editor ${exerciseId} already initialized, skipping...`);
                return;
            }
            
            // 檢查 textarea 是否已經被 CodeMirror 處理過
            if (textarea.style.display === 'none') {
                console.log(`Textarea ${exerciseId} already processed by CodeMirror, skipping...`);
                return;
            }
            
            // 檢查是否有相鄰的 CodeMirror 元素
            const nextSibling = textarea.nextElementSibling;
            if (nextSibling && nextSibling.classList.contains('CodeMirror')) {
                console.log(`Found existing CodeMirror for ${exerciseId}, skipping...`);
                return;
            }
            
            const answer = textarea.getAttribute('data-answer');
            const hint = textarea.getAttribute('data-hint');
            const initialCode = textarea.value;

            console.log(`Exercise ${exerciseId}:`, { answer, hint, initialCode });

            // Store data
            this.answers.set(exerciseId, answer);
            this.hints.set(exerciseId, hint);
            this.initialCodes.set(exerciseId, initialCode);
            this.wrongAttempts.set(exerciseId, 0); // 初始化錯誤次數

            // Check if CodeMirror is available
            if (typeof CodeMirror === 'undefined') {
                console.error('CodeMirror is not loaded!');
                return;
            }

            try {
                // Initialize CodeMirror
                const editor = CodeMirror.fromTextArea(textarea, {
                    mode: 'markdown',
                    theme: 'default',
                    lineNumbers: true,
                    lineWrapping: true,
                    autoCloseBrackets: true,
                    matchBrackets: true,
                    indentUnit: 2,
                    tabSize: 2,
                    placeholder: '在這裡輸入您的 Markdown 代碼...',
                    extraKeys: {
                        "Ctrl-Space": "autocomplete",
                        "Ctrl-/": "toggleComment"
                    }
                });

                this.editors.set(exerciseId, editor);
                console.log(`CodeMirror initialized successfully for exercise ${exerciseId}`);

                // Add change event listener
                editor.on('change', () => {
                    this.clearResult(exerciseId);
                });
            } catch (error) {
                console.error(`Error initializing CodeMirror for ${exerciseId}:`, error);
            }
        });
        
        console.log('Editors initialization completed. Total editors:', this.editors.size);
    }

    checkAnswer(exerciseId) {
        const editor = this.editors.get(exerciseId);
        const expectedAnswer = this.answers.get(exerciseId);
        const resultElement = document.getElementById(`result-${exerciseId}`);
        const previewElement = document.getElementById(`preview-${exerciseId}`);
        const previewContentElement = document.getElementById(`preview-content-${exerciseId}`);

        if (!editor || !expectedAnswer || !resultElement) {
            console.error('Exercise components not found:', exerciseId);
            return;
        }

        const userCode = editor.getValue().trim();
        const normalizedUserCode = this.normalizeCode(userCode);
        const normalizedAnswer = this.normalizeCode(expectedAnswer);

        resultElement.style.display = 'block';
        
        if (normalizedUserCode === normalizedAnswer) {
            // 答對了 - 重置錯誤計數
            this.wrongAttempts.set(exerciseId, 0);
            
            resultElement.className = 'result-message result-success';
            resultElement.innerHTML = '✅ 答案正確！做得很好！';
            
            // 顯示渲染結果
            if (previewElement && previewContentElement && userCode.trim()) {
                try {
                    // 使用 marked 渲染用戶的 Markdown 代碼
                    const processedUserCode = this.processMathFormulas(userCode);
                    const renderedHTML = marked.parse(processedUserCode);
                    previewContentElement.innerHTML = `
                        <div class="preview-comparison">
                            <div class="preview-source">
                                <h5>📝 您輸入的 Markdown 語法：</h5>
                                <pre><code class="markdown-source">${this.escapeHtml(userCode)}</code></pre>
                            </div>
                            <div class="preview-result">
                                <h5>🎯 渲染結果：</h5>
                                <div class="rendered-result">
                                    ${renderedHTML}
                                </div>
                            </div>
                        </div>
                    `;
                    previewElement.style.display = 'block';
                    
                    // 添加成功動畫
                    previewElement.style.animation = 'slideDown 0.5s ease-out';
                    
                    // 渲染數學公式和圖表
                    setTimeout(() => {
                        MarkdownRenderer.renderMathAndDiagrams();
                    }, 100);
                } catch (error) {
                    console.error('Error rendering user code:', error);
                    previewContentElement.innerHTML = '<p style="color: #e53e3e;">渲染時發生錯誤</p>';
                    previewElement.style.display = 'block';
                }
            }
            
            // 添加慶祝效果
            this.addCelebrationEffect(resultElement);
        } else {
            // 答錯了 - 增加錯誤計數
            const currentWrongAttempts = this.wrongAttempts.get(exerciseId) || 0;
            const newWrongAttempts = currentWrongAttempts + 1;
            this.wrongAttempts.set(exerciseId, newWrongAttempts);
            
            // 隱藏預覽區域
            if (previewElement) {
                previewElement.style.display = 'none';
            }
            
            console.log(`Exercise ${exerciseId}: Wrong attempt ${newWrongAttempts}/3`);
            
            if (newWrongAttempts >= 3) {
                // 連續答錯三次 - 詢問是否查看解答
                this.showSolutionPrompt(exerciseId, resultElement);
            } else {
                // 一般錯誤訊息
                resultElement.className = 'result-message result-error';
                resultElement.innerHTML = `❌ 答案不正確，請檢查您的語法。(${newWrongAttempts}/3)`;
                
                // Show hint button if not already visible
                const hintButton = document.querySelector(`[onclick="showHint('${exerciseId}')"]`);
                if (hintButton && this.hints.get(exerciseId)) {
                    hintButton.style.display = 'inline-block';
                }
            }
        }
    }

    showHint(exerciseId) {
        const hint = this.hints.get(exerciseId);
        if (!hint) return;

        const resultElement = document.getElementById(`result-${exerciseId}`);
        if (resultElement) {
            resultElement.style.display = 'block';
            resultElement.className = 'result-message';
            resultElement.style.background = '#fff3cd';
            resultElement.style.color = '#856404';
            resultElement.style.border = '1px solid #ffeaa7';
            resultElement.innerHTML = `💡 <strong>提示：</strong> ${hint}`;
        }
    }

    resetExercise(exerciseId) {
        const editor = this.editors.get(exerciseId);
        const initialCode = this.initialCodes.get(exerciseId);
        const previewElement = document.getElementById(`preview-${exerciseId}`);

        if (editor && initialCode !== undefined) {
            editor.setValue(initialCode);
            this.clearResult(exerciseId);
            
            // 隱藏預覽區域
            if (previewElement) {
                previewElement.style.display = 'none';
            }
            
            // 重置錯誤計數
            this.wrongAttempts.set(exerciseId, 0);
        }
    }

    clearResult(exerciseId) {
        const resultElement = document.getElementById(`result-${exerciseId}`);
        const previewElement = document.getElementById(`preview-${exerciseId}`);
        
        if (resultElement) {
            resultElement.style.display = 'none';
            resultElement.innerHTML = '';
        }
        
        if (previewElement) {
            previewElement.style.display = 'none';
        }
    }

    normalizeCode(code) {
        return code
            .trim()
            .replace(/\r\n/g, '\n')
            .replace(/\s+$/gm, '') // Remove trailing whitespace
            .replace(/^\s+/gm, match => match.replace(/\t/g, '  ')); // Normalize tabs to spaces
    }

    showSolutionPrompt(exerciseId, resultElement) {
        resultElement.className = 'result-message result-warning';
        resultElement.innerHTML = `
            <div class="solution-prompt">
                <p>🤔 已經嘗試 3 次了，需要幫助嗎？</p>
                <div class="solution-buttons">
                    <button class="btn-solution" onclick="showSolution('${exerciseId}')">📖 查看解答</button>
                    <button class="btn-retry" onclick="retrySolution('${exerciseId}')">🔄 再試一次</button>
                </div>
            </div>
        `;
    }

    showSolution(exerciseId) {
        const editor = this.editors.get(exerciseId);
        const expectedAnswer = this.answers.get(exerciseId);
        const resultElement = document.getElementById(`result-${exerciseId}`);
        const previewElement = document.getElementById(`preview-${exerciseId}`);
        const previewContentElement = document.getElementById(`preview-content-${exerciseId}`);

        if (!editor || !expectedAnswer || !resultElement) {
            return;
        }

        // 將正確答案填入編輯器
        editor.setValue(expectedAnswer);
        
        // 顯示解答說明
        resultElement.className = 'result-message result-solution';
        resultElement.innerHTML = `
            <div class="solution-display">
                <h4>📖 參考解答</h4>
                <p>正確的 Markdown 語法已填入編輯器中。請仔細觀察語法格式，然後可以嘗試自己重新輸入。</p>
                <button class="btn-understand" onclick="clearSolution('${exerciseId}')">✅ 我明白了</button>
            </div>
        `;

        // 顯示渲染結果
        if (previewElement && previewContentElement) {
            try {
                const processedAnswer = this.processMathFormulas(expectedAnswer);
                const renderedHTML = marked.parse(processedAnswer);
                previewContentElement.innerHTML = `
                    <div class="preview-comparison">
                        <div class="preview-source">
                            <h5>📝 正確的 Markdown 語法：</h5>
                            <pre><code class="markdown-source">${this.escapeHtml(expectedAnswer)}</code></pre>
                        </div>
                        <div class="preview-result">
                            <h5>🎯 渲染結果：</h5>
                            <div class="rendered-result">
                                ${renderedHTML}
                            </div>
                        </div>
                    </div>
                `;
                previewElement.style.display = 'block';
                previewElement.style.animation = 'slideDown 0.5s ease-out';
                
                // 渲染數學公式和圖表
                setTimeout(() => {
                    MarkdownRenderer.renderMathAndDiagrams();
                }, 100);
            } catch (error) {
                console.error('Error rendering solution:', error);
            }
        }

        // 重置錯誤計數
        this.wrongAttempts.set(exerciseId, 0);
    }

    retrySolution(exerciseId) {
        // 重置錯誤計數，給用戶新的機會
        this.wrongAttempts.set(exerciseId, 0);
        
        const resultElement = document.getElementById(`result-${exerciseId}`);
        if (resultElement) {
            resultElement.className = 'result-message';
            resultElement.style.background = '#fff3cd';
            resultElement.style.color = '#856404';
            resultElement.style.border = '1px solid #ffeaa7';
            resultElement.innerHTML = '💪 好的！讓我們重新開始，你可以的！';
            
            // 3秒後隱藏訊息
            setTimeout(() => {
                resultElement.style.display = 'none';
            }, 3000);
        }
    }

    clearSolution(exerciseId) {
        const resultElement = document.getElementById(`result-${exerciseId}`);
        const previewElement = document.getElementById(`preview-${exerciseId}`);
        
        if (resultElement) {
            resultElement.style.display = 'none';
        }
        
        if (previewElement) {
            previewElement.style.display = 'none';
        }
        
        // 重置錯誤計數
        this.wrongAttempts.set(exerciseId, 0);
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

    addCelebrationEffect(element) {
        element.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
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

    // Public methods for global access
    static instance = null;

    static getInstance() {
        if (!ExerciseEditor.instance) {
            ExerciseEditor.instance = new ExerciseEditor();
        }
        return ExerciseEditor.instance;
    }
}

// Global functions for HTML onclick handlers
window.checkAnswer = function(exerciseId) {
    ExerciseEditor.getInstance().checkAnswer(exerciseId);
}

window.showHint = function(exerciseId) {
    ExerciseEditor.getInstance().showHint(exerciseId);
}

window.resetExercise = function(exerciseId) {
    ExerciseEditor.getInstance().resetExercise(exerciseId);
}

// Global functions for solution feature
window.showSolution = function(exerciseId) {
    ExerciseEditor.getInstance().showSolution(exerciseId);
}

window.retrySolution = function(exerciseId) {
    ExerciseEditor.getInstance().retrySolution(exerciseId);
}

window.clearSolution = function(exerciseId) {
    ExerciseEditor.getInstance().clearSolution(exerciseId);
}

// Initialize when DOM is ready - only for static content
document.addEventListener('DOMContentLoaded', function() {
    // 對於靜態頁面（如 index.html）初始化編輯器
    // 對於動態載入的課程內容，不需要在這裡初始化
    if (document.querySelector('#lessonContent')) {
        console.log('This is lesson page, skipping initial editor initialization');
        return;
    }
    
    // 只有在靜態頁面才執行初始化
    setTimeout(() => {
        ExerciseEditor.getInstance().initializeEditors();
    }, 500);
});

// Re-initialize editors when new content is loaded
window.reinitializeEditors = function() {
    const editorInstance = ExerciseEditor.getInstance();
    editorInstance.clearAllEditors();
    editorInstance.initializeEditors();
}

// CSS animation for celebration effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);