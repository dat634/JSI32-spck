// Vocabulary Database System
class VocabularyDatabase {
    constructor() {
        this.vocabulary = {
            // Cấp độ cơ bản (Beginner)
            beginner: {
                family: [
                    { english: "father", vietnamese: "bố", pronunciation: "/ˈfɑːðər/", example: "My father is a teacher." },
                    { english: "mother", vietnamese: "mẹ", pronunciation: "/ˈmʌðər/", example: "My mother cooks dinner." },
                    { english: "brother", vietnamese: "anh/em trai", pronunciation: "/ˈbrʌðər/", example: "I have one brother." },
                    { english: "sister", vietnamese: "chị/em gái", pronunciation: "/ˈsɪstər/", example: "My sister is tall." },
                    { english: "grandfather", vietnamese: "ông", pronunciation: "/ˈɡrændˌfɑːðər/", example: "My grandfather is 70 years old." },
                    { english: "grandmother", vietnamese: "bà", pronunciation: "/ˈɡrændˌmʌðər/", example: "My grandmother bakes cookies." },
                    { english: "uncle", vietnamese: "chú/cậu", pronunciation: "/ˈʌŋkəl/", example: "My uncle lives in the city." },
                    { english: "aunt", vietnamese: "cô/dì", pronunciation: "/ænt/", example: "My aunt is very kind." }
                ],
                animals: [
                    { english: "cat", vietnamese: "con mèo", pronunciation: "/kæt/", example: "The cat is sleeping." },
                    { english: "dog", vietnamese: "con chó", pronunciation: "/dɔːɡ/", example: "The dog is playing." },
                    { english: "bird", vietnamese: "con chim", pronunciation: "/bɜːrd/", example: "The bird is singing." },
                    { english: "fish", vietnamese: "con cá", pronunciation: "/fɪʃ/", example: "The fish is swimming." },
                    { english: "horse", vietnamese: "con ngựa", pronunciation: "/hɔːrs/", example: "The horse is running." },
                    { english: "cow", vietnamese: "con bò", pronunciation: "/kaʊ/", example: "The cow is eating grass." },
                    { english: "pig", vietnamese: "con lợn", pronunciation: "/pɪɡ/", example: "The pig is in the mud." },
                    { english: "chicken", vietnamese: "con gà", pronunciation: "/ˈtʃɪkɪn/", example: "The chicken lays eggs." }
                ],
                colors: [
                    { english: "red", vietnamese: "màu đỏ", pronunciation: "/red/", example: "The apple is red." },
                    { english: "blue", vietnamese: "màu xanh dương", pronunciation: "/bluː/", example: "The sky is blue." },
                    { english: "green", vietnamese: "màu xanh lá", pronunciation: "/ɡriːn/", example: "The grass is green." },
                    { english: "yellow", vietnamese: "màu vàng", pronunciation: "/ˈjeloʊ/", example: "The sun is yellow." },
                    { english: "black", vietnamese: "màu đen", pronunciation: "/blæk/", example: "The cat is black." },
                    { english: "white", vietnamese: "màu trắng", pronunciation: "/waɪt/", example: "The snow is white." },
                    { english: "orange", vietnamese: "màu cam", pronunciation: "/ˈɔːrɪndʒ/", example: "The orange is orange." },
                    { english: "purple", vietnamese: "màu tím", pronunciation: "/ˈpɜːrpəl/", example: "The flower is purple." }
                ],
                food: [
                    { english: "apple", vietnamese: "quả táo", pronunciation: "/ˈæpəl/", example: "I eat an apple every day." },
                    { english: "banana", vietnamese: "quả chuối", pronunciation: "/bəˈnænə/", example: "The banana is yellow." },
                    { english: "bread", vietnamese: "bánh mì", pronunciation: "/bred/", example: "I have bread for breakfast." },
                    { english: "milk", vietnamese: "sữa", pronunciation: "/mɪlk/", example: "I drink milk every morning." },
                    { english: "water", vietnamese: "nước", pronunciation: "/ˈwɔːtər/", example: "I need to drink water." },
                    { english: "rice", vietnamese: "cơm", pronunciation: "/raɪs/", example: "We eat rice for dinner." },
                    { english: "meat", vietnamese: "thịt", pronunciation: "/miːt/", example: "The meat is delicious." },
                    { english: "vegetable", vietnamese: "rau củ", pronunciation: "/ˈvedʒtəbəl/", example: "Vegetables are healthy." }
                ],
                numbers: [
                    { english: "one", vietnamese: "một", pronunciation: "/wʌn/", example: "I have one book." },
                    { english: "two", vietnamese: "hai", pronunciation: "/tuː/", example: "I see two cats." },
                    { english: "three", vietnamese: "ba", pronunciation: "/θriː/", example: "There are three apples." },
                    { english: "four", vietnamese: "bốn", pronunciation: "/fɔːr/", example: "I have four pencils." },
                    { english: "five", vietnamese: "năm", pronunciation: "/faɪv/", example: "The child is five years old." },
                    { english: "six", vietnamese: "sáu", pronunciation: "/sɪks/", example: "I wake up at six o'clock." },
                    { english: "seven", vietnamese: "bảy", pronunciation: "/ˈsevən/", example: "There are seven days in a week." },
                    { english: "eight", vietnamese: "tám", pronunciation: "/eɪt/", example: "I have eight fingers." }
                ]
            },
            
            // Cấp độ trung bình (Intermediate)
            intermediate: {
                emotions: [
                    { english: "happy", vietnamese: "vui vẻ", pronunciation: "/ˈhæpi/", example: "I feel happy today." },
                    { english: "sad", vietnamese: "buồn", pronunciation: "/sæd/", example: "She looks sad." },
                    { english: "angry", vietnamese: "tức giận", pronunciation: "/ˈæŋɡri/", example: "Don't be angry with me." },
                    { english: "excited", vietnamese: "hào hứng", pronunciation: "/ɪkˈsaɪtɪd/", example: "I'm excited about the trip." },
                    { english: "nervous", vietnamese: "lo lắng", pronunciation: "/ˈnɜːrvəs/", example: "I'm nervous about the exam." },
                    { english: "confident", vietnamese: "tự tin", pronunciation: "/ˈkɑːnfɪdənt/", example: "She is confident in her abilities." },
                    { english: "surprised", vietnamese: "ngạc nhiên", pronunciation: "/sərˈpraɪzd/", example: "I was surprised by the news." },
                    { english: "worried", vietnamese: "lo lắng", pronunciation: "/ˈwɜːrid/", example: "My mother is worried about me." }
                ],
                weather: [
                    { english: "sunny", vietnamese: "nắng", pronunciation: "/ˈsʌni/", example: "It's sunny today." },
                    { english: "rainy", vietnamese: "mưa", pronunciation: "/ˈreɪni/", example: "It's rainy outside." },
                    { english: "cloudy", vietnamese: "nhiều mây", pronunciation: "/ˈklaʊdi/", example: "The sky is cloudy." },
                    { english: "windy", vietnamese: "có gió", pronunciation: "/ˈwɪndi/", example: "It's windy today." },
                    { english: "snowy", vietnamese: "có tuyết", pronunciation: "/ˈsnoʊi/", example: "It's snowy in winter." },
                    { english: "hot", vietnamese: "nóng", pronunciation: "/hɑːt/", example: "The weather is hot." },
                    { english: "cold", vietnamese: "lạnh", pronunciation: "/koʊld/", example: "The water is cold." },
                    { english: "warm", vietnamese: "ấm", pronunciation: "/wɔːrm/", example: "The room is warm." }
                ],
                school: [
                    { english: "student", vietnamese: "học sinh", pronunciation: "/ˈstuːdənt/", example: "I am a student." },
                    { english: "teacher", vietnamese: "giáo viên", pronunciation: "/ˈtiːtʃər/", example: "My teacher is kind." },
                    { english: "classroom", vietnamese: "lớp học", pronunciation: "/ˈklæsruːm/", example: "The classroom is big." },
                    { english: "homework", vietnamese: "bài tập về nhà", pronunciation: "/ˈhoʊmwɜːrk/", example: "I do my homework every day." },
                    { english: "exam", vietnamese: "kỳ thi", pronunciation: "/ɪɡˈzæm/", example: "I have an exam tomorrow." },
                    { english: "book", vietnamese: "sách", pronunciation: "/bʊk/", example: "I read a book." },
                    { english: "pencil", vietnamese: "bút chì", pronunciation: "/ˈpensəl/", example: "I write with a pencil." },
                    { english: "computer", vietnamese: "máy tính", pronunciation: "/kəmˈpjuːtər/", example: "I use a computer for work." }
                ],
                travel: [
                    { english: "airplane", vietnamese: "máy bay", pronunciation: "/ˈerpleɪn/", example: "I travel by airplane." },
                    { english: "hotel", vietnamese: "khách sạn", pronunciation: "/hoʊˈtel/", example: "We stay at a hotel." },
                    { english: "passport", vietnamese: "hộ chiếu", pronunciation: "/ˈpæspɔːrt/", example: "I need my passport to travel." },
                    { english: "luggage", vietnamese: "hành lý", pronunciation: "/ˈlʌɡɪdʒ/", example: "My luggage is heavy." },
                    { english: "ticket", vietnamese: "vé", pronunciation: "/ˈtɪkɪt/", example: "I bought a train ticket." },
                    { english: "map", vietnamese: "bản đồ", pronunciation: "/mæp/", example: "I use a map to navigate." },
                    { english: "camera", vietnamese: "máy ảnh", pronunciation: "/ˈkæmərə/", example: "I take photos with my camera." },
                    { english: "souvenir", vietnamese: "quà lưu niệm", pronunciation: "/ˌsuːvəˈnɪr/", example: "I buy souvenirs for my family." }
                ]
            },
            
            // Cấp độ nâng cao (Advanced)
            advanced: {
                business: [
                    { english: "entrepreneur", vietnamese: "doanh nhân", pronunciation: "/ˌɑːntrəprəˈnɜːr/", example: "He is a successful entrepreneur." },
                    { english: "negotiate", vietnamese: "đàm phán", pronunciation: "/nɪˈɡoʊʃieɪt/", example: "We need to negotiate the contract." },
                    { english: "investment", vietnamese: "đầu tư", pronunciation: "/ɪnˈvestmənt/", example: "This is a good investment opportunity." },
                    { english: "strategy", vietnamese: "chiến lược", pronunciation: "/ˈstrætədʒi/", example: "We need a new marketing strategy." },
                    { english: "revenue", vietnamese: "doanh thu", pronunciation: "/ˈrevənuː/", example: "Our revenue increased this year." },
                    { english: "partnership", vietnamese: "đối tác", pronunciation: "/ˈpɑːrtnərʃɪp/", example: "We formed a new partnership." },
                    { english: "innovation", vietnamese: "đổi mới", pronunciation: "/ˌɪnəˈveɪʃən/", example: "Innovation is key to success." },
                    { english: "competition", vietnamese: "cạnh tranh", pronunciation: "/ˌkɑːmpəˈtɪʃən/", example: "The competition is fierce." }
                ],
                technology: [
                    { english: "artificial intelligence", vietnamese: "trí tuệ nhân tạo", pronunciation: "/ˌɑːrtɪˈfɪʃəl ɪnˈtelɪdʒəns/", example: "AI is changing the world." },
                    { english: "algorithm", vietnamese: "thuật toán", pronunciation: "/ˈælɡərɪðəm/", example: "This algorithm is very efficient." },
                    { english: "cybersecurity", vietnamese: "an ninh mạng", pronunciation: "/ˈsaɪbərsɪˌkjʊrəti/", example: "Cybersecurity is important." },
                    { english: "blockchain", vietnamese: "chuỗi khối", pronunciation: "/ˈblɑːktʃeɪn/", example: "Blockchain technology is revolutionary." },
                    { english: "machine learning", vietnamese: "học máy", pronunciation: "/məˈʃiːn ˈlɜːrnɪŋ/", example: "Machine learning improves accuracy." },
                    { english: "virtual reality", vietnamese: "thực tế ảo", pronunciation: "/ˈvɜːrtʃuəl riˈæləti/", example: "VR provides immersive experiences." },
                    { english: "cloud computing", vietnamese: "điện toán đám mây", pronunciation: "/klaʊd kəmˈpjuːtɪŋ/", example: "Cloud computing is cost-effective." },
                    { english: "data analytics", vietnamese: "phân tích dữ liệu", pronunciation: "/ˈdeɪtə ˌænəˈlɪtɪks/", example: "Data analytics helps decision making." }
                ],
                science: [
                    { english: "hypothesis", vietnamese: "giả thuyết", pronunciation: "/haɪˈpɑːθəsɪs/", example: "We need to test this hypothesis." },
                    { english: "experiment", vietnamese: "thí nghiệm", pronunciation: "/ɪkˈsperɪmənt/", example: "The experiment was successful." },
                    { english: "microscope", vietnamese: "kính hiển vi", pronunciation: "/ˈmaɪkrəskoʊp/", example: "We use a microscope to see cells." },
                    { english: "photosynthesis", vietnamese: "quang hợp", pronunciation: "/ˌfoʊtoʊˈsɪnθəsɪs/", example: "Plants use photosynthesis to make food." },
                    { english: "ecosystem", vietnamese: "hệ sinh thái", pronunciation: "/ˈiːkoʊsɪstəm/", example: "We must protect the ecosystem." },
                    { english: "evolution", vietnamese: "tiến hóa", pronunciation: "/ˌevəˈluːʃən/", example: "Evolution explains species development." },
                    { english: "molecule", vietnamese: "phân tử", pronunciation: "/ˈmɑːlɪkjuːl/", example: "Water is made of molecules." },
                    { english: "gravity", vietnamese: "trọng lực", pronunciation: "/ˈɡrævəti/", example: "Gravity keeps us on Earth." }
                ],
                literature: [
                    { english: "metaphor", vietnamese: "ẩn dụ", pronunciation: "/ˈmetəfɔːr/", example: "The poem uses beautiful metaphors." },
                    { english: "protagonist", vietnamese: "nhân vật chính", pronunciation: "/proʊˈtæɡənɪst/", example: "The protagonist faces many challenges." },
                    { english: "symbolism", vietnamese: "biểu tượng", pronunciation: "/ˈsɪmbəlɪzəm/", example: "The novel is rich in symbolism." },
                    { english: "narrative", vietnamese: "câu chuyện", pronunciation: "/ˈnærətɪv/", example: "The narrative is compelling." },
                    { english: "irony", vietnamese: "tính mỉa mai", pronunciation: "/ˈaɪrəni/", example: "The story has dramatic irony." },
                    { english: "alliteration", vietnamese: "điệp âm", pronunciation: "/əˌlɪtəˈreɪʃən/", example: "The poem uses alliteration effectively." },
                    { english: "foreshadowing", vietnamese: "dự báo", pronunciation: "/fɔːrˈʃædoʊɪŋ/", example: "The author uses foreshadowing." },
                    { english: "theme", vietnamese: "chủ đề", pronunciation: "/θiːm/", example: "The main theme is love." }
                ]
            }
        };
        
        this.userProgress = this.loadUserProgress();
        this.favorites = this.loadFavorites();
    }
    
