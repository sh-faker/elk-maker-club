<template>
  <section class="hero grid-bg">
    <!-- 社团麋鹿社标，作为背景水印 -->
    <div class="brand-watermark" :style="{ backgroundImage: `url(${logo})` }" />

    <div class="container hero-inner">
      <div class="hero-badge">
        <span class="dot" />
        {{ club.recruit.season }}进行中
      </div>

      <h1 class="hero-title">{{ club.slogan }}</h1>

      <p class="hero-sub">{{ club.tagline }}</p>

      <div class="hero-btns">
        <router-link to="/join" class="btn-primary">
          报名加入
          <el-icon :size="15"><ArrowRight /></el-icon>
        </router-link>
        <router-link to="/works" class="btn-ghost">看看我们的车</router-link>
      </div>

      <p class="hero-note">
        零基础可报名 · 不限专业 · 提供完整培训与车模器件
      </p>
    </div>
  </section>
</template>

<script>
import club from '@/data/club.json'

export default {
  name: 'HeroSection',
  data() {
    return {
      club,
      // 社标：换社标只需替换 src/assets/img/img1.webp
      logo: require('@/assets/img/img1.webp')
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  padding: 118px 0 104px;
  border-bottom: 1px solid var(--border);
}

.hero-inner {
  position: relative;      /* 盖在网格背景与社标水印之上 */
  z-index: 1;
  max-width: 860px;
  margin: 0 auto 0 max(24px, calc((100vw - var(--maxw)) / 2 + 24px));
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  background: var(--accent-soft);
  font-size: 13px;
  color: var(--accent);
  margin-bottom: 24px;
}

/* 呼吸的小圆点，表示"正在进行" */
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 var(--accent-glow); }
  50%      { opacity: 0.5; box-shadow: 0 0 0 6px transparent; }
}

.hero-title {
  font-size: 60px;
  font-weight: 800;
  line-height: 1.13;
  color: var(--text-1);
  margin: 0 0 22px;
  letter-spacing: -0.025em;
}

.hero-sub {
  font-size: 18px;
  line-height: 1.85;
  color: var(--text-2);
  margin: 0 0 34px;
  max-width: 600px;
}

.hero-btns {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.hero-note {
  margin: 22px 0 0;
  font-size: 13px;
  color: var(--text-3);
}

@media (max-width: 900px) {
  .hero {
    padding: 64px 0 56px;
  }

  /* 窄屏回到普通 container 内边距 */
  .hero-inner {
    margin: 0 auto;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-sub {
    font-size: 15.5px;
    margin-bottom: 26px;
  }

  .hero-btns {
    width: 100%;
  }

  .hero-btns > * {
    flex: 1;
    justify-content: center;      /* 移动端按钮撑满一行更好点 */
  }
}
</style>
