/**
 * 校园打卡指南 - 主交互脚本
 * 功能：打卡标记、进度统计、平滑滚动、响应式导航、图片预览、搜索筛选、API数据
 */

// ============================================
// 数据定义
// ============================================

/** 打卡点数据 */
const CHECKIN_SPOTS = [
    {
        id: 0,
        title: '图书馆晨曦角',
        description: '清晨第一缕阳光洒进图书馆的角落，是自习与思考的圣地',
        tags: ['清晨阳光', '自习圣地'],
        category: '学习场所',
        imagePrompt: 'university library interior with morning sunlight streaming through large windows, students studying at wooden desks, warm golden light, peaceful academic atmosphere, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 1,
        title: '樱花大道',
        description: '春季樱花盛开的长廊，粉色花瓣飘落，浪漫氛围满分',
        tags: ['春季花廊', '浪漫氛围'],
        category: '自然风景',
        imagePrompt: 'cherry blossom avenue in university campus, pink petals falling, spring season, romantic atmosphere, tree-lined path, soft pink and green colors, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 2,
        title: '湖畔观景台',
        description: '校园湖畔的最佳观景点，日落时分景色绝美，四季各有风情',
        tags: ['日落观赏', '四季景色'],
        category: '自然风景',
        imagePrompt: 'university campus lake viewpoint at sunset, calm water reflection, wooden viewing platform, autumn colors, peaceful scenery, golden hour lighting, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 3,
        title: '老食堂二楼',
        description: '充满烟火气的复古食堂，招牌美食让人回味无穷',
        tags: ['复古烟火气', '招牌美食'],
        category: '美食推荐',
        imagePrompt: 'vintage university cafeteria second floor, retro interior design, steaming food, warm lighting, students eating, nostalgic atmosphere, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 4,
        title: '钟楼广场',
        description: '校园地标建筑，钟声悠扬，是活动与集会的中心',
        tags: ['地标建筑', '校园活动'],
        category: '历史建筑',
        imagePrompt: 'university clock tower square, iconic landmark building, students walking around, blue sky, classical architecture, campus central plaza, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 5,
        title: '林荫自习小径',
        description: '隐蔽安静的林荫小道，天然拱廊是独处学习的绝佳去处',
        tags: ['隐蔽安静', '天然拱廊'],
        category: '学习场所',
        imagePrompt: 'tree-lined study path in university campus, natural tree archway, quiet secluded walkway, green canopy overhead, peaceful study spot, dappled sunlight, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 6,
        title: '操场星空夜',
        description: '夜晚操场仰望星空，感受校园文化的独特魅力',
        tags: ['夜间观星', '校园文化'],
        category: '自然风景',
        imagePrompt: 'university sports field at night under starry sky, students sitting on grass, milky way visible, night atmosphere, campus culture, peaceful evening, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 7,
        title: '天台花园',
        description: '隐藏的天台秘密基地，可俯瞰整个校园全景',
        tags: ['秘密基地', '全景俯瞰'],
        category: '自然风景',
        imagePrompt: 'university rooftop garden secret spot, panoramic campus view, potted plants, sunset golden light, hidden peaceful place, overlooking buildings, photorealistic style',
        imageSize: '512x512'
    }
];

/** 当前筛选状态 */
let currentFilter = {
    search: '',
    category: 'all',
    sort: 'default'
};

/** 存储键名 */
const STORAGE_KEY = 'campus_checkin_status';

/** API 配置 */
const API_CONFIG = {
    weatherUrl: 'https://wttr.in/Beijing?format=j1',
    quoteUrl: 'https://api.quotable.io/random'
};

// ============================================
// 工具函数
// ============================================

/**
 * 从 localStorage 获取打卡状态
 * @returns {boolean[]}
 */
function getCheckinStatus() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('读取打卡状态失败:', error);
    }
    return new Array(CHECKIN_SPOTS.length).fill(false);
}

/**
 * 保存打卡状态到 localStorage
 * @param {boolean[]} status
 */
function saveCheckinStatus(status) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
    } catch (error) {
        console.error('保存打卡状态失败:', error);
    }
}

