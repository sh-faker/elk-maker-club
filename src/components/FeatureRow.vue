<template>
  <!-- 图文交错区块：reverse 为 true 时图片在左、文字在右 -->
  <div :class="['row', { 'row--reverse': reverse }]">
    <div class="row-text">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h3 class="row-title">{{ title }}</h3>
      <p class="row-desc">{{ desc }}</p>

      <ul v-if="bullets.length" class="row-bullets">
        <li v-for="b in bullets" :key="b">
          <el-icon :size="14"><Select /></el-icon>{{ b }}
        </li>
      </ul>
    </div>

    <div class="row-media">
      <img :src="imgSrc" :alt="title" loading="lazy" class="row-img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureRow',
  props: {
    eyebrow: { type: String, default: '' },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    // 只传 src/assets/img/ 下的文件名，例如 'img2.webp'
    image: { type: String, required: true },
    bullets: { type: Array, default: () => [] },
    reverse: { type: Boolean, default: false }
  },
  computed: {
    imgSrc() {
      return require(`@/assets/img/${this.image}`)
    }
  }
}
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

/* 图片换到左边：把媒体列的顺序提前 */
.row--reverse .row-media {
  order: -1;
}

.row-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--text-1);
  margin: 0 0 16px;
}

.row-desc {
  font-size: 16px;
  line-height: 1.85;
  color: var(--text-2);
  margin: 0;
}

.row-bullets {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row-bullets li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--text-2);
}

.row-bullets :deep(.el-icon) {
  margin-top: 4px;
  flex-shrink: 0;
  color: var(--accent);
}

.row-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lift);
}

@media (max-width: 900px) {
  .row {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  /* 单列时统一图片在下，忽略 reverse */
  .row--reverse .row-media {
    order: 0;
  }

  .row-title {
    font-size: 23px;
  }

  .row-desc {
    font-size: 15px;
  }
}
</style>
