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

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAssessmentById } from '../data/assessments';
import { getAssessmentHistory } from '../utils/storage';

export default function AssessmentResult() {
  const { id, recordId } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const assessment = getAssessmentById(id);

  useEffect(() => {
    if (assessment) {
      const history = getAssessmentHistory(id);
      const found = history.find(r => r.id === recordId);
      setRecord(found || (history.length > 0 ? history[history.length - 1] : null));
    }
    setLoading(false);
  }, [id, recordId]);

  if (loading) return <div className="page-container"><p>加载中...</p></div>;
  if (!assessment || !record) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>结果未找到</h2>
          <Link to="/" className="btn-primary">返回首页</Link>
        </div>
      </div>
    );
  }

  const { result } = record;

  // MBTI 结果渲染
  const renderMBTI = () => {
    const labels = {
      'E': '外向 Extraversion', 'I': '内向 Introversion',
      'S': '实感 Sensing', 'N': '直觉 Intuition',
      'T': '思考 Thinking', 'F': '情感 Feeling',
      'J': '判断 Judging', 'P': '感知 Perceiving',
    };
    return (
      <div>
        <div className="result-hero" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          <span className="result-type-badge">{result.type}</span>
          <p className="result-type-desc">{result.description}</p>
        </div>
        <div className="result-dimensions">
          {['EI', 'SN', 'TF', 'JP'].map(pair => {
            const left = result.scores[pair[0]] || 0;
            const right = result.scores[pair[1]] || 0;
            const max = Math.max(left, right);
            const leftPct = max > 0 ? Math.round(left / max * 100) : 50;
            const rightPct = max > 0 ? Math.round(right / max * 100) : 50;
            return (
              <div key={pair} className="dim-bar-row">
                <span className={`dim-label ${result.type.includes(pair[0]) ? 'active' : ''}`}>
                  {pair[0]} ({labels[pair[0]]})
                </span>
                <div className="dim-bar-track">
                  <div className="dim-bar-left" style={{ width: `${leftPct}%` }} />
                  <div className="dim-bar-right" style={{ width: `${rightPct}%` }} />
                  <div className="dim-bar-divider" />
                </div>
                <span className={`dim-label right ${result.type.includes(pair[1]) ? 'active' : ''}`}>
                  ({labels[pair[1]]}) {pair[1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 九型人格结果渲染
  const renderEnneagram = () => {
    const typeNames = { 1: '完美型', 2: '助人型', 3: '成就型', 4: '自我型', 5: '理智型', 6: '忠诚型', 7: '活跃型', 8: '领袖型', 9: '和平型' };
    const max = Math.max(...Object.values(result.scores));
    return (
      <div>
        <div className="result-hero" style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>
          <span className="result-type-badge">{result.primaryType}号 - {typeNames[result.primaryType]}</span>
          <p className="result-type-desc">{result.description}</p>
        </div>
        <div className="enneagram-chart">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(t => {
            const score = result.scores['Type' + t] || 0;
            const pct = (score / max) * 100;
            return (
              <div key={t} className="enneagram-bar-row">
                <span className="enneagram-label">{t}号</span>
                <div className="enneagram-bar-track">
                  <div
                    className="enneagram-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: result.primaryType === String(t) ? '#ec4899' : '#cbd5e1',
                    }}
                  />
                </div>
                <span className="enneagram-score">{score}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 大五人格结果
  const renderBigFive = () => (
    <div>
      <div className="result-hero" style={{ background: 'linear-gradient(135deg, #8b5cf6, #a855f7)' }}>
        <span className="result-type-badge">OCEAN 模型</span>
        <p className="result-type-desc">你的五大人格特质分布</p>
      </div>
      <div className="bigfive-grid">
        {result.result.map(dim => (
          <div key={dim.dimension} className="bigfive-card">
            <div className="bigfive-header">
              <span className="bigfive-name">{dim.dimension}</span>
              <span className={`bigfive-level ${dim.level === 'high' ? 'high' : 'low'}`}>
                {dim.level === 'high' ? '↑ 偏高' : '↓ 偏低'}
              </span>
            </div>
            <p className="bigfive-desc">{dim.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // DISC结果
  const renderDISC = () => {
    const max = Math.max(...Object.values(result.scores));
    return (
      <div>
        <div className="result-hero" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
          <span className="result-type-badge">{result.primaryType.emoji} {result.primaryType.name}</span>
          <p className="result-type-desc">{result.primaryType.desc}</p>
        </div>
        <div className="disc-grid">
          {['D', 'I', 'S', 'C'].map(t => {
            const pct = Math.round((result.scores[t] || 0) / max * 100);
            return (
              <div key={t} className={`disc-card ${result.scores[t] === max ? 'primary' : ''}`}>
                <div className="disc-circle" style={{ '--pct': `${pct}%`, '--color': result.scores[t] === max ? '#f59e0b' : '#cbd5e1' }}>
                  <span className="disc-letter">{t}</span>
                  <span className="disc-score">{result.scores[t] || 0}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 霍兰德结果
  const renderHolland = () => {
    const max = Math.max(...Object.values(result.scores));
    return (
      <div>
        <div className="result-hero" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <span className="result-type-badge">{result.topTypes[0].code}型</span>
          <p className="result-type-desc">{result.topTypes[0].desc}</p>
        </div>
        <div className="holland-list">
          {result.topTypes.map((type, i) => {
            const pct = Math.round((type.score / max) * 100);
            return (
              <div key={type.code} className="holland-item" style={{ '--rank': i }}>
                <span className="holland-icon">{type.icon}</span>
                <div className="holland-info">
                  <div className="holland-name">{type.name}</div>
                  <div className="holland-desc">{type.desc}</div>
                </div>
                <div className="holland-bar" style={{ width: `${pct}%`, background: i === 0 ? '#10b981' : '#d1fae5' }} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 职业测评通用渲染
  const renderCareerResult = () => {
    const items = result.topFields || result.topValues || result.topSkills || [];
    const max = Math.max(...(items.map(i => i.score) || [1]));
    return (
      <div>
        <div className="result-hero" style={{ background: `linear-gradient(135deg, ${assessment.color}, ${assessment.color}dd)` }}>
          <span className="result-type-badge">{items[0]?.name || '分析完成'}</span>
          <p className="result-type-desc">{items[0]?.desc || ''}</p>
        </div>
        <div className="career-result-list">
          {items.map((item, i) => (
            <div key={i} className="career-result-item">
              <div className="career-result-rank">{i + 1}</div>
              <div className="career-result-info">
                <h4>{item.name}</h4>
                <p>{item.desc.split('。')[0]}</p>
                {item.careers && (
                  <div className="career-tags">
                    {item.careers.map((c, ci) => <span key={ci} className="career-tag">{c}</span>)}
                  </div>
                )}
                {item.topCareers && (
                  <div className="career-tags">
                    {item.topCareers.map((c, ci) => <span key={ci} className="career-tag">{c}</span>)}
                  </div>
                )}
              </div>
              <div className="career-result-score" style={{ background: assessment.color }}>
                {item.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderers = {
    mbti: renderMBTI,
    enneagram: renderEnneagram,
    bigfive: renderBigFive,
    disc: renderDISC,
    holland: renderHolland,
  };

  const renderResult = renderers[id] || renderCareerResult;

  return (
    <div className="page-container result-page">
      <div className="result-breadcrumb">
        <Link to="/">首页</Link> <span>/</span> <Link to={`/assessment/${id}`}>{assessment.name}</Link> <span>/</span> <span>测评结果</span>
      </div>

      {renderResult()}

      <div className="result-meta">
        <span>📅 测评时间：{record.date} {record.time}</span>
      </div>

      <div className="result-actions">
        <Link to={`/assessment/${id}`} className="btn-outline">重新测评</Link>
        <Link to="/analysis" className="btn-primary">查看综合分析</Link>
      </div>
    </div>
  );
}
