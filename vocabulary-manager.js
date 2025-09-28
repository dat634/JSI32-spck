// Vocabulary Manager JavaScript
class VocabularyManager {
    constructor() {
        this.currentLevel = 'all';
        this.currentTopic = '';
        this.currentSort = 'alphabetical';
        this.currentView = 'grid';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.searchQuery = '';
        
        this.filteredWords = [];
        this.allWords = [];
        
        this.init();
    }
    
    init() {
        this.loadAllWords();
        this.setupEventListeners();
        this.updateStatistics();
        this.populateTopicFilter();
        this.renderVocabulary();
    }
    
    loadAllWords() {
        this.allWords = [];
        
        // Load words from all levels and topics
        Object.keys(vocabularyDB.vocabulary).forEach(level => {
            Object.keys(vocabularyDB.vocabulary[level]).forEach(topic => {
                vocabularyDB.vocabulary[level][topic].forEach(word => {
                    this.allWords.push({
                        ...word,
                        level,
                        topic
                    });
                });
            });
        });
        
        this.filteredWords = [...this.allWords];
    }
    
    setupEventListeners() {
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.setLevel(e.target.dataset.level);
            });
        });
        
        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.applyFilters();
        });
        
        // Topic filter
        document.getElementById('topicFilter').addEventListener('change', (e) => {
            this.currentTopic = e.target.value;
            this.applyFilters();
        });
        
        // Sort options
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });
        
        // View options
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setView(e.target.dataset.view);
            });
        });
        
        // Floating buttons
        document.querySelectorAll('.floating-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = btn.classList.contains('fb-btn') ? 'Facebook' : 'Zalo';
                alert(`Liên hệ với DOL English qua ${platform}!`);
            });
        });
    }
    
    setLevel(level) {
        this.currentLevel = level;
        
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-level="${level}"]`).classList.add('active');
        
        this.applyFilters();
    }
    
    setView(view) {
        this.currentView = view;
        
        // Update active view button
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        // Update grid class
        const grid = document.getElementById('vocabularyGrid');
        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }
    
    applyFilters() {
        let filtered = [...this.allWords];
        
        // Filter by level
        if (this.currentLevel !== 'all') {
            filtered = filtered.filter(word => word.level === this.currentLevel);
        }
        
        // Filter by topic
        if (this.currentTopic) {
            filtered = filtered.filter(word => word.topic === this.currentTopic);
        }
        
        // Filter by search query
        if (this.searchQuery) {
            filtered = filtered.filter(word => 
                word.english.toLowerCase().includes(this.searchQuery) ||
                word.vietnamese.toLowerCase().includes(this.searchQuery)
            );
        }
        
        // Sort
        filtered = this.sortWords(filtered);
        
        this.filteredWords = filtered;
        this.currentPage = 1;
        this.renderVocabulary();
        this.updateTitle();
    }
    
    sortWords(words) {
        switch (this.currentSort) {
            case 'alphabetical':
                return words.sort((a, b) => a.english.localeCompare(b.english));
            case 'accuracy':
                return words.sort((a, b) => {
                    const progressA = vocabularyDB.getProgress(a);
                    const progressB = vocabularyDB.getProgress(b);
                    const accuracyA = progressA ? (progressA.correct / progressA.attempts) : 0;
                    const accuracyB = progressB ? (progressB.correct / progressB.attempts) : 0;
                    return accuracyB - accuracyA;
                });
            case 'recent':
                return words.sort((a, b) => {
                    const progressA = vocabularyDB.getProgress(a);
                    const progressB = vocabularyDB.getProgress(b);
                    const dateA = progressA ? new Date(progressA.lastStudied) : new Date(0);
                    const dateB = progressB ? new Date(progressB.lastStudied) : new Date(0);
                    return dateB - dateA;
                });
            case 'favorites':
                return words.sort((a, b) => {
                    const isFavoriteA = vocabularyDB.isFavorite(a);
                    const isFavoriteB = vocabularyDB.isFavorite(b);
                    return isFavoriteB - isFavoriteA;
                });
            default:
                return words;
        }
    }
    
    renderVocabulary() {
        const grid = document.getElementById('vocabularyGrid');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageWords = this.filteredWords.slice(startIndex, endIndex);
        
        if (pageWords.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                    <h3 style="color: var(--dol-medium-gray); margin-bottom: 1rem;">Không tìm thấy từ vựng</h3>
                    <p style="color: var(--dol-medium-gray);">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                </div>
            `;
        } else {
            grid.innerHTML = pageWords.map(word => this.createWordCard(word)).join('');
        }
        
        this.renderPagination();
    }
    
    createWordCard(word) {
        const progress = vocabularyDB.getProgress(word);
        const isFavorite = vocabularyDB.isFavorite(word);
        const accuracy = progress ? Math.round((progress.correct / progress.attempts) * 100) : 0;
        
        return `
            <div class="vocabulary-card fade-in" onclick="vocabularyManager.showWordDetail('${word.english}')">
                <div class="word-header">
                    <div class="word-main">
                        <div class="word-english">${word.english}</div>
                        <div class="word-vietnamese">${word.vietnamese}</div>
                        <div class="word-pronunciation">${word.pronunciation}</div>
                        <div class="word-example">"${word.example}"</div>
                    </div>
                    <div class="word-actions">
                        <button class="action-btn favorite-btn ${isFavorite ? 'active' : ''}" 
                                onclick="event.stopPropagation(); vocabularyManager.toggleFavorite('${word.english}')">
                            <i class="fas fa-star"></i>
                        </button>
                        <button class="action-btn detail-btn" 
                                onclick="event.stopPropagation(); vocabularyManager.showWordDetail('${word.english}')">
                            <i class="fas fa-info"></i>
                        </button>
                    </div>
                </div>
                
                <div class="word-meta">
                    <div class="word-tags">
                        <span class="word-tag level-${word.level}">${this.getLevelName(word.level)}</span>
                        <span class="word-tag topic">${this.getTopicName(word.topic)}</span>
                    </div>
                </div>
                
                ${progress ? `
                    <div class="word-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${accuracy}%"></div>
                        </div>
                        <div class="progress-text">${accuracy}% chính xác (${progress.correct}/${progress.attempts})</div>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    renderPagination() {
        const totalPages = Math.ceil(this.filteredWords.length / this.itemsPerPage);
        const pagination = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="vocabularyManager.goToPage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                        onclick="vocabularyManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        // Next button
        paginationHTML += `
            <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="vocabularyManager.goToPage(${this.currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        pagination.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredWords.length / this.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderVocabulary();
            
            // Scroll to top of vocabulary section
            document.querySelector('.vocabulary-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
    
    showWordDetail(english) {
        const word = this.allWords.find(w => w.english === english);
        if (!word) return;
        
        const progress = vocabularyDB.getProgress(word);
        const isFavorite = vocabularyDB.isFavorite(word);
        
        const modal = document.getElementById('wordModal');
        const detail = document.getElementById('wordDetail');
        
        detail.innerHTML = `
            <div class="word-detail-header">
                <h2>${word.english}</h2>
                <div class="word-detail-actions">
                    <button class="action-btn favorite-btn ${isFavorite ? 'active' : ''}" 
                            onclick="vocabularyManager.toggleFavorite('${word.english}')">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            </div>
            
            <div class="word-detail-content">
                <div class="detail-section">
                    <h3>Nghĩa tiếng Việt</h3>
                    <p class="vietnamese-meaning">${word.vietnamese}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Phát âm</h3>
                    <p class="pronunciation">${word.pronunciation}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Ví dụ</h3>
                    <p class="example">"${word.example}"</p>
                </div>
                
                <div class="detail-section">
                    <h3>Thông tin</h3>
                    <div class="word-info">
                        <span class="info-item">
                            <strong>Cấp độ:</strong> ${this.getLevelName(word.level)}
                        </span>
                        <span class="info-item">
                            <strong>Chủ đề:</strong> ${this.getTopicName(word.topic)}
                        </span>
                    </div>
                </div>
                
                ${progress ? `
                    <div class="detail-section">
                        <h3>Tiến độ học tập</h3>
                        <div class="progress-details">
                            <div class="progress-stats">
                                <div class="stat">
                                    <span class="stat-label">Tổng lần học:</span>
                                    <span class="stat-value">${progress.attempts}</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Trả lời đúng:</span>
                                    <span class="stat-value">${progress.correct}</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Độ chính xác:</span>
                                    <span class="stat-value">${Math.round((progress.correct / progress.attempts) * 100)}%</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Lần học cuối:</span>
                                    <span class="stat-value">${new Date(progress.lastStudied).toLocaleDateString('vi-VN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="detail-section">
                        <h3>Tiến độ học tập</h3>
                        <p class="no-progress">Chưa có dữ liệu học tập</p>
                    </div>
                `}
            </div>
            
            <div class="word-detail-footer">
                <button class="action-btn primary" onclick="vocabularyManager.startStudyWord('${word.english}')">
                    <i class="fas fa-play"></i> Học từ này
                </button>
                <button class="action-btn secondary" onclick="vocabularyManager.closeWordModal()">
                    Đóng
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
    }
    
    toggleFavorite(english) {
        const word = this.allWords.find(w => w.english === english);
        if (!word) return;
        
        if (vocabularyDB.isFavorite(word)) {
            vocabularyDB.removeFromFavorites(word);
        } else {
            vocabularyDB.addToFavorites(word);
        }
        
        this.updateStatistics();
        this.renderVocabulary();
    }
    
    startStudyWord(english) {
        const word = this.allWords.find(w => w.english === english);
        if (!word) return;
        
        this.closeWordModal();
        this.startStudyMode('word', [word]);
    }
    
    startStudyMode(mode, words = null) {
        let studyWords = [];
        
        switch (mode) {
            case 'review':
                studyWords = vocabularyDB.getWordsToReview().map(item => 
                    this.allWords.find(w => w.english === item.english)
                ).filter(Boolean);
                break;
            case 'favorites':
                studyWords = vocabularyDB.getFavorites();
                break;
            case 'topic':
                // Show topic selection
                this.showTopicSelection();
                return;
            case 'level':
                // Show level selection
                this.showLevelSelection();
                return;
            case 'word':
                studyWords = words || [];
                break;
        }
        
        if (studyWords.length === 0) {
            alert('Không có từ vựng để học!');
            return;
        }
        
        this.showStudyModal(studyWords);
    }
    
    showStudyModal(words) {
        const modal = document.getElementById('studyModal');
        const container = document.getElementById('studyContainer');
        
        container.innerHTML = `
            <div class="study-header">
                <h2>🎯 Học Từ Vựng</h2>
                <div class="study-progress">
                    <span id="studyProgress">1 / ${words.length}</span>
                </div>
            </div>
            
            <div class="study-content">
                <div class="study-card" id="studyCard">
                    <!-- Study card content will be populated by JavaScript -->
                </div>
            </div>
            
            <div class="study-actions">
                <button class="action-btn secondary" onclick="vocabularyManager.closeStudyModal()">
                    Dừng học
                </button>
            </div>
        `;
        
        this.currentStudyWords = words;
        this.currentStudyIndex = 0;
        this.showStudyCard();
        
        modal.style.display = 'block';
    }
    
    showStudyCard() {
        if (this.currentStudyIndex >= this.currentStudyWords.length) {
            this.endStudySession();
            return;
        }
        
        const word = this.currentStudyWords[this.currentStudyIndex];
        const card = document.getElementById('studyCard');
        const progress = document.getElementById('studyProgress');
        
        progress.textContent = `${this.currentStudyIndex + 1} / ${this.currentStudyWords.length}`;
        
        card.innerHTML = `
            <div class="study-word-card">
                <div class="study-word-english">${word.english}</div>
                <div class="study-word-pronunciation">${word.pronunciation}</div>
                <div class="study-word-example">"${word.example}"</div>
                
                <div class="study-answer" id="studyAnswer" style="display: none;">
                    <div class="study-word-vietnamese">${word.vietnamese}</div>
                </div>
                
                <div class="study-buttons">
                    <button class="action-btn primary" onclick="vocabularyManager.showStudyAnswer()" id="showAnswerBtn">
                        Hiển thị đáp án
                    </button>
                    <div class="study-feedback" id="studyFeedback" style="display: none;">
                        <button class="action-btn success" onclick="vocabularyManager.studyFeedback(true)">
                            <i class="fas fa-check"></i> Đúng
                        </button>
                        <button class="action-btn danger" onclick="vocabularyManager.studyFeedback(false)">
                            <i class="fas fa-times"></i> Sai
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    showStudyAnswer() {
        document.getElementById('studyAnswer').style.display = 'block';
        document.getElementById('showAnswerBtn').style.display = 'none';
        document.getElementById('studyFeedback').style.display = 'flex';
    }
    
    studyFeedback(isCorrect) {
        const word = this.currentStudyWords[this.currentStudyIndex];
        vocabularyDB.saveProgress(word, isCorrect);
        
        this.currentStudyIndex++;
        this.showStudyCard();
    }
    
    endStudySession() {
        const modal = document.getElementById('studyModal');
        const container = document.getElementById('studyContainer');
        
        container.innerHTML = `
            <div class="study-complete">
                <div class="complete-icon">🎉</div>
                <h2>Hoàn thành!</h2>
                <p>Bạn đã học xong ${this.currentStudyWords.length} từ vựng</p>
                <div class="study-actions">
                    <button class="action-btn primary" onclick="vocabularyManager.closeStudyModal()">
                        Đóng
                    </button>
                </div>
            </div>
        `;
        
        this.updateStatistics();
    }
    
    showTopicSelection() {
        const topics = vocabularyDB.getTopics('beginner').concat(
            vocabularyDB.getTopics('intermediate'),
            vocabularyDB.getTopics('advanced')
        );
        
        const modal = document.getElementById('studyModal');
        const container = document.getElementById('studyContainer');
        
        container.innerHTML = `
            <div class="topic-selection">
                <h2>Chọn chủ đề</h2>
                <div class="topic-grid">
                    ${topics.map(topic => `
                        <button class="topic-btn" onclick="vocabularyManager.startStudyMode('topic', '${topic}')">
                            ${this.getTopicName(topic)}
                        </button>
                    `).join('')}
                </div>
                <button class="action-btn secondary" onclick="vocabularyManager.closeStudyModal()">
                    Hủy
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
    }
    
    showLevelSelection() {
        const modal = document.getElementById('studyModal');
        const container = document.getElementById('studyContainer');
        
        container.innerHTML = `
            <div class="level-selection">
                <h2>Chọn cấp độ</h2>
                <div class="level-grid">
                    <button class="level-btn beginner" onclick="vocabularyManager.startStudyMode('level', 'beginner')">
                        <div class="level-icon">🌱</div>
                        <div class="level-name">Cơ bản</div>
                    </button>
                    <button class="level-btn intermediate" onclick="vocabularyManager.startStudyMode('level', 'intermediate')">
                        <div class="level-icon">🌿</div>
                        <div class="level-name">Trung bình</div>
                    </button>
                    <button class="level-btn advanced" onclick="vocabularyManager.startStudyMode('level', 'advanced')">
                        <div class="level-icon">🌳</div>
                        <div class="level-name">Nâng cao</div>
                    </button>
                </div>
                <button class="action-btn secondary" onclick="vocabularyManager.closeStudyModal()">
                    Hủy
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
    }
    
    closeWordModal() {
        document.getElementById('wordModal').style.display = 'none';
    }
    
    closeStudyModal() {
        document.getElementById('studyModal').style.display = 'none';
    }
    
    populateTopicFilter() {
        const select = document.getElementById('topicFilter');
        const topics = new Set();
        
        this.allWords.forEach(word => {
            topics.add(word.topic);
        });
        
        const sortedTopics = Array.from(topics).sort();
        select.innerHTML = '<option value="">Tất cả chủ đề</option>' +
            sortedTopics.map(topic => 
                `<option value="${topic}">${this.getTopicName(topic)}</option>`
            ).join('');
    }
    
    updateStatistics() {
        const stats = vocabularyDB.getStatistics();
        
        document.getElementById('totalWords').textContent = this.allWords.length;
        document.getElementById('totalTopics').textContent = 
            new Set(this.allWords.map(w => w.topic)).size;
        document.getElementById('favoritesCount').textContent = stats.favoritesCount;
        document.getElementById('accuracyRate').textContent = stats.overallAccuracy + '%';
        
        document.getElementById('reviewCount').textContent = stats.wordsToReview + ' từ cần ôn';
        document.getElementById('favoritesStudyCount').textContent = stats.favoritesCount + ' từ yêu thích';
    }
    
    updateTitle() {
        const title = document.getElementById('vocabularyTitle');
        let titleText = 'Tất cả từ vựng';
        
        if (this.currentLevel !== 'all') {
            titleText = this.getLevelName(this.currentLevel);
        }
        
        if (this.currentTopic) {
            titleText += ` - ${this.getTopicName(this.currentTopic)}`;
        }
        
        if (this.searchQuery) {
            titleText += ` - Tìm kiếm: "${this.searchQuery}"`;
        }
        
        titleText += ` (${this.filteredWords.length} từ)`;
        title.textContent = titleText;
    }
    
    getLevelName(level) {
        const names = {
            'beginner': 'Cơ bản',
            'intermediate': 'Trung bình',
            'advanced': 'Nâng cao'
        };
        return names[level] || level;
    }
    
    getTopicName(topic) {
        const names = {
            'family': 'Gia đình',
            'animals': 'Động vật',
            'colors': 'Màu sắc',
            'food': 'Thức ăn',
            'numbers': 'Số đếm',
            'emotions': 'Cảm xúc',
            'weather': 'Thời tiết',
            'school': 'Trường học',
            'travel': 'Du lịch',
            'business': 'Kinh doanh',
            'technology': 'Công nghệ',
            'science': 'Khoa học',
            'literature': 'Văn học'
        };
        return names[topic] || topic;
    }
}

// Global functions for HTML onclick events
function startStudyMode(mode) {
    vocabularyManager.startStudyMode(mode);
}

function closeWordModal() {
    vocabularyManager.closeWordModal();
}

function closeStudyModal() {
    vocabularyManager.closeStudyModal();
}

// Initialize the vocabulary manager
let vocabularyManager;

document.addEventListener('DOMContentLoaded', function() {
    vocabularyManager = new VocabularyManager();
});