    // Lấy từ vựng theo cấp độ và chủ đề
    getVocabulary(level = 'beginner', topic = null) {
        if (topic) {
            return this.vocabulary[level]?.[topic] || [];
        }
        
        // Trả về tất cả từ vựng của cấp độ
        const allWords = [];
        if (this.vocabulary[level]) {
            Object.values(this.vocabulary[level]).forEach(topicWords => {
                allWords.push(...topicWords);
            });
        }
        return allWords;
    }
    
    // Lấy từ vựng ngẫu nhiên
    getRandomVocabulary(level = 'beginner', topic = null, count = 1) {
        const words = this.getVocabulary(level, topic);
        const shuffled = this.shuffleArray([...words]);
        return shuffled.slice(0, count);
    }
    
    // Tìm kiếm từ vựng
    searchVocabulary(query) {
        const results = [];
        const searchTerm = query.toLowerCase();
        
        Object.keys(this.vocabulary).forEach(level => {
            Object.keys(this.vocabulary[level]).forEach(topic => {
                this.vocabulary[level][topic].forEach(word => {
                    if (word.english.toLowerCase().includes(searchTerm) || 
                        word.vietnamese.toLowerCase().includes(searchTerm)) {
                        results.push({
                            ...word,
                            level,
                            topic
                        });
                    }
                });
            });
        });
        
        return results;
    }
    
