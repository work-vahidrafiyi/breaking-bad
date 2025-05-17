document.addEventListener('DOMContentLoaded', function() {
    // مدیریت منوی اصلی و بخش‌ها
    const menuCards = document.querySelectorAll('.menu-card');
    const sections = document.querySelectorAll('.section');
    const backButtons = document.querySelectorAll('.back-btn');
    const mainMenu = document.getElementById('main-menu');
    
    // نمایش بخش مورد نظر با کلیک روی کارت
    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            const sectionId = card.dataset.section;
            showSection(sectionId);
            playClickSound();
        });
    });
    
    // بازگشت به منوی اصلی با کلیک روی دکمه بازگشت
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sections.forEach(section => {
                section.classList.remove('active');
            });
            mainMenu.style.display = 'grid';
            playClickSound();
        });
    });
    
    function showSection(sectionId) {
        // مخفی کردن همه بخش‌ها
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // مخفی کردن منوی اصلی
        mainMenu.style.display = 'none';
        
        // نمایش بخش مورد نظر
        document.getElementById(sectionId).classList.add('active');
        
        // اسکرول به بالای صفحه
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // مدیریت موزیک پس‌زمینه
    const backgroundMusic = document.getElementById('backgroundMusic');
    const clickSound = document.getElementById('clickSound');
    const toggleSoundBtn = document.getElementById('toggleSound');
    const soundIcon = document.getElementById('soundIcon');
    
    let isMuted = true;

    toggleSoundBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            backgroundMusic.pause();
            soundIcon.className = 'fas fa-volume-mute';
        } else {
            backgroundMusic.play();
            soundIcon.className = 'fas fa-volume-up';
        }
    });
    
    function playClickSound() {
        if (!isMuted) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }

    // بخش احساسات
    const emotionButtons = document.querySelectorAll('.emotion-btn');
    const emotionResult = document.getElementById('emotion-result');
    
    const emotionMessages = {
        'شادی': 'شادی یک احساس ارزشمند است. امروز می‌توانید این انرژی مثبت را به دیگران هم منتقل کنید. از لحظات شاد، خاطره بسازید و از آنها در زمان‌های سخت استفاده کنید.',
        'غم': 'احساس غم طبیعی است و بخشی از تجربه‌ی انسانی. به خودتان اجازه دهید که این احساس را تجربه کنید و سپس رها کنید. گاهی غم، راهی برای پردازش عمیق‌تر تجربیات زندگی است.',
        'اضطراب': 'اضطراب نشانه‌ای است که ذهن شما به شما می‌دهد. سعی کنید عمیق نفس بکشید و بر لحظه‌ی حال تمرکز کنید. ذهن خود را به چیزهایی که در کنترل شماست معطوف کنید، نه به نگرانی‌های آینده.',
        'آرامش': 'آرامش نتیجه‌ی تعادل درونی است. این حالت را حفظ کنید و از آن لذت ببرید. به خودتان یادآوری کنید که این لحظات آرامش، همان چیزی هستند که زندگی را معنادار می‌کنند.',
        'خشم': 'خشم یک احساس قدرتمند است. سعی کنید آن را به انرژی سازنده تبدیل کنید و از آن برای حل مسائل استفاده کنید. خشم را بشناسید و بپذیرید، اما اجازه ندهید کنترل شما را به دست بگیرد.',
        'شگفتی': 'شگفتی دریچه‌ای به سوی کشف و یادگیری است. از این حس برای کاوش در دنیای اطراف استفاده کنید. کودک درون خود را زنده نگه دارید و همواره با کنجکاوی به جهان نگاه کنید.'
    };

    emotionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const emotion = button.dataset.emotion;
            const soundName = button.dataset.sound;
            emotionResult.textContent = emotionMessages[emotion];
            playClickSound();
            
            if (!isMuted) {
                const sound = document.getElementById(`${soundName}Sound`);
                sound.currentTime = 0;
                sound.play();
            }
        });
    });

    // آزمون شخصیت شناسی
