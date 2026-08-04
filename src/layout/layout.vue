<template>
  <div class="layout">
    <Header />

    <!-- 页面主体：路由切换时只换这里 -->
    <main class="layout-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AppLayout',
  components: { Header, Footer }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-0);
  overflow-x: hidden;      /* 防止移动端横向滚动 */
}

.layout-main {
  flex: 1;                 /* 内容不足一屏时把 Footer 压到底部 */
}

/* 路由切换的淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
