<template>
  <div>
    <PageHero
      eyebrow="赛事"
      title="全国大学生智能汽车竞赛"
      desc="这是社团一切工作的核心。它由教育部高等教育司发起，是面向全国高校的 A 类学科竞赛之一，要求参赛队在规定车模平台上自主完成硬件设计、软件开发与控制算法，让车在赛道上自主行驶完成比赛。"
    />

    <!-- 赛事速览 -->
    <section class="section--tight facts-wrap">
      <div class="container facts">
        <div v-for="f in facts" :key="f.label" class="fact">
          <span class="fact-label">{{ f.label }}</span>
          <span class="fact-value">{{ f.value }}</span>
        </div>
      </div>
    </section>

    <!-- 为什么值得打 -->
    <section class="section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">为什么值得投入</span>
          <h2 class="section-title">它几乎是嵌入式方向最完整的一次实战</h2>
          <p class="section-desc">
            一辆参赛车里，同时装着电路设计、嵌入式编程、控制理论、图像处理和机械结构。
            很少有别的竞赛能让本科生在一年里把这些东西全串起来跑一遍。
          </p>
        </div>

        <div class="value-grid">
          <div v-for="v in values" :key="v.title" class="card value">
            <el-icon :size="19" class="value-icon"><component :is="v.icon" /></el-icon>
            <h3 class="value-title">{{ v.title }}</h3>
            <p class="value-desc">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 赛季时间线 -->
    <section class="section season-wrap">
      <div class="container">
        <div class="head">
          <span class="eyebrow">赛季节奏</span>
          <h2 class="section-title">一整年是怎么过的</h2>
          <p class="section-desc">
            下面是往届的一般节奏。每届具体时间以当年官方赛规为准。
          </p>
        </div>

        <div class="season">
          <div v-for="(s, i) in season" :key="s.phase" class="season-item">
            <div class="season-index">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="season-body">
              <div class="season-month">{{ s.month }}</div>
              <h3 class="season-phase">{{ s.phase }}</h3>
              <p class="season-desc">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 组别一览 -->
    <section class="section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">组别设置</span>
          <h2 class="section-title">社团在第二十一届参与的组别</h2>
          <p class="section-desc">
            组别设置每届都可能调整，组别名称与技术要求请以当届官方赛规为准。
            下表是社团目前有能力承接的四个方向。
          </p>
        </div>

        <div class="table-scroll">
          <table class="group-table">
            <thead>
              <tr>
                <th>组别</th>
                <th>主控芯片</th>
                <th>方向定位</th>
                <th>核心技术</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tracks" :key="t.id">
                <td class="td-name">{{ t.name }}</td>
                <td class="td-mcu">{{ t.mcu }}</td>
                <td class="td-level">{{ t.level }}</td>
                <td>
                  <span v-for="s in t.skills" :key="s" class="tag">{{ s }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 完整获奖记录 -->
    <HonorWall />
    <CTASection />
  </div>
</template>

<script>
import PageHero from '@/components/PageHero.vue'
import HonorWall from '@/components/HonorWall.vue'
import CTASection from '@/components/CTASection.vue'
import tracks from '@/data/tracks.json'
import season from '@/data/season.json'

export default {
  name: 'CompetitionView',
  components: { PageHero, HonorWall, CTASection },
  data() {
    return {
      tracks,
      season,
      facts: [
        { label: '最新届次', value: '第二十一届' },
        { label: '主办', value: '教育部高等教育司发起' },
        { label: '创办年份', value: '2006 年（首届）' },
        { label: '竞赛层级', value: 'A 类学科竞赛' },
        { label: '赛制', value: '校内选拔 → 分赛区 → 全国总决赛' }
      ],
      values: [
        {
          icon: 'Cpu',
          title: '软硬件全链路',
          desc: '从画原理图、打板焊接，到写驱动、调算法，没有一环是别人替你做的。这种完整度是课程设计给不了的。'
        },
        {
          icon: 'DataLine',
          title: '真实的工程约束',
          desc: '算力有限、电量有限、时间有限。你会被迫学会取舍和排优先级——这才是工程和作业的区别。'
        },
        {
          icon: 'Trophy',
          title: '被认可的竞赛成绩',
          desc: '获奖在推免加分与奖学金评定中被广泛认可，也是简历上少数能让面试官追问细节的经历。'
        },
        {
          icon: 'Tools',
          title: '扎实的排故能力',
          desc: '赛场上车突然不跑了，只有二十分钟。练出来的定位问题的直觉，比任何一门课都实用。'
        }
      ]
    }
  }
}
</script>

<style scoped>
.head {
  margin-bottom: 44px;
}

/* ---------- 速览 ---------- */
.facts-wrap {
  background: var(--bg-1);
  border-bottom: 1px solid var(--border);
}

.facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 26px;
}

.fact {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.fact-label {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--text-3);
}

.fact-value {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.6;
  color: var(--text-1);
}

/* ---------- 价值卡片 ---------- */
.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 20px;
}

.value-icon {
  color: var(--accent);
  margin-bottom: 16px;
}

.value-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 10px;
}

.value-desc {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0;
}

/* ---------- 赛季时间线 ---------- */
.season-wrap {
  background: var(--bg-1);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.season {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.season-item {
  display: flex;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.season-index {
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
  color: var(--border-strong);
  flex-shrink: 0;
}

.season-month {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--accent);
  margin-bottom: 7px;
}

.season-phase {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 9px;
}

.season-desc {
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0;
}

/* ---------- 组别表 ---------- */
.table-scroll {
  overflow-x: auto;      /* 窄屏时表格横向滚动，而不是把布局撑破 */
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.group-table {
  width: 100%;
  min-width: 780px;
  border-collapse: collapse;
}

.group-table th {
  text-align: left;
  padding: 15px 20px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-1);
  background: var(--chip-bg);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.group-table td {
  padding: 16px 20px;
  font-size: 14px;
  color: var(--text-2);
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

.group-table tbody tr:last-child td {
  border-bottom: none;
}

.group-table tbody tr:hover td {
  background: var(--surface-hover);
}

.td-name {
  font-weight: 600;
  color: var(--text-1);
  white-space: nowrap;
}

.td-mcu {
  color: var(--accent);
  font-weight: 600;
  white-space: nowrap;
}

.td-level {
  white-space: nowrap;
}

.tag {
  display: inline-block;
  font-size: 12px;
  padding: 3px 9px;
  margin: 0 6px 6px 0;
  border-radius: 6px;
  background: var(--chip-bg);
  color: var(--text-2);
}

@media (max-width: 768px) {
  .head {
    margin-bottom: 30px;
  }

  .value-grid,
  .season {
    grid-template-columns: 1fr;
  }
}
</style>
