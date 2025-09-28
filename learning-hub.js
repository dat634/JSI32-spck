// Learning Hub JavaScript
class LearningHub {
    constructor() {
        // Use the vocabulary database instead of hardcoded array
        
        this.currentGame = null;
        this.currentQuestion = 0;
        this.score = 0;
        this.gameData = this.loadGameData();
        this.leaderboard = this.loadLeaderboard();
        
        this.init();
    }
    
    init() {
        this.updateStats();
        this.updateLeaderboard();
        this.setupEventListeners();
    }
    
    loadGameData() {
        const saved = localStorage.getItem('dolGameData');
        return saved ? JSON.parse(saved) : {
            totalScore: 0,
            gamesPlayed: 0,
            streak: 0,
            lastPlayDate: null,
            gameStats: {
                flashcard: { highScore: 0, plays: 0 },
                'multiple-choice': { highScore: 0, plays: 0 },
                typing: { highScore: 0, plays: 0 },
                speed: { highScore: 0, plays: 0 },
                shooter: { highScore: 0, plays: 0 },
                puzzle: { highScore: 0, plays: 0 },
                memory: { highScore: 0, plays: 0 },
                'word-shooter': { highScore: 0, plays: 0 }
            }
        };
    }
    
    saveGameData() {
        localStorage.setItem('dolGameData', JSON.stringify(this.gameData));
    }
    
    loadLeaderboard() {
        const saved = localStorage.getItem('dolLeaderboard');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveLeaderboard() {
        localStorage.setItem('dolLeaderboard', JSON.stringify(this.leaderboard));
    }
    
    updateStats() {
        document.getElementById('totalScore').textContent = this.gameData.totalScore;
        document.getElementById('gamesPlayed').textContent = this.gameData.gamesPlayed;
        document.getElementById('streak').textContent = this.gameData.streak;
        
        // Update individual game stats
        Object.keys(this.gameData.gameStats).forEach(game => {
            const highElement = document.getElementById(`${game}-high`);
            const playsElement = document.getElementById(`${game}-plays`);
            if (highElement) highElement.textContent = this.gameData.gameStats[game].highScore;
            if (playsElement) playsElement.textContent = this.gameData.gameStats[game].plays;
        });
    }
    
    updateLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        if (!leaderboardList) return;
        
        const sortedLeaderboard = [...this.leaderboard].sort((a, b) => b.score - a.score);
        
        leaderboardList.innerHTML = sortedLeaderboard.slice(0, 10).map((player, index) => `
            <div class="leaderboard-item ${index < 3 ? `rank-${index + 1}` : ''}">
                <div class="rank-number">${index + 1}</div>
                <div class="player-name">${player.name}</div>
                <div class="player-score">${player.score} điểm</div>
            </div>
        `).join('');
    }
    