const beginTestBtn = document.getElementById('begin-test-btn');
const restartTestBtn = document.getElementById('restart-test-btn');
const testStart = document.getElementById('test-start');
const testQuestions = document.getElementById('test-questions');
const testResults = document.getElementById('test-results');
const currentQuestion = document.getElementById('current-question');
const questionCounter = document.getElementById('question-counter');
const questionProgress = document.getElementById('question-progress');
const personalityResult = document.getElementById('personality-result');

// سوالات آزمون
const personalityQuestions = [
    'من معمولا اولین کسی هستم که در جمع صحبت می‌کنم.',
    'من ترجیح می‌دهم وقت بیشتری را تنها بگذرانم تا در جمع.',
    'من ترجیح می‌دهم کتاب بخوانم تا به مهمانی بروم.',
    'من در گروه‌های بزرگ احساس راحتی می‌کنم.',
    'من به جزئیات توجه زیادی دارم.',
    'من معمولا از برنامه‌های از پیش تعیین شده پیروی می‌کنم.',
    'من به راحتی با افکار و ایده‌های جدید کنار می‌آیم.',
    'من ترجیح می‌دهم بر اساس منطق تصمیم بگیرم تا احساس.',
    'مسائل احساسی دیگران برایم مهم است.',
    'من اغلب نگران آینده هستم.'
];

let questionIndex = 0;
let userAnswers = [];

// شروع آزمون
beginTestBtn.addEventListener('click', function() {
    testStart.style.display = 'none';
    testQuestions.style.display = 'block';
    questionIndex = 0;
    userAnswers = [];
    showPersonalityQuestion();
    playClickSound();
});

// شروع مجدد آزمون
restartTestBtn.addEventListener('click', function() {
    testResults.style.display = 'none';
    testQuestions.style.display = 'block';
    questionIndex = 0;
    userAnswers = [];
    showPersonalityQuestion();
    playClickSound();
});

// نمایش سوال فعلی
function showPersonalityQuestion() {
    if (questionIndex < personalityQuestions.length) {
        currentQuestion.textContent = personalityQuestions[questionIndex];
        questionCounter.textContent = `سوال ${questionIndex + 1} از ${personalityQuestions.length}`;
        updateQuestionProgress();
    } else {
        showPersonalityResult();
    }
}

// به‌روزرسانی نوار پیشرفت
function updateQuestionProgress() {
    const progress = ((questionIndex + 1) / personalityQuestions.length) * 100;
    questionProgress.style.width = `${progress}%`;
}

// ثبت پاسخ و رفتن به سوال بعدی
document.querySelectorAll('.test-option-btn').forEach(button => {
    button.addEventListener('click', function() {
        const value = parseInt(this.dataset.value);
        userAnswers.push(value);
        questionIndex++;
        showPersonalityQuestion();
        playClickSound();
    });
});

