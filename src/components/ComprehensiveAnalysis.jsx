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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestResults, getAssessmentHistory } from '../utils/storage';
import { getAssessmentById } from '../data/assessments';
import { comprehensiveCareerAnalysis, analyzeCurrentCareer } from '../data/careerMapping';

function TrendChart({ assessmentId, results }) {
  const history = getAssessmentHistory(assessmentId);
  if (history.length < 2) return null;

  const assessment = getAssessmentById(assessmentId);
  if (!assessment) return null;

  const getScore = (record) => {
    const r = record.result;
    if (r.type) return { label: r.type, value: 1 };
    if (r.primaryType) return { label: r.primaryType, value: Object.values(r.scores || {}).reduce((a, b) => a + b, 0) };
    if (r.topTypes) return { label: r.topTypes[0].code, value: r.topTypes[0].score };
    if (r.topFields) return { label: r.topFields[0].key, value: r.topFields[0].score };
    if (r.topValues) return { label: r.topValues[0].key, value: r.topValues[0].score };
    if (r.topSkills) return { label: r.topSkills[0].key, value: r.topSkills[0].score };
    return { label: 'N/A', value: 0 };
  };

  return (
    <div className="trend-card">
      <h4 className="trend-title">{assessment.icon} {assessment.name} 变化趋势</h4>
      <div className="trend-list">
        {history.slice(-5).map((h, i) => {
          const { label } = getScore(h);
          return (
            <div key={h.id} className="trend-item">
              <span className="trend-date">{h.date}</span>
              <span className="trend-arrow">→</span>
              <span className="trend-value">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ComprehensiveAnalysis() {
  const [allResults, setAllResults] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [currentCareer, setCurrentCareer] = useState('');
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const results = getLatestResults();
    setAllResults(results);
    if (results.length > 0) {
      setAnalysis(comprehensiveCareerAnalysis(results));
    }
    setLoading(false);
  }, []);

  function handleCareerAnalyze() {
    if (!currentCareer.trim()) return;
    const result = analyzeCurrentCareer(allResults, currentCareer.trim());
    setCareerAnalysis(result);
  }

  if (loading) return <div className="page-container"><p>加载中...</p></div>;

  const completedCount = allResults.length;
  const totalCount = 8;
  const hasPersonality = allResults.some(r => getAssessmentById(r.assessmentId)?.category === 'personality');
  const hasCareer = allResults.some(r => getAssessmentById(r.assessmentId)?.category === 'career');

  return (
    <div className="page-container analysis-page">
      <div className="page-header">
        <h1>🔬 综合分析</h1>
        <p>基于多维测评结果，全面分析你的性格特质与职业匹配度</p>
      </div>

      {completedCount === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>暂未完成任何测评</h3>
          <p>完成至少一个性格测评和一个职业测评后，可以查看综合分析</p>
          <Link to="/" className="btn-primary">去测评</Link>
        </div>
      ) : (
        <>
          {/* 完成进度 */}
          <div className="analysis-progress">
            <div className="progress-info">
              <span>测评完成进度</span>
              <span>{completedCount}/{totalCount}</span>
            </div>
            <div className="analysis-progress-bar">
              <div className="analysis-progress-fill" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
            </div>
            {completedCount < totalCount && (
              <p className="progress-hint">
                {!hasPersonality && '💡 建议完成至少一个性格测评 '}
                {!hasCareer && '💡 建议完成至少一个职业测评 '}
                {hasPersonality && hasCareer && '💡 完成更多测评可获得更精准的分析'}
              </p>
            )}
          </div>

          {!hasPersonality || !hasCareer ? (
            <div className="insufficient-data">
              <p>需要完成性格测评和职业测评各至少一项才能进行综合分析</p>
              <Link to="/" className="btn-primary">开始测评</Link>
            </div>
          ) : (
            <>
              {/* 推荐职业 */}
              <section className="analysis-section">
                <h2>🎯 最适合你的职业方向</h2>
                {analysis && analysis.overallRecommendations.length > 0 ? (
                  <div className="recommendations-grid">
                    {analysis.overallRecommendations.map((rec, i) => (
                      <div key={rec.career} className="rec-card" style={{ '--rank': i }}>
                        <div className="rec-rank">{i + 1}</div>
                        <div className="rec-info">
                          <div className="rec-name">{rec.career}</div>
                          <div className="rec-match">
                            <div className="match-bar" style={{ width: `${rec.matchScore}%` }} />
                          </div>
                          <span className="match-text">匹配度 {rec.matchScore}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">完成更多测评以获取推荐</p>
                )}
              </section>

              {/* 性格总结 */}
              <section className="analysis-section">
                <h2>📝 性格综合画像</h2>
                {analysis && (
                  <div className="summary-box">
                    <p>{analysis.summary}</p>
                  </div>
                )}
              </section>

              {/* 当前职业匹配 */}
              <section className="analysis-section">
                <h2>💼 当前职业匹配分析</h2>
                <p className="section-desc">输入你当前从事的职业，分析是否适合你的性格特质</p>
                <div className="career-input-row">
                  <input
                    type="text"
                    className="career-input"
                    placeholder="例如：软件工程师、教师、市场经理..."
                    value={currentCareer}
                    onChange={e => setCurrentCareer(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCareerAnalyze()}
                  />
                  <button className="btn-primary" onClick={handleCareerAnalyze} disabled={!currentCareer.trim()}>
                    开始分析
                  </button>
                </div>
                {careerAnalysis && (
                  <div className="career-fit-result">
                    <div className="fit-level">{careerAnalysis.fitLevel}</div>
                    <p className="fit-desc">{careerAnalysis.fitDesc}</p>
                    {careerAnalysis.bestFitCareers && (
                      <div className="best-fit-box">
                        <h4>📌 更适合你的职业方向</h4>
                        <div className="fit-careers">
                          {careerAnalysis.bestFitCareers.map((c, i) => (
                            <span key={i} className="fit-career-tag">{c.career}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* 各维度详情 */}
              <section className="analysis-section">
                <h2>📊 各维度测评详情</h2>
                <div className="dim-summary-grid">
                  {allResults.map(record => {
                    const a = getAssessmentById(record.assessmentId);
                    if (!a) return null;
                    const r = record.result;
                    return (
                      <Link key={record.id} to={`/result/${record.assessmentId}/${record.id}`} className="dim-summary-card">
                        <span className="dim-summary-icon">{a.icon}</span>
                        <div>
                          <strong>{a.name}</strong>
                          <span className="dim-summary-value">
                            {r.type || r.primaryType || r.topTypes?.[0]?.name || r.topFields?.[0]?.name || r.topValues?.[0]?.name || r.topSkills?.[0]?.name || '查看'}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>

              {/* 趋势变化 */}
              <section className="analysis-section">
                <h2>📈 性格变化趋势</h2>
                <div className="trends-grid">
                  {allResults.map(record => (
                    <TrendChart key={record.assessmentId} assessmentId={record.assessmentId} results={allResults} />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}
