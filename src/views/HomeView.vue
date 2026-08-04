<template>
  <div class="home">
    <HeroSection />
    <StatsBar />
    <TrackCards />

    <!-- 我们是怎么做事的：图文交错两段 -->
    <section class="section how">
      <div class="container">
        <div class="head">
          <span class="eyebrow">我们怎么做</span>
          <h2 class="section-title">不是听讲座的社团，是真的把车做出来</h2>
        </div>

        <div class="rows">
          <FeatureRow
            eyebrow="按赛季推进"
            title="每一届都从零开始造一辆完整的车"
            desc="我们不停留在开发板点灯的阶段。从原理图、PCB 打样、焊接调试，到循迹算法与整车联调，一个赛季结束你手上会有一辆能跑完全程的车，和一份写得出来的技术报告。"
            image="img2.webp"
            :bullets="[
              '主控板、驱动板由成员自主设计并打样',
              '实验室常备示波器、稳压电源、烙铁与热风枪',
              '每周例会汇报进度，卡住的问题当场一起看'
            ]"
          />

          <FeatureRow
            eyebrow="老带新"
            title="你遇到的每个坑，都有人踩过并写下来了"
            desc="社团维护着一套持续更新的内部资料库：培训课件、调参记录、历年技术报告、踩坑清单。学长学姐带你把路走一遍，而不是丢给你一句「去搜搜看」。"
            image="img3.webp"
            reverse
            :bullets="[
              '8 周基础培训 + 分方向进阶课，全部由社内成员授课',
              '一对一结对指导，新人配一位在队学长学姐',
              '内部资料库覆盖代码、文档与历年报告'
            ]"
          />
        </div>
      </div>
    </section>

    <Roadmap />
    <!-- 首页只展示最近两个赛季，完整记录在赛事页 -->
    <HonorWall :limit="2" />
    <LogoCloud />
    <CTASection />
  </div>
</template>

<script>
import HeroSection from '@/components/HeroSection.vue'
import StatsBar from '@/components/StatsBar.vue'
import TrackCards from '@/components/TrackCards.vue'
import FeatureRow from '@/components/FeatureRow.vue'
import Roadmap from '@/components/Roadmap.vue'
import HonorWall from '@/components/HonorWall.vue'
import LogoCloud from '@/components/LogoCloud.vue'
import CTASection from '@/components/CTASection.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    StatsBar,
    TrackCards,
    FeatureRow,
    Roadmap,
    HonorWall,
    LogoCloud,
    CTASection
  }
}
</script>

<style scoped>
.how {
  border-top: 1px solid var(--border);
}

.head {
  margin-bottom: 52px;
}

.rows {
  display: flex;
  flex-direction: column;
  gap: 88px;
}

@media (max-width: 768px) {
  .head {
    margin-bottom: 32px;
  }

  .rows {
    gap: 56px;
  }
}
</style>
