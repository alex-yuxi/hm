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

// ==================== 本地存储工具 ====================

const STORAGE_PREFIX = 'hm_assessment_';

// 保存测评记录
export function saveAssessmentRecord(assessmentId, result) {
  const records = getAssessmentHistory(assessmentId);
  const record = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    assessmentId,
    result,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('zh-CN'),
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  };
  records.push(record);
  localStorage.setItem(`${STORAGE_PREFIX}${assessmentId}`, JSON.stringify(records));

  // 同时更新全局记录
  const allRecords = getAllRecords();
  allRecords.push(record);
  localStorage.setItem(`${STORAGE_PREFIX}all`, JSON.stringify(allRecords));

  return record;
}

// 获取某个测评的历史记录
export function getAssessmentHistory(assessmentId) {
  const data = localStorage.getItem(`${STORAGE_PREFIX}${assessmentId}`);
  return data ? JSON.parse(data) : [];
}

// 获取所有测评记录
export function getAllRecords() {
  const data = localStorage.getItem(`${STORAGE_PREFIX}all`);
  return data ? JSON.parse(data) : [];
}

// 获取某个测评的最新结果
export function getLatestResult(assessmentId) {
  const records = getAssessmentHistory(assessmentId);
  return records.length > 0 ? records[records.length - 1] : null;
}

// 获取所有已完成测评的最新结果
export function getLatestResults() {
  const all = getAllRecords();
  const map = {};
  for (const r of all) {
    if (!map[r.assessmentId] || new Date(r.timestamp) > new Date(map[r.assessmentId].timestamp)) {
      map[r.assessmentId] = r;
    }
  }
  return Object.values(map);
}

// 删除某条记录
export function deleteRecord(assessmentId, recordId) {
  const records = getAssessmentHistory(assessmentId).filter(r => r.id !== recordId);
  localStorage.setItem(`${STORAGE_PREFIX}${assessmentId}`, JSON.stringify(records));

  const all = getAllRecords().filter(r => r.id !== recordId);
  localStorage.setItem(`${STORAGE_PREFIX}all`, JSON.stringify(all));
}

// 清空所有记录
export function clearAllRecords() {
  const all = getAllRecords();
  const ids = new Set(all.map(r => r.assessmentId));
  ids.forEach(id => localStorage.removeItem(`${STORAGE_PREFIX}${id}`));
  localStorage.removeItem(`${STORAGE_PREFIX}all`);
}

// 导出数据
export function exportData() {
  return {
    records: getAllRecords(),
    exportTime: new Date().toISOString(),
  };
}

// 导入数据
export function importData(data) {
  if (!data.records || !Array.isArray(data.records)) return false;
  clearAllRecords();
  const byAssessment = {};
  data.records.forEach(r => {
    if (!byAssessment[r.assessmentId]) byAssessment[r.assessmentId] = [];
    byAssessment[r.assessmentId].push(r);
  });
  Object.entries(byAssessment).forEach(([id, records]) => {
    localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(records));
  });
  localStorage.setItem(`${STORAGE_PREFIX}all`, JSON.stringify(data.records));
  if (data.tarotReadings && Array.isArray(data.tarotReadings)) {
    localStorage.setItem(`${STORAGE_PREFIX}tarot`, JSON.stringify(data.tarotReadings));
  }
  return true;
}

// ==================== 塔罗牌占卜记录 ====================

const TAROT_KEY = `${STORAGE_PREFIX}tarot`;

// 保存一次占卜记录
export function saveTarotReading(reading) {
  const records = getTarotReadings();
  const record = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    ...reading,
  };
  records.push(record);
  localStorage.setItem(TAROT_KEY, JSON.stringify(records));

  // 同步进入全局记录（与测评记录共用历史列表）
  const allRecords = getAllRecords();
  allRecords.push({
    id: record.id,
    assessmentId: 'tarot',
    isTarot: true,
    type: record.spreadName,
    result: {
      isTarot: true,
      spreadName: record.spreadName,
      purposeName: record.purposeName,
      cards: record.cards,
    },
    timestamp: record.timestamp,
    date: record.date,
    time: record.time,
  });
  localStorage.setItem(`${STORAGE_PREFIX}all`, JSON.stringify(allRecords));
  return record;
}

// 获取所有塔罗占卜记录
export function getTarotReadings() {
  const data = localStorage.getItem(TAROT_KEY);
  return data ? JSON.parse(data) : [];
}

// 按占卜目的筛选
export function getTarotReadingsByPurpose(purposeId) {
  return getTarotReadings().filter(r => r.purposeId === purposeId);
}

// 删除某条占卜记录
export function deleteTarotReading(recordId) {
  const records = getTarotReadings().filter(r => r.id !== recordId);
  localStorage.setItem(TAROT_KEY, JSON.stringify(records));
  const all = getAllRecords().filter(r => r.id !== recordId);
  localStorage.setItem(`${STORAGE_PREFIX}all`, JSON.stringify(all));
}
