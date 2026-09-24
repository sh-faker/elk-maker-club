<template>
  <div>
    <PageHero
      eyebrow="关于我们"
      :title="`${club.name}`"
      :desc="club.intro"
    />

    <!-- 社团档案 -->
    <section class="section--tight profile-wrap">
      <div class="container profile">
        <div v-for="row in profile" :key="row.label" class="profile-item">
          <span class="profile-label">{{ row.label }}</span>
          <span class="profile-value">{{ row.value }}</span>
        </div>
      </div>
    </section>

    <!-- 组织架构 -->
    <section class="section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">组织架构</span>
          <h2 class="section-title">四个部门，各有各的战场</h2>
          <p class="section-desc">
            技术部是主体，但一个能持续出成绩的社团，靠的是四个部门一起转起来。
          </p>
        </div>

        <div class="dept-grid">
          <article v-for="dept in departments" :key="dept.name" class="card dept">
            <div class="dept-icon">
              <el-icon :size="20"><component :is="dept.icon" /></el-icon>
            </div>
            <h3 class="dept-name">{{ dept.name }}</h3>
            <p class="dept-desc">{{ dept.desc }}</p>
            <div class="dept-roles">
              <span v-for="role in dept.roles" :key="role" class="tag">{{ role }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 实验室 -->
    <section class="section lab-wrap">
      <div class="container">
        <div class="head">
          <span class="eyebrow">我们的实验室</span>
          <h2 class="section-title">一间常年亮到深夜的屋子</h2>
          <p class="section-desc">
            {{ club.contact.lab }}，开放时间 {{ club.contact.openHours }}。
            仪器、工具与器件对所有成员开放，不需要预约。
          </p>
        </div>

        <el-carousel :interval="5000" arrow="always" height="440px" class="lab-carousel">
          <el-carousel-item v-for="(img, i) in labImages" :key="i">
            <img :src="img" alt="实验室与活动照片" class="lab-img">
          </el-carousel-item>
        </el-carousel>

        <!-- <p class="lab-tip">
          把 src/assets/img/ 下的 1.webp / 2.webp / 3.webp 换成实验室与活动实拍即可。
        </p> -->
      </div>
    </section>

    <!-- 我们的人 -->
    <section class="section people-wrap">
      <div class="container">
        <div class="head">
          <span class="eyebrow">我们的人</span>
          <h2 class="section-title">一群志同道合的人</h2>
          <p class="section-desc">
            从焊板子到调车，从熬夜到冲奖，这些瞬间记录了我们一起拼过的日子。
          </p>
        </div>

        <el-carousel :interval="5000" arrow="always" height="440px" class="people-carousel">
          <el-carousel-item v-for="(img, i) in peopleImages" :key="i">
            <img :src="img" alt="社团成员照片" class="people-img">
          </el-carousel-item>
        </el-carousel>

        <!-- <p class="people-tip">
          把照片放进 src/assets/img/，命名为 people1.webp、people2.webp 等，然后在 peopleImages 里引用。
        </p> -->
      </div>
    </section>

    <!-- 指导老师 -->
    <section class="section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">指导老师</span>
          <h2 class="section-title">带我们的人</h2>
        </div>

        <div class="advisor-grid">
          <article v-for="a in advisors" :key="a.name" class="card advisor">
            <div class="advisor-top">
              <img v-if="a.photo" :src="resolvePhoto(a.photo)" :alt="a.name" class="advisor-photo">
              <!-- 没有照片时用姓氏首字做占位，比灰色头像好看 -->
              <div v-else class="advisor-initial">{{ initial(a.name) }}</div>
              <div>
                <h3 class="advisor-name">{{ a.name }}</h3>
                <p class="advisor-title">{{ a.title }}</p>
                <p class="advisor-field">{{ a.field }}</p>
              </div>
            </div>
            <blockquote class="advisor-words">{{ a.words }}</blockquote>
          </article>
        </div>
      </div>
    </section>

    <CTASection />
  </div>
</template>

<script>
import PageHero from '@/components/PageHero.vue'
import CTASection from '@/components/CTASection.vue'
import club from '@/data/club.json'
import departments from '@/data/departments.json'
import advisors from '@/data/advisors.json'

export default {
  name: 'AboutView',
  components: { PageHero, CTASection },
  data() {
    return {
      club,
      departments,
      advisors,
      labImages: [
        require('@/assets/img/1.webp'),
        require('@/assets/img/2.webp'),
        require('@/assets/img/3.webp'),
        require('@/assets/img/屋子-1.webp')
      ],
      peopleImages: [
        require('@/assets/img/人-2.webp'),
        require('@/assets/img/人-7.webp'),
        require('@/assets/img/人-13.webp'), 
        require('@/assets/img/人-4.webp'),
        require('@/assets/img/人-5.webp'),
        require('@/assets/img/人-6.webp'),
        require('@/assets/img/人-8.webp'),
        require('@/assets/img/人-11.webp'),
        require('@/assets/img/人-9.webp'),
        require('@/assets/img/人-10.webp'),
        require('@/assets/img/人-3.webp'),
        require('@/assets/img/人-12.webp'), 
        require('@/assets/img/帅车.webp')
      ]
    }
  },
  computed: {
    profile() {
      return [
        { label: '所属单位', value: club.college },
        { label: '成立时间', value: `${club.foundedYear} 年` },
        { label: '核心赛事', value: '全国大学生智能汽车竞赛' },
        { label: '实验室', value: club.contact.lab }
      ]
    }
  },
  methods: {
    resolvePhoto(file) {
      return require(`@/assets/img/${file}`)
    },
    // 去掉"【待替换】"这类前缀干扰，取姓名第一个汉字
    initial(name) {
      const clean = name.replace(/【.*?】/g, '').trim()
      return clean.charAt(0) || '师'
    }
  }
}
</script>

<style scoped>
.head {
  margin-bottom: 44px;
}

/* ---------- 社团档案 ---------- */
.profile-wrap {
  border-bottom: 1px solid var(--border);
  background: var(--bg-1);
}

.profile {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 26px;
}

.profile-item {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.profile-label {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--text-3);
}

.profile-value {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.6;
  color: var(--text-1);
}

/* ---------- 部门 ---------- */
.dept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.dept-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: var(--accent-soft);
  border: 1px solid var(--border-strong);
  color: var(--accent);
  margin-bottom: 18px;
}

