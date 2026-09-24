<template>
  <section class="section">
    <div class="container">
      <div class="head">
        <span class="eyebrow">荣誉记录</span>
        <h2 class="section-title">赛场上拿回来的成绩</h2>
        <p class="section-desc">
          全国大学生智能汽车竞赛是教育部认定的 A 类学科竞赛，下列为社团历年获奖证书。
        </p>
      </div>

      <el-carousel
        :interval="4000"
        arrow="hover"
        height="480px"
        indicator-position="outside"
        class="honor-carousel"
      >
        <el-carousel-item v-for="(cert, index) in certificates" :key="index">
          <div class="cert-wrapper">
            <img :src="resolveImg(cert.image)" :alt="cert.title" class="cert-img">
            <div class="cert-caption">
              <span class="cert-year">{{ cert.year }}</span>
              <span class="cert-title">{{ cert.title }}</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

      <router-link to="/competition" class="btn-ghost more">
        查看完整赛事与获奖记录
        <el-icon :size="14"><ArrowRight /></el-icon>
      </router-link>
    </div>
  </section>
</template>

<script>
import certificates from '@/data/certificates.json'

export default {
  name: 'HonorWallCarousel',
  data() {
    return { certificates }
  },
  methods: {
    resolveImg(file) {
      return require(`@/assets/img/${file}`)
    }
  }
}
</script>

<style scoped>
.head {
  margin-bottom: 44px;
}

.honor-carousel {
  margin-bottom: 44px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-2);
}

/* Element 走马灯内部容器 */
:deep(.el-carousel__container) {
  height: 480px;
}

.cert-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-1);
}

.cert-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lift);
}

.cert-caption {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: var(--overlay-bg);
  backdrop-filter: blur(8px);
  border-radius: 999px;
  color: var(--overlay-text);
}

.cert-year {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.cert-title {
  font-size: 13px;
}

/* 指示器样式覆盖 */
:deep(.el-carousel__indicator) {
  padding: 8px 4px;
}

:deep(.el-carousel__button) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-3);
  opacity: 0.4;
}

:deep(.el-carousel__indicator.is-active .el-carousel__button) {
  background: var(--accent);
  opacity: 1;
}

/* 箭头样式 */
:deep(.el-carousel__arrow) {
  background: var(--overlay-bg);
  backdrop-filter: blur(6px);
}

.more {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .head {
    margin-bottom: 30px;
  }

  :deep(.el-carousel__container) {
    height: 320px;
  }

  .cert-img {
    max-width: 95%;
    max-height: 85%;
  }

  .cert-caption {
    bottom: 14px;
    flex-direction: column;
    gap: 4px;
    padding: 8px 16px;
  }

  .more {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  :deep(.el-carousel__container) {
    height: 260px;
  }

  .cert-img {
    max-width: 98%;
    max-height: 90%;
  }

  .cert-caption {
    bottom: 10px;
    padding: 6px 14px;
  }

  .cert-year {
    font-size: 13px;
  }

  .cert-title {
    font-size: 12px;
  }
}
</style>
