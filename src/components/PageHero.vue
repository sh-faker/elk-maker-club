<template>
  <section class="page-hero grid-bg">
    <!-- 社团麋鹿社标，作为背景水印，与首页 Hero 保持一致 -->
    <div class="brand-watermark" :style="{ backgroundImage: `url(${logo})` }" />

    <div class="container page-hero-inner">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h1 class="page-hero-title">{{ title }}</h1>
      <p v-if="desc" class="page-hero-desc">{{ desc }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageHero',
  props: {
    eyebrow: { type: String, default: '' },
    title: { type: String, required: true },
    desc: { type: String, default: '' }
  },
  data() {
    return {
      logo: require('@/assets/img/img1.webp')
    }
  }
}
</script>

<style scoped>
.page-hero {
  position: relative;
  padding: 78px 0 62px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-1);
}

.page-hero-inner {
  position: relative;
  z-index: 1;
}

.page-hero-title {
  font-size: 46px;
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-1);
  margin: 0 0 18px;
  letter-spacing: -0.02em;
}

.page-hero-desc {
  font-size: 17px;
  line-height: 1.85;
  color: var(--text-2);
  max-width: 760px;
  margin: 0;
}

@media (max-width: 768px) {
  .page-hero {
    padding: 46px 0 40px;
  }

  .page-hero-title {
    font-size: 30px;
  }

  .page-hero-desc {
    font-size: 15px;
  }
}
</style>