.dept-name {
  font-size: 19px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 10px;
}

.dept-desc {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0 0 18px;
}

.dept-roles {
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

/* ---------- 实验室轮播 ---------- */
.lab-wrap {
  background: var(--bg-1);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.lab-carousel {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: none;  /* 去掉边框 */
}

.lab-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: transparent;  /* 背景透明，继承父容器颜色 */
}

.lab-tip {
  margin: 16px 0 0;
  font-size: 12px;
  color: var(--text-3);
}

/* ---------- 我们的人轮播 ---------- */
.people-wrap {
  background: var(--bg-0);
}

.people-carousel {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: none;  /* 去掉边框 */
}

.people-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: transparent;  /* 背景透明，融入页面 */
}

.people-tip {
  margin: 16px 0 0;
  font-size: 12px;
  color: var(--text-3);
}

/* ---------- 指导老师 ---------- */
.advisor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.advisor-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}

.advisor-photo,
.advisor-initial {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
}

.advisor-initial {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-soft);
  border: 1px solid var(--border-strong);
  color: var(--accent);
  font-size: 22px;
  font-weight: 700;
}

.advisor-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 5px;
}

.advisor-title,
.advisor-field {
  font-size: 12.5px;
  color: var(--text-3);
  margin: 0;
  line-height: 1.6;
}

.advisor-words {
  margin: 0;
  padding-left: 14px;
  border-left: 2px solid var(--accent);
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-2);
}

@media (max-width: 768px) {
  .head {
    margin-bottom: 30px;
  }

  .profile {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .dept-grid,
  .advisor-grid {
    grid-template-columns: 1fr;
  }

  .lab-carousel :deep(.el-carousel__container) {
    height: 220px !important;
  }

  .people-carousel :deep(.el-carousel__container) {
    height: 220px !important;
  }
}

@media (max-width: 480px) {
  .profile-label {
    font-size: 11px;
  }

  .profile-value {
    font-size: 14px;
  }

  .dept-name {
    font-size: 17px;
  }

  .dept-desc {
    font-size: 14px;
  }

  .lab-carousel :deep(.el-carousel__container) {
    height: 180px !important;
  }

  .people-carousel :deep(.el-carousel__container) {
    height: 180px !important;
  }

  .advisor-top {
    gap: 12px;
  }

  .advisor-photo,
  .advisor-initial {
    width: 50px;
    height: 50px;
  }

  .advisor-name {
    font-size: 16px;
  }

  .advisor-words {
    font-size: 13px;
    padding-left: 12px;
  }
}
</style>