// نمایش نتیجه آزمون
function showPersonalityResult() {
    testQuestions.style.display = 'none';
    testResults.style.display = 'block';
    
    // تحلیل نتیجه آزمون
    const extraversion = (userAnswers[0] + userAnswers[3] - userAnswers[1] - userAnswers[2]) / 4;
    const conscientiousness = (userAnswers[4] + userAnswers[5]) / 2;
    const openness = userAnswers[6];
    const agreeableness = (userAnswers[8] - userAnswers[7]) / 2;
    const neuroticism = userAnswers[9];
    
    let resultText = '<p>بر اساس پاسخ‌های شما، نتایج آزمون ویژگی‌های شخصیتی به شرح زیر است:</p>';
    
    resultText += '<h4>برون‌گرایی:</h4>';
    if (extraversion > 0.5) {
        resultText += '<p>شما فردی برون‌گرا هستید. تمایل دارید در جمع باشید و از تعامل با دیگران انرژی می‌گیرید. ارتباطات اجتماعی برای شما مهم است و معمولاً در گروه‌ها احساس راحتی می‌کنید.</p>';
    } else {
        resultText += '<p>شما تمایل به درون‌گرایی دارید. زمان تنهایی برای شما ارزشمند است و از آن انرژی می‌گیرید. تعاملات اجتماعی ممکن است برای شما خسته‌کننده باشد و ترجیح می‌دهید با افراد معدودی روابط عمیق داشته باشید.</p>';
    }
    
    resultText += '<h4>وظیفه‌شناسی:</h4>';
    if (conscientiousness > 3) {
        resultText += '<p>شما فردی بسیار وظیفه‌شناس و منظم هستید. به جزئیات توجه زیادی دارید و تمایل به پیروی از برنامه‌های مشخص دارید. قابل اعتماد و قابل اتکا هستید.</p>';
    } else {
        resultText += '<p>شما انعطاف‌پذیری بیشتری در برنامه‌ها دارید و ممکن است به جزئیات کمتر توجه کنید. خلاقیت و خود به خودی بودن برای شما مهم‌تر از پیروی از قواعد سخت است.</p>';
    }
    
    resultText += '<h4>پذیرش تجربه‌های جدید:</h4>';
    if (openness > 3) {
        resultText += '<p>شما فردی با ذهن باز هستید و از تجربه‌های جدید استقبال می‌کنید. کنجکاوی و نوآوری برای شما مهم است و از یادگیری چیزهای جدید لذت می‌برید.</p>';
    } else {
        resultText += '<p>شما به روش‌های آزموده شده و سنتی تمایل دارید. ثبات و قابل پیش‌بینی بودن برای شما اهمیت دارد و ممکن است در برابر تغییرات مقاومت نشان دهید.</p>';
    }
    
    resultText += '<h4>توافق‌پذیری:</h4>';
    if (agreeableness > 0) {
        resultText += '<p>شما فردی همدل و مهربان هستید که به نیازها و احساسات دیگران توجه می‌کنید. روابط هماهنگ برای شما مهم است و تمایل دارید از تعارض اجتناب کنید.</p>';
    } else {
        resultText += '<p>شما بیشتر بر منطق و عقلانیت تکیه می‌کنید تا احساسات. ممکن است رک و مستقیم باشید و ترجیح دهید حقیقت را بگویید حتی اگر ناخوشایند باشد.</p>';
    }
    
    resultText += '<h4>روان‌رنجوری:</h4>';
    if (neuroticism > 3) {
        resultText += '<p>شما ممکن است نسبت به استرس و اضطراب حساس‌تر باشید. احساسات خود را عمیق تجربه می‌کنید و ممکن است نگرانی‌های بیشتری نسبت به آینده داشته باشید.</p>';
    } else {
        resultText += '<p>شما معمولاً آرامش بیشتری دارید و در مواجهه با استرس، ثبات عاطفی خود را حفظ می‌کنید. کمتر نگران آینده هستید و تمایل دارید بر لحظه حال تمرکز کنید.</p>';
    }
    
    resultText += '<p>به یاد داشته باشید این یک آزمون ساده است و شخصیت انسان پیچیده‌تر از آن است که در چند سوال خلاصه شود. این نتایج می‌تواند نقطه شروعی برای خودشناسی بیشتر باشد.</p>';
    
    personalityResult.innerHTML = resultText;
}

    // بخش تنفس و ذهن‌آگاهی
    const startBreathingBtn = document.getElementById('start-breathing');
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathingText = document.getElementById('breathing-text');
    
    let isBreathing = false;
    let breathingInterval;
    
    startBreathingBtn.addEventListener('click', () => {
        if (!isBreathing) {
            isBreathing = true;
            startBreathingBtn.textContent = 'توقف تمرین';
            breathingCircle.classList.add('breathing-animation');
            
            let phase = 0;
            const phases = ['دم...', 'نگه دارید...', 'بازدم...', 'استراحت...'];
            
            breathingText.textContent = phases[phase];
            
            breathingInterval = setInterval(() => {
                phase = (phase + 1) % 4;
                breathingText.textContent = phases[phase];
            }, 2000);
            
        } else {
            isBreathing = false;
            startBreathingBtn.textContent = 'شروع تمرین تنفس';
            breathingCircle.classList.remove('breathing-animation');
            breathingText.textContent = 'برای شروع کلیک کنید';
            clearInterval(breathingInterval);
        }
        
        playClickSound();
    });
    
    // بخش یادداشت‌ها
    const noteInput = document.querySelector('.note-input');
    const saveBtn = document.querySelector('.save-btn');
    const notesContainer = document.getElementById('notes-container');
    
    // بارگذاری یادداشت‌های ذخیره شده
    loadNotes();
    
    saveBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const date = new Date();
            const noteData = {
                content: noteText,
                date: date.toLocaleDateString('fa-IR') + ' ' + date.toLocaleTimeString('fa-IR')
            };
            
            saveNote(noteData);
            noteInput.value = '';
            playClickSound();
        }
    });
    
    function saveNote(noteData) {
        let notes = [];
        if (localStorage.getItem('psychologyNotes')) {
            notes = JSON.parse(localStorage.getItem('psychologyNotes'));
        }
        
        notes.push(noteData);
        localStorage.setItem('psychologyNotes', JSON.stringify(notes));
        
        createNoteElement(noteData, notes.length - 1);
    }
    
    function loadNotes() {
        if (localStorage.getItem('psychologyNotes')) {
            const notes = JSON.parse(localStorage.getItem('psychologyNotes'));
            notes.forEach((note, index) => {
                createNoteElement(note, index);
            });
        }
    }
    
    function createNoteElement(noteData, index) {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');
        noteCard.dataset.index = index;
        
        const noteContent = document.createElement('p');
        noteContent.classList.add('note-content');
        noteContent.textContent = noteData.content;
        
        const noteDate = document.createElement('p');
        noteDate.classList.add('note-date');
        noteDate.textContent = noteData.date;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-note');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', () => {
            deleteNote(index);
            playClickSound();
        });
        
        noteCard.appendChild(noteContent);
        noteCard.appendChild(noteDate);
        noteCard.appendChild(deleteBtn);
        
        notesContainer.appendChild(noteCard);
    }
    
    function deleteNote(index) {
        if (localStorage.getItem('psychologyNotes')) {
            let notes = JSON.parse(localStorage.getItem('psychologyNotes'));
            notes.splice(index, 1);
            localStorage.setItem('psychologyNotes', JSON.stringify(notes));
            
            // بازسازی لیست یادداشت‌ها
            notesContainer.innerHTML = '';
            notes.forEach((note, idx) => {
                createNoteElement(note, idx);
            });
        }
    }
    
    // بخش کتاب‌های روانشناسی
    const booksSlider = document.querySelector('.books-slider');
    const prevBookBtn = document.getElementById('prev-book');
    const nextBookBtn = document.getElementById('next-book');
    const bookCards = document.querySelectorAll('.book-card');
    
    let bookSliderPosition = 0;
    const visibleBooks = window.innerWidth <= 768 ? 1 : 1; // تعداد کتاب‌های قابل مشاهده همزمان
    let totalSlides = Math.ceil(bookCards.length / visibleBooks);
    
    // نمایش اولین کتاب
    updateBookSlider();
    
    prevBookBtn.addEventListener('click', function(e) {
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض
        if (bookSliderPosition > 0) {
            bookSliderPosition--;
            updateBookSlider();
            playClickSound();
        }
    });
    
    nextBookBtn.addEventListener('click', function(e) {
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض
        if (bookSliderPosition < bookCards.length - 1) {
            bookSliderPosition++;
            updateBookSlider();
            playClickSound();
        }
    });
    
    function updateBookSlider() {
        // محاسبه عرض یک کارت + فاصله‌ها
        const cardWidth = bookCards[0].offsetWidth + 20; // 20px برای حاشیه‌ها
        
        // تنظیم موقعیت اسلایدر
        booksSlider.style.transform = `translateX(${-bookSliderPosition * cardWidth}px)`;
        
        // به‌روزرسانی وضعیت دکمه‌ها
        prevBookBtn.disabled = bookSliderPosition === 0;
        nextBookBtn.disabled = bookSliderPosition >= bookCards.length - 1;
        
        // تغییر شفافیت دکمه‌ها
        prevBookBtn.style.opacity = bookSliderPosition === 0 ? '0.5' : '1';
        nextBookBtn.style.opacity = bookSliderPosition >= bookCards.length - 1 ? '0.5' : '1';
    }
    
    // تنظیم مجدد اسلایدر برای موبایل
    function resetBookSlider() {
        if (window.innerWidth <= 768) {
            bookSliderPosition = 0;
            updateBookSlider();
        }
    }
    
    // اجرای تنظیم مجدد هنگام تغییر اندازه صفحه
    window.addEventListener('resize', resetBookSlider);
});

