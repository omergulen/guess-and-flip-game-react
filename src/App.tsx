import React from 'react';
import { GameBoard } from './components/GameBoard';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  return (
    <div className="min-h-screen bg-[#1a1b4b] flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      <GameBoard />
    </div>
  );
}

export default App;