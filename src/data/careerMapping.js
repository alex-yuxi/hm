// ==================== 性格→职业映射分析 ====================

// MBTI 类型 → 推荐职业
export const mbtiCareers = {
  INTJ: { careers: ['战略顾问', '科学家', '大学教授', 'CTO', '软件架构师', '投资分析师', '律师', '工程师'],
    desc: 'INTJ善于制定长期战略，偏好独立、智力挑战型工作。适合需要深度思考、系统规划和远见的职位。' },
  INTP: { careers: ['数学家', '理论科学家', '哲学家', 'AI研究员', '系统架构师', '游戏设计师', '大学教授'],
    desc: 'INTP对知识有无尽渴望，享受解决复杂理论问题。适合需要创新思维和深度分析的领域。' },
  ENTJ: { careers: ['CEO', '管理咨询师', '企业家', '投资银行家', '军事指挥官', '大学校长', '房地产开发商'],
    desc: 'ENTJ是天生的领导者，善于建立高效系统和带领大型团队。适合需要战略眼光和领导能力的顶层职位。' },
  ENTP: { careers: ['创业者', '律师', '创意总监', '发明家', '风险投资家', '市场策略师', '影视制作人'],
    desc: 'ENTP创意无穷，善于看到可能性和机会。适合需要创新精神和沟通能力的领域。' },
  INFJ: { careers: ['心理咨询师', '作家', 'HR顾问', '社会工作者', '教育顾问', '医疗顾问', '神职人员'],
    desc: 'INFJ理想主义且富有洞察力，希望做有意义的工作。适合需要同理心和长远愿景的助人职业。' },
  INFP: { careers: ['作家', '心理咨询师', 'UX设计师', '社会工作者', '编辑', '心理学家', '艺术治疗师'],
    desc: 'INFP富有创意和同理心，追求价值和使命感。适合需要人文关怀和创造性表达的领域。' },
  ENFJ: { careers: ['培训师', '外交官', '销售总监', '政治家', '教育管理者', '品牌经理', '人力资源总监'],
    desc: 'ENFJ有强大的感染力，善于激发他人潜力。适合需要人际影响力和领导魅力的职位。' },
  ENFP: { careers: ['记者', '创业顾问', '制片人', '公关专家', '自由职业者', '活动策划', '品牌策略师'],
    desc: 'ENFP热情而有创造力，在多样化和自由的环境中表现最佳。适合需要灵活性和人际互动的职业。' },
  ISTJ: { careers: ['审计师', '军医', '公务员', '法官', '会计师', '质量控制经理', '物流主管'],
    desc: 'ISTJ务实可靠，在需要纪律和标准的领域表现卓越。适合需要精确性和责任感的职业。' },
  ISFJ: { careers: ['护士', '教师', '图书管理员', '会计', '客户服务经理', '行政主管', '医生助理'],
    desc: 'ISFJ温暖细心，在工作中默默守护他人。适合需要耐心和细致关怀的服务型职业。' },
  ESTJ: { careers: ['管理者', '法官', '财务总监', '军校教官', '公司高管', '项目经理', '运营总监'],
    desc: 'ESTJ是出色的组织和执行者。适合需要管理能力和执行力的领导岗位。' },
  ESFJ: { careers: ['医生', '教师', '销售代表', '社区经理', '酒店管理者', '活动策划', '客服主管'],
    desc: 'ESFJ善于关怀和协调他人。适合需要人际交往和社群服务的工作。' },
  ISTP: { careers: ['飞行员', '程序员', '工程师', '技术支持', '赛车手', '外科医生', '环境科学家'],
    desc: 'ISTP动手能力强，善于解决实际问题。适合需要技术能力和应变能力的实践型职业。' },
  ISFP: { careers: ['设计师', '音乐家', '艺术家', '摄影师', '插画师', '花艺师', '宠物医生'],
    desc: 'ISFP有独特的审美和创造力，在工作中追求美和和谐。适合需要审美和实际操作的艺术型职业。' },
  ESTP: { careers: ['企业家', '销售', '急救员', '记者', '投资人', '经纪人', '运动教练'],
    desc: 'ESTP行动力强，善于把握机会和应对变化。适合需要快速反应和冒险精神的工作。' },
  ESFP: { careers: ['演员', '旅游博主', '活动主持人', '销售经理', '健身教练', '导游', '品牌大使'],
    desc: 'ESFP热爱聚光灯，在工作中寻找快乐和刺激。适合需要表现力和活力的职业。' },
};