    // Lấy danh sách chủ đề theo cấp độ
    getTopics(level) {
        return Object.keys(this.vocabulary[level] || {});
    }
    
    // Lấy tất cả cấp độ
    getLevels() {
        return Object.keys(this.vocabulary);
    }
    
    // Lưu tiến độ học tập
    saveProgress(word, isCorrect) {
        if (!this.userProgress[word.english]) {
            this.userProgress[word.english] = {
                attempts: 0,
                correct: 0,
                lastStudied: null,
                level: word.level,
                topic: word.topic
            };
        }
        
        this.userProgress[word.english].attempts++;
        this.userProgress[word.english].lastStudied = new Date().toISOString();
        
        if (isCorrect) {
            this.userProgress[word.english].correct++;
        }
        
        localStorage.setItem('vocabularyProgress', JSON.stringify(this.userProgress));
    }
    
    // Lấy tiến độ học tập
    getProgress(word) {
        return this.userProgress[word.english] || null;
    }
    
    // Lấy từ vựng cần ôn tập (tỷ lệ đúng thấp)
    getWordsToReview() {
        const wordsToReview = [];
        
        Object.keys(this.userProgress).forEach(english => {
            const progress = this.userProgress[english];
            const accuracy = progress.correct / progress.attempts;
            
            if (accuracy < 0.7 && progress.attempts >= 3) {
                wordsToReview.push({
                    english,
                    ...progress
                });
            }
        });
        
        return wordsToReview.sort((a, b) => a.accuracy - b.accuracy);
    }
    
