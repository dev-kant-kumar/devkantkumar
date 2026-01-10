import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQuizBySlug } from '../DailyQuizzes';

const QuizDetail = () => {
  const { quizId } = useParams();
  const quiz = getQuizBySlug(quizId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Quiz not found
  if (!quiz) {
    return (
      <div style={{ minHeight: '100vh', padding: '3rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '24rem',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '0.5rem' }}>Quiz Not Found</h1>
          <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>This quiz doesn't exist or hasn't been added yet.</p>
          <Link to="/ai-lab/quiz" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            color: '#ffffff',
            fontWeight: 500,
            borderRadius: '0.75rem',
            textDecoration: 'none',
          }}>
            View All Quizzes
          </Link>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  const handleSelectAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === question.correct;
    if (isCorrect) setScore(score + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage === 100) return { emoji: '🏆', message: 'Perfect! You\'re an AI Expert!' };
    if (percentage >= 80) return { emoji: '🌟', message: 'Excellent! You know your AI!' };
    if (percentage >= 60) return { emoji: '👍', message: 'Good job! Keep learning!' };
    if (percentage >= 40) return { emoji: '📚', message: 'Nice try! Review the sessions for more!' };
    return { emoji: '💪', message: 'Keep practicing! You\'ll get better!' };
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '1rem',
    padding: 'clamp(1rem, 3vw, 1.5rem)',
  };

  // Quiz Complete Screen
  if (quizComplete) {
    const { emoji, message } = getScoreMessage();
    return (
      <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
          <div style={{ ...cardStyle, textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{emoji}</div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold', color: '#ffffff', marginBottom: '0.5rem' }}>Quiz Complete!</h1>
            <p style={{ fontSize: '1.25rem', color: '#c4b5fd', marginBottom: '1.5rem' }}>{message}</p>

            <div style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
              marginBottom: '2rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Trophy style={{ width: '32px', height: '32px', color: '#facc15' }} />
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffffff' }}>{score}/{quiz.questions.length}</span>
              </div>
              <p style={{ color: '#9ca3af' }}>Questions Correct</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={handleRestart} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontWeight: 500,
                borderRadius: '0.75rem',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                cursor: 'pointer',
              }}>
                <RotateCcw style={{ width: '16px', height: '16px' }} />
                Try Again
              </button>
              <Link to="/ai-lab/quiz" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                color: '#ffffff',
                fontWeight: 500,
                borderRadius: '0.75rem',
                textDecoration: 'none',
              }}>
                More Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getOptionStyle = (index) => {
    let baseStyle = {
      padding: '1rem',
      borderRadius: '0.75rem',
      border: '2px solid rgba(168, 85, 247, 0.3)',
      background: 'rgba(255, 255, 255, 0.05)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#ffffff',
    };

    if (showResult) {
      if (index === question.correct) {
        return { ...baseStyle, borderColor: '#22c55e', background: 'rgba(34, 197, 94, 0.2)' };
      } else if (index === selectedAnswer) {
        return { ...baseStyle, borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.2)' };
      }
    } else if (index === selectedAnswer) {
      return { ...baseStyle, borderColor: '#a855f7', background: 'rgba(168, 85, 247, 0.2)' };
    }

    return baseStyle;
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        {/* Back Link */}
        <Link
          to="/ai-lab/quiz"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', textDecoration: 'none', marginBottom: '1.5rem' }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Back to Quizzes
        </Link>

        {/* Quiz Title */}
        <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', fontWeight: 'bold', color: '#ffffff', marginBottom: '1.5rem' }}>
          {quiz.title}
        </h1>

        {/* Progress Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div style={{ height: '8px', background: '#374151', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              transition: 'width 0.3s ease',
              width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
            }} />
          </div>
        </div>

        {/* Question Card */}
        <div style={{ ...cardStyle, marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', fontWeight: 600, color: '#ffffff', marginBottom: '1.5rem' }}>{question.question}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                style={getOptionStyle(index)}
                disabled={showResult}
              >
                <span style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#d1d5db',
                  flexShrink: 0,
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span style={{ flex: 1 }}>{option}</span>
                {showResult && index === question.correct && (
                  <CheckCircle style={{ width: '20px', height: '20px', color: '#4ade80', flexShrink: 0 }} />
                )}
                {showResult && index === selectedAnswer && index !== question.correct && (
                  <XCircle style={{ width: '20px', height: '20px', color: '#f87171', flexShrink: 0 }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showResult && (
          <div style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            marginBottom: '1.5rem',
            background: selectedAnswer === question.correct ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            border: `1px solid ${selectedAnswer === question.correct ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}>
            <p style={{ color: '#e5e7eb' }}>
              <strong style={{ color: selectedAnswer === question.correct ? '#4ade80' : '#f87171' }}>
                {selectedAnswer === question.correct ? '✓ Correct! ' : '✗ Incorrect. '}
              </strong>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                color: '#ffffff',
                fontWeight: 500,
                borderRadius: '0.75rem',
                border: 'none',
                cursor: selectedAnswer === null ? 'not-allowed' : 'pointer',
                opacity: selectedAnswer === null ? 0.5 : 1,
              }}
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: '#ffffff',
              fontWeight: 500,
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
            }}>
              {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
