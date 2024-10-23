import React from 'react';
import { Ball } from './hooks/useBallPhysics';
import { BALL_RADIUS, ANIMATION_DURATION, ANIMATION_EASING } from './constants';

interface DraggableBallProps {
  ball: Ball;
  onDragStart: (id: number, x: number) => void;
}

export const DraggableBall: React.FC<DraggableBallProps> = ({ ball, onDragStart }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onDragStart(ball.id, e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    onDragStart(ball.id, e.touches[0].clientX);
  };

  const transitionStyle = ball.isDragging
    ? 'none'
    : `transform ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`;

  return (
    <g transform={`translate(${ball.x}, 0)`}>
      {/* Ball shadow */}
      <circle
        cx={0}
        cy={102}
        r={BALL_RADIUS}
        fill="#CBD5E1"
        opacity={0.6}
        style={{ transition: transitionStyle }}
      />
      {/* Main ball */}
      <circle
        cx={0}
        cy={100}
        r={BALL_RADIUS}
        fill={ball.color}
        stroke="white"
        strokeWidth="2"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          cursor: ball.isDragging ? 'grabbing' : 'grab',
          filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1))',
          transition: transitionStyle
        }}
      />
    </g>
  );
};