    // Thêm từ vào yêu thích
    addToFavorites(word) {
        if (!this.favorites.includes(word.english)) {
            this.favorites.push(word.english);
            localStorage.setItem('vocabularyFavorites', JSON.stringify(this.favorites));
        }
    }
    
    // Xóa từ khỏi yêu thích
    removeFromFavorites(word) {
        this.favorites = this.favorites.filter(fav => fav !== word.english);
        localStorage.setItem('vocabularyFavorites', JSON.stringify(this.favorites));
    }
    
    // Kiểm tra từ có trong yêu thích không
    isFavorite(word) {
        return this.favorites.includes(word.english);
    }
    
    // Lấy từ yêu thích
    getFavorites() {
        const favoriteWords = [];
        
        Object.keys(this.vocabulary).forEach(level => {
            Object.keys(this.vocabulary[level]).forEach(topic => {
                this.vocabulary[level][topic].forEach(word => {
                    if (this.favorites.includes(word.english)) {
                        favoriteWords.push({
                            ...word,
                            level,
                            topic
                        });
                    }
                });
            });
        });
        
        return favoriteWords;
    }
    
    // Lấy thống kê học tập
    getStatistics() {
        const totalWords = Object.keys(this.userProgress).length;
        const totalAttempts = Object.values(this.userProgress).reduce((sum, progress) => sum + progress.attempts, 0);
        const totalCorrect = Object.values(this.userProgress).reduce((sum, progress) => sum + progress.correct, 0);
        const overallAccuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;
        
        const levelStats = {};
        Object.keys(this.vocabulary).forEach(level => {
            const levelWords = Object.keys(this.userProgress).filter(word => 
                this.userProgress[word].level === level
            );
            levelStats[level] = levelWords.length;
        });
        
        return {
            totalWords,
            totalAttempts,
            totalCorrect,
            overallAccuracy: Math.round(overallAccuracy * 100) / 100,
            levelStats,
            wordsToReview: this.getWordsToReview().length,
            favoritesCount: this.favorites.length
        };
    }
    
    // Utility functions
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    loadUserProgress() {
        const saved = localStorage.getItem('vocabularyProgress');
        return saved ? JSON.parse(saved) : {};
    }
    
    loadFavorites() {
        const saved = localStorage.getItem('vocabularyFavorites');
        return saved ? JSON.parse(saved) : [];
    }
    
    // Export/Import data
    exportData() {
        return {
            progress: this.userProgress,
            favorites: this.favorites,
            exportDate: new Date().toISOString()
        };
    }
    
    importData(data) {
        if (data.progress) {
            this.userProgress = data.progress;
            localStorage.setItem('vocabularyProgress', JSON.stringify(this.userProgress));
        }
        
        if (data.favorites) {
            this.favorites = data.favorites;
            localStorage.setItem('vocabularyFavorites', JSON.stringify(this.favorites));
        }
    }
}

// Khởi tạo database toàn cục
window.vocabularyDB = new VocabularyDatabase();
