/*
 * Copyright 2026 alex-yuxi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// ==================== 测评定义与题库 ====================

export const assessments = [
  {
    id: 'mbti',
    name: 'MBTI 性格测评',
    category: 'personality',
    icon: '🧠',
    color: '#6366f1',
    description: '基于荣格心理学理论，从四个维度分析你的性格偏好，识别你的16种人格类型之一。',
    timeEstimate: '约15分钟',
    questionsCount: 20,
    dimensions: ['E/I', 'S/N', 'T/F', 'J/P'],
    questions: [
      { id: 1, text: '参加社交聚会后，你通常感到：', options: [
        { text: '精力充沛，想继续社交', score: { E: 1, I: 0 } },
        { text: '需要独处时间来恢复精力', score: { E: 0, I: 1 } },
      ]},
      { id: 2, text: '在团队讨论中，你更倾向于：', options: [
        { text: '先说出来再整理思路', score: { E: 1, I: 0 } },
        { text: '先想清楚再表达观点', score: { E: 0, I: 1 } },
      ]},
      { id: 3, text: '认识新朋友时，你通常：', options: [
        { text: '主动开启对话，容易与人建立联系', score: { E: 1, I: 0 } },
        { text: '等待对方先开口，选择性交流', score: { E: 0, I: 1 } },
      ]},
      { id: 4, text: '周末你最倾向的选择是：', options: [
        { text: '和朋友聚会或外出活动', score: { E: 1, I: 0 } },
        { text: '在家阅读、看电影或独处', score: { E: 0, I: 1 } },
      ]},
      { id: 5, text: '工作中遇到问题时，你更：', options: [
        { text: '喜欢和同事讨论，通过交流找到解决方案', score: { E: 1, I: 0 } },
        { text: '喜欢自己先研究，有了答案再和他人分享', score: { E: 0, I: 1 } },
      ]},
      { id: 6, text: '学习新知识时，你更关注：', options: [
        { text: '具体的事实、细节和实际应用', score: { S: 1, N: 0 } },
        { text: '概念、理论和未来的可能性', score: { S: 0, N: 1 } },
      ]},
      { id: 7, text: '看一幅画时，你首先注意到：', options: [
        { text: '颜料、笔触、构图等具体细节', score: { S: 1, N: 0 } },
        { text: '画作传达的情感、意境和深层含义', score: { S: 0, N: 1 } },
      ]},
      { id: 8, text: '做决定时，你更依赖：', options: [
        { text: '过往经验和已验证的方法', score: { S: 1, N: 0 } },
        { text: '直觉和对未来趋势的预判', score: { S: 0, N: 1 } },
      ]},
      { id: 9, text: '你对创新的态度是：', options: [
        { text: '更倾向于在现有基础上逐步改进', score: { S: 1, N: 0 } },
        { text: '喜欢颠覆性的全新想法和概念', score: { S: 0, N: 1 } },
      ]},
      { id: 10, text: '描述一件事时，你更：', options: [
        { text: '注重事实和数据，按时间顺序叙述', score: { S: 1, N: 0 } },
        { text: '注重整体图景和内在联系', score: { S: 0, N: 1 } },
      ]},
      { id: 11, text: '你需要做出与团队成员有关的决定时：', options: [
        { text: '优先考虑公平和逻辑一致', score: { T: 1, F: 0 } },
        { text: '优先考虑对人的影响和感受', score: { T: 0, F: 1 } },
      ]},
      { id: 12, text: '听到同事的困扰时，你首先想到：', options: [
        { text: '分析问题原因并提供解决方案', score: { T: 1, F: 0 } },
        { text: '理解对方的情绪并给予安慰', score: { T: 0, F: 1 } },
      ]},
      { id: 13, text: '在辩论中，你更容易被说服的方式是：', options: [
        { text: '逻辑严谨、数据充分的论证', score: { T: 1, F: 0 } },
        { text: '基于价值观和人文关怀的论述', score: { T: 0, F: 1 } },
      ]},
      { id: 14, text: '面对批评时，你更在意：', options: [
        { text: '批评是否合理，有没有逻辑漏洞', score: { T: 1, F: 0 } },
        { text: '批评的方式是否尊重了我的感受', score: { T: 0, F: 1 } },
      ]},
      { id: 15, text: '选择职业时，你更看重：', options: [
        { text: '理性分析后的职业发展前景和薪酬', score: { T: 1, F: 0 } },
        { text: '是否做有意义的事、价值观是否一致', score: { T: 0, F: 1 } },
      ]},
      { id: 16, text: '对于旅行计划，你的态度是：', options: [
        { text: '提前做好详细攻略，按计划执行', score: { J: 1, P: 0 } },
        { text: '随性出发，享受不期而遇的惊喜', score: { J: 0, P: 1 } },
      ]},
      { id: 17, text: '面对截止日期，你通常：', options: [
        { text: '提前规划进度，确保按时完成', score: { J: 1, P: 0 } },
        { text: '在压力下效率最高，倾向于最后冲刺', score: { J: 0, P: 1 } },
      ]},
      { id: 18, text: '你的工作桌面通常是：', options: [
        { text: '整洁有序，每样东西有固定位置', score: { J: 1, P: 0 } },
        { text: '看起来有点乱，但你知道东西在哪', score: { J: 0, P: 1 } },
      ]},
      { id: 19, text: '生活中遇到变化时：', options: [
        { text: '需要时间来适应计划外的变化', score: { J: 1, P: 0 } },
        { text: '觉得变化令人兴奋，能快速调整', score: { J: 0, P: 1 } },
      ]},
      { id: 20, text: '你认为自己在他人眼中更偏向：', options: [
        { text: '有条理、靠谱、目标明确', score: { J: 1, P: 0 } },
        { text: '灵活、开放、适应力强', score: { J: 0, P: 1 } },
      ]},
    ],
    calculateResult(scores) {
      const type = (scores.E >= 3 ? 'E' : 'I') + (scores.S >= 3 ? 'S' : 'N') + (scores.T >= 3 ? 'T' : 'F') + (scores.J >= 3 ? 'J' : 'P');
      const descriptions = {
        INTJ: '建筑师 - 富有战略眼光，独立，高标准的完美主义者',
        INTP: '逻辑学家 - 创新的思考者，对知识有无限渴求',
        ENTJ: '指挥官 - 大胆的领导者，善于制定和执行计划',
        ENTP: '辩论家 - 聪明好奇，喜欢智力上的挑战',
        INFJ: '提倡者 - 安静而神秘，有坚定的理想和价值观',
        INFP: '调停者 - 富有诗意，善良的利他主义者',
        ENFJ: '主人公 - 富有魅力，鼓舞人心的领导者',
        ENFP: '竞选者 - 热情、富有创造力，爱社交的自由灵魂',
        ISTJ: '物流师 - 务实正直，做事务实可靠',
        ISFJ: '守卫者 - 专注而温暖的守护者，时刻准备保护所爱',
        ESTJ: '总经理 - 出色的管理者，在管理事务和人方面无与伦比',
        ESFJ: '执政官 - 非常关心他人，乐于助人，受欢迎',
        ISTP: '鉴赏家 - 大胆而实际，擅长使用各种工具',
        ISFP: '探险家 - 灵活有魅力的艺术家，随时准备探索新体验',
        ESTP: '企业家 - 聪明而精力充沛，乐于冒险',
        ESFP: '表演者 - 自发的，精力充沛的表演者，从不沉闷',
      };
      return { type, description: descriptions[type] || '独特的性格组合', scores };
    }
  },
  {
    id: 'enneagram',
    name: '九型人格测评',
    category: 'personality',
    icon: '🎭',
    color: '#ec4899',
    description: '探索你的核心动机和恐惧，识别九种基本人格类型，深入了解你的内在驱动力。',
    timeEstimate: '约12分钟',
    questionsCount: 18,
    dimensions: ['Type1', 'Type2', 'Type3', 'Type4', 'Type5', 'Type6', 'Type7', 'Type8', 'Type9'],
    questions: [
      { id: 1, text: '面对错误时，你的第一反应是：', options: [
        { text: '立即纠正，确保以后不再犯', score: { Type1: 2 } },
        { text: '反思原因，但不过分纠结', score: { Type9: 2 } },
      ]},
      { id: 2, text: '在关系中，你更倾向于：', options: [
        { text: '主动关心照顾他人，希望被需要', score: { Type2: 2 } },
        { text: '保持独立，不轻易依赖他人', score: { Type5: 2 } },
      ]},
      { id: 3, text: '关于成功，你的看法是：', options: [
        { text: '成功需要被看见和认可，形象很重要', score: { Type3: 2 } },
        { text: '成功是内心的满足，不需要对外证明', score: { Type4: 2 } },
      ]},
      { id: 4, text: '情绪体验方面，你：', options: [
        { text: '情感丰富深刻，容易感受到独特的情绪', score: { Type4: 2 } },
        { text: '情绪平稳，不太喜欢过于激烈的情感波动', score: { Type9: 2 } },
      ]},
      { id: 5, text: '学习和获取信息的习惯：', options: [
        { text: '深入研究感兴趣的领域，成为专家', score: { Type5: 2 } },
        { text: '广泛涉猎，保持生活的多样性', score: { Type7: 2 } },
      ]},
      { id: 6, text: '面对不确定的情况：', options: [
        { text: '仔细分析各种可能，做最坏的打算', score: { Type6: 2 } },
        { text: '相信车到山前必有路，不太焦虑', score: { Type9: 2 } },
      ]},
      { id: 7, text: '关于生活态度：', options: [
        { text: '人生苦短，及时行乐，追求快乐', score: { Type7: 2 } },
        { text: '人生需要计划，未雨绸缪才有安全感', score: { Type6: 2 } },
      ]},
      { id: 8, text: '面对不公时：', options: [
        { text: '挺身而出，保护弱者，对抗不公', score: { Type8: 2 } },
        { text: '内心不平但倾向保持和谐，避免冲突', score: { Type9: 2 } },
      ]},
      { id: 9, text: '做决定时，你更注重：', options: [
        { text: '什么是对的、正确的事', score: { Type1: 2 } },
        { text: '什么能带来内心的和谐与平静', score: { Type9: 2 } },
      ]},
      { id: 10, text: '帮助他人时，你的想法是：', options: [
        { text: '我主动提供帮助，因为关心他人', score: { Type2: 2 } },
        { text: '我觉得每个人都应该自己解决问题', score: { Type8: 2 } },
      ]},
      { id: 11, text: '你对自己的看法是：', options: [
        { text: '我重视效率和成果，希望展现最好的一面', score: { Type3: 2 } },
        { text: '我更关心内在的真实，哪怕它不完美', score: { Type4: 2 } },
      ]},
      { id: 12, text: '在团队中的角色：', options: [
        { text: '我是团队的稳定器，维持和谐', score: { Type9: 2 } },
        { text: '我是团队的保护者，维护规则和秩序', score: { Type1: 2 } },
      ]},
      { id: 13, text: '对于未来：', options: [
        { text: '我总是设想最好的可能性，充满期待', score: { Type7: 2 } },
        { text: '我习惯考虑各种风险，做好准备', score: { Type6: 2 } },
      ]},
      { id: 14, text: '处理冲突时：', options: [
        { text: '直接面对，不怕冲突，要解决问题', score: { Type8: 2 } },
        { text: '尽量避免，寻求妥协和和谐', score: { Type9: 2 } },
      ]},
      { id: 15, text: '关于人际关系：', options: [
        { text: '我通过帮助他人来建立关系', score: { Type2: 2 } },
        { text: '我需要大量的个人空间，独处让我舒适', score: { Type5: 2 } },
      ]},
      { id: 16, text: '面对批评：', options: [
        { text: '我会认真分析批评是否合理并改进', score: { Type1: 2 } },
        { text: '我容易把批评看作是自我价值的否定', score: { Type4: 2 } },
      ]},
      { id: 17, text: '你的内心驱动力是：', options: [
        { text: '追求卓越，成为最好的自己', score: { Type3: 2 } },
        { text: '追求安全，在可预见的环境中生活', score: { Type6: 2 } },
      ]},
      { id: 18, text: '面对压力时：', options: [
        { text: '退缩思考，需要时间理清思路', score: { Type5: 2 } },
        { text: '保持忙碌，用新的体验分散注意力', score: { Type7: 2 } },
      ]},
    ],
    calculateResult(scores) {
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const primaryType = sorted[0][0];
      const types = {
        Type1: '完美型 - 原则、目标、自我控制、完美主义',
        Type2: '助人型 - 慷慨、占有、人本主义、讨人喜欢',
        Type3: '成就型 - 适应能力强、卓越、有形象意识',
        Type4: '自我型 - 表现自我、浪漫、有创造力',
        Type5: '理智型 - 感知能力强、创新、隐秘、孤僻',
        Type6: '忠诚型 - 忠诚、投入、危机导向',
        Type7: '活跃型 - 享受、自发、忙碌、热情',
        Type8: '领袖型 - 自信、果断、有控制欲',
        Type9: '和平型 - 平静、自我满足、包容',
      };
      return { primaryType: primaryType.replace('Type', ''), description: types[primaryType], scores };
    }
  },
  {
    id: 'bigfive',
    name: '大五人格测评',
    category: 'personality',
    icon: '🧬',
    color: '#8b5cf6',
    description: '基于最广泛认可的心理学人格模型(OCEAN)，从五个维度全面评估你的性格特征。',
    timeEstimate: '约15分钟',
    questionsCount: 20,
    dimensions: ['开放性', '尽责性', '外向性', '宜人性', '神经质'],
    questions: [
      { id: 1, text: '你对学习新事物的态度：', options: [
        { text: '充满好奇，喜欢探索未知领域', score: { O: 2 } },
        { text: '倾向于深入已知领域，不太喜欢变化', score: { O: 0 } },
      ]},
      { id: 2, text: '对于艺术和美的感受：', options: [
        { text: '容易被艺术作品打动，享受审美体验', score: { O: 2 } },
        { text: '不太关注艺术，更看重实用性', score: { O: 0 } },
      ]},
      { id: 3, text: '你对抽象概念和理论的兴趣：', options: [
        { text: '喜欢思考哲学问题和大概念', score: { O: 2 } },
        { text: '更关注可触摸的现实问题', score: { O: 0 } },
      ]},
      { id: 4, text: '对于日常新体验：', options: [
        { text: '乐意尝试新的餐厅、新的路线', score: { O: 2 } },
        { text: '偏爱熟悉的环境和惯常的做事方式', score: { O: 0 } },
      ]},
      { id: 5, text: '做事的习惯：', options: [
        { text: '喜欢制定计划并按计划执行', score: { C: 2 } },
        { text: '随机应变，不喜欢被计划束缚', score: { C: 0 } },
      ]},
      { id: 6, text: '对于承诺的事情：', options: [
        { text: '言出必行，高度重视承诺', score: { C: 2 } },
        { text: '有时候会忘记自己的承诺', score: { C: 0 } },
      ]},
      { id: 7, text: '你的工作节奏是：', options: [
        { text: '有条不紊，注重效率和质量', score: { C: 2 } },
        { text: '灵活变通，有时拖延但能在截止前完成', score: { C: 0 } },
      ]},
      { id: 8, text: '生活中的整洁度：', options: [
        { text: '东西摆放有序，追求整洁的环境', score: { C: 2 } },
        { text: '对整洁度要求不高，随心即可', score: { C: 0 } },
      ]},
      { id: 9, text: '参加大型社交场合：', options: [
        { text: '感到兴奋，享受人群中的氛围', score: { E: 2 } },
        { text: '感到不适，倾向于安静的小型聚会', score: { E: 0 } },
      ]},
      { id: 10, text: '你在团队中的表现：', options: [
        { text: '活跃发言，乐于成为关注焦点', score: { E: 2 } },
        { text: '更多倾听，在必要时才表达意见', score: { E: 0 } },
      ]},
      { id: 11, text: '与陌生人交流：', options: [
        { text: '不觉得困难，能自然地开启对话', score: { E: 2 } },
        { text: '会感到紧张，需要时间来适应', score: { E: 0 } },
      ]},
      { id: 12, text: '你更喜欢的生活节奏：', options: [
        { text: '快节奏、活动丰富的生活', score: { E: 2 } },
        { text: '慢节奏、安静放松的生活', score: { E: 0 } },
      ]},
      { id: 13, text: '对于他人的需求：', options: [
        { text: '能敏锐感知并主动提供帮助', score: { A: 2 } },
        { text: '更关注自己的事情，不太留意他人', score: { A: 0 } },
      ]},
      { id: 14, text: '面对不同的观点：', options: [
        { text: '尊重并尝试理解，即使不同意', score: { A: 2 } },
        { text: '倾向于辩论，坚持自己的立场', score: { A: 0 } },
      ]},
      { id: 15, text: '在合作中，你通常：', options: [
        { text: '优先考虑团队和谐，愿意妥协', score: { A: 2 } },
        { text: '坚持自己认为正确的方案', score: { A: 0 } },
      ]},
      { id: 16, text: '对他人的信任度：', options: [
        { text: '倾向于相信他人是善意的', score: { A: 2 } },
        { text: '保持警觉，不容易轻信', score: { A: 0 } },
      ]},
      { id: 17, text: '面对压力时：', options: [
        { text: '容易焦虑，情绪波动较大', score: { N: 2 } },
        { text: '保持冷静，情绪相对稳定', score: { N: 0 } },
      ]},
      { id: 18, text: '当事情不如预期时：', options: [
        { text: '感到烦躁不安，需要时间来平复', score: { N: 2 } },
        { text: '能够快速调整心态，继续前进', score: { N: 0 } },
      ]},
      { id: 19, text: '对于未来的不确定性：', options: [
        { text: '经常会为此感到担忧和不安', score: { N: 2 } },
        { text: '相信一切会自然解决，不太焦虑', score: { N: 0 } },
      ]},
      { id: 20, text: '自我评价方面：', options: [
        { text: '容易自我怀疑，对自己的表现要求严格', score: { N: 2 } },
        { text: '对自己有信心，不太受外界评价影响', score: { N: 0 } },
      ]},
    ],
    calculateResult(scores) {
      const dims = ['O', 'C', 'E', 'A', 'N'];
      const names = { O: '开放性', C: '尽责性', E: '外向性', A: '宜人性', N: '神经质' };
      const labels = {
        O: { high: '开放创新 - 喜欢新体验，富有想象力和好奇心', low: '传统务实 - 偏爱熟悉的环境和常规做法' },
        C: { high: '高度尽责 - 自律、有条理、目标导向', low: '灵活随性 - 随遇而安，对计划和规则保持灵活' },
        E: { high: '外向活跃 - 善于社交，精力充沛，积极正向', low: '内向沉静 - 喜欢独处，深度思考，安静内敛' },
        A: { high: '高宜人性 - 善解人意，乐于合作，信任他人', low: '坚定独立 - 自信竞争，坚持己见，务实冷静' },
        N: { high: '情绪敏感 - 容易感到压力和负面情绪', low: '情绪稳定 - 冷静沉着，抗压能力强' },
      };
      let result = [];
      let totalAvg = 0;
      for (const d of dims) {
        const avg = scores[d] / 4; // 每题2分，4题共8分
        const level = avg > 1 ? 'high' : 'low';
        result.push({ dimension: names[d], level, label: labels[d][level], score: avg });
        totalAvg += avg;
      }
      return { result, scores, totalAvg: totalAvg / 5 };
    }
  },
  {
    id: 'disc',
    name: 'DISC 行为风格测评',
    category: 'personality',
    icon: '🎯',
    color: '#f59e0b',
    description: '通过四种行为风格维度(Dominance/Influence/Steadiness/Conscientiousness)，了解你的行为偏好和沟通风格。',
    timeEstimate: '约10分钟',
    questionsCount: 16,
    dimensions: ['D-支配型', 'I-影响型', 'S-稳健型', 'C-谨慎型'],
    questions: [
      { id: 1, text: '面对挑战时，你的态度是：', options: [
        { text: '迎难而上，喜欢竞争和挑战', score: { D: 2 } },
        { text: '谨慎评估风险后再行动', score: { C: 2 } },
      ]},
      { id: 2, text: '在团队中的角色：', options: [
        { text: '主动承担领导角色，推动团队前进', score: { D: 2 } },
        { text: '支持团队成员，确保团队稳定运转', score: { S: 2 } },
      ]},
      { id: 3, text: '与人沟通时，你更注重：', options: [
        { text: '直接、高效、结果导向', score: { D: 2 } },
        { text: '友善、有感染力、建立良好关系', score: { I: 2 } },
      ]},
      { id: 4, text: '面对新认识的朋友：', options: [
        { text: '主动交谈，分享有趣的故事和想法', score: { I: 2 } },
        { text: '礼貌友善但不急于深入交流', score: { S: 2 } },
      ]},
      { id: 5, text: '做决定的风格：', options: [
        { text: '果断快速，相信直觉', score: { D: 2 } },
        { text: '深思熟虑，收集足够信息后才决定', score: { C: 2 } },
      ]},
      { id: 6, text: '聚会中的表现：', options: [
        { text: '是聚会的中心和气氛制造者', score: { I: 2 } },
        { text: '享受聚会但更多是倾听和观察', score: { S: 2 } },
      ]},
      { id: 7, text: '工作中的自我要求：', options: [
        { text: '高质量标准，追求精确和完美', score: { C: 2 } },
        { text: '高效完成，把握关键点而非细节', score: { D: 2 } },
      ]},
      { id: 8, text: '情绪表达方面：', options: [
        { text: '热情洋溢，情绪容易被感知', score: { I: 2 } },
        { text: '情绪稳定温和，不太外露', score: { S: 2 } },
      ]},
      { id: 9, text: '面对规则和流程：', options: [
        { text: '严格遵守规则，做事有条不紊', score: { C: 2 } },
        { text: '挑战不合理规则，寻求改变', score: { D: 2 } },
      ]},
      { id: 10, text: '在冲突中你倾向于：', options: [
        { text: '正面面对，直接表达立场', score: { D: 2 } },
        { text: '寻求和解，维护关系和谐', score: { S: 2 } },
      ]},
      { id: 11, text: '你更看重的工作环境：', options: [
        { text: '充满活力和创造力的氛围', score: { I: 2 } },
        { text: '稳定有序、可预见的环境', score: { S: 2 } },
      ]},
      { id: 12, text: '处理细节任务：', options: [
        { text: '细致耐心，享受精雕细琢的过程', score: { C: 2 } },
        { text: '觉得繁琐，更喜欢宏观的工作', score: { I: 2 } },
      ]},
      { id: 13, text: '面对他人的赞美：', options: [
        { text: '欣然接受，这让我更有动力', score: { I: 2 } },
        { text: '谦虚回应，不太习惯被关注', score: { C: 2 } },
      ]},
      { id: 14, text: '面对变化时：', options: [
        { text: '快速适应，拥抱变化', score: { D: 2 } },
        { text: '需要时间来适应新情况', score: { S: 2 } },
      ]},
      { id: 15, text: '与人合作时的偏好：', options: [
        { text: '喜欢协作讨论，头脑风暴式的合作', score: { I: 2 } },
        { text: '倾向于各自分工明确，独立完成', score: { C: 2 } },
      ]},
      { id: 16, text: '你给人的第一印象是：', options: [
        { text: '温和亲切、可靠稳重', score: { S: 2 } },
        { text: '自信果断、目标明确', score: { D: 2 } },
      ]},
    ],
    calculateResult(scores) {
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const types = {
        D: { name: '支配型 (Dominance)', emoji: '🦁', desc: '果断直接，结果导向，喜欢挑战和掌控。适合领导岗位、创业、销售管理。' },
        I: { name: '影响型 (Influence)', emoji: '🦚', desc: '热情开朗，善于沟通，能感染他人。适合公关、市场、培训、演艺。' },
        S: { name: '稳健型 (Steadiness)', emoji: '🐶', desc: '耐心可靠，善于倾听，追求和谐稳定。适合客服、行政、护理、教育。' },
        C: { name: '谨慎型 (Conscientiousness)', emoji: '🦉', desc: '精确理性，注重质量和标准。适合财务、研发、质量管控、数据分析。' },
      };
      const primary = sorted[0][0];
      const secondary = sorted[1][0];
      return { primaryType: types[primary], secondaryType: types[secondary], scores };
    }
  },
  {
    id: 'holland',
    name: '霍兰德职业兴趣测评',
    category: 'personality',
    icon: '🧭',
    color: '#10b981',
    description: '基于RIASEC模型(现实型/研究型/艺术型/社会型/企业型/常规型)，识别你的职业兴趣类型。',
    timeEstimate: '约12分钟',
    questionsCount: 18,
    dimensions: ['R-现实型', 'I-研究型', 'A-艺术型', 'S-社会型', 'E-企业型', 'C-常规型'],
    questions: [
      { id: 1, text: '你对动手操作工具或设备的态度：', options: [
        { text: '非常喜欢，享受动手创造的过程', score: { R: 2 } },
        { text: '不太感兴趣，更喜欢脑力活动', score: { I: 2 } },
      ]},
      { id: 2, text: '面对一个科学问题时：', options: [
        { text: '充满好奇，想要深入研究和理解', score: { I: 2 } },
        { text: '有基本了解即可，不太想深究', score: { S: 2 } },
      ]},
      { id: 3, text: '对于艺术创作：', options: [
        { text: '热爱创作，常有表达自我的冲动', score: { A: 2 } },
        { text: '欣赏艺术但自己不算善于创作', score: { C: 2 } },
      ]},
      { id: 4, text: '在帮助他人方面：', options: [
        { text: '很有满足感，喜欢从事助人工作', score: { S: 2 } },
        { text: '力所能及会帮，但不会选为主要职业', score: { R: 2 } },
      ]},
      { id: 5, text: '关于领导和说服他人：', options: [
        { text: '享受领导角色，善于推销想法', score: { E: 2 } },
        { text: '不太喜欢站在前台，更喜欢后台支持', score: { C: 2 } },
      ]},
      { id: 6, text: '处理数据和文件：', options: [
        { text: '有条理，喜欢按系统和流程工作', score: { C: 2 } },
        { text: '觉得枯燥，喜欢更有创意的工作', score: { A: 2 } },
      ]},
      { id: 7, text: '在户外或体力劳动中：', options: [
        { text: '感到自在，享受身体力行的感觉', score: { R: 2 } },
        { text: '更喜欢在室内的脑力工作', score: { I: 2 } },
      ]},
      { id: 8, text: '对于分析和解决问题：', options: [
        { text: '乐于深入分析，享受逻辑推理', score: { I: 2 } },
        { text: '更偏好与人打交道解决问题', score: { S: 2 } },
      ]},
      { id: 9, text: '对于创造性表达：', options: [
        { text: '经常有创意想法，喜欢独特表达', score: { A: 2 } },
        { text: '更关注实用性而非创造性', score: { C: 2 } },
      ]},
      { id: 10, text: '与人打交道 vs 与数据打交道：', options: [
        { text: '更喜欢与人互动交流', score: { S: 2 } },
        { text: '更喜欢和数字、数据打交道', score: { C: 2 } },
      ]},
      { id: 11, text: '关于竞争和成就：', options: [
        { text: '享受竞争，追求事业上的成就感', score: { E: 2 } },
        { text: '不太追求竞争性成功，更看重生活平衡', score: { S: 2 } },
      ]},
      { id: 12, text: '对于规章制度的看法：', options: [
        { text: '规范工作很重要，喜欢明确的流程', score: { C: 2 } },
        { text: '制度和规章太过束缚，喜欢灵活性', score: { E: 2 } },
      ]},
      { id: 13, text: '对于操作机器或修理物品：', options: [
        { text: '有天赋或兴趣，享受动手修理', score: { R: 2 } },
        { text: '完全没兴趣，更愿意请人代劳', score: { A: 2 } },
      ]},
      { id: 14, text: '对于理论研究的兴趣：', options: [
        { text: '强烈的好奇心驱动，喜欢纯研究', score: { I: 2 } },
        { text: '理论要能实际应用才有价值', score: { E: 2 } },
      ]},
      { id: 15, text: '关于审美和设计：', options: [
        { text: '对美有较高要求，重视设计和风格', score: { A: 2 } },
        { text: '功能大于形式，实用最重要', score: { R: 2 } },
      ]},
      { id: 16, text: '关于教学和引导他人：', options: [
        { text: '乐于分享知识，喜欢教学相长', score: { S: 2 } },
        { text: '不是我的强项，更专注于自己的领域', score: { I: 2 } },
      ]},
      { id: 17, text: '对于商业和管理：', options: [
        { text: '有商业嗅觉，喜欢经营和管理', score: { E: 2 } },
        { text: '商业世界过于功利，想做更有意义的工作', score: { A: 2 } },
      ]},
      { id: 18, text: '对于信息的收集和整理：', options: [
        { text: '享受系统整理和归档的过程', score: { C: 2 } },
        { text: '觉得归类整理太费时，差不多就行', score: { R: 2 } },
      ]},
    ],
    calculateResult(scores) {
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const codes = {
        R: { name: '现实型 (Realistic)', icon: '🔧', desc: '动手操作能力强，偏好具体任务。适合：工程师、技术员、建筑师、农业人员、飞行员。' },
        I: { name: '研究型 (Investigative)', icon: '🔬', desc: '喜欢观察分析和解决问题。适合：科学家、医生、数据分析师、研究员、程序员。' },
        A: { name: '艺术型 (Artistic)', icon: '🎨', desc: '富有创造力和想象力。适合：设计师、作家、音乐家、摄影师、艺术总监。' },
        S: { name: '社会型 (Social)', icon: '🤝', desc: '喜欢帮助和教导他人。适合：教师、心理咨询师、社工、护士、人力资源。' },
        E: { name: '企业型 (Enterprising)', icon: '💼', desc: '喜欢领导和说服他人。适合：企业家、销售经理、律师、政治家、市场总监。' },
        C: { name: '常规型 (Conventional)', icon: '📊', desc: '喜欢有秩序和标准的工作。适合：会计师、行政、银行职员、数据分析、档案管理。' },
      };
      return { topTypes: sorted.slice(0, 3).map(s => ({ code: s[0], ...codes[s[0]], score: s[1] })), scores };
    }
  },
  // ==================== 职业测评 ====================
  {
    id: 'career-interest',
    name: '职业兴趣测评',
    category: 'career',
    icon: '💡',
    color: '#3b82f6',
    description: '了解你的职业兴趣所在，发现让你充满热情的工作领域，帮助你找到真正热爱的事业方向。',
    timeEstimate: '约8分钟',
    questionsCount: 12,
    dimensions: ['技术科技', '商业管理', '创意艺术', '社会服务', '自然探索', '金融数据'],
    questions: [
      { id: 1, text: '你对编程和软件开发的兴趣程度：', options: [
        { text: '非常感兴趣，想深入学习', score: { tech: 2 } },
        { text: '不太感兴趣', score: { tech: 0 } },
      ]},
      { id: 2, text: '关于商业创业：', options: [
        { text: '梦想自己创业或经营公司', score: { biz: 2 } },
        { text: '更喜欢稳定的工作环境', score: { biz: 0 } },
      ]},
      { id: 3, text: '对于设计创作：', options: [
        { text: '享受创造美好的事物', score: { creative: 2 } },
        { text: '设计不是我的主要兴趣', score: { creative: 0 } },
      ]},
      { id: 4, text: '关于帮助他人：', options: [
        { text: '从事助人工作会让我很有成就感', score: { social: 2 } },
        { text: '我倾向于非服务性的职业', score: { social: 0 } },
      ]},
      { id: 5, text: '对于自然和环境：', options: [
        { text: '关心环保，喜欢与自然相关的工作', score: { nature: 2 } },
        { text: '环境问题不是我关注的重点', score: { nature: 0 } },
      ]},
      { id: 6, text: '对于数字和分析：', options: [
        { text: '喜欢和数字打交道，分析财务数据', score: { finance: 2 } },
        { text: '数字让我头疼', score: { finance: 0 } },
      ]},
      { id: 7, text: '对新科技产品的态度：', options: [
        { text: '总是最先尝试，对科技充满热情', score: { tech: 2 } },
        { text: '科技是工具，没有特别热情', score: { tech: 0 } },
      ]},
      { id: 8, text: '关于领导和组织：', options: [
        { text: '喜欢组织活动和带领团队', score: { biz: 2 } },
        { text: '更喜欢做执行者而非组织者', score: { biz: 0 } },
      ]},
      { id: 9, text: '对于写作和内容创作：', options: [
        { text: '喜欢用文字表达思想和创意', score: { creative: 2 } },
        { text: '写作不是我的强项', score: { creative: 0 } },
      ]},
      { id: 10, text: '关于教育和培训：', options: [
        { text: '喜欢教导他人，分享知识', score: { social: 2 } },
        { text: '不太享受教学的过程', score: { social: 0 } },
      ]},
      { id: 11, text: '对投资和理财的兴趣：', options: [
        { text: '研究投资策略让我兴奋', score: { finance: 2 } },
        { text: '理财只是生活必需，不算兴趣', score: { finance: 0 } },
      ]},
      { id: 12, text: '对于可持续性和绿色能源：', options: [
        { text: '这是未来的方向，我想参与其中', score: { nature: 2 } },
        { text: '关注但不是我的职业选择', score: { nature: 0 } },
      ]},
    ],
    calculateResult(scores) {
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const fields = {
        tech: { name: '技术科技领域', desc: '软件开发、人工智能、网络安全、产品管理', careers: ['软件工程师', 'AI研究员', '产品经理', '网络安全专家'] },
        biz: { name: '商业管理领域', desc: '企业战略、创业管理、市场营销、咨询顾问', careers: ['企业管理者', '创业者', '市场总监', '管理顾问'] },
        creative: { name: '创意艺术领域', desc: '设计、写作、媒体制作、品牌创意', careers: ['设计师', '内容创作者', '品牌总监', '影视制作人'] },
        social: { name: '社会服务领域', desc: '教育、医疗健康、心理咨询、公益事业', careers: ['教师', '心理咨询师', '医生', '公益机构负责人'] },
        nature: { name: '自然探索领域', desc: '环境保护、农业科技、地理勘探、可持续发展', careers: ['环境科学家', '农业研究员', '地质勘探师', '可持续发展顾问'] },
        finance: { name: '金融数据领域', desc: '投资分析、风险管理、数据科学、财务规划', careers: ['投资分析师', '数据科学家', '财务顾问', '风险管理师'] },
      };
      return { topFields: sorted.slice(0, 3).map(s => ({ key: s[0], ...fields[s[0]], score: s[1] })), scores };
    }
  },
  {
    id: 'career-values',
    name: '职业价值观测评',
    category: 'career',
    icon: '⚖️',
    color: '#ef4444',
    description: '探索你对工作的核心价值观取向，了解什么对你最重要——是成就、独立、安全，还是服务他人。',
    timeEstimate: '约8分钟',
    questionsCount: 12,
    dimensions: ['成就导向', '独立自主', '安全稳定', '社会贡献', '工作生活平衡', '创新创造'],
    questions: [
      { id: 1, text: '工作中什么最重要？', options: [
        { text: '获得认可和成就，不断晋升', score: { achievement: 2 } },
        { text: '工作和生活的平衡，有充足的个人时间', score: { balance: 2 } },
      ]},
      { id: 2, text: '对于工作方式的偏好：', options: [
        { text: '自由职业或远程办公，掌控自己的时间', score: { autonomy: 2 } },
        { text: '稳定的单位，明确的职业发展路径', score: { stability: 2 } },
      ]},
      { id: 3, text: '工作的意义在于：', options: [
        { text: '通过工作为世界带来积极改变', score: { contribution: 2 } },
        { text: '从事富有创造性的工作', score: { creativity: 2 } },
      ]},
      { id: 4, text: '对于工作安全感：', options: [
        { text: '稳定有保障的工作是最好的选择', score: { stability: 2 } },
        { text: '不害怕变化，更看重成长机会', score: { achievement: 2 } },
      ]},
      { id: 5, text: '理想的上下级关系：', options: [
        { text: '给我自主权，不过多干涉', score: { autonomy: 2 } },
        { text: '有明确指导和支持，让我有方向感', score: { stability: 2 } },
      ]},
      { id: 6, text: '对于工作中获得的东西：', options: [
        { text: '高薪和优厚福利是最重要的', score: { achievement: 2 } },
        { text: '个人成长和技能提升更重要', score: { creativity: 2 } },
      ]},
      { id: 7, text: '关于工作对社会的价值：', options: [
        { text: '希望工作对社会有积极影响', score: { contribution: 2 } },
        { text: '工作就是工作，社会价值不是首要考量', score: { achievement: 2 } },
      ]},
      { id: 8, text: '关于工作时间的期望：', options: [
        { text: '弹性工作时间很重要，我需要自由支配时间', score: { balance: 2 } },
        { text: '只要给够工资，加班也没关系', score: { achievement: 2 } },
      ]},
      { id: 9, text: '对于新事物的态度：', options: [
        { text: '喜欢不断尝试新领域，学习新技能', score: { creativity: 2 } },
        { text: '深耕一个领域，成为专家', score: { stability: 2 } },
      ]},
      { id: 10, text: '关于职业决策：', options: [
        { text: '自己做主，不依赖他人的意见', score: { autonomy: 2 } },
        { text: '会综合考虑家人和朋友的建议', score: { contribution: 2 } },
      ]},
      { id: 11, text: '对于工作满足感的来源：', options: [
        { text: '看到自己的劳动帮助了他人', score: { contribution: 2 } },
        { text: '完成了一个有创意的项目', score: { creativity: 2 } },
      ]},
      { id: 12, text: '对于职业风险的态度：', options: [
        { text: '愿意承担风险去追求更好的机会', score: { autonomy: 2 } },
        { text: '安全第一，不轻易冒险换工作', score: { stability: 2 } },
      ]},
    ],
    calculateResult(scores) {
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const values = {
        achievement: { name: '成就导向', icon: '🏆', desc: '追求事业成功和职业发展，希望获得认可和地位。适合竞争性行业的领导岗位。' },
        autonomy: { name: '独立自主', icon: '🦅', desc: '重视工作和决策的独立性。适合自由职业者、创业、远程工作者、咨询顾问。' },
        stability: { name: '安全稳定', icon: '🏠', desc: '追求工作稳定和可预见性。适合公务员、大型企业、教育系统、医疗机构。' },
        contribution: { name: '社会贡献', icon: '🌍', desc: '希望工作对社会有积极意义。适合公益、教育、医疗、环保等有使命感的行业。' },
        balance: { name: '工作生活平衡', icon: '⚖️', desc: '追求工作与生活的和谐。适合弹性工作制、远程办公、教育、咨询等领域。' },
        creativity: { name: '创新创造', icon: '✨', desc: '渴望创新和创造性表达。适合设计、研发、艺术、内容创作、科技创业。' },
      };
      return { topValues: sorted.map(s => ({ key: s[0], ...values[s[0]], score: s[1] })), scores };
    }
  },
  {
    id: 'career-skills',
    name: '职业技能倾向测评',
    category: 'career',
    icon: '🛠️',
    color: '#06b6d4',
    description: '评估你的核心职业技能倾向，了解你的能力优势在哪里，帮助你在职业发展上做出更明智的选择。',
    timeEstimate: '约10分钟',
    questionsCount: 12,
    dimensions: ['分析推理', '沟通表达', '组织管理', '技术操作', '创意设计', '人际协作'],
    questions: [
      { id: 1, text: '面对复杂问题时，你：', options: [
        { text: '擅长逻辑分析，分解问题找到症结', score: { analytical: 2 } },
        { text: '更倾向于和同事讨论，集思广益', score: { interpersonal: 2 } },
      ]},
      { id: 2, text: '在公开演讲方面：', options: [
        { text: '不怯场，能清晰有力表达观点', score: { communication: 2 } },
        { text: '不太擅长，需要充分准备才能上台', score: { analytical: 2 } },
      ]},
      { id: 3, text: '协调和管理多人项目时：', options: [
        { text: '善于分工和调动每个人的积极性', score: { management: 2 } },
        { text: '更喜欢专注于自己的任务部分', score: { technical: 2 } },
      ]},
      { id: 4, text: '对于学习新软件或工具：', options: [
        { text: '上手很快，喜欢钻研技术细节', score: { technical: 2 } },
        { text: '够用就行，不是技术控', score: { interpersonal: 2 } },
      ]},
      { id: 5, text: '在创意脑暴会议中：', options: [
        { text: '思路泉涌，经常贡献创新的想法', score: { design: 2 } },
        { text: '更多评估想法的可行性而不是提出想法', score: { analytical: 2 } },
      ]},
      { id: 6, text: '处理团队内部冲突时：', options: [
        { text: '能有效调解，找到各方满意的方案', score: { interpersonal: 2 } },
        { text: '不擅长处理情绪化的问题', score: { technical: 2 } },
      ]},
      { id: 7, text: '在做数据分析和报表时：', options: [
        { text: '做得又快又好，能发现数据规律', score: { analytical: 2 } },
        { text: '觉得无聊，更喜欢沟通型的工作', score: { communication: 2 } },
      ]},
      { id: 8, text: '对于文字和文档的驾驭能力：', options: [
        { text: '写报告和邮件是我的强项', score: { communication: 2 } },
        { text: '写文档让我头疼', score: { design: 2 } },
      ]},
      { id: 9, text: '在制定工作计划方面：', options: [
        { text: '擅长制定详细可行的计划并追踪', score: { management: 2 } },
        { text: '计划赶不上变化，随性一点更好', score: { design: 2 } },
      ]},
      { id: 10, text: '对于设计和审美：', options: [
        { text: '对视觉呈现有要求，有一定的设计感', score: { design: 2 } },
        { text: '功能比外观重要', score: { technical: 2 } },
      ]},
      { id: 11, text: '对于团队合作的看法：', options: [
        { text: '合作是成功的基石，喜欢团队作战', score: { interpersonal: 2 } },
        { text: '独立工作更高效', score: { management: 2 } },
      ]},
      { id: 12, text: '对于技术问题解决：', options: [
        { text: '喜欢拆解和研究技术的底层原理', score: { technical: 2 } },
        { text: '关注技术解决的业务问题而非技术本身', score: { communication: 2 } },
      ]},
    ],
    calculateResult(scores) {
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const skills = {
        analytical: { name: '分析推理能力', icon: '🧮', desc: '擅长逻辑分析、数据解读和问题解决。适合：数据分析、研究、咨询、编程、金融分析。', topCareers: ['数据分析师', '研究员', '战略顾问', '软件工程师'] },
        communication: { name: '沟通表达能力', icon: '📣', desc: '善于口头和书面表达，能有效传递信息。适合：公关、市场、教育、新闻、销售。', topCareers: ['公关经理', '市场总监', '记者', '培训师'] },
        management: { name: '组织管理能力', icon: '📋', desc: '擅长协调资源、制定计划和带领团队。适合：项目管理、运营管理、行政管理。', topCareers: ['项目经理', '运营总监', '人力资源经理', '行政总监'] },
        technical: { name: '技术操作能力', icon: '🔩', desc: '动手能力强，善于操作设备和解决技术问题。适合：工程师、技术专家、运维、制造。', topCareers: ['软件工程师', '硬件工程师', '系统运维', '技术顾问'] },
        design: { name: '创意设计能力', icon: '🎭', desc: '富有创造力和审美能力，善于创新表达。适合：设计师、产品经理、内容创作、广告创意。', topCareers: ['UX设计师', '产品经理', '创意总监', '视频制作人'] },
        interpersonal: { name: '人际协作能力', icon: '🤗', desc: '善于理解和共情他人，能建立良好的合作关系。适合：心理咨询、护理、客服、社区工作。', topCareers: ['心理咨询师', '客户成功经理', '社区运营', '护理主任'] },
      };
      return { topSkills: sorted.map(s => ({ key: s[0], ...skills[s[0]], score: s[1] })), scores };
    }
  },
];

// 获取测评列表
export const getPersonalityAssessments = () => assessments.filter(a => a.category === 'personality');
export const getCareerAssessments = () => assessments.filter(a => a.category === 'career');
export const getAssessmentById = (id) => assessments.find(a => a.id === id);

// 关系图谱数据
export const assessmentRelations = {
  nodes: [
    { id: 'mbti', name: 'MBTI', category: 'personality' },
    { id: 'enneagram', name: '九型人格', category: 'personality' },
    { id: 'bigfive', name: '大五人格', category: 'personality' },
    { id: 'disc', name: 'DISC', category: 'personality' },
    { id: 'holland', name: '霍兰德', category: 'personality' },
    { id: 'career-interest', name: '职业兴趣', category: 'career' },
    { id: 'career-values', name: '职业价值观', category: 'career' },
    { id: 'career-skills', name: '职业技能', category: 'career' },
  ],
  links: [
    { source: 'mbti', target: 'enneagram', relation: '人格维度互补: MBTI的认知功能与九型人格的核心动机相互补充' },
    { source: 'mbti', target: 'bigfive', relation: '维度高度相关: E/I↔外向性, T/F↔宜人性, J/P↔尽责性' },
    { source: 'mbti', target: 'disc', relation: '行为风格映射: E/I与D/I维度, T/F与C/S维度存在对应关系' },
    { source: 'mbti', target: 'holland', relation: '兴趣与性格相关: 如NT型更倾向研究型, NF型更倾向社会型' },
    { source: 'enneagram', target: 'bigfive', relation: '动机与特质关联: 如2号与宜人性正相关, 8号与外向性正相关' },
    { source: 'enneagram', target: 'disc', relation: '核心动力匹配: 3号对应D型, 2号对应I型, 9号对应S型' },
    { source: 'bigfive', target: 'disc', relation: '特质对应行为: 高外向性→I型, 高尽责性→C型' },
    { source: 'bigfive', target: 'holland', relation: '开放性→艺术型/研究型, 外向性→社会型/企业型' },
    { source: 'holland', target: 'career-interest', relation: '兴趣类型直接对应职业领域选择' },
    { source: 'holland', target: 'career-values', relation: '兴趣类型影响职业价值观取向' },
    { source: 'holland', target: 'career-skills', relation: '兴趣类型与技能倾向有显著关联' },
    { source: 'career-interest', target: 'career-values', relation: '职业兴趣驱动价值观，价值观反过来影响兴趣' },
    { source: 'career-interest', target: 'career-skills', relation: '兴趣所在通常是技能优势的体现' },
    { source: 'career-values', target: 'career-skills', relation: '价值观决定技能发展方向' },
    { source: 'disc', target: 'career-interest', relation: '行为风格预测职业兴趣偏好' },
    { source: 'mbti', target: 'career-interest', relation: 'MBTI类型与职业兴趣领域高度对应' },
  ],
};
