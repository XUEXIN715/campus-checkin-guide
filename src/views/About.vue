<template>
  <div class="min-h-screen pt-20 pb-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 个人信息卡片 -->
      <section class="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-8 mb-8 text-white animate-fadeIn">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-shrink-0">
            <div class="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <User class="w-16 h-16 text-white" />
            </div>
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-2">薛欣</h2>
            <p class="text-white/80 mb-4">校园探险家 / 前端开发爱好者</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <p class="text-lg font-bold">21</p>
                <p class="text-xs text-white/70">年龄</p>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <p class="text-lg font-bold">专科</p>
                <p class="text-xs text-white/70">学历</p>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <p class="text-lg font-bold">人工智能技术应用</p>
                <p class="text-xs text-white/70">专业</p>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <p class="text-lg font-bold">大二</p>
                <p class="text-xs text-white/70">年级</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 个人简介 -->
      <section class="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn" style="animation-delay: 0.1s">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BookOpen class="w-5 h-5 mr-2 text-blue-500" />
          个人简介
        </h3>
        <p class="text-gray-600 leading-relaxed">
          热爱校园生活，喜欢探索校园的每一个角落。作为一名计算机专业的学生，我热衷于用技术记录美好，用代码创造价值。
          这个校园指南网站是我的个人项目，希望能够帮助新生更快地了解校园，发现校园中的美好。
        </p>
      </section>

      <!-- 教育背景 -->
      <section class="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn" style="animation-delay: 0.2s">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <GraduationCap class="w-5 h-5 mr-2 text-blue-500" />
          教育背景
        </h3>
        <div class="space-y-4">
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-24 text-center">
              <p class="text-sm font-medium text-blue-500">2024.09-2027.06</p>
            </div>
            <div class="flex-1 border-l-2 border-blue-200 pl-4">
              <p class="font-medium text-gray-800">闽闽大学</p>
              <p class="text-sm text-gray-500">人工智能技术应用专业 / 专科</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 技能特长 -->
      <section class="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn" style="animation-delay: 0.3s">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Code class="w-5 h-5 mr-2 text-blue-500" />
          技能特长
        </h3>
        <div class="flex flex-wrap gap-2">
          <span class="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm">深度学习</span>
          <span class="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm">OpenCV</span>
          <span class="px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm">C语言</span>
          <span class="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm">Python</span>
          <span class="px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm">MySQL</span>
        </div>
      </section>

      <!-- 专业技能 -->
      <section class="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn" style="animation-delay: 0.35s">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Award class="w-5 h-5 mr-2 text-purple-500" />
          专业技能
        </h3>
        
        <!-- Python数据分析与机器学习基础 -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold text-purple-600 mb-3">Python数据分析与机器学习基础</h4>
          <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>熟练使用 Python (Pandas, NumPy) 进行数据清洗与预处理，曾独立处理过万级规模的数据集，有效解决缺失值与异常值问题。</li>
            <li>掌握 scikit-learn 常用算法（如随机森林、SVM），能够完成特征工程与模型调优，在课程项目中将模型准确率提升至 85% 以上。</li>
            <li>熟悉 PyTorch 基础框架，能搭建基础的 CNN/RNN 网络进行图像或文本分类任务。</li>
          </ol>
        </div>

        <!-- 深度学习框架应用与模型部署 -->
        <div>
          <h4 class="text-sm font-semibold text-purple-600 mb-3">深度学习框架应用与模型部署</h4>
          <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>熟练使用 PyTorch/TensorFlow 框架复现经典论文模型（如 ResNet, BERT），具备基本的模型训练与 Loss 曲线分析能力。</li>
            <li>掌握 OpenCV 进行基础图像处理（裁剪、增强、滤波），为模型训练提供高质量数据支持。</li>
            <li>了解 Docker 容器化部署流程，曾协助将训练好的模型封装为 API 接口，实现简单的推理服务调用。</li>
          </ol>
        </div>
      </section>

      <!-- 项目经验 -->
      <section class="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn" style="animation-delay: 0.4s">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FolderOpen class="w-5 h-5 mr-2 text-blue-500" />
          项目经验
        </h3>
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-gray-800">电影评分数据分析大屏开发实训报告</span>
              <span class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">2026</span>
            </div>
            <p class="text-sm text-gray-500">这是一个基于Web的大数据可视化系统，旨在通过图表直观展示电影市场趋势。我负责后端核心架构模块的搭建与性能调优。</p>
          </div>
        </div>
      </section>

      <!-- 工作经历 -->
      <section class="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn" style="animation-delay: 0.45s">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Briefcase class="w-5 h-5 mr-2 text-purple-500" />
          工作经历
        </h3>
        <div class="bg-gray-50 rounded-xl p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="font-medium text-gray-800">闽闽互联网有限公司</span>
            <span class="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">2026-07 ~ 2027-02</span>
          </div>
          <div class="text-sm text-gray-600 mb-3">
            <span class="font-medium">AI/计算机视觉工程师</span>
            <span class="mx-2">|</span>
            <span>PyTorch/TensorFlow</span>
            <span class="mx-2">|</span>
            <span>福州</span>
          </div>
          <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>负责基于 PyTorch/TensorFlow 框架的图像分类/目标检测模型开发与训练。</li>
            <li>参与数据清洗与增强工作，使用 OpenCV 对超过 200张原始图片进行预处理（裁剪、去噪、旋转），有效提升了数据集质量。</li>
            <li>针对特定场景优化模型参数，通过调整学习率和Batch Size，将模型在验证集上的准确率从85%提升至92%。</li>
            <li>协助团队完成模型的部署测试，编写技术文档记录实验过程与结果。</li>
          </ol>
        </div>
      </section>

      <!-- 联系方式 -->
      <section class="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fadeIn" style="animation-delay: 0.55s">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Mail class="w-5 h-5 mr-2 text-blue-500" />
          联系方式
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center text-gray-600">
            <Mail class="w-5 h-5 mr-3 text-blue-500" />
            <span>3179352347@qq.com</span>
          </div>
          <div class="flex items-center text-gray-600">
            <Phone class="w-5 h-5 mr-3 text-green-500" />
            <span>13125380620</span>
          </div>
          <div class="flex items-center text-gray-600">
            <MapPin class="w-5 h-5 mr-3 text-red-500" />
            <span>闽闽大学长乐校区</span>
          </div>
          <div class="flex items-center text-gray-600">
            <Globe class="w-5 h-5 mr-3 text-purple-500" />
            <span>github.com/XUEXIN715</span>
          </div>
        </div>
      </section>

      <!-- 留言板 -->
      <section class="animate-fadeIn" style="animation-delay: 0.6s">
        <CommentBoard />
      </section>

      <!-- 网站统计 -->
      <section class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 mt-8 text-white animate-fadeIn" style="animation-delay: 0.7s">
        <h2 class="text-xl font-semibold mb-6">网站统计</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <p class="text-3xl font-bold">12</p>
            <p class="text-white/70 text-sm">校园景点</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold">{{ commentCount }}</p>
            <p class="text-white/70 text-sm">留言数量</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold">{{ totalLikes }}</p>
            <p class="text-white/70 text-sm">总点赞数</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold">4</p>
            <p class="text-white/70 text-sm">分类类别</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { User, MapPin, Heart, Globe, MessageCircle, Mail, BookOpen, GraduationCap, Code, FolderOpen, Phone } from 'lucide-vue-next'
import CommentBoard from '../components/CommentBoard.vue'
import { spotsData } from '../data/spots'
import { getComments, getLikes } from '../utils/storage'

const commentCount = ref(0)

onMounted(() => {
  commentCount.value = getComments().length
})

const totalLikes = computed(() => {
  const likes = getLikes()
  return spotsData.reduce((sum, spot) => {
    return sum + spot.likes + (likes[spot.id] ? 1 : 0)
  }, 0)
})
</script>