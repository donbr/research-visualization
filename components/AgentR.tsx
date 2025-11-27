
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { NeuralGridScene } from './QuantumScene';
import { ReflectionLoopDiagram } from './Diagrams';
import { ArrowDown, Brain, RefreshCw, AlertTriangle } from 'lucide-react';

export const AgentRContent: React.FC = () => {
    const scrollToSection = (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    return (
        <div className="min-h-screen bg-orange-50 text-orange-900 selection:bg-orange-200">
            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
                <NeuralGridScene />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-stone-900/50 to-orange-900/30 pointer-events-none" />

                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <a 
                      href="https://arxiv.org/abs/2501.11425" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mb-4 px-3 py-1 border border-orange-400/50 text-orange-300 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-orange-900/20 hover:bg-orange-900/40 transition-colors cursor-pointer"
                    >
                        arXiv • Jan 2025 ↗
                    </a>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 drop-shadow-lg tracking-tight">
                        Agent-R <br/><span className="text-orange-400">Learning to Reflect</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-orange-100 font-light leading-relaxed mb-12">
                        Memory isn't just data—it's experience. Agent-R trains agents to critique their own past mistakes and store those lessons.
                    </p>
                    
                    <div className="flex justify-center">
                        <a href="#intro" onClick={scrollToSection('intro')} className="group flex flex-col items-center gap-2 text-sm font-medium text-orange-200 hover:text-white transition-colors cursor-pointer">
                            <span>EXPLORE</span>
                            <span className="p-2 border border-orange-600 rounded-full group-hover:border-white transition-colors bg-white/10 backdrop-blur-md">
                                <ArrowDown size={16} />
                            </span>
                        </a>
                    </div>
                </div>
            </header>

            <main>
                <section id="intro" className="py-24 bg-white">
                    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4">
                            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-orange-600 uppercase mb-3">
                                <RefreshCw size={14} /> The Problem
                            </div>
                            <h2 className="text-4xl font-bold mb-6 leading-tight text-slate-900">Repeating Mistakes</h2>
                        </div>
                        <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
                            <p>
                                Standard agents are stateless between sessions. If an agent fails to solve a coding problem today, it will likely fail in the exact same way tomorrow.
                            </p>
                            <p>
                                <strong>Agent-R</strong> introduces "Reflective Memory." It uses iterative self-training to force the agent to analyze its own failure traces, generate a natural language critique, and store that critique.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-orange-50 border-t border-orange-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-orange-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-orange-100 shadow-sm">
                                    <Brain size={14}/> SELF-CORRECTION
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">The Feedback Loop</h2>
                                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                    When faced with a similar task in the future, the agent retrieves its past self-critique. 
                                </p>
                                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                    "Last time I tried to use library X, it failed because of version incompatibility. I should use library Y instead." This effectively allows the model to patch its own behavior without needing model retraining.
                                </p>
                            </div>
                            <div className="flex justify-center w-full">
                                <ReflectionLoopDiagram />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
