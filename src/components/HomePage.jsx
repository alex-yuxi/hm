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

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPersonalityAssessments, getCareerAssessments, assessmentRelations } from '../data/assessments';
import { getLatestResults } from '../utils/storage';

function Card({ assessment, completed }) {
  const navigate = useNavigate();
  return (
    <div
      className="assessment-card"
      style={{ borderTopColor: assessment.color }}
      onClick={() => navigate(`/assessment/${assessment.id}`)}
    >
      <div className="card-header">
        <span className="card-icon" style={{ background: assessment.color + '20', color: assessment.color }}>
          {assessment.icon}
        </span>
        {completed && <span className="completed-badge">✓ 已完成</span>}
      </div>
      <h3 className="card-title">{assessment.name}</h3>
      <p className="card-desc">{assessment.description}</p>
      <div className="card-meta">
        <span className="meta-item">📝 {assessment.questionsCount}题</span>
        <span className="meta-item">⏱ {assessment.timeEstimate}</span>
      </div>
      <button
        className="btn-card"
        style={{ background: assessment.color }}
        onClick={(e) => { e.stopPropagation(); navigate(`/assessment/${assessment.id}`); }}
      >
        {completed ? '重新测评' : '开始测评'}
        <span className="btn-arrow">→</span>
      </button>
    </div>
  );
}

