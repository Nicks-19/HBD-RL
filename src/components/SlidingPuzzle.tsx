"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { playTypingTick, playSuccessTone } from "@/utils/audio";

const GRID_SIZE = 3;

// Helper to shuffle the initial board
function getShuffledBoard() {
  let board = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
  
  // A simple shuffle (for real implementation, ensure solvability by counting inversions)
  // To guarantee solvability easily, we simulate random valid moves from a solved state
  for (let i = 0; i < 100; i++) {
    const emptyIdx = board.indexOf(8);
    const validMoves = [];
    const r = Math.floor(emptyIdx / GRID_SIZE);
    const c = emptyIdx % GRID_SIZE;
    
    if (r > 0) validMoves.push(emptyIdx - GRID_SIZE); // up
    if (r < GRID_SIZE - 1) validMoves.push(emptyIdx + GRID_SIZE); // down
    if (c > 0) validMoves.push(emptyIdx - 1); // left
    if (c < GRID_SIZE - 1) validMoves.push(emptyIdx + 1); // right
    
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
    // Swap
    [board[emptyIdx], board[randomMove]] = [board[randomMove], board[emptyIdx]];
  }
  
  // Failsafe: if somehow it's already solved after shuffle, swap two to make it unsolved
  if (board.every((val, idx) => val === idx)) {
    const emptyIdx = board.indexOf(8);
    if (emptyIdx === 0) {
      [board[1], board[2]] = [board[2], board[1]];
    } else {
      [board[0], board[1]] = [board[1], board[0]];
    }
  }

  return board;
}

export default function SlidingPuzzle() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);
  const [board, setBoard] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    setBoard(getShuffledBoard());
  }, []);

  useEffect(() => {
    if (board.length > 0 && board.every((val, idx) => val === idx)) {
      if (!isSolved) {
        setIsSolved(true);
        playSuccessTone();
        setTimeout(() => setCurrentPhase(9), 3000);
      }
    }
  }, [board, isSolved, setCurrentPhase]);

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    const emptyIdx = board.indexOf(8);
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const emptyRow = Math.floor(emptyIdx / GRID_SIZE);
    const emptyCol = emptyIdx % GRID_SIZE;

    const isAdjacent = 
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      const newBoard = [...board];
      [newBoard[index], newBoard[emptyIdx]] = [newBoard[emptyIdx], newBoard[index]];
      setBoard(newBoard);
      playTypingTick();
    }
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Tech Details */}
      <div className="absolute inset-0 bg-carbon opacity-50 z-0 pointer-events-none" />
      <div className="absolute top-10 left-10 text-[var(--color-f1-red)] font-mono text-xs opacity-50 pointer-events-none">
        [DIAGNOSTIC_MODULE] // ENCRYPTION_LOCKED
      </div>

      <div className="z-10 text-center mb-12">
        <h1 className="text-3xl text-white font-sans font-bold uppercase tracking-[0.2em] mb-2">
          Decryption Sequence
        </h1>
        <p className="text-gray-400 font-mono text-sm">
          RESTORE THE SECTOR ALIGNMENT TO PROCEED
        </p>
      </div>

      <div className="z-10 relative">
        <div 
          className="bg-gray-900 border-4 border-[var(--color-f1-grey)] rounded-xl p-2 md:p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          style={{ 
            display: "grid", 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, 
            gap: "8px",
            width: "300px",
            height: "300px",
            boxShadow: isSolved ? "0 0 50px rgba(225, 6, 0, 0.8)" : undefined,
            transition: "box-shadow 1s ease"
          }}
        >
          {board.map((tile, idx) => {
            const isEmpty = tile === 8; // Assuming 9 tiles total (0-8), 8 is the empty one
            return (
              <motion.div
                key={tile}
                layout
                onClick={() => handleTileClick(idx)}
                className={`
                  relative flex items-center justify-center rounded-lg shadow-inner text-2xl font-sans font-bold cursor-pointer
                  ${isEmpty 
                    ? "opacity-0" 
                    : "bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 text-[var(--color-f1-silver)] hover:border-[var(--color-f1-red)]"}
                `}
                style={{
                  // In a real app we'd map parts of an image here using backgroundPosition
                }}
              >
                {!isEmpty && `0${tile + 1}`}
              </motion.div>
            );
          })}
        </div>
      </div>

      {isSolved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 mt-12 text-[var(--color-f1-red)] font-mono text-xl font-bold tracking-widest uppercase"
        >
          Encryption Broken. Access Granted.
        </motion.div>
      )}
    </div>
  );
}
