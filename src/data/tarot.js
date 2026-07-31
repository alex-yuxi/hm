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

// ==================== 塔罗牌牌库 ====================

// 大阿尔卡那（22张）
const majorArcana = [
  { num: 0, name: '愚者', en: 'The Fool', upright: '新的开始、自由、纯真、冒险、无限可能', reversed: '鲁莽、犹豫、拖延、风险失控、逃避' },
  { num: 1, name: '魔术师', en: 'The Magician', upright: '创造力、行动力、资源运用、显化、自信', reversed: '欺骗、能力不足、错失良机、自我怀疑' },
  { num: 2, name: '女祭司', en: 'The High Priestess', upright: '直觉、潜意识、内在智慧、神秘、沉默', reversed: '忽视直觉、秘密、压抑、困惑' },
  { num: 3, name: '皇后', en: 'The Empress', upright: '丰盛、母性、创造力、滋养、感官享受', reversed: '依赖、停滞、空虚、创造力枯竭' },
  { num: 4, name: '皇帝', en: 'The Emperor', upright: '权威、秩序、掌控、稳定、领导力', reversed: '专制、僵化、失控、滥权' },
  { num: 5, name: '教皇', en: 'The Hierophant', upright: '传统、信仰、指引、规训、精神传承', reversed: '叛逆、墨守成规、教条、迷失方向' },
  { num: 6, name: '恋人', en: 'The Lovers', upright: '爱情、结合、选择、价值观一致、和谐', reversed: '失衡、分歧、诱惑、错误选择' },
  { num: 7, name: '战车', en: 'The Chariot', upright: '胜利、意志、前进、控制、突破', reversed: '失控、受阻、方向迷失、内耗' },
  { num: 8, name: '力量', en: 'Strength', upright: '勇气、耐心、内在力量、温柔的坚持', reversed: '自我怀疑、软弱、暴躁、无力感' },
  { num: 9, name: '隐士', en: 'The Hermit', upright: '内省、独处、智慧、寻求真理、指引', reversed: '孤立、逃避、固执、迷失' },
  { num: 10, name: '命运之轮', en: 'Wheel of Fortune', upright: '转机、命运、循环、机遇、无常', reversed: '低谷、坏运气、停滞、失控的变化' },
  { num: 11, name: '正义', en: 'Justice', upright: '公正、因果、真相、平衡、责任', reversed: '偏见、不公、逃避责任、失衡' },
  { num: 12, name: '倒吊人', en: 'The Hanged Man', upright: '暂停、换位思考、牺牲、顿悟', reversed: '拖延、无谓牺牲、固执、停滞' },
  { num: 13, name: '死神', en: 'Death', upright: '结束、蜕变、重生、放下、转化', reversed: '抗拒改变、停滞、恐惧、无法释怀' },
  { num: 14, name: '节制', en: 'Temperance', upright: '平衡、调和、耐心、中庸、疗愈', reversed: '失衡、极端、冲突、过度' },
  { num: 15, name: '恶魔', en: 'The Devil', upright: '束缚、欲望、执念、物质依赖、阴影', reversed: '挣脱、觉醒、放下执念、解放' },
  { num: 16, name: '高塔', en: 'The Tower', upright: '突变、崩塌、觉醒、冲击、真相揭露', reversed: '延缓的灾难、内在崩塌、抗拒改变' },
  { num: 17, name: '星星', en: 'The Star', upright: '希望、疗愈、信念、灵感、宁静', reversed: '失望、迷茫、信心不足、枯竭' },
  { num: 18, name: '月亮', en: 'The Moon', upright: '潜意识、幻象、不安、直觉、未知', reversed: '迷雾散去、释放恐惧、澄清、误解' },
  { num: 19, name: '太阳', en: 'The Sun', upright: '喜悦、成功、活力、光明、坦诚', reversed: '短暂阴霾、过度乐观、延迟的成就' },
  { num: 20, name: '审判', en: 'Judgement', upright: '觉醒、清算、重生、召唤、宽恕', reversed: '自我否定、悔恨、拒绝觉醒、拖延' },
  { num: 21, name: '世界', en: 'The World', upright: '圆满、完成、整合、达成、旅行', reversed: '未完成、延迟、缺憾、停滞' },
];

