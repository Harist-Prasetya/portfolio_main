import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/sections.css';

export default function SystemBreach() {
  // FIXED: Removed unused setGrid. 
  // We use a constant array since the grid structure is static.
  const grid = Array(9).fill(null); 
  
  const [sequence, setSequence] = useState([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState('IDLE'); // IDLE, SHOWING, WAITING, WON, LOST
  const [score, setScore] = useState(0);
  const [activeCell, setActiveCell] = useState(null);

  const audioRef = useRef(null); 

  const startGame = () => {
    setSequence([]);
    setPlayerStep(0);
    setScore(0);
    setGameState('IDLE');
    nextLevel([]);
  };

  const nextLevel = (currentSeq) => {
    const nextIdx = Math.floor(Math.random() * 9);
    const newSeq = [...currentSeq, nextIdx];
    setSequence(newSeq);
    setPlayerStep(0);
    setGameState('SHOWING');
    playSequence(newSeq);
  };

  const playSequence = async (seq) => {
    setIsPlaying(true);
    // Initial delay before showing
    await new Promise((r) => setTimeout(r, 800));

    for (let i = 0; i < seq.length; i++) {
      setActiveCell(seq[i]);
      await new Promise((r) => setTimeout(r, 400)); // Light on duration
      setActiveCell(null);
      await new Promise((r) => setTimeout(r, 200)); // Gap between lights
    }
    setIsPlaying(false);
    setGameState('WAITING');
  };

  const handleCellClick = (index) => {
    if (gameState !== 'WAITING' || isPlaying) return;

    setActiveCell(index);
    setTimeout(() => setActiveCell(null), 200);

    if (index === sequence[playerStep]) {
      const nextStep = playerStep + 1;
      if (nextStep === sequence.length) {
        setScore(score + 100);
        setGameState('SUCCESS');
        setTimeout(() => nextLevel(sequence), 1000);
      } else {
        setPlayerStep(nextStep);
      }
    } else {
      setGameState('LOST');
    }
  };

  return (
    <section className="section-container minigame-section">
      <div className="game-wrapper">
        <div className="terminal-header">
          <h3>// SECURITY_PROTOCOL_OVERRIDE</h3>
          <div className="stats">
            <span>SCORE: {score}</span>
            <span>STATUS: {gameState}</span>
          </div>
        </div>

        <div className="game-grid">
          {grid.map((_, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              className={`grid-cell ${activeCell === i ? 'active' : ''} ${gameState === 'LOST' ? 'error' : ''}`}
              onClick={() => handleCellClick(i)}
            />
          ))}
        </div>

        <div className="game-controls">
          {gameState === 'IDLE' || gameState === 'LOST' ? (
            <button className="cyber-btn" onClick={startGame}>
              {gameState === 'LOST' ? 'RETRY_CONNECTION' : 'INITIATE_HACK'}
            </button>
          ) : (
            <p className="instruction-blink">
              {gameState === 'SHOWING' ? 'OBSERVE_PATTERN...' : 'INPUT_SEQUENCE'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}