// دایره احساسات پلاچیک - کد جدید
const emotionCards = document.querySelectorAll('.emotion-card');
const selectedEmotionsContainer = document.getElementById('selected-emotions-container');
const combinationResult = document.getElementById('combination-result');
const clearEmotionsBtn = document.getElementById('clear-emotions');
const emotionModal = document.getElementById('emotion-modal');
const modalTitle = document.getElementById('modal-emotion-title');
const modalDesc = document.getElementById('modal-emotion-desc');
const closeModal = document.querySelector('.close-modal');

// اطلاعات احساسات
const emotions = {
    joy: { 
        color: '#ffdf5c', 
        name: 'شادی',
        description: 'احساس خوشحالی، لذت و رضایت. واکنش به موفقیت یا چیزهای دلپذیر. شادی به ما انگیزه می‌دهد تا تجربیات مثبت را تکرار کنیم و با دیگران ارتباط برقرار کنیم.'
    },
    trust: { 
        color: '#85c87d', 
        name: 'اعتماد',
        description: 'اطمینان به دیگران یا موقعیت‌ها. پایه ایجاد روابط و همکاری. اعتماد به ما اجازه می‌دهد تا آسیب‌پذیر باشیم و روابط عمیق ایجاد کنیم.'
    },
    fear: { 
        color: '#68b0ab', 
        name: 'ترس',
        description: 'واکنش به تهدید یا خطر. کمک به بقا و محافظت از خود. ترس ما را هشیار می‌کند و برای مقابله با خطرات آماده می‌سازد.'
    },
    surprise: { 
        color: '#4056a1', 
        name: 'شگفتی',
        description: 'واکنش به رویدادهای غیرمنتظره. آماده‌سازی برای واکنش مناسب. شگفتی باعث می‌شود توجه ما به رویداد جدید جلب شود و آن را بررسی کنیم.'
    },
    sadness: { 
        color: '#8d6cd9', 
        name: 'غم',
        description: 'واکنش به از دست دادن یا ناامیدی. کمک به پردازش تجربیات دشوار. غم به ما کمک می‌کند تا از دست دادن‌ها را پردازش کنیم و همدلی دیگران را جلب کنیم.'
    },
    disgust: { 
        color: '#c38d9e', 
        name: 'انزجار',
        description: 'دفع چیزهایی که ممکن است آسیب‌زا باشند. حفاظت از سلامت جسمی و روانی. انزجار به ما کمک می‌کند از چیزهای مضر دوری کنیم.'
    },
    anger: { 
        color: '#e27d60', 
        name: 'خشم',
        description: 'واکنش به بی‌عدالتی یا مانع. انرژی برای مقابله با موانع. خشم می‌تواند انگیزه‌ای برای تغییر شرایط نامطلوب باشد.'
    },
    anticipation: { 
        color: '#e8a87c', 
        name: 'انتظار',
        description: 'پیش‌بینی و آمادگی برای آینده. کمک به برنامه‌ریزی و تصمیم‌گیری. انتظار ما را برای رویدادهای آینده آماده می‌کند.'
    }
};