/**
 * 切换打卡状态
 * @param {number} index
 * @returns {boolean} 切换后的状态
 */
function toggleCheckin(index) {
    const status = getCheckinStatus();
    status[index] = !status[index];
    saveCheckinStatus(status);
    return status[index];
}

/**
 * 获取已打卡数量
 * @returns {number}
 */
function getCheckedCount() {
    return getCheckinStatus().filter(Boolean).length;
}

/**
 * 生成 AI 图片 URL
 * @param {string} prompt
 * @param {string} size
 * @returns {string}
 */
function getAiImageUrl(prompt, size) {
    const encodedPrompt = encodeURIComponent(prompt);
    return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=${size}`;
}

/**
 * 获取天气数据
 */
async function fetchWeather() {
    const refreshBtn = document.getElementById('refreshWeather');
    const content = document.getElementById('weatherContent');
    
    if (refreshBtn) refreshBtn.classList.add('loading');
    
    try {
        const response = await fetch(API_CONFIG.weatherUrl);
        const data = await response.json();
        
        if (data && data.current_condition && data.current_condition[0]) {
            const weather = data.current_condition[0];
            const location = data.nearest_area[0].areaName[0].value;
            const weatherHtml = `
                <div class="weather-main">
                    <span class="weather-icon">${getWeatherEmoji(weather.weatherDesc[0].value)}</span>
                    <div class="weather-info">
                        <div class="weather-temp">${weather.temp_C}°C</div>
                        <div class="weather-desc">${weather.weatherDesc[0].value}</div>
                    </div>
                </div>
                <div class="weather-detail">
                    <div class="weather-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                        </svg>
                        <span>湿度 ${weather.humidity}%</span>
                    </div>
                    <div class="weather-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
                            <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
                            <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
                        </svg>
                        <span>风速 ${weather.windspeedKmph} km/h</span>
                    </div>
                    <div class="weather-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="4"/>
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                        </svg>
                        <span>${location}</span>
                    </div>
                </div>
            `;
            content.innerHTML = weatherHtml;
        } else {
            throw new Error('无效的天气数据');
        }
    } catch (error) {
        console.error('获取天气失败:', error);
        content.innerHTML = `
            <div class="api-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 15 9 12 12 9"/>
                    <polyline points="12 15 15 12 12 9"/>
                </svg>
                <p>获取天气失败</p>
                <button onclick="fetchWeather()">重新加载</button>
            </div>
        `;
    } finally {
        if (refreshBtn) refreshBtn.classList.remove('loading');
    }
}

/**
 * 根据天气描述获取表情符号
 * @param {string} desc
 * @returns {string}
 */
function getWeatherEmoji(desc) {
    const descLower = desc.toLowerCase();
    if (descLower.includes('sunny') || descLower.includes('clear')) return '☀️';
    if (descLower.includes('cloud') || descLower.includes('overcast')) return '☁️';
    if (descLower.includes('rain') || descLower.includes('shower')) return '🌧️';
    if (descLower.includes('snow')) return '❄️';
    if (descLower.includes('thunder') || descLower.includes('storm')) return '⛈️';
    return '🌤️';
}

/**
 * 获取每日一句
 */
async function fetchQuote() {
    const refreshBtn = document.getElementById('refreshQuote');
    const content = document.getElementById('quoteContent');
    
    if (refreshBtn) refreshBtn.classList.add('loading');
    
    try {
        const response = await fetch(API_CONFIG.quoteUrl);
        const data = await response.json();
        
        if (data && data.content) {
            const quoteHtml = `
                <p class="quote-text">${data.content}</p>
                <p class="quote-author">${data.author || '未知'}</p>
            `;
            content.innerHTML = quoteHtml;
        } else {
            throw new Error('无效的句子数据');
        }
    } catch (error) {
        console.error('获取每日一句失败:', error);
        const fallbackQuotes = [
            { content: '青春是一本太仓促的书。', author: '席慕容' },
            { content: '人生没有白走的路，每一步都算数。', author: '李宗盛' },
            { content: '生活不止眼前的苟且，还有诗和远方。', author: '高晓松' },
            { content: '愿你走出半生，归来仍是少年。', author: '佚名' },
            { content: '岁月静好，现世安稳。', author: '胡兰成' }
        ];
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        content.innerHTML = `
            <p class="quote-text">${randomQuote.content}</p>
            <p class="quote-author">${randomQuote.author}</p>
        `;
    } finally {
        if (refreshBtn) refreshBtn.classList.remove('loading');
    }
}

/**
 * 筛选和排序打卡点
 * @returns {Array} 筛选后的打卡点数组
 */
function filterSpots() {
    let spots = [...CHECKIN_SPOTS];
    const status = getCheckinStatus();

    if (currentFilter.search) {
        const searchLower = currentFilter.search.toLowerCase();
        spots = spots.filter(spot => 
            spot.title.toLowerCase().includes(searchLower) ||
            spot.description.toLowerCase().includes(searchLower) ||
            spot.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }

    if (currentFilter.category !== 'all') {
        spots = spots.filter(spot => spot.category === currentFilter.category);
    }

    if (currentFilter.sort === 'name') {
        spots.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
    } else if (currentFilter.sort === 'checkin') {
        spots.sort((a, b) => {
            const aChecked = status[a.id];
            const bChecked = status[b.id];
            return bChecked - aChecked;
        });
    }

    return spots;
}

// ============================================
// UI 渲染
// ============================================

/**
 * 渲染打卡卡片
 * @param {Array} spots - 可选的打卡点数组，不传则使用筛选后的数据
 */
function renderCards(spots = null) {
    const grid = document.getElementById('cardsGrid');
    if (!grid) return;

    const displaySpots = spots || filterSpots();
    const status = getCheckinStatus();

    if (displaySpots.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="13" y1="13" x2="13" y2="13"/>
                </svg>
                <p>未找到匹配的打卡点</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = displaySpots.map(spot => {
        const index = spot.id;
        const isChecked = status[index];
        const imageUrl = getAiImageUrl(spot.imagePrompt, spot.imageSize);

        return `
            <article class="card ${isChecked ? 'checked' : ''}" data-index="${index}">
                <div class="card-image">
                    <img src="${imageUrl}" alt="${spot.title}" loading="lazy">
                    <div class="card-overlay"></div>
                    <span class="card-badge">${index + 1}</span>
                    <button class="card-check-btn" aria-label="${isChecked ? '取消打卡' : '打卡'}" data-index="${index}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </button>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${spot.title}</h3>
                    <p class="card-desc">${spot.description}</p>
                    <div class="card-tags">
                        ${spot.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
    }).join('');

    bindCardEvents();
}

