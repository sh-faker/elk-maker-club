<template>
  <section class="section competitions-wrap">
    <div class="container">
      <div class="head">
        <span class="eyebrow">参赛赛事</span>
        <h2 class="section-title">我们的主战场</h2>
        <p class="section-desc">
          社团以全国大学生智能汽车竞赛为核心，同时参加全国三维数字化创新设计大赛（3D大赛）。
          多赛道并行让成员能找到最适合自己的方向，从智能车到无人机，从制造到仿真。
        </p>
      </div>

      <div class="comp-grid">
        <article v-for="comp in competitions" :key="comp.name" class="card comp">
          <div class="comp-badge">{{ comp.badge }}</div>
          <h3 class="comp-name">{{ comp.name }}</h3>
          <p class="comp-full">{{ comp.fullName }}</p>
          <p class="comp-desc">{{ comp.desc }}</p>
          <div class="comp-tags">
            <span v-for="tag in comp.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CompetitionsSection',
  data() {
    return {
      competitions: [
        {
          badge: '核心赛事',
          name: '智能汽车竞赛',
          fullName: '全国大学生智能汽车竞赛',
          desc: '教育部认定的 A 类学科竞赛，社团的立身之本。从电路设计到算法调优，每个赛季都是一次完整的工程实践。',
          tags: ['嵌入式开发', '控制算法', 'PCB 设计', '循迹/视觉']
        },
        {
          badge: '3D大赛',
          name: '低空无人机赛道',
          fullName: '低空无人机设计仿真与竞技大赛',
          desc: '全国三维数字化创新设计大赛（3D大赛）的无人机专项赛道。涵盖建模、仿真与实物飞行竞技，从设计到操控全流程参与。',
          tags: ['三维建模', '飞行仿真', '飞控调试', '竞技操控']
        },
        {
          badge: '3D大赛',
          name: '增减材复合制造',
          fullName: '增减材复合制造及数字孪生技术创新应用大赛',
          desc: '3D大赛的先进制造专项。结合增材制造（3D打印）与减材加工技术，探索数字孪生在智能制造中的应用。',
          tags: ['增材制造', '数控加工', '数字孪生', '工艺优化']
        }
      ]
    }
  }
}
</script>

<style scoped>
.competitions-wrap {
  background: var(--bg-0);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.head {
  margin-bottom: 44px;
  text-align: center;
}

.section-desc {
  margin-left: auto;
  margin-right: auto;
}

.comp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.comp {
  display: flex;
  flex-direction: column;
}

.comp-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 4px 12px;
  border-radius: 6px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.comp-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-1);
  margin: 0 0 8px;
}

.comp-full {
  font-size: 13px;
  color: var(--text-3);
  margin: 0 0 14px;
  line-height: 1.6;
}

.comp-desc {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text-2);
  margin: 0 0 auto;
  flex-grow: 1;
}

.comp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.tag {
  font-size: 12px;
  padding: 5px 11px;
  border-radius: 6px;
  background: var(--chip-bg);
  color: var(--text-2);
}

@media (max-width: 900px) {
  .comp-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .head {
    margin-bottom: 32px;
  }

  .comp-name {
    font-size: 19px;
  }

  .comp-full {
    font-size: 12px;
  }

  .comp-desc {
    font-size: 14px;
  }

  .comp-tags {
    margin-top: 16px;
    padding-top: 16px;
  }
}
</style>