// 小阿尔卡那花色（4种，各14张：Ace-10 + 侍从、骑士、王后、国王）
const suits = [
  { key: 'cups', name: '圣杯', element: '水', domain: '情感、爱情、关系、直觉' },
  { key: 'pentacles', name: '星币', element: '土', domain: '物质、财富、事业、现实' },
  { key: 'swords', name: '宝剑', element: '风', domain: '思维、冲突、沟通、理性' },
  { key: 'wands', name: '权杖', element: '火', domain: '行动、热情、创造、能量' },
];

const rankNames = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', '侍从', '骑士', '王后', '国王'];
const rankMeanings = {
  'Ace': { upright: '起源、潜力、新机会', reversed: '延迟的开始、未实现的潜力' },
  '2': { upright: '抉择、平衡、合作', reversed: '犹豫、失衡、冲突' },
  '3': { upright: '成长、基础、协作成果', reversed: '拖延、基础不稳、分歧' },
  '4': { upright: '稳定、巩固、秩序', reversed: '僵化、停滞、固守' },
  '5': { upright: '挑战、失落、变动', reversed: '恢复、从低谷反弹' },
  '6': { upright: '和谐、平静、解决', reversed: '过渡、未解决的紧张' },
  '7': { upright: '评估、坚持、突破', reversed: '耗尽、放弃、混乱' },
  '8': { upright: '行动、速度、掌控', reversed: '失控、混乱、缺乏方向' },
  '9': { upright: '接近圆满、准备、力量', reversed: '焦虑、过度防备、临近失败' },
  '10': { upright: '完成、顶峰、结局', reversed: '重负、无法承受的结局' },
  '侍从': { upright: '学习、消息、初探', reversed: '分心、 immature、误传' },
  '骑士': { upright: '行动、推进、热情', reversed: '鲁莽、延迟、急躁' },
  '王后': { upright: '成熟、滋养、直觉掌控', reversed: '过度情绪、冷漠、失衡' },
  '国王': { upright: '权威、掌控、成果', reversed: '专制、固执、滥用权力' },
};

const minorArcana = [];
suits.forEach(suit => {
  rankNames.forEach(rank => {
    const base = rankMeanings[rank];
    minorArcana.push({
      suit: suit.key,
      suitName: suit.name,
      element: suit.element,
      domain: suit.domain,
      rank,
      name: `${suit.name}${rank}`,
      en: `${suit.name} ${rank}`,
      upright: `${base.upright}（${suit.domain}）`,
      reversed: `${base.reversed}（${suit.domain}）`,
    });
  });
});

export const TAROT_DECK = [...majorArcana, ...minorArcana];

// ==================== 占卜阵法（主流的多种实现方式） ====================

export const tarotSpreads = [
  {
    id: 'single',
    name: '单张牌占卜',
    icon: '🃏',
    desc: '抽取一张牌，快速获得当日指引或针对某一问题的核心答案。',
    positions: [{ key: 'focus', label: '核心指引' }],
  },
  {
    id: 'three-card',
    name: '三张牌阵（过去·现在·未来）',
    icon: '🔮',
    desc: '最经典的牌阵，从时间线审视问题的来龙去脉与发展方向。',
    positions: [
      { key: 'past', label: '过去' },
      { key: 'present', label: '现在' },
      { key: 'future', label: '未来' },
    ],
  },
  {
    id: 'celtic-cross',
    name: '凯尔特十字阵',
    icon: '✝️',
    desc: '最完整深入的11牌阵，全面剖析问题的现状、挑战、过去、未来与结果。',
    positions: [
      { key: 'present', label: '现状' },
      { key: 'challenge', label: '挑战' },
      { key: 'past', label: '过去' },
      { key: 'future', label: '未来' },
      { key: 'goal', label: '目标/意识' },
      { key: 'subconscious', label: '潜意识' },
      { key: 'advice', label: '建议' },
      { key: 'external', label: '外部环境' },
      { key: 'hope', label: '希望与恐惧' },
      { key: 'outcome', label: '最终结果' },
    ],
  },
  {
    id: 'love',
    name: '感情关系阵',
    icon: '💞',
    desc: '专门针对感情与人际关系的5牌阵，透视双方状态与关系走向。',
    positions: [
      { key: 'self', label: '你的状态' },
      { key: 'other', label: '对方的状态' },
      { key: 'connection', label: '关系纽带' },
      { key: 'challenge', label: '关系挑战' },
      { key: 'future', label: '关系走向' },
    ],
  },
  {
    id: 'decision',
    name: '抉择阵（A或B）',
    icon: '⚖️',
    desc: '面临两难选择时，对比两个选项各自的能量与可能结果。',
    positions: [
      { key: 'optionA', label: '选择 A' },
      { key: 'A_result', label: 'A 的结果' },
      { key: 'optionB', label: '选择 B' },
      { key: 'B_result', label: 'B 的结果' },
      { key: 'advice', label: '综合建议' },
    ],
  },
  {
    id: 'year',
    name: '年度展望阵',
    icon: '📅',
    desc: '12张牌对应一年12个月，俯瞰整年的能量流动与主题。',
    positions: Array.from({ length: 12 }, (_, i) => ({ key: `m${i + 1}`, label: `${i + 1}月` })),
  },
];