/**
 * 更新统计区域状态
 */
function updateStats() {
    const status = getCheckinStatus();
    const count = status.filter(Boolean).length;
    const total = CHECKIN_SPOTS.length;
    const percentage = (count / total) * 100;

    const progressValue = document.getElementById('progressValue');
    const progressFill = document.getElementById('progressFill');

    if (progressValue) {
        progressValue.textContent = `${count}/${total}`;
    }
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    document.querySelectorAll('.stat-item').forEach((item, index) => {
        if (status[index]) {
            item.classList.add('checked');
        } else {
            item.classList.remove('checked');
        }
    });

    document.querySelectorAll('.map-marker').forEach((marker, index) => {
        if (status[index]) {
            marker.classList.add('checked');
        } else {
            marker.classList.remove('checked');
        }
    });
}

/**
 * 更新单个卡片状态
 * @param {number} index
 */
function updateCardState(index) {
    const status = getCheckinStatus();
    const isChecked = status[index];

    const card = document.querySelector(`.card[data-index="${index}"]`);
    if (card) {
        card.classList.toggle('checked', isChecked);
    }

    updateStats();
}

// ============================================
// 事件绑定
// ============================================

/**
 * 绑定卡片事件
 */
function bindCardEvents() {
    document.querySelectorAll('.card-check-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index, 10);
            toggleCheckin(index);
            updateCardState(index);
        });
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index, 10);
            const spot = CHECKIN_SPOTS[index];
            openModal(spot);
        });
    });
}