// ترکیب احساسات
const emotionCombinations = {
    'joy,trust': {
        name: 'عشق',
        description: 'ترکیب شادی و اعتماد، احساس عمیق پیوند عاطفی و دلبستگی',
        solution: 'این احساس را با بودن در کنار افرادی که دوستشان دارید، تقویت کنید. روابط مثبت و حمایتی را پرورش دهید.'
    },
    'trust,fear': {
        name: 'تسلیم',
        description: 'ترکیب اعتماد و ترس، پذیرش شرایط دشوار همراه با اطمینان به نتیجه',
        solution: 'به خود یادآوری کنید که برخی شرایط خارج از کنترل شماست. تمرکز خود را بر چیزهایی که می‌توانید تغییر دهید، معطوف کنید.'
    },
    'fear,surprise': {
        name: 'وحشت',
        description: 'ترکیب ترس و شگفتی، واکنش شدید به خطر غیرمنتظره',
        solution: 'تنفس عمیق انجام دهید. به خود یادآوری کنید که این واکنش طبیعی است. با تکنیک‌های آرام‌سازی، خود را آرام کنید.'
    },
    'surprise,sadness': {
        name: 'ناامیدی',
        description: 'ترکیب شگفتی و غم، واکنش به خبر ناگهانی منفی',
        solution: 'به خود زمان بدهید تا احساسات خود را پردازش کنید. با افراد مورد اعتماد صحبت کنید و از حمایت آنها بهره ببرید.'
    },
    'sadness,disgust': {
        name: 'پشیمانی',
        description: 'ترکیب غم و انزجار، احساس منفی نسبت به انتخاب‌های گذشته',
        solution: 'خود را ببخشید و بپذیرید که همه انسان‌ها اشتباه می‌کنند. از تجربیات خود درس بگیرید و برای آینده برنامه‌ریزی کنید.'
    },
    'disgust,anger': {
        name: 'تحقیر',
        description: 'ترکیب انزجار و خشم، احساس منفی شدید نسبت به چیزی که ناعادلانه می‌دانید',
        solution: 'به جای تمرکز بر افراد یا شرایط منفی، انرژی خود را صرف چیزهای مثبت و سازنده کنید.'
    },
    'anger,anticipation': {
        name: 'تهاجم',
        description: 'ترکیب خشم و انتظار، آمادگی برای مقابله با موانع',
        solution: 'این انرژی را به سمت اهداف سازنده هدایت کنید. ورزش یا فعالیت‌های بدنی می‌تواند به تخلیه این انرژی کمک کند.'
    },
    'anticipation,joy': {
        name: 'خوش‌بینی',
        description: 'ترکیب انتظار و شادی، نگرش مثبت نسبت به آینده',
        solution: 'این حالت ذهنی را با تمرکز بر جنبه‌های مثبت زندگی و قدردانی از داشته‌هایتان تقویت کنید.'
    },
    'joy,fear': {
        name: 'گناه',
        description: 'ترکیب شادی و ترس، احساس لذت از چیزی که می‌دانید ممکن است عواقب منفی داشته باشد',
        solution: 'با خود صادق باشید و ارزش‌های خود را بررسی کنید. تصمیم بگیرید که آیا رفتار شما با ارزش‌هایتان همخوانی دارد یا نه.'
    },
    'trust,surprise': {
        name: 'کنجکاوی',
        description: 'ترکیب اعتماد و شگفتی، تمایل به کشف چیزهای جدید با ذهنی باز',
        solution: 'این حس را با یادگیری مهارت‌های جدید و جستجوی تجربیات تازه پرورش دهید.'
    },
    'sadness,anger': {
        name: 'حسادت',
        description: 'ترکیب غم و خشم، احساس منفی نسبت به موفقیت دیگران',
        solution: 'به جای مقایسه خود با دیگران، بر پیشرفت شخصی خود تمرکز کنید. قدردان داشته‌های خود باشید.'
    },
    'disgust,anticipation': {
        name: 'بدبینی',
        description: 'ترکیب انزجار و انتظار، پیش‌بینی نتایج منفی',
        solution: 'تلاش کنید افکار منفی خود را به چالش بکشید. شواهدی برای افکار منفی خود بیابید و آنها را ارزیابی کنید.'
    }
};

