import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Ball, useBallPhysics } from './hooks/useBallPhysics';
import { Rod } from './Rod';
import { DraggableBall } from './DraggableBall';
import { ROD_START, ROD_END } from './constants';

const DraggableBallsRod = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { balls, handleBallDrag, handleDragStart, handleDragEnd } = useBallPhysics();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    handleBallDrag(e.clientX - svgRect.left);
  }, [handleBallDrag]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    handleBallDrag(e.touches[0].clientX - svgRect.left);
  }, [handleBallDrag]);

  useEffect(() => {
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);
    return () => {
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [handleDragEnd]);

  return (
    <svg
      ref={svgRef}
      width="400"
      height="200"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="touch-none select-none"
    >
      <Rod />
      {balls.map((ball) => (
        <DraggableBall
          key={ball.id}
          ball={ball}
          onDragStart={handleDragStart}
        />
      ))}
    </svg>
  );
};

export default DraggableBallsRod;