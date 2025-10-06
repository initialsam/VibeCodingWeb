// Lesson Management
class LessonManager {
    constructor() {
        console.log('Initializing LessonManager...');
        this.currentLesson = this.getCurrentLessonFromURL();
        this.lessons = [
            { id: 1, title: 'Markdown 基礎入門', file: 'lesson1.md' },
            { id: 2, title: '清單與列表', file: 'lesson2.md' },
            { id: 3, title: '連結與圖片', file: 'lesson3.md' },
            { id: 4, title: '引用與程式碼', file: 'lesson4.md' },
            { id: 5, title: '表格製作', file: 'lesson5.md' },
            { id: 6, title: '進階技巧', file: 'lesson6.md' },
            { id: 7, title: '擴充語法', file: 'lesson7.md' },
            { id: 8, title: '實戰應用', file: 'lesson8.md' }
        ];
        
        this.renderer = null;
        this.initRenderer();
    }

    async initRenderer() {
        try {
            this.renderer = new MarkdownRenderer();
            await this.renderer.initPromise; // 等待渲染器初始化完成
            console.log('MarkdownRenderer initialized successfully');
        } catch (error) {
            console.error('Failed to initialize MarkdownRenderer:', error);
            this.renderer = null;
        }
    }

    getCurrentLessonFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('lesson')) || 1;
    }

    async loadLesson(lessonId) {
        console.log('Loading lesson:', lessonId);
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) {
            console.error('Lesson not found:', lessonId);
            this.showError('課程不存在');
            return;
        }

        this.showLoading();

        try {
            console.log('Fetching lesson file:', `lessons/${lesson.file}`);
            const response = await fetch(`lessons/${lesson.file}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const markdown = await response.text();
            console.log('Markdown loaded, length:', markdown.length);
            
            // 確保渲染器已初始化
            if (!this.renderer) {
                await this.initRenderer();
            }
            
            if (!this.renderer) {
                throw new Error('Markdown renderer initialization failed');
            }
            
            const html = await this.renderer.render(markdown);
            console.log('HTML rendered, length:', html.length);
            
            this.renderLesson(html);
            this.updateNavigation(lessonId);
            this.updateSidebar(lessonId);
            this.updatePageTitle(lesson.title);
            
            // Re-initialize editors after content is loaded
            setTimeout(() => {
                console.log('Reinitializing editors...');
                if (typeof window.reinitializeEditors === 'function') {
                    window.reinitializeEditors();
                } else {
                    console.error('reinitializeEditors function not found');
                }
                
                // 渲染數學公式和圖表
                setTimeout(() => {
                    MarkdownRenderer.renderMathAndDiagrams();
                }, 100);
            }, 500); // 增加延遲時間確保 DOM 完全更新

        } catch (error) {
            console.error('Error loading lesson:', error);
            this.showError(`載入課程失敗: ${error.message}`);
        }
    }

    showLoading() {
        const loading = document.getElementById('loading');
        const container = document.getElementById('lessonContainer');
        
        if (loading) loading.style.display = 'flex';
        if (container) container.style.display = 'none';
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        const container = document.getElementById('lessonContainer');
        
        if (loading) loading.style.display = 'none';
        if (container) container.style.display = 'block';
    }

    renderLesson(html) {
        const content = document.getElementById('lessonContent');
        if (content) {
            content.innerHTML = html;
            this.hideLoading();
            this.scrollToTop();
        }
    }

    showError(message) {
        const content = document.getElementById('lessonContent');
        if (content) {
            content.innerHTML = `
                <div class="error-message" style="
                    background: #fed7d7; 
                    color: #742a2a; 
                    padding: 2rem; 
                    border-radius: 8px; 
                    border: 1px solid #fc8181;
                    text-align: center;
                ">
                    <h3>😕 載入失敗</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" style="
                        background: #e53e3e; 
                        color: white; 
                        border: none; 
                        padding: 0.5rem 1rem; 
                        border-radius: 4px; 
                        cursor: pointer;
                        margin-top: 1rem;
                    ">重新載入</button>
                </div>
            `;
            this.hideLoading();
        }
    }

    updateNavigation(lessonId) {
        const prevBtn = document.getElementById('prevLesson');
        const nextBtn = document.getElementById('nextLesson');
        const currentTitle = document.getElementById('currentLessonTitle');

        const lesson = this.lessons.find(l => l.id === lessonId);
        
        if (currentTitle && lesson) {
            currentTitle.textContent = `${lessonId.toString().padStart(2, '0')}. ${lesson.title}`;
        }

        if (prevBtn) {
            if (lessonId > 1) {
                prevBtn.disabled = false;
                prevBtn.onclick = () => this.navigateToLesson(lessonId - 1);
            } else {
                prevBtn.disabled = true;
            }
        }

        if (nextBtn) {
            if (lessonId < this.lessons.length) {
                nextBtn.disabled = false;
                nextBtn.onclick = () => this.navigateToLesson(lessonId + 1);
            } else {
                nextBtn.disabled = true;
            }
        }
    }

    updateSidebar(lessonId) {
        document.querySelectorAll('.lesson-link').forEach(link => {
            const linkLessonId = parseInt(link.getAttribute('data-lesson'));
            if (linkLessonId === lessonId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updatePageTitle(lessonTitle) {
        document.title = `${lessonTitle} - 精通 Markdown`;
    }

    navigateToLesson(lessonId) {
        const url = new URL(window.location);
        url.searchParams.set('lesson', lessonId);
        window.history.pushState({}, '', url);
        this.currentLesson = lessonId;
        this.loadLesson(lessonId);
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Don't interfere when user is typing in editor
            if (e.target.tagName === 'TEXTAREA' || e.target.classList.contains('CodeMirror-code')) {
                return;
            }

            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (this.currentLesson > 1) {
                    this.navigateToLesson(this.currentLesson - 1);
                }
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                if (this.currentLesson < this.lessons.length) {
                    this.navigateToLesson(this.currentLesson + 1);
                }
            }
        });
    }
}

// Initialize lesson manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing lesson manager...');
    
    // Check if required libraries are loaded
    if (typeof marked === 'undefined') {
        console.error('Marked.js is not loaded!');
        return;
    }
    
    if (typeof CodeMirror === 'undefined') {
        console.error('CodeMirror is not loaded!');
        return;
    }
    
    const lessonManager = new LessonManager();
    
    // Load current lesson
    console.log('Loading lesson:', lessonManager.currentLesson);
    lessonManager.loadLesson(lessonManager.currentLesson);
    
    // Initialize math and diagrams rendering
    MarkdownRenderer.initializeMathAndDiagrams();
    
    // Setup keyboard navigation
    lessonManager.setupKeyboardNavigation();

    // Handle browser back/forward navigation
    window.addEventListener('popstate', function() {
        const newLesson = lessonManager.getCurrentLessonFromURL();
        lessonManager.currentLesson = newLesson;
        lessonManager.loadLesson(newLesson);
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close sidebar when clicking on lesson link on mobile
        document.querySelectorAll('.lesson-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });

        // Handle resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
});