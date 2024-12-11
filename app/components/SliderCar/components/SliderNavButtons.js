"use client"
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const SliderNavButtons = ({ onPrev, onNext }) => (
  <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 z-10">
    <button
      onClick={onPrev}
      className="bg-neutral-800/50 text-white rounded-full p-3
      hover:bg-orange-500/70 transition-all duration-300
      transform hover:scale-110"
    >
      <ChevronLeftIcon className="h-10 w-10" />
    </button>
    <button
      onClick={onNext}
      className="bg-neutral-800/50 text-white rounded-full p-3
      hover:bg-orange-500/70 transition-all duration-300
      transform hover:scale-110"
    >
      <ChevronRightIcon className="h-10 w-10" />
    </button>
  </div>
);

export default SliderNavButtons;
