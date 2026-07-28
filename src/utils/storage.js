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
  return true;
}