function RelationshipGraph() {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const nodes = assessmentRelations.nodes;
    const radius = 150;
    const cx = 200, cy = 200;
    const pos = {};
    nodes.forEach((n, i) => {
      const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
      pos[n.id] = { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
    });
    setPositions(pos);
  }, []);

  return (
    <div className="relationship-section">
      <h2 className="section-title">📊 测评关系图谱</h2>
      <p className="section-subtitle">了解各测评之间的关联，帮助你从多维度认识自己</p>
      <div className="graph-container">
        <svg viewBox="0 0 400 400" className="graph-svg" ref={svgRef}>
          {/* 连线 */}
          {assessmentRelations.links.map((link, i) => {
            const sp = positions[link.source];
            const tp = positions[link.target];
            if (!sp || !tp) return null;
            const isSelection = tooltip && (tooltip.source === link.source && tooltip.target === link.target);
            return (
              <g key={i}>
                <line
                  x1={sp.x} y1={sp.y} x2={tp.x} y2={tp.y}
                  stroke={isSelection ? '#6366f1' : '#e5e7eb'}
                  strokeWidth={isSelection ? 2 : 1}
                  className="graph-link"
                />
                {isSelection && (
                  <foreignObject
                    x={(sp.x + tp.x) / 2 - 100}
                    y={(sp.y + tp.y) / 2 - 30}
                    width="200" height="60"
                  >
                    <div className="relation-tooltip">
                      {tooltip.relation}
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
          {/* 节点 */}
          {assessmentRelations.nodes.map(node => {
            const p = positions[node.id];
            if (!p) return null;
            const isCareer = node.category === 'career';
            return (
              <g
                key={node.id}
                onMouseEnter={() => {}}
                onClick={() => {
                  const links = assessmentRelations.links.filter(
                    l => l.source === node.id || l.target === node.id
                  );
                  if (links.length > 0) {
                    setTooltip(prev => {
                      const current = prev && prev.nodeId === node.id ? prev.index : 0;
                      return { nodeId: node.id, index: current, ...links[current % links.length] };
                    });
                  }
                }}
                className="graph-node-group"
              >
                <circle
                  cx={p.x} cy={p.y} r={28}
                  fill={isCareer ? '#eff6ff' : '#faf5ff'}
                  stroke={isCareer ? '#3b82f6' : '#8b5cf6'}
                  strokeWidth="2"
                />
                <text x={p.x} y={p.y + 5} textAnchor="middle" className="graph-node-text">
                  {(node.name + '  ').slice(0, 4)}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="graph-hint">💡 点击节点查看与其他测评的关联</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const personality = getPersonalityAssessments();
  const career = getCareerAssessments();
  const latestResults = getLatestResults();
  const completedIds = new Set(latestResults.map(r => r.assessmentId));

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">探索自我，发现职业方向</h1>
          <p className="hero-desc">
            融合MBTI、九型人格、大五人格、DISC、霍兰德等主流测评，
            提供从性格到职业的全方位深度分析。记录每次测评，追踪真实的自己。
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">{personality.length}</span>
              <span className="stat-label">性格测评</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{career.length}</span>
              <span className="stat-label">职业测评</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{completedIds.size}</span>
              <span className="stat-label">已完成</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
      </section>

      <div className="page-container">
        {/* 性格测评 */}
        <section className="category-section">
          <h2 className="section-title">🧠 性格测评</h2>
          <p className="section-subtitle">从多维度了解你的性格特质、行为模式和内在动机</p>
          <div className="cards-grid">
            {personality.map(a => (
              <Card key={a.id} assessment={a} completed={completedIds.has(a.id)} />
            ))}
          </div>
        </section>

        {/* 关系图谱 */}
        <RelationshipGraph />

        {/* 职业测评 */}
        <section className="category-section">
          <h2 className="section-title">💼 职业测评</h2>
          <p className="section-subtitle">探索职业兴趣、价值观和技能倾向，找到适合的职业方向</p>
          <div className="cards-grid">
            {career.map(a => (
              <Card key={a.id} assessment={a} completed={completedIds.has(a.id)} />
            ))}
          </div>
        </section>

        {/* 快速入口 */}
        <section className="quick-actions">
          <Link to="/tarot" className="quick-btn primary">
            <span className="quick-icon">🔮</span>
            <div>
              <strong>塔罗牌占卜</strong>
              <span>选择阵法与目的，洞察当下指引</span>
            </div>
          </Link>
          <Link to="/analysis" className="quick-btn secondary">
            <span className="quick-icon">🔬</span>
            <div>
              <strong>综合分析</strong>
              <span>查看性格与职业的全方位匹配</span>
            </div>
          </Link>
          <Link to="/history" className="quick-btn secondary">
            <span className="quick-icon">📋</span>
            <div>
              <strong>测评记录</strong>
              <span>回顾不同时期的性格变化</span>
            </div>
          </Link>
        </section>

        {/* 塔罗牌入口卡片 */}
        <section className="category-section">
          <h2 className="section-title">🔮 塔罗牌占卜</h2>
          <p className="section-subtitle">在静心中抽牌，获得关于感情、事业、抉择等方面的指引与解读</p>
          <div className="cards-grid">
            <div
              className="assessment-card"
              style={{ borderTopColor: '#7c3aed', cursor: 'pointer' }}
              onClick={() => window.location.href = '/tarot'}
            >
              <div className="card-header">
                <span className="card-icon" style={{ background: '#7c3aed20', color: '#7c3aed' }}>🔮</span>
              </div>
              <h3 className="card-title">开始一次塔罗占卜</h3>
              <p className="card-desc">支持单张牌、三张牌、凯尔特十字、感情阵、抉择阵、年度阵等主流阵法，可记录占卜目的与解读。</p>
              <div className="card-meta">
                <span className="meta-item">🃏 6 种阵法</span>
                <span className="meta-item">🎯 7 类目的</span>
              </div>
              <Link to="/tarot" className="btn-card" style={{ background: '#7c3aed' }}>
                进入占卜
                <span className="btn-arrow">→</span>
              </Link>
            </div>
            <div
              className="assessment-card"
              style={{ borderTopColor: '#db2777', cursor: 'pointer' }}
              onClick={() => window.location.href = '/tarot-history'}
            >
              <div className="card-header">
                <span className="card-icon" style={{ background: '#db277720', color: '#db2777' }}>📖</span>
              </div>
              <h3 className="card-title">占卜历史</h3>
              <p className="card-desc">按日期与占卜目的回顾每一次抽牌的结果与解读，可随时删除某条记录。</p>
              <div className="card-meta">
                <span className="meta-item">🕒 时间记录</span>
                <span className="meta-item">🗑 可删除</span>
              </div>
              <Link to="/tarot-history" className="btn-card" style={{ background: '#db2777' }}>
                查看历史
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