let selectedEmotions = [];

// نمایش مدال تعریف احساس
function showEmotionDefinition(emotion) {
    modalTitle.textContent = emotions[emotion].name;
    modalDesc.textContent = emotions[emotion].description;
    emotionModal.style.display = 'block';
}

// رویداد کلیک روی احساسات
emotionCards.forEach(card => {
    card.addEventListener('click', function() {
        const emotion = this.dataset.emotion;
        
        // بررسی اینکه آیا قبلاً انتخاب شده است
        const index = selectedEmotions.findIndex(e => e === emotion);
        
        if (index > -1) {
            // حذف احساس از لیست انتخاب‌ها
            selectedEmotions.splice(index, 1);
            this.classList.remove('selected');
        } else {
            // اضافه کردن احساس به لیست انتخاب‌ها
            selectedEmotions.push(emotion);
            this.classList.add('selected');
        }
        
        updateSelectedEmotions();
        updateCombination();
        playClickSound();
    });
    
    // نمایش تعریف احساس با کلیک طولانی
    let pressTimer;
    card.addEventListener('mousedown', function() {
        const emotion = this.dataset.emotion;
        pressTimer = setTimeout(() => {
            showEmotionDefinition(emotion);
        }, 500);
    });
    
    card.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    card.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // برای دستگاه‌های لمسی
    card.addEventListener('touchstart', function(e) {
        const emotion = this.dataset.emotion;
        pressTimer = setTimeout(() => {
            showEmotionDefinition(emotion);
        }, 500);
    }, { passive: true });
    
    card.addEventListener('touchend', function() {
        clearTimeout(pressTimer);
    });
});