    setupEventListeners() {
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
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
    
    startGame(gameType) {
        this.currentGame = gameType;
        this.currentQuestion = 0;
        this.score = 0;
        
        const modal = document.getElementById('gameModal');
        const gameContainer = document.getElementById('gameContainer');
        
        switch (gameType) {
            case 'flashcard':
                this.startFlashcardGame(gameContainer);
                break;
            case 'multiple-choice':
                this.startMultipleChoiceGame(gameContainer);
                break;
            case 'typing':
                this.startTypingGame(gameContainer);
                break;
            case 'speed':
                this.startSpeedGame(gameContainer);
                break;
            case 'shooter':
                this.startShooterGame(gameContainer);
                break;
            case 'puzzle':
                this.startPuzzleGame(gameContainer);
                break;
            case 'memory':
                this.startMemoryGame(gameContainer);
                break;
            
        }
        
        modal.style.display = 'block';
    }
    
    startFlashcardGame(container) {
        const vocab = this.getRandomVocabulary();
        container.innerHTML = `
            <div class="game-header">
                <div class="game-score">Điểm: ${this.score}</div>
                <div class="game-timer">Câu: ${this.currentQuestion + 1}/10</div>
            </div>
            <div class="game-question">
                <h2>${vocab.english}</h2>
                <p id="answer" style="display: none; color: var(--dol-green); font-weight: bold; margin-top: 1rem;">
                    Nghĩa: ${vocab.vietnamese}
                </p>
            </div>
            <div class="game-actions">
                <button class="action-btn secondary" onclick="learningHub.showAnswer()">Show Answer</button>
                <button class="action-btn primary" onclick="learningHub.answerFlashcard(true)" style="display: none;" id="correctBtn">✅ Đúng</button>
                <button class="action-btn primary" onclick="learningHub.answerFlashcard(false)" style="display: none;" id="wrongBtn">❌ Sai</button>
            </div>
        `;
    }
    
    showAnswer() {
        document.getElementById('answer').style.display = 'block';
        document.querySelector('.action-btn.secondary').style.display = 'none';
        document.getElementById('correctBtn').style.display = 'inline-block';
        document.getElementById('wrongBtn').style.display = 'inline-block';
    }
    
    answerFlashcard(isCorrect) {
        if (isCorrect) {
            this.score += 10;
        }
        this.nextQuestion();
    }
    
    startMultipleChoiceGame(container) {
        const vocab = this.getRandomVocabulary();
        const options = this.getRandomOptions(vocab.english);
        
        container.innerHTML = `
            <div class="game-header">
                <div class="game-score">Điểm: ${this.score}</div>
                <div class="game-timer">Câu: ${this.currentQuestion + 1}/10</div>
            </div>
            <div class="game-question">
                <h2>Nghĩa của "${vocab.vietnamese}" là gì?</h2>
            </div>
            <div class="game-options">
                ${options.map((option, index) => `
                    <button class="option-btn" onclick="learningHub.selectOption('${option}', '${vocab.english}')">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    }
    
    selectOption(selected, correct) {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correct) {
                btn.classList.add('correct');
            } else if (btn.textContent === selected && selected !== correct) {
                btn.classList.add('incorrect');
            }
        });
        
        if (selected === correct) {
            this.score += 10;
        } else {
            this.score = Math.max(0, this.score - 5);
        }
        
        setTimeout(() => this.nextQuestion(), 1500);
    }
    
    startTypingGame(container) {
        const vocab = this.getRandomVocabulary();
        
        container.innerHTML = `
            <div class="game-header">
                <div class="game-score">Điểm: ${this.score}</div>
                <div class="game-timer">Câu: ${this.currentQuestion + 1}/10</div>
            </div>
            <div class="game-question">
                <h2>Gõ từ tiếng Anh có nghĩa là: "${vocab.vietnamese}"</h2>
            </div>
            <input type="text" class="game-input" id="typingInput" placeholder="Gõ từ tiếng Anh..." autocomplete="off">
            <div class="game-actions">
                <button class="action-btn primary" onclick="learningHub.checkTypingAnswer('${vocab.english}')">Kiểm tra</button>
                <button class="action-btn secondary" onclick="learningHub.skipQuestion()">Bỏ qua</button>
            </div>
        `;
        
        document.getElementById('typingInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkTypingAnswer(vocab.english);
            }
        });
    }
    
    checkTypingAnswer(correct) {
        const input = document.getElementById('typingInput');
        const answer = input.value.toLowerCase().trim();
        
        if (answer === correct.toLowerCase()) {
            this.score += 15;
            input.style.borderColor = 'var(--dol-green)';
            input.style.backgroundColor = 'rgba(39, 174, 96, 0.1)';
        } else {
            this.score = Math.max(0, this.score - 3);
            input.style.borderColor = 'var(--dol-red)';
            input.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
        }
        
        setTimeout(() => this.nextQuestion(), 1000);
    }
    
    startSpeedGame(container) {
        this.timeLeft = 30;
        this.startTimer();
        this.showSpeedQuestion(container);
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            const timerElement = document.querySelector('.game-timer');
            if (timerElement) {
                timerElement.textContent = `Thời gian: ${this.timeLeft}s`;
            }
            
            if (this.timeLeft <= 0) {
                this.endSpeedGame();
            }
        }, 1000);
    }
    
    showSpeedQuestion(container) {
        const vocab = this.getRandomVocabulary();
        const options = this.getRandomOptions(vocab.english);
        
        container.innerHTML = `
            <div class="game-header">
                <div class="game-score">Điểm: ${this.score}</div>
                <div class="game-timer">Thời gian: ${this.timeLeft}s</div>
            </div>
            <div class="game-question">
                <h2>Nghĩa của "${vocab.vietnamese}" là gì?</h2>
            </div>
            <div class="game-options">
                ${options.map((option, index) => `
                    <button class="option-btn" onclick="learningHub.selectSpeedOption('${option}', '${vocab.english}')">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    }
    
    selectSpeedOption(selected, correct) {
        if (selected === correct) {
            this.score += 20;
        } else {
            this.score = Math.max(0, this.score - 10);
        }
        
        this.showSpeedQuestion(document.getElementById('gameContainer'));
    }
    
    endSpeedGame() {
        clearInterval(this.timer);
        this.endGame();
    }
    
    startShooterGame(container) {
        container.innerHTML = `
            <div class="game-header">
                <div class="game-score">Điểm: ${this.score}</div>
                <div class="game-timer">Thời gian: 60s</div>
            </div>
            <div class="game-question">
                <h2>Bắn từ tiếng Anh đang rơi xuống!</h2>
                <p>Gõ từ tiếng Anh để bắn từ tương ứng</p>
            </div>
            <div id="shooterCanvas" style="height: 400px; border: 2px solid var(--dol-orange); border-radius: 15px; position: relative; overflow: hidden; background: linear-gradient(180deg, #87CEEB, #98FB98);">
                <div id="fallingWords"></div>
            </div>
            <input type="text" class="game-input" id="shooterInput" placeholder="Gõ từ để bắn..." autocomplete="off">
            <div class="game-actions">
                <button class="action-btn secondary" onclick="learningHub.endGame()">Kết thúc</button>
            </div>
        `;
        
        this.startShooterLoop();
    }
    
    startShooterLoop() {
        this.shooterTimer = 60;
        this.fallingWords = [];
        
        // Start countdown
        this.shooterCountdown = setInterval(() => {
            this.shooterTimer--;
            document.querySelector('.game-timer').textContent = `Thời gian: ${this.shooterTimer}s`;
            
            if (this.shooterTimer <= 0) {
                this.endGame();
            }
        }, 1000);
        
        // Create falling words
        this.wordCreationInterval = setInterval(() => {
            this.createFallingWord();
        }, 2000);
        
        // Setup input handler
        document.getElementById('shooterInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.shootWord();
            }
        });
    }
    
    createFallingWord() {
        const vocab = this.getRandomVocabulary();
        const wordElement = document.createElement('div');
        wordElement.className = 'falling-word';
        wordElement.textContent = vocab.english;
        wordElement.style.cssText = `
            position: absolute;
            top: -50px;
            left: ${Math.random() * 80 + 10}%;
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--dol-red);
            background: var(--dol-white);
            padding: 0.5rem 1rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            animation: fall 5s linear forwards;
        `;
        
        wordElement.dataset.word = vocab.english;
        wordElement.dataset.vietnamese = vocab.vietnamese;
        
        document.getElementById('fallingWords').appendChild(wordElement);
        this.fallingWords.push(wordElement);
        
        // Remove word after animation
        setTimeout(() => {
            if (wordElement.parentNode) {
                wordElement.parentNode.removeChild(wordElement);
                this.fallingWords = this.fallingWords.filter(w => w !== wordElement);
            }
        }, 5000);
    }
    
    shootWord() {
        const input = document.getElementById('shooterInput');
        const typedWord = input.value.toLowerCase().trim();
        
        if (!typedWord) return;
        
        // Find matching falling word
        const targetWord = this.fallingWords.find(word => 
            word.dataset.word.toLowerCase() === typedWord
        );
        
        if (targetWord) {
            this.score += 25;
            targetWord.style.animation = 'none';
            targetWord.style.transform = 'scale(1.5)';
            targetWord.style.color = 'var(--dol-green)';
            targetWord.style.background = 'var(--dol-yellow)';
            
            setTimeout(() => {
                if (targetWord.parentNode) {
                    targetWord.parentNode.removeChild(targetWord);
                    this.fallingWords = this.fallingWords.filter(w => w !== targetWord);
                }
            }, 500);
        } else {
            this.score = Math.max(0, this.score - 5);
        }
        
        input.value = '';
    }
    
    getRandomVocabulary(level = 'beginner') {
        const words = vocabularyDB.getVocabulary(level);
        return words[Math.floor(Math.random() * words.length)];
    }
    
    getRandomOptions(correctAnswer, level = 'beginner') {
        const options = [correctAnswer];
        const allWords = vocabularyDB.getVocabulary(level).map(v => v.english);
        
        while (options.length < 4) {
            const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            if (!options.includes(randomWord)) {
                options.push(randomWord);
            }
        }
        
        return this.shuffleArray(options);
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion >= 10) {
            this.endGame();
        } else {
            // Update question counter
            const timerElement = document.querySelector('.game-timer');
            if (timerElement) {
                timerElement.textContent = `Câu: ${this.currentQuestion + 1}/10`;
            }
            
            // Update score
            const scoreElement = document.querySelector('.game-score');
            if (scoreElement) {
                scoreElement.textContent = `Điểm: ${this.score}`;
            }
            
            // Show next question based on game type
            switch (this.currentGame) {
                case 'flashcard':
                    this.startFlashcardGame(document.getElementById('gameContainer'));
                    break;
                case 'multiple-choice':
                    this.startMultipleChoiceGame(document.getElementById('gameContainer'));
                    break;
                case 'typing':
                    this.startTypingGame(document.getElementById('gameContainer'));
                    break;
            }
        }
    }
    
    skipQuestion() {
        this.nextQuestion();
    }
    
    endGame() {
        // Clear any timers
        if (this.timer) clearInterval(this.timer);
        if (this.shooterCountdown) clearInterval(this.shooterCountdown);
        if (this.wordCreationInterval) clearInterval(this.wordCreationInterval);
        
        // Update game data
        this.gameData.totalScore += this.score;
        this.gameData.gamesPlayed++;
        this.gameData.gameStats[this.currentGame].plays++;
        
        if (this.score > this.gameData.gameStats[this.currentGame].highScore) {
            this.gameData.gameStats[this.currentGame].highScore = this.score;
        }
        
        // Update streak
        const today = new Date().toDateString();
        if (this.gameData.lastPlayDate !== today) {
            this.gameData.streak++;
            this.gameData.lastPlayDate = today;
        }
        
        this.saveGameData();
        this.updateStats();
        
        // Show game over screen
        const container = document.getElementById('gameContainer');
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h2 style="color: var(--dol-red); margin-bottom: 1rem;">🎉 Game Over!</h2>
                <div style="font-size: 1.5rem; margin-bottom: 1rem;">
                    <strong>Điểm số: ${this.score}</strong>
                </div>
                <div style="margin-bottom: 2rem;">
                    <p>Chúc mừng bạn đã hoàn thành minigame!</p>
                    <p>Tiếp tục luyện tập để cải thiện kỹ năng tiếng Anh nhé!</p>
                </div>
                <div class="game-actions">
                    <button class="action-btn primary" onclick="learningHub.startGame('${this.currentGame}')">
                        Chơi lại
                    </button>
                    <button class="action-btn secondary" onclick="learningHub.closeGame()">
                        Đóng
                    </button>
                </div>
            </div>
        `;
    }
    
    closeGame() {
        document.getElementById('gameModal').style.display = 'none';
        this.currentGame = null;
    }
    
    showVocabulary() {
        const modal = document.getElementById('vocabModal');
        const vocabList = document.getElementById('vocabList');
        
        // Get all vocabulary from database
        const allWords = [];
        Object.keys(vocabularyDB.vocabulary).forEach(level => {
            Object.keys(vocabularyDB.vocabulary[level]).forEach(topic => {
                vocabularyDB.vocabulary[level][topic].forEach(word => {
                    allWords.push(word);
                });
            });
        });
        
        vocabList.innerHTML = allWords.map(vocab => `
            <div class="vocab-item">
                <div class="vocab-english">${vocab.english}</div>
                <div class="vocab-vietnamese">${vocab.vietnamese}</div>
                <div class="vocab-pronunciation">${vocab.pronunciation}</div>
            </div>
        `).join('');
        
        modal.style.display = 'block';
    }
    
    closeVocabulary() {
        document.getElementById('vocabModal').style.display = 'none';
    }
    
    // Word Puzzle Game
    startPuzzleGame(container) {
        const vocab = this.getRandomVocabulary();
        const scrambledWord = this.scrambleWord(vocab.english);
        
        container.innerHTML = `
            <div class="game-header">
                <div class="game-score">Điểm: ${this.score}</div>
                <div class="game-timer">Câu: ${this.currentQuestion + 1}/10</div>
            </div>
            <div class="game-question">
                <h2>Ghép từ tiếng Anh có nghĩa là: "${vocab.vietnamese}"</h2>
                <div class="puzzle-letters" id="puzzleLetters">
                    ${scrambledWord.split('').map(letter => 
                        `<span class="puzzle-letter" onclick="learningHub.selectLetter('${letter}')">${letter}</span>`
                    ).join('')}
                </div>
            </div>
            <div class="puzzle-answer" id="puzzleAnswer"></div>
            <div class="game-actions">
                <button class="action-btn primary" onclick="learningHub.checkPuzzleAnswer('${vocab.english}')">
                    Kiểm tra
                </button>
                <button class="action-btn secondary" onclick="learningHub.skipQuestion()">
                    Bỏ qua
                </button>
            </div>
        `;
        
        this.currentPuzzleAnswer = '';
    }
    
    selectLetter(letter) {
        this.currentPuzzleAnswer += letter;
        document.getElementById('puzzleAnswer').innerHTML = this.currentPuzzleAnswer;
    }
    
    checkPuzzleAnswer(correct) {
        if (this.currentPuzzleAnswer.toLowerCase() === correct.toLowerCase()) {
            this.score += 20;
            document.getElementById('puzzleAnswer').style.color = 'var(--dol-green)';
        } else {
            this.score = Math.max(0, this.score - 5);
            document.getElementById('puzzleAnswer').style.color = 'var(--dol-red)';
        }
        
        setTimeout(() => this.nextQuestion(), 1500);
    }
    
    scrambleWord(word) {
        return word.split('').sort(() => Math.random() - 0.5).join('');
    }
    
    // Memory Match Game
    startMemoryGame(container) {
        const words = this.getRandomVocabulary('beginner', null, 4);
        const cards = [];
        
        // Tạo cặp thẻ
        words.forEach(word => {
            cards.push({ type: 'english', content: word.english, pair: word.vietnamese });
            cards.push({ type: 'vietnamese', content: word.vietnamese, pair: word.english });
        });
        
        // Xáo trộn thẻ
        this.shuffleArray(cards);
        
        container.innerHTML = `
            <div class="game-header">
                <div class="game-score">Điểm: ${this.score}</div>
                <div class="game-timer">Thời gian: 60s</div>
            </div>
            <div class="game-question">
                <h2>Tìm cặp từ tiếng Anh và nghĩa tiếng Việt!</h2>
            </div>
            <div class="memory-grid" id="memoryGrid">
                ${cards.map((card, index) => `
                    <div class="memory-card" data-index="${index}" onclick="learningHub.flipCard(${index})">
                        <div class="card-content">?</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.memoryCards = cards;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.startMemoryTimer();
    }
    
    flipCard(index) {
        const card = document.querySelector(`[data-index="${index}"]`);
        const cardData = this.memoryCards[index];
        
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        
        card.classList.add('flipped');
        card.querySelector('.card-content').textContent = cardData.content;
        
        this.flippedCards.push({ index, data: cardData });
        
        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMemoryMatch(), 1000);
        }
    }
    
    checkMemoryMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.data.pair === card2.data.content) {
            // Match found
            document.querySelector(`[data-index="${card1.index}"]`).classList.add('matched');
            document.querySelector(`[data-index="${card2.index}"]`).classList.add('matched');
            this.score += 25;
            this.matchedPairs++;
            
            if (this.matchedPairs === 4) {
                this.endMemoryGame();
            }
        } else {
            // No match
            document.querySelector(`[data-index="${card1.index}"]`).classList.remove('flipped');
            document.querySelector(`[data-index="${card2.index}"]`).classList.remove('flipped');
            document.querySelector(`[data-index="${card1.index}"] .card-content`).textContent = '?';
            document.querySelector(`[data-index="${card2.index}"] .card-content`).textContent = '?';
        }
        
        this.flippedCards = [];
    }
    
    startMemoryTimer() {
        this.memoryTimeLeft = 60;
        this.memoryTimer = setInterval(() => {
            this.memoryTimeLeft--;
            document.querySelector('.game-timer').textContent = `Thời gian: ${this.memoryTimeLeft}s`;
            
            if (this.memoryTimeLeft <= 0) {
                this.endMemoryGame();
            }
        }, 1000);
    }
    
    endMemoryGame() {
        clearInterval(this.memoryTimer);
        this.endGame();
    }
    
    startWordShooterLoop() {
        this.shooterTimeLeft = 45;
        this.cannonPosition = 50; // percentage
        this.flyingWords = [];
        
        // Start countdown
        this.shooterCountdown = setInterval(() => {
            this.shooterTimeLeft--;
            document.querySelector('.game-timer').textContent = `Thời gian: ${this.shooterTimeLeft}s`;
            
            if (this.shooterTimeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
        
        // Create flying words
        this.shooterWordInterval = setInterval(() => {
            this.createFlyingShooterWord();
        }, 2500);
        
        // Setup keyboard controls
        document.addEventListener('keydown', this.handleShooterKeydown.bind(this));
    }
    
    handleShooterKeydown(e) {
        const cannon = document.getElementById('cannon');
        
        switch(e.key) {
            case 'ArrowLeft':
                this.cannonPosition = Math.max(10, this.cannonPosition - 10);
                cannon.style.left = this.cannonPosition + '%';
                break;
            case 'ArrowRight':
                this.cannonPosition = Math.min(90, this.cannonPosition + 10);
                cannon.style.left = this.cannonPosition + '%';
                break;
            case ' ':
                e.preventDefault();
                this.shootWord();
                break;
        }
    }
    
    createFlyingShooterWord() {
        const vocab = this.getRandomVocabulary();
        const wordElement = document.createElement('div');
        wordElement.className = 'flying-shooter-word';
        wordElement.textContent = vocab.english;
        wordElement.style.cssText = `
            position: absolute;
            top: -50px;
            left: ${Math.random() * 80 + 10}%;
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--dol-red);
            background: var(--dol-white);
            padding: 0.5rem 1rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            animation: flyDown 4s linear forwards;
        `;
        
        wordElement.dataset.word = vocab.english;
        wordElement.dataset.vietnamese = vocab.vietnamese;
        
        document.getElementById('flyingWords').appendChild(wordElement);
        this.flyingWords.push(wordElement);
        
        // Remove word after animation
        setTimeout(() => {
            if (wordElement.parentNode) {
                wordElement.parentNode.removeChild(wordElement);
                this.flyingWords = this.flyingWords.filter(w => w !== wordElement);
            }
        }, 4000);
    }
    
    shootWord() {
        const cannon = document.getElementById('cannon');
        const cannonRect = cannon.getBoundingClientRect();
        const cannonCenter = cannonRect.left + cannonRect.width / 2;
        
        // Find word near cannon
        const nearbyWord = this.flyingWords.find(word => {
            const wordRect = word.getBoundingClientRect();
            const wordCenter = wordRect.left + wordRect.width / 2;
            return Math.abs(cannonCenter - wordCenter) < 100;
        });
        
        if (nearbyWord) {
            this.score += 30;
            nearbyWord.style.animation = 'none';
            nearbyWord.style.transform = 'scale(1.5)';
            nearbyWord.style.color = 'var(--dol-green)';
            nearbyWord.style.background = 'var(--dol-yellow)';
            
            setTimeout(() => {
                if (nearbyWord.parentNode) {
                    nearbyWord.parentNode.removeChild(nearbyWord);
                    this.flyingWords = this.flyingWords.filter(w => w !== nearbyWord);
                }
            }, 500);
        } else {
            this.score = Math.max(0, this.score - 3);
        }
    }
    
    showLeaderboard(type) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // For now, show the same leaderboard for all types
        // In a real app, you would filter by date range
        this.updateLeaderboard();
    }
}

// Add CSS for falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        from { transform: translateY(-50px); }
        to { transform: translateY(450px); }
    }
`;
document.head.appendChild(style);

// Initialize the learning hub
let learningHub;

document.addEventListener('DOMContentLoaded', function() {
    learningHub = new LearningHub();
    initializeModeButtons();
});

// Global functions for HTML onclick events
function startGame(gameType) {
    learningHub.startGame(gameType);
}

function showVocabulary() {
    learningHub.showVocabulary();
}

function showLeaderboard(type) {
    learningHub.showLeaderboard(type);
}

// Learning Mode Management
let currentMode = 'all';

// Initialize mode buttons
function initializeModeButtons() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            modeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the mode from data attribute
            currentMode = this.getAttribute('data-mode');
            
            // Filter games based on selected mode
            filterGamesByMode(currentMode);
        });
    });
}

