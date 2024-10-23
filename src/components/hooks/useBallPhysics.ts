import { useState, useCallback } from 'react';
import {
  BALL_RADIUS,
  ROD_START,
  ROD_END,
  BALL_COLORS,
  MINIMUM_SPACING
} from '../constants';

export interface Ball {
  id: number;
  x: number;
  color: string;
  isDragging: boolean;
}
console.log('asdad')
const createInitialBalls = (): Ball[] => {
  const availableSpace = ROD_END - ROD_START - (MINIMUM_SPACING * (BALL_COLORS.length - 1));
  const startOffset = availableSpace / 2;
  
  return BALL_COLORS.map((color, index) => ({
    id: index,
    x: ROD_START + startOffset + (MINIMUM_SPACING * index),
    color,
    isDragging: false
  }));
};

export const useBallPhysics = () => {
  const [balls, setBalls] = useState<Ball[]>(createInitialBalls);
  const [activeBall, setActiveBall] = useState<{ id: number; startX: number } | null>(null);

  const constrainPosition = (x: number): number => {
    return Math.max(ROD_START + BALL_RADIUS, Math.min(ROD_END - BALL_RADIUS, x));
  };

  const updateBallPositions = useCallback((draggedBallIndex: number, newX: number, currentBalls: Ball[]): Ball[] => {
    const updatedBalls = [...currentBalls];
    
    // Constrain the dragged ball position
    const boundedX = constrainPosition(newX);
    
    // Update the dragged ball's position
    updatedBalls[draggedBallIndex] = {
      ...updatedBalls[draggedBallIndex],
      x: boundedX
    };

    // Update balls to the right of the dragged ball
    for (let i = draggedBallIndex + 1; i < updatedBalls.length; i++) {
      const previousBall = updatedBalls[i - 1];
      const currentBall = updatedBalls[i];
      
      const minX = previousBall.x + MINIMUM_SPACING;
      
      if (currentBall.x < minX) {
        updatedBalls[i] = {
          ...currentBall,
          x: minX
        };
      } else {
        break; // No need to move further balls
      }
    }

    // Update balls to the left of the dragged ball
    for (let i = draggedBallIndex - 1; i >= 0; i--) {
      const nextBall = updatedBalls[i + 1];
      const currentBall = updatedBalls[i];
      
      const maxX = nextBall.x - MINIMUM_SPACING;
      
      if (currentBall.x > maxX) {
        updatedBalls[i] = {
          ...currentBall,
          x: maxX
        };
      } else {
        break; // No need to move further balls
      }
    }

    // Ensure the last ball is at the end of the rod
    const lastBallIndex = updatedBalls.length - 1;
    updatedBalls[lastBallIndex] = {
      ...updatedBalls[lastBallIndex],
      x: ROD_END - BALL_RADIUS
    };

    return updatedBalls;
  }, []);

  const handleBallDrag = useCallback((clientX: number) => {
    if (!activeBall) return;

    setBalls(prevBalls => {
      const draggedBallIndex = prevBalls.findIndex(b => b.id === activeBall.id);
      return updateBallPositions(draggedBallIndex, clientX, prevBalls);
    });
  }, [activeBall, updateBallPositions]);

  const handleDragStart = useCallback((id: number, startX: number) => {
    setActiveBall({ id, startX });
    setBalls(prev => 
      prev.map(ball => ({
        ...ball,
        isDragging: ball.id === id
      }))
    );
  }, []);

  const handleDragEnd = useCallback(() => {
    setActiveBall(null);
    setBalls(prev => 
      prev.map(ball => ({
        ...ball,
        isDragging: false
      }))
    );
  }, []);

  return {
    balls,
    handleBallDrag,
    handleDragStart,
    handleDragEnd
  };
};