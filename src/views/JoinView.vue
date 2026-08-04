<template>
  <div>
    <PageHero
      eyebrow="加入我们"
      :title="club.recruit.season"
      desc="我们不看你现在会多少，只看你愿不愿意稳定投入时间。零基础、非电子专业同样欢迎——社团里很多人当初连万用表都不会用。"
    />

    <!-- 招新关键信息 + 报名入口 -->
    <section class="section--tight apply-wrap">
      <div class="container apply">
        <div class="apply-info">
          <div v-for="row in recruitRows" :key="row.label" class="apply-row">
            <span class="apply-label">{{ row.label }}</span>
            <span class="apply-value">{{ row.value }}</span>
          </div>
        </div>

        <div class="apply-action card">
          <h3 class="apply-title">现在报名</h3>

          <!-- 填了问卷链接就显示按钮，没填就引导加群，不留死链接 -->
          <template v-if="club.recruit.formUrl">
            <p class="apply-desc">填写报名表，我们会通过 QQ 群通知后续宣讲与面试安排。</p>
            <a :href="club.recruit.formUrl" target="_blank" rel="noopener" class="btn-primary apply-btn">
              打开报名表
              <el-icon :size="15"><Top /></el-icon>
            </a>
          </template>
          <template v-else>
            <p class="apply-desc">
              报名表还没发布。先加入下面的新生咨询群，开放报名时会第一时间在群里通知。
            </p>
            <div class="apply-qq">
              <el-icon :size="16"><ChatDotRound /></el-icon>
              QQ 群 {{ club.contact.qqGroup }}
            </div>
          </template>

          <p class="apply-foot">
            有任何问题也可以直接来实验室问：{{ club.contact.lab }}
          </p>
        </div>
      </div>
    </section>

    <!-- 招新流程 -->
    <section class="section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">招新流程</span>
          <h2 class="section-title">五步，从报名到入队</h2>
          <p class="section-desc">
            面试只聊兴趣和时间投入，不考技术题。我们更在意你能不能坚持完培训期。
          </p>
        </div>

        <div class="steps">
          <div v-for="(step, i) in steps" :key="step.title" class="step">
            <div class="step-num">{{ i + 1 }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <!-- 最后一步不画连接线 -->
            <span v-if="i < steps.length - 1" class="step-arrow">
              <el-icon :size="16"><ArrowRight /></el-icon>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 我们想找的人 -->
    <section class="section want-wrap">
      <div class="container">
        <div class="head">
          <span class="eyebrow">我们想找的人</span>
          <h2 class="section-title">这三件事比基础重要得多</h2>
        </div>

        <div class="want-grid">
          <div v-for="w in wants" :key="w.title" class="card want">
            <el-icon :size="19" class="want-icon"><component :is="w.icon" /></el-icon>
            <h3 class="want-title">{{ w.title }}</h3>
            <p class="want-desc">{{ w.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">常见问题</span>
          <h2 class="section-title">新生问得最多的几个问题</h2>
        </div>

        <el-collapse v-model="openFaq" class="faq">
          <el-collapse-item
            v-for="(item, i) in faq"
            :key="i"
            :title="item.q"
            :name="i"
          >
            <p class="faq-answer">{{ item.a }}</p>
          </el-collapse-item>
        </el-collapse>
      </div>
    </section>
  </div>
</template>

<script>
import PageHero from '@/components/PageHero.vue'
import club from '@/data/club.json'
import faq from '@/data/faq.json'

export default {
  name: 'JoinView',
  components: { PageHero },
  data() {
    return {
      club,
      faq,
      // 默认展开第一条，提示这里可以点开
      openFaq: [0],
      steps: [
        { title: '线上报名', desc: '填写报名表，留下专业、联系方式和感兴趣的方向。' },
        { title: '宣讲与开放日', desc: '来实验室看看真车，听在队成员讲他们的赛季经历。' },
        { title: '简短面试', desc: '十分钟左右，聊兴趣、时间安排和你想学什么。不考技术。' },
        { title: '基础培训期', desc: '为期 8 周的集中培训，边学边做，结束时你会有第一块自己焊的板子。' },
        { title: '双向选择入队', desc: '培训结束后，你选方向、方向组选人，正式成为在队成员。' }
      ],
      wants: [
        {
          icon: 'Clock',
          title: '愿意稳定投入时间',
          desc: '每周 6 到 10 小时，赛季更多。技术可以从零教，但时间没人能替你出。这是我们唯一的硬要求。'
        },
        {
          icon: 'Aim',
          title: '能自己往下追一步',
          desc: '遇到报错先自己查一遍手册和日志，再来问人。带着「我试过什么」来提问的人，进步会快好几倍。'
        },
        {
          icon: 'Connection',
          title: '能和人一起把事做完',
          desc: '一辆车是几个人一起调出来的。愿意写文档、愿意交接、愿意在别人卡住时搭把手，比单打独斗厉害的人更重要。'
        }
      ]
    }
  },
  computed: {
    recruitRows() {
      return [
        { label: '招新对象', value: club.recruit.target },
        { label: '报名截止', value: club.recruit.deadline },
        { label: '培训周期', value: '基础培训 8 周，之后按方向进阶' },
        { label: '费用', value: '不收会费，车模与主要器件由社团提供' },
        { label: '实验室', value: club.contact.openHours }
      ]
    }
  }
}
</script>

<style scoped>
.head {
  margin-bottom: 44px;
}

/* ---------- 报名区 ---------- */
.apply-wrap {
  background: var(--bg-1);
  border-bottom: 1px solid var(--border);
}

.apply {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 40px;
  align-items: start;
}

.apply-info {
  display: flex;
  flex-direction: column;
}

.apply-row {
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid var(--border);
}

.apply-row:last-child {
  border-bottom: none;
}

.apply-label {
  width: 88px;
  flex-shrink: 0;
  font-size: 13px;
  color: var(--text-3);
}

.apply-value {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--text-1);
}

/* 报名卡片不做上浮，它是操作区不是列表项 */
.apply-action:hover {
  transform: none;
}

.apply-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 12px;
}

.apply-desc {
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0 0 22px;
}

.apply-btn {
  width: 100%;
  justify-content: center;
}

.apply-qq {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 14px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
  background: var(--accent-soft);
  font-size: 15px;
  font-weight: 600;
  color: var(--accent);
}

.apply-foot {
  margin: 20px 0 0;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--text-3);
}

