/**
 * Learn Page Single Page Application
 * Handles dynamic content loading without page reloads
 */

class LearnSPA {
    constructor() {
        // Core state
        this.currentLessonId = null;
        this.lessons = [];
        this.collapsedSections = new Set();
        
        // Storage for non-consented sessions
        this._memoryStore = {};
        this._completionAnnounced = false;
        
        // UI state
        this.isFocusMode = false;
        this.isSidebarCollapsed = false;
        this.isMobileMenuOpen = false;
        this.isLoading = false;
        this.wasCollapsedDesktop = false;
        
        // DOM element cache
        this.elements = this._cacheElements();
        
        this.init();
    }
    
    // Backwards-compatible element accessors (map legacy properties to cached elements)
    get sidebar() { return this.elements.sidebar; }
    get sidebarOverlay() { return this.elements.sidebarOverlay; }
    get learnPage() { return this.elements.learnPage; }
    get focusModeBtn() { return this.elements.focusModeBtn; }
    get collapseSidebarBtn() { return this.elements.collapseSidebarBtn; }
    get mobileMenuBtn() { return this.elements.mobileMenuBtn; }
    get mobileCloseBtn() { return this.elements.mobileCloseBtn; }
    get contentArea() { return this.elements.contentArea; }
    get loadingIndicator() { return this.elements.loadingIndicator; }
    get reopenBtn() { return this.elements.reopenBtn; }
    
    _cacheElements() {
        return {
            sidebar: document.getElementById('learnSidebar'),
            sidebarOverlay: document.getElementById('sidebarOverlay'),
            learnPage: document.getElementById('learnPage'),
            focusModeBtn: document.getElementById('focusModeBtn'),
            collapseSidebarBtn: document.getElementById('collapseSidebar'),
            mobileMenuBtn: document.getElementById('mobileMenuBtn'),
            mobileCloseBtn: document.getElementById('mobileCloseMenu'),
            contentArea: document.getElementById('lessonContent'),
            loadingIndicator: document.getElementById('loadingIndicator'),
            reopenBtn: document.getElementById('sidebarReopen')
        };
    }

    // Utility methods for safe string handling
    htmlAttr(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;');
    }
    
    cssEsc(value) {
        try {
            if (window.CSS && CSS.escape) return CSS.escape(String(value));
        } catch(e) { /* ignore */ }
        // Fallback minimal escape
        return String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
    }
    
