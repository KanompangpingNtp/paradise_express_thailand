import React from 'react';

const SliderDotIndicators = ({ totalSlides, currentIndex, onDotClick }) => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2
  flex space-x-3 bg-neutral-900/50 rounded-full px-4 py-2 z-20">
    {Array.from({ length: totalSlides }).map((_, index) => (
      <div
        key={index}
        className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer
        ${currentIndex === index ? 'bg-orange-500 w-8' : 'bg-white/50'}`}
        onClick={() => onDotClick(index)}
      />
    ))}
  </div>
);

export default SliderDotIndicators;