/* ---------- 流程 ---------- */
.steps {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.step {
  position: relative;
  padding: 24px 18px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--on-accent);
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 15px;
}

.step-title {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 9px;
}

.step-desc {
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-2);
  margin: 0;
}

/* 卡片之间的小箭头，压在间隙中央 */
.step-arrow {
  position: absolute;
  top: 36px;
  right: -15px;
  z-index: 1;
  color: var(--border-strong);
}

/* ---------- 我们想找的人 ---------- */
.want-wrap {
  background: var(--bg-1);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.want-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.want-icon {
  color: var(--accent);
  margin-bottom: 16px;
}

.want-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 10px;
}

.want-desc {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0;
}

/* ---------- FAQ：覆盖 Element 的浅色默认样式 ---------- */
.faq {
  border-top: 1px solid var(--border);
  --el-collapse-border-color: var(--border);
  --el-collapse-header-bg-color: transparent;
  --el-collapse-content-bg-color: transparent;
}

.faq :deep(.el-collapse-item__header) {
  background: transparent;
  border-bottom-color: var(--border);
  color: var(--text-1);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
  height: auto;
  padding: 20px 0;
}

.faq :deep(.el-collapse-item__header.is-active) {
  color: var(--accent);
}

.faq :deep(.el-collapse-item__wrap) {
  background: transparent;
  border-bottom-color: var(--border);
}

.faq :deep(.el-collapse-item__content) {
  padding-bottom: 22px;
}

.faq-answer {
  font-size: 14.5px;
  line-height: 1.9;
  color: var(--text-2);
  margin: 0;
  max-width: 860px;
}

@media (max-width: 900px) {
  .apply {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .steps {
    grid-template-columns: 1fr;   /* 竖排，箭头不再需要 */
  }

  .step-arrow {
    display: none;
  }
}

@media (max-width: 768px) {
  .head {
    margin-bottom: 30px;
  }

  .want-grid {
    grid-template-columns: 1fr;
  }

  .faq :deep(.el-collapse-item__header) {
    font-size: 15px;
  }
}
</style>
