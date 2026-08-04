<template>
  <div>
    <PageHero
      eyebrow="作品"
      title="我们做过的车"
      desc="每一辆都是社团成员从原理图开始一步步做出来的。点开视频可以看到它们在赛道上的实际表现。"
    />

    <section class="section">
      <div class="container">
        <!-- 按组别筛选 -->
        <div class="filters">
          <button
            v-for="g in groups"
            :key="g"
            :class="['filter', { 'is-on': activeGroup === g }]"
            @click="activeGroup = g"
          >
            {{ g }}
          </button>
        </div>

        <div class="work-grid">
          <article v-for="w in filtered" :key="w.id" class="card work">
            <!-- 有 bvid 就嵌 B 站播放器，否则显示静态图 -->
            <div class="work-media">
              <iframe
                v-if="w.bvid"
                :src="`https://player.bilibili.com/player.html?bvid=${w.bvid}&autoplay=0&high_quality=1`"
                scrolling="no"
                frameborder="0"
                allowfullscreen
                class="work-frame"
              />
              <img v-else :src="resolveImg(w.image)" :alt="w.name" loading="lazy" class="work-img">
              <span class="work-year">{{ w.year }}</span>
            </div>

            <div class="work-body">
              <div class="work-meta">
                <span class="work-group">{{ w.group }}</span>
                <span class="work-mcu">
                  <el-icon :size="12"><Cpu /></el-icon>{{ w.mcu }}
                </span>
              </div>

              <h3 class="work-name">{{ w.name }}</h3>
              <p class="work-desc">{{ w.desc }}</p>

              <div class="work-highlights">
                <span v-for="h in w.highlights" :key="h" class="tag">{{ h }}</span>
              </div>
            </div>
          </article>
        </div>

        <p class="tip">
          新增作品：在 src/data/works.json 里加一条记录，图片放到 src/assets/img/ 下并填文件名；
          有比赛视频就把 B 站的 BV 号填进 bvid 字段，页面会自动换成播放器。
        </p>
      </div>
    </section>

    <CTASection />
  </div>
</template>

<script>
import PageHero from '@/components/PageHero.vue'
import CTASection from '@/components/CTASection.vue'
import works from '@/data/works.json'

const ALL = '全部'

export default {
  name: 'WorksView',
  components: { PageHero, CTASection },
  data() {
    return {
      works,
      activeGroup: ALL
    }
  },
  computed: {
    // 从作品里自动汇总组别，加一条作品就不用手动维护筛选项
    groups() {
      return [ALL, ...new Set(works.map((w) => w.group))]
    },
    filtered() {
      if (this.activeGroup === ALL) return this.works
      return this.works.filter((w) => w.group === this.activeGroup)
    }
  },
  methods: {
    resolveImg(file) {
      return require(`@/assets/img/${file}`)
    }
  }
}
</script>

<style scoped>
/* ---------- 筛选 ---------- */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 34px;
}

.filter {
  padding: 8px 17px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text-2);
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter:hover {
  border-color: var(--border-strong);
  color: var(--text-1);
}

.filter.is-on {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
}

/* ---------- 作品卡片 ---------- */
.work-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 22px;
}

.work {
  padding: 0;              /* 图片要贴边，内边距交给 .work-body */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.work-media {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--bg-0);
  border-bottom: 1px solid var(--border);
}

.work-frame,
.work-img {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  object-fit: cover;
}

.work-year {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--overlay-bg);
  backdrop-filter: blur(6px);
  font-size: 12px;
  font-weight: 600;
  color: var(--overlay-text);
}

.work-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.work-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 11px;
}

.work-group {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 6px;
  background: var(--accent-soft);
  color: var(--accent);
}

.work-mcu {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-3);
}

.work-name {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.45;
  color: var(--text-1);
  margin: 0 0 10px;
}

.work-desc {
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0 0 18px;
  flex: 1;
}

.work-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--chip-bg);
  color: var(--text-2);
}

.tip {
  margin: 34px 0 0;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--text-3);
}

@media (max-width: 768px) {
  .work-grid {
    grid-template-columns: 1fr;
  }

  .work-body {
    padding: 20px;
  }
}
</style>
