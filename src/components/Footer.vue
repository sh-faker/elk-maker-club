<template>
  <footer class="footer">
    <div class="container footer-inner">
      <!-- 左侧：品牌与简介 -->
      <div class="footer-brand">
        <div class="brand">
          <img :src="logo" alt="社团社标" class="brand-logo">
          <span class="brand-name">{{ club.name }}</span>
        </div>
        <p class="footer-desc">
          {{ club.school }} · {{ club.college }}<br>
          成立于 {{ club.foundedYear }} 年，专注于全国大学生智能汽车竞赛。
        </p>
      </div>

      <!-- 中间：链接分栏 -->
      <div v-for="col in columns" :key="col.title" class="footer-col">
        <h4 class="col-title">{{ col.title }}</h4>
        <ul class="col-list">
          <li v-for="link in col.links" :key="link.label">
            <router-link v-if="link.to" :to="link.to" class="col-link">
              {{ link.label }}
            </router-link>
            <span v-else class="col-text">{{ link.label }}</span>
          </li>
        </ul>
      </div>

      <!-- 右侧：联系方式。club.json 里没填的字段自动不显示 -->
      <div class="footer-col">
        <h4 class="col-title">联系我们</h4>
        <ul class="col-list">
          <li v-for="c in contacts" :key="c.text" class="col-text">
            <el-icon :size="13"><component :is="c.icon" /></el-icon>{{ c.text }}
          </li>
        </ul>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© {{ year }} {{ club.name }} · {{ club.school }}</span>
      <span class="footer-built">本站由社团宣传部维护</span>
    </div>
  </footer>
</template>

<script>
import club from '@/data/club.json'

export default {
  name: 'Footer',
  data() {
    return {
      club,
      logo: require('@/assets/img/img1.webp'),
      // new Date() 只在这里用一次，用于版权年份自动更新
      year: new Date().getFullYear(),
      columns: [
        {
          title: '了解社团',
          links: [
            { label: '社团简介', to: '/about' },
            { label: '组织架构', to: '/about' },
            { label: '实验室', to: '/about' },
            { label: '指导老师', to: '/about' }
          ]
        },
        {
          title: '技术与赛事',
          links: [
            { label: '赛事介绍', to: '/competition' },
            { label: '获奖记录', to: '/competition' },
            { label: '车模作品', to: '/works' },
            { label: '培训课程', to: '/learn' }
          ]
        },
        {
          title: '加入我们',
          links: [
            { label: '招新须知', to: '/join' },
            { label: '报名入口', to: '/join' },
            { label: '常见问题', to: '/join' }
          ]
        }
      ]
    }
  },
  computed: {
    // 只显示 club.json 里真正填了的联系方式，避免出现「公众号 」这种空尾巴
    contacts() {
      const c = club.contact || {}
      return [
        { icon: 'Location', text: c.lab },
        { icon: 'ChatDotRound', text: c.qqGroup && `QQ 群 ${c.qqGroup}` },
        { icon: 'Message', text: c.email },
        { icon: 'Promotion', text: c.wechat && `公众号 ${c.wechat}` }
      ].filter((item) => item.text)
    }
  }
}
</script>

<style scoped>
.footer {
  background: var(--bg-1);
  border-top: 1px solid var(--border);
  padding-top: 60px;
}

.footer-inner {
  display: grid;
  /* 品牌列更宽，后面四列等分 */
  grid-template-columns: 1.6fr repeat(4, 1fr);
  gap: 40px 28px;
  padding-bottom: 48px;
}

/* ---------- 品牌列 ---------- */
.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
}

.brand-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.brand-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-1);
}

.footer-desc {
  font-size: 13px;
  line-height: 1.9;
  color: var(--text-3);
  margin: 0;
}

/* ---------- 链接列 ---------- */
.col-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 16px;
}

.col-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.col-link {
  font-size: 13.5px;
  color: var(--text-3);
  transition: color 0.2s ease;
}

.col-link:hover {
  color: var(--accent);
}

.col-text {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-3);
}

.col-text :deep(.el-icon) {
  margin-top: 3px;
  flex-shrink: 0;      /* 图标不被文字挤变形 */
  color: var(--text-3);
}

/* ---------- 底部版权条 ---------- */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 22px;
  padding-bottom: 28px;
  border-top: 1px solid var(--border);
  font-size: 12.5px;
  color: var(--text-3);
}

@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 品牌列在窄屏占满整行 */
  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer {
    padding-top: 42px;
  }

  .footer-inner {
    gap: 30px 20px;
    padding-bottom: 32px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  .footer-built {
    order: -1;      /* 小屏把维护信息放上面，版权在最后 */
  }
}
</style>
