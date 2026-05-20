/**
 * 校园打卡指南 - 主交互脚本
 * 功能：打卡标记、进度统计、平滑滚动、响应式导航、图片预览
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
        imagePrompt: 'university library interior with morning sunlight streaming through large windows, students studying at wooden desks, warm golden light, peaceful academic atmosphere, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 1,
        title: '樱花大道',
        description: '春季樱花盛开的长廊，粉色花瓣飘落，浪漫氛围满分',
        tags: ['春季花廊', '浪漫氛围'],
        imagePrompt: 'cherry blossom avenue in university campus, pink petals falling, spring season, romantic atmosphere, tree-lined path, soft pink and green colors, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 2,
        title: '湖畔观景台',
        description: '校园湖畔的最佳观景点，日落时分景色绝美，四季各有风情',
        tags: ['日落观赏', '四季景色'],
        imagePrompt: 'university campus lake viewpoint at sunset, calm water reflection, wooden viewing platform, autumn colors, peaceful scenery, golden hour lighting, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 3,
        title: '老食堂二楼',
        description: '充满烟火气的复古食堂，招牌美食让人回味无穷',
        tags: ['复古烟火气', '招牌美食'],
        imagePrompt: 'vintage university cafeteria second floor, retro interior design, steaming food, warm lighting, students eating, nostalgic atmosphere, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 4,
        title: '钟楼广场',
        description: '校园地标建筑，钟声悠扬，是活动与集会的中心',
        tags: ['地标建筑', '校园活动'],
        imagePrompt: 'university clock tower square, iconic landmark building, students walking around, blue sky, classical architecture, campus central plaza, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 5,
        title: '林荫自习小径',
        description: '隐蔽安静的林荫小道，天然拱廊是独处学习的绝佳去处',
        tags: ['隐蔽安静', '天然拱廊'],
        imagePrompt: 'tree-lined study path in university campus, natural tree archway, quiet secluded walkway, green canopy overhead, peaceful study spot, dappled sunlight, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 6,
        title: '操场星空夜',
        description: '夜晚操场仰望星空，感受校园文化的独特魅力',
        tags: ['夜间观星', '校园文化'],
        imagePrompt: 'university sports field at night under starry sky, students sitting on grass, milky way visible, night atmosphere, campus culture, peaceful evening, photorealistic style',
        imageSize: '512x512'
    },
    {
        id: 7,
        title: '天台花园',
        description: '隐藏的天台秘密基地，可俯瞰整个校园全景',
        tags: ['秘密基地', '全景俯瞰'],
        imagePrompt: 'university rooftop garden secret spot, panoramic campus view, potted plants, sunset golden light, hidden peaceful place, overlooking buildings, photorealistic style',
        imageSize: '512x512'
    }
];

/** 存储键名 */
const STORAGE_KEY = 'campus_checkin_status';

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

// ============================================
// UI 渲染
// ============================================

/**
 * 渲染打卡卡片
 */
function renderCards() {
    const grid = document.getElementById('cardsGrid');
    if (!grid) return;

    const status = getCheckinStatus();

    grid.innerHTML = CHECKIN_SPOTS.map((spot, index) => {
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

    // 绑定卡片事件
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

    // 更新进度条
    const progressValue = document.getElementById('progressValue');
    const progressFill = document.getElementById('progressFill');

    if (progressValue) {
        progressValue.textContent = `${count}/${total}`;
    }
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    // 更新统计项状态
    document.querySelectorAll('.stat-item').forEach((item, index) => {
        if (status[index]) {
            item.classList.add('checked');
        } else {
            item.classList.remove('checked');
        }
    });

    // 更新地图标记状态
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

    // 更新卡片
    const card = document.querySelector(`.card[data-index="${index}"]`);
    if (card) {
        card.classList.toggle('checked', isChecked);
    }

    // 更新统计
    updateStats();
}

// ============================================
// 事件绑定
// ============================================

/**
 * 绑定卡片事件
 */
function bindCardEvents() {
    // 打卡按钮点击
    document.querySelectorAll('.card-check-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index, 10);
            toggleCheckin(index);
            updateCardState(index);
        });
    });

    // 卡片点击预览图片
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

    // 点击导航链接后关闭菜单
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

    // ESC 键关闭
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

    // 为需要动画的元素添加类
    document.querySelectorAll('.stat-item, .card, .section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
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

// ============================================
// 初始化
// ============================================

/**
 * 应用初始化
 */
function init() {
    // 设置 Hero 背景
    setHeroBackground();

    // 渲染卡片
    renderCards();

    // 更新统计状态
    updateStats();

    // 绑定事件
    bindStatEvents();
    bindMapEvents();
    bindNavbarScroll();
    bindMobileMenu();
    bindBackToTop();
    bindModalEvents();
    bindScrollReveal();

    console.log('校园打卡指南已初始化');
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
