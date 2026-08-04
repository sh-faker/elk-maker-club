<template>
  <section class="section--tight partners">
    <div class="container">
      <p class="partners-caption">指导单位与合作伙伴</p>

      <!-- 桌面：静态网格 -->
      <div class="partners-grid">
        <div v-for="p in partners" :key="p.name" class="partner">
          <img v-if="p.logo" :src="resolveLogo(p.logo)" :alt="p.name" loading="lazy" class="partner-logo">
          <template v-else>
            <span class="partner-name">{{ p.name }}</span>
            <span class="partner-type">{{ p.type }}</span>
          </template>
        </div>
      </div>

      <!-- 移动：无缝横向滚动，两组内容完全相同 -->
      <div class="partners-marquee">
        <div class="marquee-track">
          <div v-for="group in 2" :key="group" class="marquee-group" :aria-hidden="group === 2">
            <div v-for="p in partners" :key="p.name" class="partner partner--sm">
              <img v-if="p.logo" :src="resolveLogo(p.logo)" :alt="p.name" loading="lazy" class="partner-logo">
              <span v-else class="partner-name">{{ p.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import partners from '@/data/partners.json'

export default {
  name: 'LogoCloud',
  data() {
    return { partners }
  },
  methods: {
    // JSON 里只存文件名，这里再拼成 webpack 能处理的真实路径
    resolveLogo(file) {
      return require(`@/assets/img/${file}`)
    }
  }
}
</script>

<style scoped>
.partners {
  border-bottom: 1px solid var(--border);
}

.partners-caption {
  text-align: center;
  font-size: 12.5px;
  letter-spacing: 0.14em;
  color: var(--text-3);
  margin: 0 0 30px;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
}

.partner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 72px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition: all 0.3s ease;
}

.partner:hover {
  border-color: var(--border-strong);
  background: var(--surface-hover);
}

.partner-logo {
  height: 40px;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.65);
  transition: filter 0.3s ease;
}

.partner:hover .partner-logo {
  filter: grayscale(0%) opacity(1);
}

.partner-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-2);
  text-align: center;
}

.partner-type {
  font-size: 11px;
  color: var(--text-3);
}

.partners-marquee {
  display: none;
}

@media (max-width: 768px) {
  .partners-grid {
    display: none;
  }

  .partners-marquee {
    display: block;
    overflow: hidden;
    /* 左右淡出，滚动看起来不会硬切 */
    mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 24s linear infinite;
  }

  .marquee-group {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-right: 12px;
  }

  .partner--sm {
    min-height: 56px;
    padding: 10px 18px;
    white-space: nowrap;
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }   /* 走完第一组，无缝接上第二组 */
  }
}
</style>
