<template>
  <nav :class="['nav', `nav--${mode}`]">
    <router-link
      v-for="item in menus"
      :key="item.to"
      :to="item.to"
      class="nav-link"
      active-class="is-active"
      @click="$emit('navigate')"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'navMenu',
  props: {
    // desktop：横排；drawer：移动端抽屉里的竖排
    mode: {
      type: String,
      default: 'desktop'
    }
  },
  emits: ['navigate'],
  data() {
    return {
      menus: [
        { label: '首页', to: '/' },
        { label: '关于我们', to: '/about' },
        { label: '赛事', to: '/competition' },
        { label: '作品', to: '/works' },
        { label: '学习', to: '/learn' },
        { label: '加入我们', to: '/join' }
      ]
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  white-space: nowrap;     /* 防止栏目名被拆行 */
}

.nav-link {
  color: var(--text-2);
  font-size: 15px;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--text-1);
}

/* 当前所在栏目：变色 + 下方一条短横线 */
.nav-link.is-active {
  color: var(--accent);
}

/* ---------- 桌面横排 ---------- */
.nav--desktop {
  gap: 34px;
  align-items: center;
}

.nav--desktop .nav-link {
  position: relative;
  padding: 6px 0;
}

.nav--desktop .nav-link.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
}

/* ---------- 移动端抽屉竖排 ---------- */
.nav--drawer {
  flex-direction: column;
  gap: 4px;
}

.nav--drawer .nav-link {
  padding: 15px 4px;
  font-size: 17px;
  font-weight: 500;
  border-bottom: 1px solid var(--border);
}
</style>