// Filter games by mode
function filterGamesByMode(mode) {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const gameType = card.getAttribute('data-game');
        let shouldShow = false;
        
        switch(mode) {
            case 'all':
                shouldShow = true;
                break;
            case 'beginner':
                shouldShow = ['flashcard', 'multiple-choice', 'typing'].includes(gameType);
                break;
            case 'intermediate':
                shouldShow = ['word-shooter', 'puzzle', 'memory'].includes(gameType);
                break;
            case 'advanced':
                shouldShow = ['speed'].includes(gameType);
                break;
            case 'favorites':
                // Check if game is in favorites (you can implement this based on user preferences)
                shouldShow = checkIfGameIsFavorite(gameType);
                break;
        }
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update the games section title based on mode
    updateGamesSectionTitle(mode);
}

// Check if game is favorite (placeholder function)
function checkIfGameIsFavorite(gameType) {
    // You can implement this based on user preferences stored in localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
    return favorites.includes(gameType);
}

// Update games section title
function updateGamesSectionTitle(mode) {
    const gamesSection = document.querySelector('.games-section h2');
    if (!gamesSection) return;
    
    const titles = {
        'all': '🎮 Tất Cả Minigames',
        'beginner': '🟢 Games Cơ Bản',
        'intermediate': '🟡 Games Trung Bình', 
        'advanced': '🔴 Games Nâng Cao',
        'favorites': '⭐ Games Yêu Thích'
    };
    
    gamesSection.textContent = titles[mode] || '🎮 Minigames';
}

function closeGame() {
    learningHub.closeGame();
}

function closeVocabulary() {
    learningHub.closeVocabulary();
}
