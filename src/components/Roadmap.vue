<template>
  <section class="section roadmap-section">
    <div class="container">
      <div class="head">
        <span class="eyebrow">成长路径</span>
        <h2 class="section-title">零基础进来，两年后你会走到哪里</h2>
        <p class="section-desc">
          这是我们每一届成员真实走过的路线。不需要你现在会什么，只需要你按这个节奏坚持下来。
        </p>
      </div>

      <ol class="timeline">
        <li v-for="(step, index) in roadmap" :key="step.stage" class="step">
          <!-- 左侧序号与竖线 -->
          <div class="step-marker">
            <span class="step-num">{{ index + 1 }}</span>
            <span v-if="index < roadmap.length - 1" class="step-line" />
          </div>

          <div class="step-body card">
            <div class="step-meta">
              <span class="step-stage">{{ step.stage }}</span>
              <span class="step-period">{{ step.period }}</span>
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <div class="step-outputs">
              <span v-for="out in step.outputs" :key="out" class="chip">
                <el-icon :size="12"><Select /></el-icon>{{ out }}
              </span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import roadmap from '@/data/roadmap.json'

export default {
  name: 'Roadmap',
  data() {
    return { roadmap }
  }
}
</script>

<style scoped>
.roadmap-section {
  background: var(--bg-1);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.head {
  margin-bottom: 48px;
}

.timeline {
  list-style: none;      /* 去掉 ol 默认的数字，我们自己画 */
  margin: 0;
  padding: 0;
}

.step {
  display: flex;
  gap: 24px;
}

/* ---------- 序号与连接线 ---------- */
.step-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  color: var(--accent);
  font-size: 15px;
  font-weight: 700;
}

.step-line {
  flex: 1;               /* 自动拉伸到下一个序号 */
  width: 1px;
  background: linear-gradient(var(--accent), var(--border));
  margin: 8px 0;
}

/* ---------- 内容卡片 ---------- */
.step-body {
  flex: 1;
  margin-bottom: 22px;
}

/* 时间轴卡片不做上浮，避免和竖线错位 */
.step-body:hover {
  transform: none;
}

.step-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.step-stage {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.step-period {
  font-size: 12.5px;
  color: var(--text-3);
}

.step-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 10px;
}

.step-desc {
  font-size: 14.5px;
  line-height: 1.8;
  color: var(--text-2);
  margin: 0 0 18px;
}

.step-outputs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  padding: 5px 11px;
  border-radius: 999px;
  background: var(--chip-bg);
  border: 1px solid var(--border);
  color: var(--text-2);
}

.chip :deep(.el-icon) {
  color: var(--accent);
}

@media (max-width: 768px) {
  .head {
    margin-bottom: 32px;
  }

  .step {
    gap: 14px;
  }

  .step-num {
    width: 30px;
    height: 30px;
    font-size: 13px;
  }

  .step-body {
    padding: 20px;
  }

  .step-title {
    font-size: 17px;
  }
}
</style>
