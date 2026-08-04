<template>
  <div>
    <PageHero
      eyebrow="学习"
      title="培训体系与资料"
      desc="所有课程都由社团在队成员授课，围绕「让车跑起来」这个目标组织，而不是按教材章节走。零基础成员按下面的顺序学完，就能独立完成一辆循迹车。"
    />

    <!-- 课程表 -->
    <section class="section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">课程安排</span>
          <h2 class="section-title">三个模块，从点灯到上赛场</h2>
        </div>

        <div class="terms">
          <div v-for="term in courses" :key="term.term" class="term">
            <div class="term-head">
              <h3 class="term-title">{{ term.term }}</h3>
              <span class="term-weeks">
                <el-icon :size="13"><Clock /></el-icon>{{ term.weeks }}
              </span>
            </div>

            <div class="lesson-list">
              <div v-for="(lesson, i) in term.lessons" :key="lesson.title" class="lesson">
                <span class="lesson-num">{{ String(i + 1).padStart(2, '0') }}</span>
                <div>
                  <h4 class="lesson-title">{{ lesson.title }}</h4>
                  <p class="lesson-detail">{{ lesson.detail }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 资料与工具 -->
    <section class="section res-wrap">
      <div class="container">
        <div class="head">
          <span class="eyebrow">资料与工具</span>
          <h2 class="section-title">常用的链接都在这儿</h2>
          <p class="section-desc">
            备赛过程中最常打开的几个地方。内部资料库需要入队后获取访问权限。
          </p>
        </div>

        <div class="res-grid">
          <!-- 有 url 用 a 标签，没有就退化成 div，避免出现点不动的假链接 -->
          <component
            :is="r.url ? 'a' : 'div'"
            v-for="r in resources"
            :key="r.name"
            :href="r.url || undefined"
            :target="r.url ? '_blank' : undefined"
            :rel="r.url ? 'noopener' : undefined"
            :class="['card', 'res', { 'res--link': r.url }]"
          >
            <div class="res-top">
              <span class="res-tag">{{ r.tagLabel }}</span>
              <el-icon v-if="r.url" :size="14" class="res-arrow"><Top /></el-icon>
            </div>
            <h3 class="res-name">{{ r.name }}</h3>
            <p class="res-desc">{{ r.desc }}</p>
          </component>
        </div>

        <p class="tip">
          维护提示：链接在 src/data/resources.json 里，url 留空的条目会自动显示为不可点击状态。
        </p>
      </div>
    </section>

    <CTASection />
  </div>
</template>

<script>
import PageHero from '@/components/PageHero.vue'
import CTASection from '@/components/CTASection.vue'
import courses from '@/data/courses.json'
import resources from '@/data/resources.json'

export default {
  name: 'LearnView',
  components: { PageHero, CTASection },
  data() {
    return { courses, resources }
  }
}
</script>

<style scoped>
.head {
  margin-bottom: 44px;
}

/* ---------- 课程 ---------- */
.terms {
  display: flex;
  flex-direction: column;
  gap: 46px;
}

.term-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 15px;
  margin-bottom: 22px;
  border-bottom: 1px solid var(--border);
}

.term-title {
  font-size: 21px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0;
}

.term-weeks {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--accent);
  white-space: nowrap;
}

.lesson-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 16px;
}

.lesson {
  display: flex;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition: all 0.25s ease;
}

.lesson:hover {
  border-color: var(--border-strong);
  background: var(--surface-hover);
}

.lesson-num {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
  padding-top: 2px;
}

.lesson-title {
  font-size: 15.5px;
  font-weight: 600;
  color: var(--text-1);
  margin: 0 0 7px;
  line-height: 1.5;
}

.lesson-detail {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--text-2);
  margin: 0;
}

/* ---------- 资料 ---------- */
.res-wrap {
  background: var(--bg-1);
  border-top: 1px solid var(--border);
}

.res-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}

.res {
  display: block;
}

/* 没有链接的条目不做上浮，也不给手型 */
.res:not(.res--link):hover {
  transform: none;
  background: var(--surface);
  border-color: var(--border);
  box-shadow: none;
}

.res--link {
  cursor: pointer;
}

.res-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.res-tag {
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 6px;
  background: var(--accent-soft);
  color: var(--accent);
}

/* 箭头指向右上，表示"跳出站外" */
.res-arrow {
  color: var(--text-3);
  transform: rotate(45deg);
}

.res--link:hover .res-arrow {
  color: var(--accent);
}

.res-name {
  font-size: 16.5px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 9px;
  line-height: 1.5;
}

.res-desc {
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0;
}

.tip {
  margin: 30px 0 0;
  font-size: 12.5px;
  color: var(--text-3);
}

@media (max-width: 768px) {
  .head {
    margin-bottom: 30px;
  }

  .terms {
    gap: 34px;
  }

  .lesson-list,
  .res-grid {
    grid-template-columns: 1fr;
  }

  .term-title {
    font-size: 18px;
  }
}
</style>
