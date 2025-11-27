
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, FileText, Lightbulb, Zap, Database, AlertCircle, Layout } from 'lucide-react';

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  visual?: React.ReactNode;
  theme?: 'dark' | 'light' | 'alert' | 'brand';
}

interface ExplainerProps {
  title: string;
  slides: Slide[];
  isOpen: boolean;
  onClose: () => void;
}

export const Explainer: React.FC<ExplainerProps> = ({ title, slides, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide]);

  if (!isOpen) return null;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl aspect-video bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in">
        
        {/* Sidebar / Progress (Mobile: Top bar) */}
        <div className="bg-stone-100 p-6 md:w-64 flex flex-col justify-between border-r border-stone-200">
           <div>
               <div className="flex items-center gap-2 text-stone-500 mb-6">
                   <FileText size={16} />
                   <span className="text-xs font-bold uppercase tracking-widest">Explainer Deck</span>
               </div>
               <h2 className="font-serif text-2xl text-stone-900 mb-2 leading-tight">{title}</h2>
               <p className="text-xs text-stone-500">Slide {currentSlide + 1} of {slides.length}</p>
           </div>

           <div className="hidden md:flex flex-col gap-2 overflow-y-auto max-h-[50vh] pr-2 mt-4">
              {slides.map((s, idx) => (
                  <button 
                    key={s.id} 
                    onClick={() => setCurrentSlide(idx)}
                    className={`text-left text-xs py-2 px-3 rounded transition-colors border-l-2 ${idx === currentSlide ? 'bg-white border-blue-500 text-stone-900 shadow-sm' : 'border-transparent text-stone-500 hover:bg-stone-200'}`}
                  >
                      {s.title}
                  </button>
              ))}
           </div>
           
           <div className="mt-6 md:mt-0">
               <button onClick={onClose} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors">
                   <X size={16} /> Close View
               </button>
           </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative bg-white flex flex-col">
            {/* Toolbar */}
            <div className="absolute top-0 right-0 p-6 flex gap-2 z-20">
                <button onClick={prevSlide} className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Slide Body */}
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
                 <div className={`mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit
                    ${slide.theme === 'alert' ? 'bg-red-100 text-red-600' : 
                      slide.theme === 'brand' ? 'bg-blue-100 text-blue-600' : 
                      'bg-stone-100 text-stone-600'}`}>
                    {slide.theme === 'alert' && <AlertCircle size={12} />}
                    {slide.theme === 'brand' && <Zap size={12} />}
                    {slide.subtitle || 'Concept'}
                 </div>
                 
                 <h1 className="font-serif text-3xl md:text-5xl text-stone-900 mb-8 leading-tight">
                    {slide.title}
                 </h1>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-lg text-stone-600 leading-relaxed whitespace-pre-wrap">
                        {slide.content}
                    </div>
                    
                    <div className="bg-stone-50 rounded-xl border border-stone-200 p-8 aspect-[4/3] flex items-center justify-center relative overflow-hidden group">
                         {/* Abstract Backgrounds */}
                         <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-400 to-transparent"></div>
                         </div>
                         <div className="relative z-10 w-full">
                            {slide.visual ? slide.visual : <div className="text-stone-300 italic text-center">Visual Representation</div>}
                         </div>
                    </div>
                 </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1 bg-stone-100 w-full">
                <div 
                    className="h-full bg-stone-900 transition-all duration-300" 
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
            </div>
        </div>

      </div>
    </div>
  );
};
