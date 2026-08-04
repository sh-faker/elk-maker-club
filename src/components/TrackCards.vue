<template>
  <section class="section">
    <div class="container">
      <div class="head">
        <span class="eyebrow">技术方向</span>
        <h2 class="section-title">四个组别，四条完全不同的技术路线</h2>
        <p class="section-desc">
          这是社团目前参与第二十一届全国大学生智能汽车竞赛的四个组别，主控平台从国产龙芯到英飞凌 AURIX 各不相同。
          培训期结束后你可以自己选方向——想写视觉和神经网络、想啃电磁和机械、还是想把硬件做扎实，这里都有位置。
        </p>
      </div>

      <div class="grid">
        <article v-for="track in tracks" :key="track.id" class="card track">
          <div class="track-top">
            <div class="track-icon">
              <!-- icon 名来自 tracks.json，图标已在 main.js 全局注册 -->
              <el-icon :size="20"><component :is="track.icon" /></el-icon>
            </div>
            <span class="track-level">{{ track.level }}</span>
          </div>

          <h3 class="track-name">{{ track.name }}</h3>
          <div class="track-mcu">
            <el-icon :size="12"><Cpu /></el-icon>{{ track.mcu }}
          </div>
          <p class="track-summary">{{ track.summary }}</p>

          <div class="track-skills">
            <span v-for="skill in track.skills" :key="skill" class="tag">{{ skill }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import tracks from '@/data/tracks.json'

export default {
  name: 'TrackCards',
  data() {
    return { tracks }
  }
}
</script>

<style scoped>
.head {
  margin-bottom: 48px;
}

.grid {
  display: grid;
  /* 自动换列：每列至少 300px，屏幕越宽列越多 */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.track {
  display: flex;
  flex-direction: column;
}

.track-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.track-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: var(--accent-soft);
  border: 1px solid var(--border-strong);
  color: var(--accent);
}

.track-level {
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--text-3);
  border: 1px solid var(--border);
}

.track-name {
  font-size: 19px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 8px;
}

/* 主控芯片：组别之间最直观的区别，单独一行标出来 */
.track-mcu {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 12px;
}

.track-summary {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0 0 20px;
  flex: 1;              /* 撑开，让不同长度的卡片底部标签对齐 */
}

.track-skills {
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

@media (max-width: 768px) {
  .head {
    margin-bottom: 32px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
