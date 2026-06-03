<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- 头部导航 -->
    <Header @navigate="handleNavigate" />
    
    <!-- 主内容区域 -->
    <main>
      <Home v-if="currentPage === 'home'" />
      <About v-else-if="currentPage === 'about'" />
    </main>
    
    <!-- 返回顶部按钮 -->
    <BackToTop />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import BackToTop from './components/BackToTop.vue'

// 当前页面状态
const currentPage = ref('home')

// 页面导航处理
const handleNavigate = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>