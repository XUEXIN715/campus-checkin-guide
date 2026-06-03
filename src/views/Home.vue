<template>
  <div class="min-h-screen pt-20 pb-12">
    <!-- Hero区域 -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
        <!-- 背景装饰 -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div class="relative z-10">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">欢迎来到校园指南</h2>
          <p class="text-white/80 text-lg mb-6">探索校园的每一个角落，发现隐藏的美好</p>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <MapPin class="w-5 h-5 mr-2" />
              <span>{{ filteredSpots.length }} 个景点</span>
            </div>
            <div class="flex items-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <Heart class="w-5 h-5 mr-2" />
              <span>{{ totalLikes }} 次点赞</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 搜索和筛选区域 -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- 搜索框 -->
          <div class="flex-1">
            <SearchBar v-model="searchQuery" @search="handleSearch" />
          </div>
          <!-- 分类筛选 -->
          <div>
            <CategoryFilter 
              :categories="categories" 
              v-model="selectedCategory"
              @filter="handleFilter"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 景点列表 -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <SpotCard
          v-for="(spot, index) in filteredSpots"
          :key="spot.id"
          :spot="spot"
          :index="index"
          @preview="handlePreview"
          @like="handleLike"
        />
      </div>

      <!-- 空状态 -->
      <div v-if="filteredSpots.length === 0" class="text-center py-16">
        <Search class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600 mb-2">未找到相关景点</h3>
        <p class="text-gray-400">请尝试调整搜索关键词或筛选条件</p>
      </div>
    </section>

    <!-- 图片预览灯箱 -->
    <Lightbox
      v-model:visible="lightboxVisible"
      :spots="filteredSpots"
      v-model:currentIndex="lightboxIndex"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { MapPin, Heart, Search } from 'lucide-vue-next'
import SpotCard from '../components/SpotCard.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import Lightbox from '../components/Lightbox.vue'
import { spotsData, categories } from '../data/spots'
import { getLikes, saveLikes } from '../utils/storage'

// 搜索关键词
const searchQuery = ref('')

// 选中的分类
const selectedCategory = ref('全部')

// 景点数据（响应式）
const spots = ref([])

// 灯箱状态
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

// 初始化加载数据
onMounted(() => {
  spots.value = spotsData.map(spot => ({ ...spot }))
  loadLikes()
  initLazyLoad()
})

// 加载点赞状态
const loadLikes = () => {
  const likes = getLikes()
  spots.value.forEach(spot => {
    spot.isLiked = likes[spot.id] || false
  })
}

// 图片懒加载初始化
const initLazyLoad = () => {
  const lazyImages = document.querySelectorAll('.lazy-image')
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.add('loaded')
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px'
  })
  
  lazyImages.forEach(img => {
    observer.observe(img)
  })
}

// 监听数据变化重新初始化懒加载
onUnmounted(() => {
  // 清理工作
})

// 筛选后的景点列表
const filteredSpots = computed(() => {
  return spots.value.filter(spot => {
    const matchSearch = spot.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       spot.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = selectedCategory.value === '全部' || spot.category === selectedCategory.value
    return matchSearch && matchCategory
  })
})

// 总点赞数
const totalLikes = computed(() => {
  return spots.value.reduce((sum, spot) => sum + spot.likes, 0)
})

// 搜索处理
const handleSearch = (query) => {
  searchQuery.value = query
}

// 筛选处理
const handleFilter = (category) => {
  selectedCategory.value = category
}

// 预览图片
const handlePreview = (spot) => {
  const index = filteredSpots.value.findIndex(s => s.id === spot.id)
  if (index !== -1) {
    lightboxIndex.value = index
    lightboxVisible.value = true
  }
}

// 点赞处理
const handleLike = (spotId) => {
  const spot = spots.value.find(s => s.id === spotId)
  if (spot) {
    spot.isLiked = !spot.isLiked
    spot.likes += spot.isLiked ? 1 : -1
    
    // 保存到本地存储
    const likes = getLikes()
    likes[spotId] = spot.isLiked
    saveLikes(likes)
  }
}
</script>