/**
 * 绑定统计项点击事件
 */
function bindStatEvents() {
    document.querySelectorAll('.stat-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index, 10);
            toggleCheckin(index);
            updateCardState(index);
        });
    });
}

/**
 * 绑定地图标记点击事件
 */
function bindMapEvents() {
    document.querySelectorAll('.map-marker').forEach(marker => {
        marker.addEventListener('click', () => {
            const index = parseInt(marker.dataset.index, 10);
            toggleCheckin(index);
            updateCardState(index);
        });
    });
}

/**
 * 绑定导航栏滚动效果
 */
function bindNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * 绑定移动端菜单切换
 */
function bindMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}

/**
 * 绑定回到顶部按钮
 */
function bindBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * 绑定模态框事件
 */
function bindModalEvents() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('modalClose');
    const overlay = modal?.querySelector('.modal-overlay');

    if (!modal) return;

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * 打开图片预览模态框
 * @param {Object} spot
 */
function openModal(spot) {
    const modal = document.getElementById('imageModal');
    const image = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');

    if (!modal || !image || !caption) return;

    const imageUrl = getAiImageUrl(spot.imagePrompt, '1024x1024');

    image.src = imageUrl;
    image.alt = spot.title;
    caption.textContent = `${spot.title} - ${spot.description}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * 绑定搜索和筛选事件
 */
function bindSearchFilter() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const filterTags = document.querySelectorAll('.filter-tag');
    const sortSelect = document.getElementById('sortSelect');

    searchInput?.addEventListener('input', (e) => {
        currentFilter.search = e.target.value;
        searchClear?.classList.toggle('visible', !!e.target.value);
        renderCards();
    });

    searchClear?.addEventListener('click', () => {
        searchInput.value = '';
        currentFilter.search = '';
        searchClear.classList.remove('visible');
        renderCards();
    });

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentFilter.category = tag.dataset.filter;
            renderCards();
        });
    });

    sortSelect?.addEventListener('change', (e) => {
        currentFilter.sort = e.target.value;
        renderCards();
    });
}

/**
 * 绑定滚动淡入动画
 */
function bindScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.stat-item').forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'fade-in-left' : 'fade-in-right');
        setTimeout(() => observer.observe(el), index * 100);
    });

    document.querySelectorAll('.card').forEach((el, index) => {
        el.classList.add('scale-in');
        setTimeout(() => observer.observe(el), index * 150);
    });

    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.widget').forEach((el, index) => {
        el.classList.add('fade-in');
        setTimeout(() => observer.observe(el), index * 200);
    });
}

/**
 * 设置 Hero 背景图
 */
function setHeroBackground() {
    const heroImg = document.getElementById('heroBgImg');
    if (!heroImg) return;

    const prompt = 'beautiful university campus aerial view, green trees, modern and classical buildings, sunny day, blue sky, wide angle, photorealistic style';
    heroImg.src = getAiImageUrl(prompt, '1024x1024');
}

/**
 * 绑定 API 刷新事件
 */
function bindApiRefresh() {
    const refreshWeather = document.getElementById('refreshWeather');
    const refreshQuote = document.getElementById('refreshQuote');

    refreshWeather?.addEventListener('click', fetchWeather);
    refreshQuote?.addEventListener('click', fetchQuote);
}

/**
 * 加载 API 数据
 */
function loadApiData() {
    Promise.all([fetchWeather(), fetchQuote()]).catch(err => {
        console.error('加载 API 数据失败:', err);
    });
}

// ============================================
// 初始化
// ============================================

/**
 * 应用初始化
 */
function init() {
    setHeroBackground();
    renderCards();
    updateStats();

    bindStatEvents();
    bindMapEvents();
    bindNavbarScroll();
    bindMobileMenu();
    bindBackToTop();
    bindModalEvents();
    bindScrollReveal();
    bindSearchFilter();
    bindApiRefresh();
    loadApiData();

    console.log('校园打卡指南已初始化');
}

document.addEventListener('DOMContentLoaded', init);