// 全面的性格→职业综合匹配规则
export function comprehensiveCareerAnalysis(allResults) {
  const analysis = {
    recommendedCareersByType: [],
    recommendedCareersBySkill: [],
    recommendedCareersByValue: [],
    overallRecommendations: [],
    careerFit: '',
    summary: '',
  };

  // 收集所有维度的推荐职业
  const careerScores = {};
  function addCareers(list, weight) {
    list.forEach(c => {
      careerScores[c] = (careerScores[c] || 0) + weight;
    });
  }

  // MBTI推荐 (权重: 3)
  const mbtiResult = allResults.find(r => r.assessmentId === 'mbti');
  if (mbtiResult && mbtiCareers[mbtiResult.result.type]) {
    const mbtiData = mbtiCareers[mbtiResult.result.type];
    addCareers(mbtiData.careers, 3);
    analysis.recommendedCareersByType = mbtiData.careers;
    analysis.mbtiCareerDesc = mbtiData.desc;
  }

  // 职业兴趣推荐 (权重: 3)
  const careerInterest = allResults.find(r => r.assessmentId === 'career-interest');
  if (careerInterest && careerInterest.result.topFields) {
    careerInterest.result.topFields.forEach(field => {
      addCareers(field.careers, 3);
      analysis.recommendedCareersByType.push(...field.careers);
    });
  }

  // 职业技能推荐 (权重: 2)
  const careerSkills = allResults.find(r => r.assessmentId === 'career-skills');
  if (careerSkills && careerSkills.result.topSkills) {
    careerSkills.result.topSkills.slice(0, 3).forEach(skill => {
      addCareers(skill.topCareers, 2);
      analysis.recommendedCareersBySkill.push(...skill.topCareers);
    });
  }

  // 霍兰德推荐 (权重: 2)
  const hollandResult = allResults.find(r => r.assessmentId === 'holland');
  if (hollandResult && hollandResult.result.topTypes) {
    hollandResult.result.topTypes.forEach(type => {
      const careerMatch = type.desc.match(/适合[：:](.+)/);
      if (careerMatch) {
        const careers = careerMatch[1].split('、').map(c => c.trim().replace(/。$/, ''));
        addCareers(careers, 2);
      }
    });
  }

  // 综合排序
  const sortedCareers = Object.entries(careerScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([career, score]) => ({ career, matchScore: Math.min(Math.round(score / 10 * 100), 100) }));

  analysis.overallRecommendations = sortedCareers;
  analysis.top3Careers = sortedCareers.slice(0, 3);

  // 生成综合描述
  analysis.summary = generateSummary(allResults, sortedCareers);

  return analysis;
}

function generateSummary(allResults, topCareers) {
  const parts = [];

  const enneagramResult = allResults.find(r => r.assessmentId === 'enneagram');
  const bigFiveResult = allResults.find(r => r.assessmentId === 'bigfive');
  const discResult = allResults.find(r => r.assessmentId === 'disc');
  const valuesResult = allResults.find(r => r.assessmentId === 'career-values');

  if (enneagramResult) {
    parts.push(`从九型人格来看，你的核心驱动力是${enneagramResult.result.description.split(' - ')[0]}型，这意味着你在工作中${enneagramResult.result.description.split(' - ')[1] || '有独特的内在动力'}。`);
  }

  if (bigFiveResult) {
    const high = bigFiveResult.result.result.filter(r => r.level === 'high').map(r => r.dimension);
    const low = bigFiveResult.result.result.filter(r => r.level === 'low').map(r => r.dimension);
    if (high.length > 0) parts.push(`大五人格中，你在${high.join('、')}方面表现突出`);
    if (low.length > 0) parts.push(`在${low.join('、')}方面相对内敛`);
    if (high.length > 0 || low.length > 0) parts[parts.length - 1] += '。';
  }

  if (valuesResult && valuesResult.result.topValues) {
    const topValue = valuesResult.result.topValues[0];
    parts.push(`在职业价值观上，你最看重${topValue.name}，${topValue.desc.split('。')[0]}。`);
  }

  if (topCareers.length > 0) {
    parts.push(`综合所有测评维度，你的性格特质最适合以下职业方向：${topCareers.slice(0, 5).map(c => c.career).join('、')}等。`);
  }

  return parts.join('');
}

// 当前职业匹配分析
export function analyzeCurrentCareer(allResults, currentCareer) {
  const analysis = comprehensiveCareerAnalysis(allResults);
  const allRec = analysis.overallRecommendations.map(c => c.career);

  const exactMatch = allRec.some(c => c.includes(currentCareer) || currentCareer.includes(c));
  const partialMatch = allRec.some(c => c.split('、').some(cc => currentCareer.includes(cc) || cc.includes(currentCareer)));
  const topMatch = analysis.top3Careers.some(c => c.career.includes(currentCareer) || currentCareer.includes(c.career));

  let fitLevel, fitDesc;
  if (topMatch) {
    fitLevel = '高度匹配 🌟';
    fitDesc = '你当前从事的职业与你的性格特质高度契合！这说明你已经找到了适合自己的方向。你的性格优势可以在当前岗位上得到充分发挥，建议在此基础上持续提升，争取更大的成就。';
  } else if (exactMatch) {
    fitLevel = '较好匹配 ✅';
    fitDesc = '你当前从事的职业与你的性格特质较为匹配。虽然可能有更具天赋的领域，但当前工作能让你发挥大部分优势。可以留意调整工作内容，使之更贴近你的特质。';
  } else if (partialMatch) {
    fitLevel = '基本匹配 ⚡';
    fitDesc = '你当前职业与你的性格特质有一定关联，但可能存在一些不匹配的方面。建议思考如何在现有工作中融入更多符合你性格优势的元素。';
  } else {
    fitLevel = '存在偏差 ⚠️';
    fitDesc = '当前职业与你的性格特质匹配度不高，长期来看可能会感到一定的压力或不适。建议考虑以下方向之一：1) 在现有行业中寻找更匹配的岗位；2) 在工作中创造更多符合你性格的侧重点；3) 考虑职业转型到更适合的领域。';
  }

  return {
    fitLevel, fitDesc,
    bestFitCareers: analysis.top3Careers,
    allRecommendations: analysis.overallRecommendations,
    personalitySummary: analysis.summary,
  };
}
