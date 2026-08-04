<template>
  <header class="header">
    <div class="header-inner">
      <!-- 品牌区 -->
      <router-link to="/" class="brand">
        <img :src="logo" alt="社团社标" class="brand-logo">
        <span class="brand-text">
          <span class="brand-name">{{ club.name }}</span>
          <span class="brand-en">{{ club.nameEn }}</span>
        </span>
      </router-link>

      <!-- 桌面导航（窄屏隐藏） -->
      <div class="header-nav">
        <navMenu mode="desktop" />
      </div>

      <!-- 右侧：桌面显示招新按钮，窄屏显示汉堡键 -->
      <div class="header-actions">
        <router-link to="/join" class="btn-primary header-cta">
          加入我们
          <el-icon :size="14"><ArrowRight /></el-icon>
        </router-link>

        <button class="hamburger" aria-label="打开菜单" @click="drawer = true">
          <el-icon :size="22"><Fold /></el-icon>
        </button>
      </div>
    </div>

    <!-- 移动端抽屉菜单 -->
    <el-drawer
      v-model="drawer"
      direction="rtl"
      size="78%"
      :with-header="false"
      class="nav-drawer"
    >
      <div class="drawer-body">
        <div class="drawer-top">
          <span class="brand-name">{{ club.name }}</span>
          <button class="drawer-close" aria-label="关闭菜单" @click="drawer = false">
            <el-icon :size="20"><Close /></el-icon>
          </button>
        </div>

        <!-- 点任意栏目后自动收起抽屉 -->
        <navMenu mode="drawer" @navigate="drawer = false" />

        <router-link to="/join" class="btn-primary drawer-cta" @click="drawer = false">
          加入我们
          <el-icon :size="14"><ArrowRight /></el-icon>
        </router-link>
      </div>
    </el-drawer>
  </header>
</template>

<script>
import navMenu from '@/layout/navMenu.vue'
import club from '@/data/club.json'

export default {
  name: 'Header',
  components: { navMenu },
  data() {
    return {
      club,
      logo: require('@/assets/img/img1.webp'),
      drawer: false
    }
  }
}
</script>

<style scoped>
.header {
  position: sticky;                 /* 滚动时吸顶 */
  top: 0;
  z-index: 100;
  background: var(--header-bg);
  backdrop-filter: blur(14px);      /* 毛玻璃，内容从下面透出来 */
  border-bottom: 1px solid var(--border);
}

.header-inner {
  max-width: var(--maxw);
  margin: 0 auto;
  height: 68px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* ---------- 品牌 ---------- */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;                   /* 空间不够时不压缩品牌 */
}

.brand-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;      /* 社标不裁切 */
  transition: transform 0.3s ease;
}

.brand:hover .brand-logo {
  transform: scale(1.06);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-1);
}

.brand-en {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--text-3);
}

/* ---------- 导航 ---------- */
.header-nav {
  display: flex;
  justify-content: center;
  flex: 1;
}

/* ---------- 右侧操作区 ---------- */
.header-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-cta {
  padding: 9px 20px;
  font-size: 14px;
}

.hamburger {
  display: none;                    /* 桌面隐藏 */
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: transparent;
  color: var(--text-1);
  cursor: pointer;
}

/* ---------- 抽屉 ---------- */
.drawer-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 22px;
}

.drawer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.drawer-close {
  border: none;
  background: transparent;
  color: var(--text-2);
  cursor: pointer;
  padding: 4px;
}

.drawer-cta {
  margin-top: 28px;
  justify-content: center;
}

/* Element 的抽屉背景是白的，这里改成深色 */
:deep(.el-drawer) {
  background: var(--bg-2);
}

:deep(.el-drawer__body) {
  padding: 0;
}

@media (max-width: 900px) {
  .header-nav {
    display: none;                  /* 中屏起收进抽屉 */
  }

  .hamburger {
    display: flex;
  }

  .header-cta {
    display: none;                  /* 招新按钮移到抽屉里，顶栏保持干净 */
  }

  .header-inner {
    height: 60px;
    padding: 0 18px;
  }
}
</style>