export const getSpreadById = (id) => tarotSpreads.find(s => s.id === id);

// ==================== 占卜目的 ====================

export const divinationPurposes = [
  { id: 'love', name: '感情与关系', icon: '💞', prompt: '关于感情、亲密关系或人际连接' },
  { id: 'career', name: '事业与学业', icon: '💼', prompt: '关于职业发展、工作选择或学业方向' },
  { id: 'wealth', name: '财富与机遇', icon: '💰', prompt: '关于财务、投资或人生机遇' },
  { id: 'health', name: '健康与身心', icon: '🌿', prompt: '关于身体、情绪与身心平衡' },
  { id: 'growth', name: '自我成长', icon: '🌱', prompt: '关于内在探索、成长与觉醒' },
  { id: 'decision', name: '重要抉择', icon: '🧭', prompt: '关于眼前需要做出的重要决定' },
  { id: 'general', name: '综合指引', icon: '✨', prompt: '关于近期整体运势与生活指引' },
];

export const getPurposeById = (id) => divinationPurposes.find(p => p.id === id);

// ==================== 抽牌逻辑 ====================

// 洗牌并抽取 n 张牌（支持正逆位）
export function drawCards(count) {
  const deck = [...TAROT_DECK];
  // Fisher-Yates 洗牌
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const drawn = deck.slice(0, count);
  return drawn.map(card => ({
    ...card,
    reversed: Math.random() < 0.4, // 约40%概率逆位
  }));
}

// ==================== 生成解读文本 ====================

function cardReading(card, purpose) {
  const orientation = card.reversed ? '逆位' : '正位';
  const meaning = card.reversed ? card.reversed : card.upright;
  let interpretation = meaning;
  // 根据目的补充视角
  const purposeNote = {
    love: '在感情与关系层面，',
    career: '在事业与学业层面，',
    wealth: '在财富与机遇层面，',
    health: '在健康与身心层面，',
    growth: '在自我成长层面，',
    decision: '在面临抉择时，',
    general: '',
  }[purpose] || '';
  return {
    orientation,
    meaning,
    interpretation: `${purposeNote}${interpretation}。`,
  };
}

export function buildReading(spread, cards, purposeId) {
  const purpose = getPurposeById(purposeId);
  const positions = spread.positions;
  const cardsWithMeaning = cards.map((card, idx) => ({
    ...card,
    ...cardReading(card, purposeId),
    position: positions[idx] ? positions[idx].label : `第${idx + 1}张`,
    positionKey: positions[idx] ? positions[idx].key : `pos${idx}`,
  }));

  // 综合总结
  const uprightCount = cardsWithMeaning.filter(c => !c.reversed).length;
  const reversedCount = cardsWithMeaning.length - uprightCount;
  let summary = '';
  if (purpose) {
    summary += `本次占卜聚焦于「${purpose.name}」${purpose.prompt}。\n`;
  }
  summary += `共抽到 ${cardsWithMeaning.length} 张牌，其中正位 ${uprightCount} 张、逆位 ${reversedCount} 张。`;
  if (uprightCount >= reversedCount) {
    summary += '整体能量偏向积极、顺畅，当前趋势对你较为有利，把握当下的机遇。';
  } else {
    summary += '逆位牌偏多，提示你需要关注内在卡点与阻碍，适当放慢节奏、反思调整会更稳妥。';
  }

  return {
    spreadId: spread.id,
    spreadName: spread.name,
    purposeId,
    purposeName: purpose ? purpose.name : '综合指引',
    cards: cardsWithMeaning,
    summary,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('zh-CN'),
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  };
}
