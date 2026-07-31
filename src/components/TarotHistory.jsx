/*
 * Copyright 2026 alex-yuxi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except with the License.
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTarotReadings, deleteTarotReading } from '../utils/storage';
import { getPurposeById, divinationPurposes } from '../data/tarot';

const PALETTE = ['#7c3aed', '#db2777', '#0891b2', '#ea580c', '#16a34a', '#9333ea'];

export default function TarotHistory() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setRecords(getTarotReadings().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }

  function handleDelete(id) {
    if (window.confirm('确定要删除这条占卜记录吗？此操作不可恢复。')) {
      deleteTarotReading(id);
      refresh();
    }
  }

  const filtered = filter === 'all' ? records : records.filter(r => r.purposeId === filter);

  const grouped = {};
  filtered.forEach(r => {
    if (!grouped[r.date]) grouped[r.date] = [];
    grouped[r.date].push(r);
  });
  const groupKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="page-container tarot-history">
      <div className="page-header">
        <h1>📖 占卜历史</h1>
        <p>回顾每一次的占卜时间、目的、牌面与解读</p>
      </div>

      <div className="history-toolbar">
        <div className="filter-tabs" style={{ flexWrap: 'wrap' }}>
          <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>全部</button>
          {divinationPurposes.map(p => (
            <button key={p.id} className={`filter-tab ${filter === p.id ? 'active' : ''}`} onClick={() => setFilter(p.id)}>{p.icon} {p.name}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔮</div>
          <h3>暂无占卜记录</h3>
          <p>完成一次塔罗占卜后，记录将显示在这里</p>
          <Link to="/tarot" className="btn-primary">去占卜</Link>
        </div>
      ) : (
        <div className="history-list">
          {groupKeys.map(date => (
            <div key={date} className="history-group">
              <div className="history-date">{date}</div>
              {grouped[date].map(r => {
                const purpose = getPurposeById(r.purposeId);
                const isOpen = expanded === r.id;
                return (
                  <div key={r.id} className="tarot-history-card">
                    <div className="th-card-head" onClick={() => setExpanded(isOpen ? null : r.id)}>
                      <div className="th-card-left">
                        <span className="h-icon" style={{ background: '#f3e8ff', color: '#7c3aed' }}>🔮</span>
                        <div>
                          <div className="th-title">
                            {purpose?.icon} {r.purposeName} · {r.spreadName}
                          </div>
                          <span className="h-time">{r.time}</span>
                        </div>
                      </div>
                      <div className="history-card-right">
                        <button className="btn-sm danger-del" onClick={(e) => { e.stopPropagation(); handleDelete(r.id); }}>删除</button>
                        <span className="th-toggle">{isOpen ? '收起 ▲' : '展开 ▼'}</span>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="th-card-body">
                        <div className="th-mini-cards">
                          {r.cards.map((c, i) => (
                            <div key={i} className="th-mini-card" style={{ borderTopColor: PALETTE[i % PALETTE.length] }}>
                              <div className="th-pos">{c.position}</div>
                              <div className="th-name">{c.name}</div>
                              <div className={`th-orient ${c.reversed ? 'rev' : ''}`}>{c.orientation}</div>
                              <div className="th-meaning">{c.meaning}</div>
                            </div>
                          ))}
                        </div>
                        <div className="th-summary">
                          <strong>综合解读：</strong>
                          <p style={{ whiteSpace: 'pre-line' }}>{r.summary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
