<template>
  <section class="cta grid-bg">
    <div class="container cta-inner">
      <h2 class="cta-title">下一辆车，可能就是你做的</h2>
      <p class="cta-sub">
        {{ club.recruit.season }}正在进行，面向{{ club.recruit.target }}。
        报名截止 {{ club.recruit.deadline }}。
      </p>

      <div class="cta-btns">
        <router-link to="/join" class="btn-primary">
          立即报名
          <el-icon :size="15"><ArrowRight /></el-icon>
        </router-link>
        <router-link to="/learn" class="btn-ghost">先看看培训内容</router-link>
      </div>

      <p class="cta-note">
        实验室开放时间：{{ club.contact.openHours }} · 地点：{{ club.contact.lab }}
      </p>
    </div>
  </section>
</template>

<script>
import club from '@/data/club.json'

export default {
  name: 'CTASection',
  data() {
    return { club }
  }
}
</script>

<style scoped>
.cta {
  padding: 92px 0;
  border-top: 1px solid var(--border);
  background: var(--bg-1);
}

.cta-inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.cta-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.25;
  color: var(--text-1);
  margin: 0 0 18px;
  letter-spacing: -0.02em;
}

.cta-sub {
  font-size: 17px;
  line-height: 1.8;
  color: var(--text-2);
  margin: 0 auto 34px;
  max-width: 620px;
}

.cta-btns {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-note {
  margin: 30px 0 0;
  font-size: 12.5px;
  color: var(--text-3);
}

@media (max-width: 768px) {
  .cta {
    padding: 58px 0;
  }

  .cta-title {
    font-size: 27px;
  }

  .cta-sub {
    font-size: 15px;
  }

  .cta-btns > * {
    flex: 1;
    justify-content: center;
  }
}
</style>