    // Normalize IDs coming from JSON (strip accidental wrapping quotes)
    cleanId(value) {
        if (value == null) return '';
        let s = String(value).trim();
        // Remove one layer of wrapping quotes if present
        if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
            s = s.slice(1, -1);
        }
        // Also handle escaped quote wrappers (e.g., \"id\")
        if ((s.startsWith('\\"') && s.endsWith('\\"')) || (s.startsWith("\\'") && s.endsWith("\\'"))) {
            s = s.slice(2, -2);
        }
        return s;
    }

    decodeContent(val) {
        if (val == null) return val;
        if (typeof val !== 'string') return val;
        
        let str = val.trim();
        
        // If wrapped in quotes, try JSON.parse directly
        if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
            try { 
                return JSON.parse(str); 
            } catch(_) { 
                /* continue with other methods */ 
            }
        }
        
        // If contains unicode escapes, try parsing as a quoted JSON string
        if (/\\u[0-9a-fA-F]{4}/.test(str)) {
            try { 
                return JSON.parse('"' + str.replace(/"/g, '\\"') + '"'); 
            } catch(_) { 
                /* continue with fallback */ 
            }
        }
        
        // Fallback: replace common encodings
        return str
            .replace(/\\u003c/g, '<')
            .replace(/\\u003e/g, '>')
            .replace(/\\u0026/g, '&');
    }

    // Progress and storage management
    _isStorageAllowed() {
        return (window.__optionalStorageAllowed && window.__optionalStorageAllowed()) || false;
    }

    migrateStoredProgress() {
        if (!this._isStorageAllowed()) return;
        
        try {
            const key = this.progressKey();
            const raw = localStorage.getItem(key);
            if (!raw) return;
            
            const obj = JSON.parse(raw);
            let changed = false;
            const normalized = {};
            
            for (const k of Object.keys(obj)) {
                const nk = this.cleanId(k);
                if (nk !== k) changed = true;
                normalized[nk] = Boolean(obj[k]);
            }
            
            if (changed) {
                localStorage.setItem(key, JSON.stringify(normalized));
            }
        } catch(e) { 
            /* ignore migration errors */ 
        }
    }
    
    init() {
        this.loadLessonsData();
        this.bindEvents();
    // Guard against missing elements when first sizing
    try { this.handleResize(); } catch(_) {}
        this.loadPreferences();
        this.initializeCurrentLesson();
        this.updateProgress();
        this.setHeaderHeights();
        window.addEventListener('resize', () => this.setHeaderHeights());
    }
    
    setHeaderHeights() {
        // Use fixed 42px for consistent header height
        document.documentElement.style.setProperty('--site-header-height', '42px');
    }
    
    /**
     * Load lessons data from the page or API
     */
    loadLessonsData() {
        // Get lessons from the page data (Hugo template will populate this)
        this.lessons = (window.lessonData || []).map(l => {
            const id = this.cleanId(l.id);
            const slug = this.cleanId(this.decodeContent(l.slug) ?? l.slug);
            const title = this.decodeContent(l.title);
            const description = this.decodeContent(l.description);
            const duration = this.decodeContent(l.duration);
            const difficulty = this.decodeContent(l.difficulty);
            const section = this.decodeContent(l.section);
            const date = this.decodeContent(l.date);
            const url = this.decodeContent(l.url);
            let resources = l.resources;
            if (!Array.isArray(resources)) {
                const r = this.decodeContent(resources);
                try { resources = typeof r === 'string' ? JSON.parse(r) : (r || []); } catch { resources = []; }
            }
            return {
                ...l,
                id,
                slug,
                title,
                description,
                duration,
                difficulty,
                section,
                date,
                url,
                content: this.decodeContent(l.content),
                resources
            };
        });
        this.renderLessonsList();
        // Attempt to migrate any legacy stored keys (with quotes)
        this.migrateStoredProgress();
    }
    
    /**
     * Render the lessons list in the sidebar
     */
    renderLessonsList() {
        const lessonsContainer = document.getElementById('lessonsList');
        if (!lessonsContainer) return;

        const groups = this.groupLessonsBySection();

        const html = groups.map(group => {
            const isCollapsed = this.collapsedSections.has(group.section);
            const lessonsHtml = group.lessons.map(lesson => `
                <div class="lesson-item" data-lesson-id="${this.htmlAttr(lesson.id)}">
                    <div class="lesson-number">
                        <span class="number">${lesson.lessonNumber ?? ''}</span>
                    </div>
                    <div class="lesson-info">
                        <div class="lesson-title" data-lesson-id="${this.htmlAttr(lesson.id)}">${lesson.title}</div>
                        ${lesson.duration ? `
                            <div class="lesson-duration">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12,6 12,12 16,14"></polyline>
                                </svg>
                                ${lesson.duration}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');

            return `
                <div class="section-group${isCollapsed ? ' collapsed' : ''}" data-section="${group.section}">
                    <div class="section-header" data-section="${group.section}">
                        <span class="chevron" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                        </span>
                        <span class="section-title-text">${group.section}</span>
                    </div>
                    <div class="section-lessons">
                        ${lessonsHtml}
                    </div>
                </div>
            `;
        }).join('');

        lessonsContainer.innerHTML = html;

    // Restore active state after re-render
        if (this.currentLessonId) {
            this.setActiveLesson(this.currentLessonId);
        }
    // Recompute progress (DOM may have changed)
    this.updateProgress();
    }

    /**
     * Group lessons by their section while preserving original order
     */
    groupLessonsBySection() {
        const order = [];
        const map = new Map();
        for (const l of this.lessons) {
            const section = (l.section || (window.__t ? window.__t('lessons.no_category') : 'بدون دسته')).toString().trim();
            if (!map.has(section)) {
                const bucket = { section, lessons: [] };
                map.set(section, bucket);
                order.push(bucket);
            }
            map.get(section).lessons.push(l);
        }
        return order;
    }
    
    /**
     * Initialize the current lesson based on URL or first lesson
     */
    initializeCurrentLesson() {
        // Try to get lesson from current URL (supports trailing slash)
        const urlPath = window.location.pathname.replace(/\/$/, '');
        const lessonSlug = urlPath.split('/').pop();
        
        let currentLesson = this.lessons.find(lesson => 
            lesson.slug === lessonSlug || lesson.id === lessonSlug
        );
        // Fallback: template-provided slug
        if (!currentLesson && window.currentLessonSlug) {
            currentLesson = this.lessons.find(lesson => lesson.slug === window.currentLessonSlug || lesson.id === window.currentLessonSlug);
        }
        
        // If no lesson found, default to first lesson
        if (!currentLesson && this.lessons.length > 0) {
            currentLesson = this.lessons[0];
        }
        
        if (currentLesson) {
            this.loadLesson(currentLesson.id, false);
        } else if (this.lessons.length) {
            this.loadLesson(this.lessons[0].id, false);
        }
    }
    
    /**
     * Load a specific lesson
     */
    async loadLesson(lessonId, updateHistory = true) {
        if (this.isLoading || this.currentLessonId === lessonId) return;
        
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            // Update active states
            this.setActiveLesson(lessonId);
            
            // Load lesson content
            await this.renderLessonContent(lesson);
            
            // Update navigation
            this.updateNavigation(lessonId);
            
            // Update URL if needed
            if (updateHistory && lesson.url) {
                // Update internal state before pushing URL
                this.currentLessonId = lessonId;
                this.updateURL(lesson.url);
            }
            
            // Close mobile menu if open
            if (this.isMobileMenuOpen) {
                this.toggleMobileMenu();
            }
            
            // Scroll to active lesson in sidebar
            this.scrollToActiveLesson();
            
            this.currentLessonId = lessonId;
            // Mark lesson as completed (simple heuristic: visiting counts) and update progress
            this.markCompleted(lessonId);
            this.updateProgress();
            // Small async tick to let DOM reflect 'completed' class before computing
            setTimeout(()=> this.updateProgress(), 0);
            
        } catch (error) {
            console.error('Error loading lesson:', error);
            this.showError(window.__t ? window.__t('lessons.error_loading_lesson') : 'خطا در بارگذاری درس');
        } finally {
            this.isLoading = false;
            this.hideLoading();
            // Ensure progress bar reflects latest state
            this.updateProgress();
        }
    }
    
    /**
     * Set the active lesson in the sidebar
     */
    setActiveLesson(lessonId) {
        // Remove active class from all lessons
        document.querySelectorAll('.lesson-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current lesson
    const activeItem = document.querySelector(`[data-lesson-id="${this.cssEsc(lessonId)}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    markCompleted(lessonId) {
        const key = this.progressKey();
        
        try {
            if (this._isStorageAllowed()) {
                const stored = JSON.parse(localStorage.getItem(key) || '{}');
                
                // Clean legacy quoted key if present
                const legacy = `"${lessonId}"`;
                if (stored[legacy]) { 
                    delete stored[legacy]; 
                }
                
                if (stored[lessonId]) return; // already marked
                
                stored[lessonId] = true;
                localStorage.setItem(key, JSON.stringify(stored));
            } else {
                // Session-only memory tracking (no persistence)
                if (!this._memoryStore[key]) this._memoryStore[key] = {};
                this._memoryStore[key][lessonId] = true;
            }
            
            const item = document.querySelector(`.lesson-item[data-lesson-id="${this.cssEsc(lessonId)}"]`);
            item?.classList.add('completed');
        } catch(e) { 
            /* ignore storage errors */ 
        }
    }

    calcProgress() {
        if (!this.lessons.length) return 0;
        
        try {
            const key = this.progressKey();
            const stored = this._isStorageAllowed()
                ? JSON.parse(localStorage.getItem(key) || '{}')
                : (this._memoryStore[key] || {});
            
            // Normalize stored keys for comparison
            const storedIds = new Set(Object.keys(stored).map(k => this.cleanId(k)));
            const doneCount = this.lessons.filter(l => storedIds.has(l.id)).length;
            let pct = Math.round((doneCount / this.lessons.length) * 100);
            
            // Fallback: infer from DOM completed items if no storage progress
            if (pct === 0) {
                const completedDom = new Set(
                    Array.from(document.querySelectorAll('.lesson-item.completed'))
                        .map(el => el.getAttribute('data-lesson-id') || '')
                );
                
                if (completedDom.size > 0) {
                    const count = this.lessons.filter(l => completedDom.has(l.id)).length;
                    pct = Math.round((count / this.lessons.length) * 100);
                }
            }
            
            return Math.max(0, Math.min(100, pct));
        } catch(e) { 
            return 0; 
        }
    }

    updateProgress() {
        const pct = this.calcProgress();
        const fill = document.querySelector('.course-progress .progress-fill');
        const text = document.querySelector('.course-progress-text span:last-child');
        
        if (fill) fill.style.width = pct + '%';
        if (text) text.textContent = pct + '%';
        
        if (pct === 100 && !this._completionAnnounced) {
            this._completionAnnounced = true;
            this.announceCompletion();
        }
    }

    /** Return localStorage key unique per course */
    progressKey(){
        const parts = window.location.pathname.split('/').filter(Boolean);
        // remove last part if it matches a lesson id
        const last = parts[parts.length-1];
        const isLesson = this.lessons.some(l=> l.slug === last || l.id === last);
        const baseParts = isLesson ? parts.slice(0,-1) : parts;
        // ensure ends with course folder (e.g., courses/python)
        return 'courseProgress:/' + baseParts.join('/');
    }
    
    /**
     * Render lesson content in the main area
     */
    async renderLessonContent(lesson) {
    if (!this.contentArea) return;
        
        // If content is already available, use it
        if (lesson.content) {
            this.contentArea.innerHTML = this.generateLessonHTML(lesson);
            return;
        }
        
        // If we need to fetch content dynamically
        if (lesson.url) {
            try {
                let fetchUrl = lesson.url;
                try {
                    // If lesson.url is absolute (different port), strip origin to keep same-origin
                    const u = new URL(lesson.url, window.location.origin);
                    if(u.origin !== window.location.origin) {
                        fetchUrl = u.pathname + u.search;
                    }
                } catch { /* ignore */ }
                const response = await fetch(fetchUrl);
                const html = await response.text();
                
                // Extract content from the response
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('.lesson-body, .content, main');
                
                lesson.content = content ? content.innerHTML : html;
                this.contentArea.innerHTML = this.generateLessonHTML(lesson);
                
            } catch (error) {
                console.error('Error fetching lesson content:', error);
                lesson.content = `<p>${window.__t ? window.__t('lessons.error_loading_content') : 'خطا در بارگذاری محتوا'}</p>`;
                this.contentArea.innerHTML = this.generateLessonHTML(lesson);
            }
        } else {
            // Use placeholder content
            lesson.content = this.getPlaceholderContent(lesson);
            this.contentArea.innerHTML = this.generateLessonHTML(lesson);
        }
    }
    
    /**
     * Generate HTML for lesson content
     */
    generateLessonHTML(lesson) {
        return `
            <header class="lesson-header">
                <h1 class="lesson-title">${lesson.title}</h1>
                <div class="lesson-meta">
                    ${lesson.duration ? `
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                            </svg>
                            <span>${lesson.duration}</span>
                        </div>
                    ` : ''}
                    ${lesson.difficulty ? `
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                            </svg>
                            <span>${lesson.difficulty}</span>
                        </div>
                    ` : ''}
                    ${lesson.date ? `
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>${lesson.date}</span>
                        </div>
                    ` : ''}
                </div>
            </header>
            
            <div class="lesson-body">
                <div class="lesson-inner">
                    ${lesson.content || this.getPlaceholderContent(lesson)}
                </div>
            </div>
            
            <footer class="lesson-footer">
                <nav class="lesson-navigation">
                    <div id="prevLessonContainer"></div>
                    <div class="nav-spacer"></div>
                    <div id="nextLessonContainer"></div>
                </nav>
            </footer>
        `;
    }
    
    /**
     * Get placeholder content for a lesson
     */
    getPlaceholderContent(lesson) {
        return `
            <div class="lesson-content-placeholder">
                <h2>${(window.__t ? window.__t('lessons.placeholder.title') : 'محتوای درس')} ${lesson.title}</h2>
                <p>${window.__t ? window.__t('lessons.placeholder.lead') : 'این یک درس نمونه است که شامل محتوای آموزشی مفصل می‌باشد.'}</p>
                
                <h3>${window.__t ? window.__t('lessons.placeholder.objectives') : 'اهداف یادگیری'}</h3>
                <ul>
                    <li>${window.__t ? window.__t('lessons.placeholder.obj1') : 'درک مفاهیم کلیدی این درس'}</li>
                    <li>${window.__t ? window.__t('lessons.placeholder.obj2') : 'تسلط بر تکنیک‌های عملی'}</li>
                    <li>${window.__t ? window.__t('lessons.placeholder.obj3') : 'آماده شدن برای درس بعدی'}</li>
                </ul>
                
                <h3>${window.__t ? window.__t('lessons.placeholder.content') : 'محتوای درس'}</h3>
                <p>${window.__t ? window.__t('lessons.placeholder.content_desc') : 'در این قسمت محتوای اصلی درس قرار می‌گیرد. این محتوا می‌تواند شامل متن، تصاویر، ویدیو و مثال‌های عملی باشد.'}</p>
                
                <div class="code-example">
                    <h4>${window.__t ? window.__t('lessons.placeholder.code_example') : 'مثال کد:'}</h4>
                    <pre><code>print("${window.__t ? window.__t('lessons.placeholder.hello_world') : 'سلام دنیا!'}")
for i in range(5):
    print(f"${window.__t ? window.__t('lessons.placeholder.number') : 'شماره'}: {i}")</code></pre>
                </div>
                
                <h3>${window.__t ? window.__t('lessons.placeholder.practice') : 'تمرین عملی'}</h3>
                <p>${window.__t ? window.__t('lessons.placeholder.practice_desc') : 'حال نوبت شما است تا آنچه آموخته‌اید را در عمل امتحان کنید.'}</p>
                
                <div class="lesson-resources">
                    <h4>${window.__t ? window.__t('lessons.placeholder.resources') : 'منابع اضافی:'}</h4>
                    <ul>
                        <li><a href="#">${window.__t ? window.__t('lessons.placeholder.doc') : 'مستندات رسمی'}</a></li>
                        <li><a href="#">${window.__t ? window.__t('lessons.placeholder.video') : 'ویدیوی آموزشی'}</a></li>
                        <li><a href="#">${window.__t ? window.__t('lessons.placeholder.exercises') : 'تمرین‌های تکمیلی'}</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    /**
     * Update navigation buttons
     */
    updateNavigation(currentLessonId) {
        const currentIndex = this.lessons.findIndex(l => l.id === currentLessonId);
        const prevContainer = document.getElementById('prevLessonContainer');
        const nextContainer = document.getElementById('nextLessonContainer');
        if (!prevContainer || !nextContainer) return;

        const dir = document.documentElement.getAttribute('dir') || 'ltr';
        const isRTL = dir.toLowerCase() === 'rtl';

        const makeArrow = (type) => {
            // type: 'prev' | 'next'; adapt for RTL
            // We draw polyline for left arrow: 15,18 9,12 15,6  and right arrow: 9,18 15,12 9,6
            const leftArrow = '<polyline points="15,18 9,12 15,6"></polyline>';
            const rightArrow = '<polyline points="9,18 15,12 9,6"></polyline>';
            if (type === 'prev') {
                return isRTL ? rightArrow : leftArrow;
            } else { // next
                return isRTL ? leftArrow : rightArrow;
            }
        };

        const prevExists = currentIndex > 0;
        const nextExists = currentIndex < this.lessons.length - 1;
        const prevLesson = prevExists ? this.lessons[currentIndex - 1] : null;
        const nextLesson = nextExists ? this.lessons[currentIndex + 1] : null;

        // Build previous button (keep space even if disabled)
    prevContainer.innerHTML = `
            <button type="button" class="nav-btn prev" ${!prevExists ? 'disabled aria-disabled="true"' : ''} aria-label="${prevExists ? ((window.__t?window.__t('lessons.prev_lesson'):'درس قبلی') + ': ' + prevLesson.title) : (window.__t?window.__t('lessons.first_lesson'):'اولین درس')}" ${prevExists ? `onclick="learnSPA.loadLesson('${prevLesson.id}')"` : ''}>
                ${!isRTL ? `<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>${makeArrow('prev')}</svg>` : ''}
                <div class="nav-info">
            <div class="nav-label">${window.__t ? window.__t('lessons.prev_lesson') : 'درس قبلی'}</div>
                    <div class="nav-title">${prevLesson ? prevLesson.title : '—'}</div>
                </div>
                ${isRTL ? `<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>${makeArrow('prev')}</svg>` : ''}
            </button>
        `;

        // Build next button
    nextContainer.innerHTML = `
            <button type="button" class="nav-btn next" ${!nextExists ? 'disabled aria-disabled="true"' : ''} aria-label="${nextExists ? ((window.__t?window.__t('lessons.next_lesson'):'درس بعدی') + ': ' + nextLesson.title) : (window.__t?window.__t('lessons.last_lesson'):'آخرین درس')}" ${nextExists ? `onclick="learnSPA.loadLesson('${nextLesson.id}')"` : ''}>
                ${isRTL ? `<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>${makeArrow('next')}</svg>` : ''}
                <div class="nav-info">
            <div class="nav-label">${window.__t ? window.__t('lessons.next_lesson') : 'درس بعدی'}</div>
                    <div class="nav-title">${nextLesson ? nextLesson.title : '—'}</div>
                </div>
                ${!isRTL ? `<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>${makeArrow('next')}</svg>` : ''}
            </button>
        `;
    }
    
    /**
     * Update URL using History API
     */
    updateURL(url) {
        if (window.history && window.history.pushState) {
            try {
                window.history.pushState({ lessonId: this.currentLessonId }, '', url);
            } catch (e) {
                // ignore history failures (e.g., cross-origin or malformed)
            }
        }
    }
    
    /**
     * Scroll to active lesson in sidebar
     */
    scrollToActiveLesson() {
        const activeItem = document.querySelector('.lesson-item.active');
        if (activeItem) {
            setTimeout(() => {
                activeItem.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }
    }
    
    showLoading() {
        this.elements.loadingIndicator?.style.setProperty('display', 'flex');
        if (this.elements.contentArea) {
            this.elements.contentArea.style.opacity = '0.5';
        }
    }
    
    hideLoading() {
        this.elements.loadingIndicator?.style.setProperty('display', 'none');
        if (this.elements.contentArea) {
            this.elements.contentArea.style.opacity = '1';
        }
    }
    
    showError(message) {
        console.error(message);
        
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast error';
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.classList.add('show');
        
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }
    
    bindEvents() {
        // Focus mode toggle
    this.elements.focusModeBtn?.addEventListener('click', () => this.toggleFocusMode());
        
        // Sidebar collapse
    this.elements.collapseSidebarBtn?.addEventListener('click', () => this.toggleSidebarCollapse());
        
        // Mobile menu
    this.elements.mobileMenuBtn?.addEventListener('click', () => this.toggleMobileMenu());
    this.elements.mobileCloseBtn?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Overlay click
    this.elements.sidebarOverlay?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Sidebar reopen button
    this.elements.reopenBtn?.addEventListener('click', () => {
            if (this.elements.sidebar?.classList.contains('collapsed')) {
                this.toggleSidebarCollapse();
            }
        });
        
        // Sidebar convenience click (expand when collapsed)
        this.elements.sidebar?.addEventListener('click', (e) => {
            if (!this.elements.sidebar.classList.contains('collapsed')) return;
            if (!e.target.closest('#collapseSidebar')) {
                this.toggleSidebarCollapse();
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.lessonId) {
                this.loadLesson(e.state.lessonId, false);
            } else {
                // If no state, derive from URL
                this.initializeCurrentLesson();
            }
        });
        
        this._bindDelegatedEvents();
    }
    
    _bindDelegatedEvents() {
        // Lesson clicks and section toggles (delegated)
        document.addEventListener('click', (e) => {
            // Toggle section collapse
            if (e.target.matches('.section-header, .section-header *')) {
                this._handleSectionToggle(e);
                return;
            }

            // Lesson item click
            if (e.target.matches('.lesson-title') || e.target.closest('.lesson-item')) {
                this._handleLessonClick(e);
                return;
            }

            // Ensure active state persists after DOM changes
            this._ensureActiveState();
        });
    }
    
    _handleSectionToggle(e) {
        const header = e.target.closest('.section-header');
        const section = header?.dataset.section;
        
        if (section) {
            if (this.collapsedSections.has(section)) {
                this.collapsedSections.delete(section);
            } else {
                this.collapsedSections.add(section);
            }
            this.savePreferences();
            this.renderLessonsList();
        }
    }
    
    _handleLessonClick(e) {
        const lessonId = e.target.dataset.lessonId || e.target.closest('.lesson-item').dataset.lessonId;
        if (lessonId && lessonId !== this.currentLessonId) {
            e.preventDefault();
            this.loadLesson(lessonId);
        }
    }
    
    _ensureActiveState() {
        setTimeout(() => {
            if (this.currentLessonId) {
                const active = document.querySelector(`.lesson-item[data-lesson-id="${this.cssEsc(this.currentLessonId)}"]`);
                if (active && !active.classList.contains('active')) {
                    this.setActiveLesson(this.currentLessonId);
                }
            }
        }, 0);
    }
    
    toggleFocusMode() {
        this.isFocusMode = !this.isFocusMode;
        this.learnPage.classList.toggle('focus-mode', this.isFocusMode);
        this.focusModeBtn.classList.toggle('active', this.isFocusMode);
        const icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>';
        const onLabel = (window.__t ? window.__t('lessons.exit_focus_mode') : 'خروج از حالت تمرکز');
        const offLabel = (window.__t ? window.__t('lessons.focus_mode') : 'حالت تمرکز');
        this.focusModeBtn.innerHTML = this.isFocusMode 
            ? icon + onLabel
            : icon + offLabel;
        // Force-close sidebar / overlay in focus mode
        if (this.isFocusMode) {
            this.isMobileMenuOpen = false;
            this.sidebar.classList.remove('mobile-open');
            this.sidebarOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            document.body.style.overflow = '';
        }
        this.setHeaderHeights(); // recalc spacing
        this.savePreferences();
    }
    
    toggleSidebarCollapse() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        
        if (window.innerWidth > 1024) {
            this.wasCollapsedDesktop = this.isSidebarCollapsed;
        }
        
        this.elements.sidebar?.classList.toggle('collapsed', this.isSidebarCollapsed);
        
        if (this.elements.reopenBtn) {
            this.elements.reopenBtn.style.display = (
                this.isSidebarCollapsed && window.innerWidth > 1024
            ) ? 'flex' : 'none';
        }
        
        this.syncCollapseButton();
        this.savePreferences();
    }
    
    syncCollapseButton() {
        if (!this.elements.collapseSidebarBtn) return;
        
        const collapsed = this.elements.sidebar?.classList.contains('collapsed');
        this.elements.collapseSidebarBtn.setAttribute('aria-expanded', (!collapsed).toString());
        this.elements.collapseSidebarBtn.title = collapsed 
            ? (window.__t ? window.__t('lessons.open_list') : 'باز کردن فهرست دروس') 
            : (window.__t ? window.__t('lessons.collapse_list') : 'بستن/جمع کردن فهرست');
        
        const title = this.elements.sidebar?.querySelector('.sidebar-title-text');
        const arrow = this.elements.sidebar?.querySelector('.collapsed-arrow');
        
        if (title && arrow) {
            if (collapsed) {
                title.style.display = 'none';
                arrow.style.display = 'inline-flex';
            } else {
                title.style.display = '';
                arrow.style.display = 'none';
            }
        }
    }
    
    toggleMobileMenu() {
        const isMobile = window.innerWidth <= 1024;
        if (!isMobile) {
            // If called in desktop just ensure state cleared
            this.isMobileMenuOpen = false;
            this.sidebar.classList.remove('mobile-open');
            this.sidebarOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            document.body.style.overflow = '';
            this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
            return;
        }
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        if (this.isMobileMenuOpen && this.isSidebarCollapsed) {
            this.isSidebarCollapsed = false;
            this.sidebar.classList.remove('collapsed');
        }
        this.sidebar.classList.toggle('mobile-open', this.isMobileMenuOpen);
        this.sidebarOverlay.classList.toggle('active', this.isMobileMenuOpen);
        document.body.classList.toggle('no-scroll', this.isMobileMenuOpen);
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
        this.mobileMenuBtn?.setAttribute('aria-expanded', this.isMobileMenuOpen.toString());
        if (this.isMobileMenuOpen) {
            // Delay focus until animation starts
            setTimeout(()=>{
                const first = this.sidebar.querySelector('.lesson-item, .collapse-btn, button, a');
                first && first.focus({preventScroll:true});
            }, 180);
        }
    }
    
    handleResize() {
        if (window.innerWidth <= 1024) {
            this.mobileMenuBtn.style.display = 'flex';
            if (this.mobileCloseBtn) this.mobileCloseBtn.style.display = 'inline-flex';
            if (this.isSidebarCollapsed) {
                this.sidebar.classList.remove('collapsed');
            }
            if(this.reopenBtn) this.reopenBtn.style.display = 'none';
        } else {
            this.mobileMenuBtn.style.display = 'none';
            if (this.mobileCloseBtn) this.mobileCloseBtn.style.display = 'none';
            this.sidebar.classList.remove('mobile-open');
            this.sidebarOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            document.body.style.overflow = '';
            this.isMobileMenuOpen = false;
            if (this.wasCollapsedDesktop) {
                this.isSidebarCollapsed = true;
                this.sidebar.classList.add('collapsed');
                if(this.reopenBtn) this.reopenBtn.style.display = 'flex';
            } else {
                this.isSidebarCollapsed = false;
                this.sidebar.classList.remove('collapsed');
                if(this.reopenBtn) this.reopenBtn.style.display = 'none';
            }
        }
        this.setHeaderHeights();
    }
    
    handleKeyboard(e) {
        if (e.key === 'Escape') {
            if (this.isMobileMenuOpen) {
                this.toggleMobileMenu();
            } else if (this.isFocusMode) {
                this.toggleFocusMode();
            }
        }
        
        if (e.key === 'f' || e.key === 'F') {
            if (!e.target.matches('input, textarea')) {
                e.preventDefault();
                this.toggleFocusMode();
            }
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowLeft' && e.ctrlKey) {
            const currentIndex = this.lessons.findIndex(l => l.id === this.currentLessonId);
            if (currentIndex > 0) {
                e.preventDefault();
                this.loadLesson(this.lessons[currentIndex - 1].id);
            }
        }
        
        if (e.key === 'ArrowRight' && e.ctrlKey) {
            const currentIndex = this.lessons.findIndex(l => l.id === this.currentLessonId);
            if (currentIndex < this.lessons.length - 1) {
                e.preventDefault();
                this.loadLesson(this.lessons[currentIndex + 1].id);
            }
        }
    }
    
    savePreferences() {
        if (!this._isStorageAllowed()) return; // don't persist prefs without consent
        
        const prefs = {
            focusMode: this.isFocusMode,
            sidebarCollapsed: this.isSidebarCollapsed,
            collapsedSections: Array.from(this.collapsedSections)
        };
        localStorage.setItem('learnPagePrefs', JSON.stringify(prefs));
    }
    
    loadPreferences() {
        if (!this._isStorageAllowed()) return; // will load after consent on next visit
        
        const prefs = localStorage.getItem('learnPagePrefs');
        if (prefs) {
            try {
                const parsed = JSON.parse(prefs);
                if (parsed.focusMode) { this.toggleFocusMode(); }
                if (parsed.sidebarCollapsed && window.innerWidth > 1024) { this.toggleSidebarCollapse(); }
                if (Array.isArray(parsed.collapsedSections)) { 
                    this.collapsedSections = new Set(parsed.collapsedSections); 
                }
            } catch(e) {
                /* ignore invalid preferences */
            }
        }
        
        this.syncCollapseButton();
        
        if (this.elements.reopenBtn) {
            this.elements.reopenBtn.style.display = (
                this.elements.sidebar?.classList.contains('collapsed') && window.innerWidth > 1024
            ) ? 'flex' : 'none';
        }
    }
    
    announceCompletion(){
        // Ensure every lesson visually marked
        document.querySelectorAll('.lesson-item').forEach(item=> item.classList.add('completed'));
        // Toast message
        let toast = document.getElementById('toast');
        if(!toast){
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast success';
            document.body.appendChild(toast);
        }
    toast.textContent = (window.__t ? window.__t('lessons.completed') : 'آفرین! دوره را کامل کردید');
        toast.classList.add('show');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(()=> toast.classList.remove('show'), 4000);
    }
}

// Initialize when DOM is ready
let learnSPA;
(function initLearnSPA(){
    const start = () => {
        if (window.learnSPA) return; // avoid double-init
        learnSPA = new LearnSPA();
        window.learnSPA = learnSPA;
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();
