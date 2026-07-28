import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAssessmentRecord } from '../utils/storage';

export default function AssessmentTaking({ assessment }) {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const question = assessment.questions[currentQ];
  const total = assessment.questions.length;
  const progress = Math.round(((currentQ + 1) / total) * 100);
  const answeredCount = Object.keys(answers).length;

  function selectAnswer(optionIndex) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [question.id]: optionIndex }));
  }

  function goToQuestion(index) {
    if (index >= 0 && index < total) setCurrentQ(index);
  }

  function handleSubmit() {
    if (answeredCount < total) {
      const confirm = window.confirm(`你还有 ${total - answeredCount} 题未回答，确定要提交吗？`);
      if (!confirm) return;
    }

    // 计算分数
    const scores = {};
    assessment.questions.forEach(q => {
      const chosen = answers[q.id];
      if (chosen !== undefined) {
        const optionScore = q.options[chosen].score;
        Object.entries(optionScore).forEach(([key, val]) => {
          scores[key] = (scores[key] || 0) + val;
        });
      }
    });

    const result = assessment.calculateResult(scores);
    const record = saveAssessmentRecord(assessment.id, result);
    setSubmitted(true);
    navigate(`/result/${assessment.id}/${record.id}`);
  }

  return (
    <div className="page-container assessment-taking">
      <div className="assessment-header">
        <div className="assessment-info">
          <span className="assessment-icon" style={{ background: assessment.color + '20', color: assessment.color }}>
            {assessment.icon}
          </span>
          <div>
            <h1>{assessment.name}</h1>
            <p>{assessment.description}</p>
          </div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%`, background: assessment.color }} />
        <span className="progress-text">{currentQ + 1}/{total} 题</span>
      </div>

      {/* 题目导航点 */}
      <div className="question-nav-dots">
        {assessment.questions.map((q, i) => (
          <button
            key={q.id}
            className={`nav-dot ${answers[q.id] !== undefined ? 'answered' : ''} ${i === currentQ ? 'current' : ''}`}
            onClick={() => goToQuestion(i)}
            style={i === currentQ ? { background: assessment.color, borderColor: assessment.color } : {}}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 当前题目 */}
      <div className="question-card">
        <div className="question-meta">
          <span className="q-badge">第 {currentQ + 1} 题</span>
          <span className="q-category">{assessment.dimensions?.[Math.floor(currentQ / (total / assessment.dimensions.length))] || ''}</span>
        </div>
        <h2 className="question-text">{question.text}</h2>

        <div className="options-list">
          {question.options.map((opt, idx) => {
            const isSelected = answers[question.id] === idx;
            return (
              <button
                key={idx}
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                style={isSelected ? { borderColor: assessment.color, background: assessment.color + '08' } : {}}
                onClick={() => selectAnswer(idx)}
              >
                <span className="option-marker" style={isSelected ? { background: assessment.color } : {}}>
                  {isSelected ? '✓' : String.fromCharCode(65 + idx)}
                </span>
                <span className="option-text">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="nav-buttons">
        <button
          className="btn-secondary"
          onClick={() => goToQuestion(currentQ - 1)}
          disabled={currentQ === 0}
        >
          ← 上一题
        </button>

        {currentQ < total - 1 ? (
          <button
            className="btn-primary"
            onClick={() => goToQuestion(currentQ + 1)}
            style={{ background: assessment.color }}
          >
            下一题 →
          </button>
        ) : (
          <button
            className="btn-primary btn-submit"
            onClick={handleSubmit}
            style={{ background: assessment.color }}
            disabled={submitted}
          >
            {submitted ? '提交中...' : `提交测评 (${answeredCount}/${total})`}
          </button>
        )}
      </div>

      <div className="assessment-footer-hint">
        {answeredCount === total ? '✅ 所有题目已答完，可以提交了！' : `📝 还有 ${total - answeredCount} 题未回答`}
      </div>
    </div>
  );
}
