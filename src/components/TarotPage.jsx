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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tarotSpreads, divinationPurposes, drawCards, buildReading } from '../data/tarot';
import { saveTarotReading } from '../utils/storage';

const PALETTE = ['#7c3aed', '#db2777', '#0891b2', '#ea580c', '#16a34a', '#9333ea'];

export default function TarotPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('spread'); // spread | purpose | draw | done
  const [spread, setSpread] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [cards, setCards] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [reading, setReading] = useState(null);

  // 步骤1：选择阵法
  function selectSpread(s) {
    setSpread(s);
    setStep('purpose');
  }

  // 步骤2：选择占卜目的
  function selectPurpose(p) {
    setPurpose(p);
    setStep('draw');
  }

  // 步骤3：洗牌抽牌
  function doDraw() {
    const drawn = drawCards(spread.positions.length);
    setCards(drawn);
    setRevealed(false);
    setStep('done');
    // 生成解读并保存
    const result = buildReading(spread, drawn, purpose.id);
    const saved = saveTarotReading(result);
    setReading(saved);
  }

  function reveal() {
    setRevealed(true);
  }

  function reset() {
    setStep('spread');
    setSpread(null);
    setPurpose(null);
    setCards([]);
    setRevealed(false);
    setReading(null);
  }

  return (
    <div className="page-container tarot-page">
      <div className="page-header">
        <h1>🔮 塔罗牌占卜</h1>
        <p>选择阵法与占卜目的，静心凝念后抽牌，洞察当下的指引</p>
      </div>

      {/* 步骤指示器 */}
      <div className="tarot-steps">
        {['选择阵法', '占卜目的', '洗牌抽牌', '解读结果'].map((label, i) => {
          const order = ['spread', 'purpose', 'draw', 'done'];
          const active = order[i] === step;
          const done = order.indexOf(step) > i;
          return (
            <div key={label} className={`tarot-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
              <span className="step-index">{done ? '✓' : i + 1}</span>
              <span className="step-label">{label}</span>
            </div>
          );
        })}
      </div>

      {/* 步骤1：阵法 */}
      {step === 'spread' && (
        <div className="tarot-spreads">
          {tarotSpreads.map(s => (
            <div key={s.id} className="tarot-spread-card" onClick={() => selectSpread(s)}>
              <span className="tarot-spread-icon">{s.icon}</span>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <span className="tarot-spread-count">{s.positions.length} 张牌</span>
            </div>
          ))}
        </div>
      )}

      {/* 步骤2：目的 */}
      {step === 'purpose' && (
        <div className="tarot-purpose">
          <h2 className="tarot-subtitle">本次占卜，你想了解什么？</h2>
          <p className="tarot-hint">选择目的有助于记录你的占卜主题，并让解读更有针对性</p>
          <div className="purpose-grid">
            {divinationPurposes.map(p => (
              <button key={p.id} className="purpose-btn" onClick={() => selectPurpose(p)}>
                <span className="purpose-icon">{p.icon}</span>
                <span className="purpose-name">{p.name}</span>
                <span className="purpose-prompt">{p.prompt}</span>
              </button>
            ))}
          </div>
          <button className="btn-outline" onClick={() => setStep('spread')}>← 重新选择阵法</button>
        </div>
      )}

      {/* 步骤3：抽牌 */}
      {step === 'draw' && (
        <div className="tarot-draw">
          <div className="tarot-draw-info">
            <span>阵法：<strong>{spread.name}</strong></span>
            <span>目的：<strong>{purpose.icon} {purpose.name}</strong></span>
          </div>
          <div className="tarot-deck-visual">
            <div className="tarot-deck-stack">
              <div className="deck-card back" />
              <div className="deck-card back" />
              <div className="deck-card back" />
            </div>
          </div>
          <p className="tarot-hint">闭上眼睛，在心中默念你的问题，然后点击下方按钮洗牌抽牌</p>
          <button className="btn-primary tarot-draw-btn" onClick={doDraw}>🎴 洗牌并抽取 {spread.positions.length} 张牌</button>
          <button className="btn-outline" onClick={() => setStep('purpose')}>← 重新选择目的</button>
        </div>
      )}

      {/* 步骤4：结果 */}
      {step === 'done' && reading && (
        <div className="tarot-result">
          <div className="tarot-result-meta">
            <span>🕒 {reading.date} {reading.time}</span>
            <span>🎯 {reading.purposeName}</span>
            <span>🃏 {reading.spreadName}</span>
          </div>

          {!revealed ? (
            <div className="tarot-reveal">
              <div className="tarot-hidden-cards">
                {cards.map((_, i) => (
                  <div key={i} className="tarot-hidden-card">?</div>
                ))}
              </div>
              <button className="btn-primary tarot-draw-btn" onClick={reveal}>✨ 翻开塔罗牌</button>
            </div>
          ) : (
            <>
              <div className="tarot-cards">
                {reading.cards.map((c, i) => (
                  <div key={i} className={`tarot-card ${c.reversed ? 'reversed' : ''}`} style={{ borderTopColor: PALETTE[i % PALETTE.length] }}>
                    <div className="tarot-card-pos">{c.position}</div>
                    <div className="tarot-card-inner">
                      <div className="tarot-card-symbol">{c.reversed ? '🂠' : '⭐'}</div>
                      <div className="tarot-card-name">{c.name}</div>
                      <div className="tarot-card-en">{c.en}</div>
                      <div className={`tarot-card-orient ${c.reversed ? 'rev' : ''}`}>{c.orientation}</div>
                    </div>
                    <div className="tarot-card-meaning">{c.meaning}</div>
                  </div>
                ))}
              </div>

              <div className="tarot-summary">
                <h3>📜 综合解读</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{reading.summary}</p>
              </div>

              <div className="tarot-result-actions">
                <button className="btn-primary" onClick={reset}>🔄 再占一次</button>
                <Link to="/tarot-history" className="btn-outline">📖 查看占卜历史</Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
