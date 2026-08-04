<template>
  <section class="stats">
    <div class="container stats-inner">
      <div v-for="item in club.stats" :key="item.label" class="stat">
        <div class="stat-value">
          {{ item.value }}<span class="stat-suffix">{{ item.suffix }}</span>
        </div>
        <div class="stat-label">{{ item.label }}</div>
        <div class="stat-hint">{{ item.hint }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import club from '@/data/club.json'

export default {
  name: 'StatsBar',
  data() {
    return { club }
  }
}
</script>

<style scoped>
.stats {
  border-bottom: 1px solid var(--border);
  background: var(--bg-1);
}

.stats-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 52px 24px;
  gap: 24px;
}

/* 用分隔线代替卡片，视觉上更轻 */
.stat {
  text-align: center;
  padding: 0 12px;
  border-left: 1px solid var(--border);
}

.stat:first-child {
  border-left: none;
}

.stat-value {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.stat-suffix {
  font-size: 26px;
}

.stat-label {
  margin-top: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-1);
}

.stat-hint {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-3);
}

@media (max-width: 768px) {
  .stats-inner {
    grid-template-columns: repeat(2, 1fr);   /* 两行两列 */
    padding: 34px 18px;
    gap: 30px 12px;
  }

  /* 两列布局下，只有右列需要左分隔线 */
  .stat {
    border-left: none;
  }

  .stat:nth-child(even) {
    border-left: 1px solid var(--border);
  }

  .stat-value {
    font-size: 30px;
  }

  .stat-suffix {
    font-size: 19px;
  }

  .stat-hint {
    display: none;      /* 移动端信息密度太高，隐藏说明 */
  }
}
</style>
