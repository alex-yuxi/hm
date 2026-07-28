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

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecords, deleteRecord, clearAllRecords, exportData, importData } from '../utils/storage';
import { getAssessmentById } from '../data/assessments';

export default function HistoryPage() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // list | timeline
  const fileInputRef = useRef(null);

  useEffect(() => {
    refreshRecords();
  }, []);

  function refreshRecords() {
    setRecords(getAllRecords().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }

  function handleDelete(assessmentId, recordId) {
    if (window.confirm('确定要删除这条记录吗？')) {
      deleteRecord(assessmentId, recordId);
      refreshRecords();
    }
  }

  function handleClear() {
    if (window.confirm('确定要清空所有测评记录吗？此操作不可恢复！')) {
      clearAllRecords();
      refreshRecords();
    }
  }

  function handleExport() {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `测评记录_${new Date().toLocaleDateString('zh-CN')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (importData(data)) {
          refreshRecords();
          alert('导入成功！');
        } else {
          alert('导入失败：数据格式不正确');
        }
      } catch {
        alert('导入失败：无法解析文件');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const filtered = filter === 'all' ? records : records.filter(r => {
    const a = getAssessmentById(r.assessmentId);
    return a && a.category === filter;
  });

  // 按日期分组
  const grouped = {};
  filtered.forEach(r => {
    if (!grouped[r.date]) grouped[r.date] = [];
    grouped[r.date].push(r);
  });
  const groupKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  function getResultSummary(record) {
    const r = record.result;
    if (r.type) return r.type;
    if (r.primaryType) return r.primaryType;
    if (r.result?.[0]?.dimension) return r.result.map(d => `${d.dimension}:${d.level === 'high' ? '高' : '低'}`).join(', ');
    if (r.topTypes) return r.topTypes[0].name;
    if (r.topFields) return r.topFields[0].name;
    if (r.topValues) return r.topValues[0].name;
    if (r.topSkills) return r.topSkills[0].name;
    return '查看详情';
  }

  return (
    <div className="page-container history-page">
      <div className="page-header">
        <h1>📋 测评记录</h1>
        <p>回顾历次测评，追踪你的性格与职业倾向变化</p>
      </div>

      <div className="history-toolbar">
        <div className="filter-tabs">
          <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>全部</button>
          <button className={`filter-tab ${filter === 'personality' ? 'active' : ''}`} onClick={() => setFilter('personality')}>性格测评</button>
          <button className={`filter-tab ${filter === 'career' ? 'active' : ''}`} onClick={() => setFilter('career')}>职业测评</button>
        </div>
        <div className="history-actions">
          <button className="btn-sm" onClick={handleExport}>📤 导出</button>
          <button className="btn-sm" onClick={() => fileInputRef.current?.click()}>📥 导入</button>
          {records.length > 0 && (
            <button className="btn-sm danger" onClick={handleClear}>🗑 清空</button>
          )}
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>暂无记录</h3>
          <p>完成测评后，记录将显示在这里</p>
          <Link to="/" className="btn-primary">去测评</Link>
        </div>
      ) : (
        <div className="history-list">
          {groups.map(date => {
            // 个性指标变化
            const dayRecords = grouped[date];
            return (
              <div key={date} className="history-group">
                <div className="history-date">{date}</div>
                {dayRecords.map(record => {
                  const a = getAssessmentById(record.assessmentId);
                  if (!a) return null;
                  return (
                    <div key={record.id} className="history-card">
                      <div className="history-card-left">
                        <span className="h-icon" style={{ background: a.color + '20', color: a.color }}>{a.icon}</span>
                        <div>
                          <Link to={`/result/${record.assessmentId}/${record.id}`} className="h-name">
                            {a.name}
                          </Link>
                          <span className="h-time">{record.time}</span>
                        </div>
                      </div>
                      <div className="history-card-mid">
                        <span className={`h-category ${a.category}`}>{a.category === 'personality' ? '性格' : '职业'}</span>
                        <span className="h-result">{getResultSummary(record)}</span>
                      </div>
                      <div className="history-card-right">
                        <Link to={`/result/${record.assessmentId}/${record.id}`} className="btn-sm">查看</Link>
                        <button className="btn-sm danger-del" onClick={() => handleDelete(record.assessmentId, record.id)}>删除</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