// بستن مدال
closeModal.addEventListener('click', function() {
    emotionModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === emotionModal) {
        emotionModal.style.display = 'none';
    }
});

// به‌روزرسانی بخش احساسات انتخاب شده
function updateSelectedEmotions() {
    if (selectedEmotions.length === 0) {
        selectedEmotionsContainer.innerHTML = '<p class="no-selection">هنوز احساسی انتخاب نشده است</p>';
        return;
    }
    
    selectedEmotionsContainer.innerHTML = '';
    
    selectedEmotions.forEach(emotion => {
        const emotionEl = document.createElement('div');
        emotionEl.className = 'selected-emotion';
        emotionEl.style.backgroundColor = emotions[emotion].color;
        
        emotionEl.innerHTML = `
            <span>${emotions[emotion].name}</span>
            <button class="remove-emotion" data-emotion="${emotion}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        selectedEmotionsContainer.appendChild(emotionEl);
    });
    
    // اضافه کردن رویداد کلیک برای دکمه‌های حذف
    document.querySelectorAll('.remove-emotion').forEach(btn => {
        btn.addEventListener('click', function() {
            const emotion = this.dataset.emotion;
            const index = selectedEmotions.findIndex(e => e === emotion);
            
            if (index > -1) {
                selectedEmotions.splice(index, 1);
                document.querySelector(`.emotion-card[data-emotion="${emotion}"]`).classList.remove('selected');
                updateSelectedEmotions();
                updateCombination();
                playClickSound();
            }
        });
    });
}

// به‌روزرسانی ترکیب احساسات
function updateCombination() {
    if (selectedEmotions.length === 0) {
        combinationResult.innerHTML = '<p>با انتخاب دو یا چند احساس، ترکیب آنها را مشاهده کنید</p>';
        return;
    }
    
    if (selectedEmotions.length === 1) {
        // نمایش راهکار برای یک احساس
        const emotion = selectedEmotions[0];
        let solution = '';
        
        switch(emotion) {
            case 'joy':
                solution = 'از لحظات شادی قدردانی کنید و آنها را با دیگران به اشتراک بگذارید. روزنگار شادی‌ها نگه دارید تا در زمان‌های سخت، منبع الهام و انرژی مثبت باشد.';
                break;
            case 'trust':
                solution = 'اعتماد خود را با ارزیابی منطقی شرایط متعادل کنید. به شهود خود گوش دهید اما اطلاعات کافی را نیز جمع‌آوری کنید.';
                break;
            case 'fear':
                solution = 'تنفس عمیق انجام دهید و به زمان حال بازگردید. افکار ترس‌آور را شناسایی و ارزیابی کنید. اگر ترس شدید و مداوم است، با متخصص مشورت کنید.';
                break;
            case 'surprise':
                solution = 'از این لحظه برای یادگیری استفاده کنید. به خود زمان دهید تا اطلاعات جدید را پردازش کنید. ذهن خود را باز نگه دارید.';
                break;
            case 'sadness':
                solution = 'احساس غم را بپذیرید و به خود اجازه تجربه آن را بدهید. با افراد مورد اعتماد صحبت کنید و فعالیت‌های آرامش‌بخش انجام دهید.';
                break;
            case 'disgust':
                solution = 'منبع انزجار را شناسایی کنید و تصمیم بگیرید که آیا می‌توانید از آن دوری کنید. گاهی مواجه هم جواب گوست'
                case 'disgust':
                solution = 'منبع انزجار را شناسایی کنید و تصمیم بگیرید که آیا می‌توانید از آن دوری کنید. گاهی مواجهه تدریجی با منابع انزجار (با کمک متخصص) می‌تواند مفید باشد.';
                break;
            case 'anger':
                solution = 'قبل از واکنش، مکث کنید و نفس عمیق بکشید. احساس خشم را بدون قضاوت بپذیرید و سپس راه‌های سازنده‌ای برای ابراز آن پیدا کنید.';
                break;
            case 'anticipation':
                solution = 'از این انرژی برای برنامه‌ریزی استفاده کنید. اهداف واقع‌بینانه تعیین کنید. اگر انتظار با اضطراب همراه است، تکنیک‌های مدیریت استرس را امتحان کنید.';
                break;
        }
        
        combinationResult.innerHTML = `
            <div class="combination-item fade-in">
                <h4 class="combination-title">${emotions[emotion].name}</h4>
                <p class="combination-description">${emotions[emotion].description}</p>
                <p class="combination-solution">${solution}</p>
            </div>
        `;
        return;
    }
    
    // بررسی ترکیب‌های دوتایی
    const combinations = [];
    
    for (let i = 0; i < selectedEmotions.length; i++) {
        for (let j = i + 1; j < selectedEmotions.length; j++) {
            const emotion1 = selectedEmotions[i];
            const emotion2 = selectedEmotions[j];
            
            // بررسی ترکیب در هر دو جهت
            const key1 = `${emotion1},${emotion2}`;
            const key2 = `${emotion2},${emotion1}`;
            
            if (emotionCombinations[key1]) {
                combinations.push(emotionCombinations[key1]);
            } else if (emotionCombinations[key2]) {
                combinations.push(emotionCombinations[key2]);
            }
        }
    }
    
    if (combinations.length === 0) {
        combinationResult.innerHTML = '<p>ترکیب این احساسات شناخته شده نیست. با انتخاب احساسات دیگر امتحان کنید.</p>';
        return;
    }
    
    // نمایش ترکیب‌ها
    combinationResult.innerHTML = '';
    
    combinations.forEach(combination => {
        const combinationEl = document.createElement('div');
        combinationEl.className = 'combination-item fade-in';
        
        combinationEl.innerHTML = `
            <h4 class="combination-title">${combination.name}</h4>
            <p class="combination-description">${combination.description}</p>
            <p class="combination-solution">${combination.solution}</p>
        `;
        
        combinationResult.appendChild(combinationEl);
    });
}

// پاک کردن احساسات انتخاب شده
clearEmotionsBtn.addEventListener('click', function() {
    selectedEmotions = [];
    emotionCards.forEach(card => {
        card.classList.remove('selected');
    });
    updateSelectedEmotions();
    updateCombination();
    playClickSound();
});

// اضافه کردن دایره احساسات به منوی اصلی
// (اگر بخش کتاب را کاملاً جایگزین می‌کنید، این کد را اضافه کنید)
document.querySelector('.menu-card[data-section="books-section"]').setAttribute('data-section', 'emotions-wheel-section');
document.querySelector('.menu-card[data-section="emotions-wheel-section"] .card-header h3').textContent = 'دایره احساسات پلاچیک';
document.querySelector('.menu-card[data-section="emotions-wheel-section"] .card-icon i').className = 'fas fa-chart-pie';
document.querySelector('.menu-card[data-section="emotions-wheel-section"] .card-desc').textContent = 'کاوش احساسات انسانی و ترکیب آنها';