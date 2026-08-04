<template>
  <section class="section">
    <div class="container">
      <div class="head">
        <span class="eyebrow">荣誉记录</span>
        <h2 class="section-title">赛场上拿回来的成绩</h2>
        <p class="section-desc">
          全国大学生智能汽车竞赛是教育部认定的 A 类学科竞赛，下列为社团历年获奖记录。
        </p>
      </div>

      <div class="years">
        <div v-for="season in visibleAwards" :key="season.year" class="season">
          <div class="season-head">
            <span class="season-year">{{ season.year }}</span>
            <span class="season-name">{{ season.competition }}</span>
          </div>

          <div class="award-list">
            <div v-for="(item, i) in season.items" :key="i" class="card award">
              <div class="award-prize">
                <el-icon :size="15"><Trophy /></el-icon>
                {{ item.prize }}
              </div>
              <div class="award-group">{{ item.group }}</div>
              <div class="award-people">
                <span>队员：{{ item.members }}</span>
                <span>指导：{{ item.advisor }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <router-link v-if="limit" to="/competition" class="btn-ghost more">
        查看完整赛事与获奖记录
        <el-icon :size="14"><ArrowRight /></el-icon>
      </router-link>
    </div>
  </section>
</template>

<script>
import awards from '@/data/awards.json'

export default {
  name: 'HonorWall',
  props: {
    // 只显示最近 N 个赛季；0 表示全部显示（赛事页用）
    limit: {
      type: Number,
      default: 0
    }
  },
  computed: {
    visibleAwards() {
      return this.limit ? awards.slice(0, this.limit) : awards
    }
  }
}
</script>

<style scoped>
.head {
  margin-bottom: 44px;
}

.season + .season {
  margin-top: 40px;
}

.season-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding-bottom: 14px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.season-year {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-1);
  letter-spacing: -0.02em;
}

.season-name {
  font-size: 14px;
  color: var(--text-3);
}

.award-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.award {
  padding: 22px;
}

.award-prize {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 8px;
}

.award-group {
  font-size: 14px;
  color: var(--text-1);
  margin-bottom: 14px;
}

.award-people {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--text-3);
}

.more {
  margin-top: 44px;
}

@media (max-width: 768px) {
  .head {
    margin-bottom: 30px;
  }

  .season-year {
    font-size: 22px;
  }

  .award-list {
    grid-template-columns: 1fr;
  }
}
</style>
