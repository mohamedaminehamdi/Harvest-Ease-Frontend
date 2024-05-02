import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react';

function SliderComponent({ slides, autoSlide = false, autoSlideInterval = 3000 }) {
  const [curr, setCurr] = useState(0);
  const prev = () => setCurr(curr => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr(curr => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [curr, autoSlide, autoSlideInterval]);

  return (
    <div className='overflow-hidden w-1/2 h-full relative mx-auto rounded-full'>
      <div className='flex transition-transform ease-out duration-500 h-full' style={{ width: `${slides.length * 100}%`, transform: `translateX(-${curr * (100 / slides.length)}%)` }}>
        {slides}
      </div>
      <div className='absolute inset-0 flex items-center justify-between p-4'>
        <button onClick={prev} className='p-1 rounded-full shadow bg-leafGreen text-white hover:bg-mustardGreen hover:text-leafGreen'>
          <ChevronLeftIcon className='h-8 w-8'/>
        </button>
        <button onClick={next} className='p-1 rounded-full shadow bg-leafGreen text-white hover:bg-mustardGreen hover:text-leafGreen'>
          <ChevronRightIcon className='h-8 w-8'/>
        </button>
      </div>
      <div className='absolute bottom-4 left-0 right-0'>
        <div className='flex items-center justify-center gap-2'>
          {slides.map((_, i) => (
            <div key={i} className={`transition-all duration-300 ease-in-out h-3 w-3 bg-leafGreen rounded-full ${curr === i ? 'bg-leafGreen' : 'bg-opacity-50 bg-slate-300'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SliderComponent;