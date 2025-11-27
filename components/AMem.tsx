
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { NetworkScene } from './QuantumScene';
import { ZettelkastenDiagram } from './Diagrams';
import { ArrowDown, Brain, GitBranch, Layers } from 'lucide-react';

export const AMemContent: React.FC = () => {
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
        <div className="min-h-screen bg-emerald-50 text-emerald-900 selection:bg-emerald-200">
            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden bg-emerald-900">
                <NetworkScene />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-emerald-900/50 to-emerald-900/90 pointer-events-none" />

                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                     <a 
                      href="https://arxiv.org/abs/2502.12110" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mb-4 px-3 py-1 border border-emerald-400/50 text-emerald-300 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-emerald-900/20 hover:bg-emerald-900/40 transition-colors cursor-pointer"
                    >
                        arXiv • Feb 2025 ↗
                    </a>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 drop-shadow-lg tracking-tight">
                        A-MEM <br/><span className="text-emerald-400">Self-Organizing Minds</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-emerald-100 font-light leading-relaxed mb-12">
                        Agents that organize their own memories using the Zettelkasten method, evolving a structured "mind" instead of a chaotic database.
                    </p>
                    
                    <div className="flex justify-center">
                        <a href="#intro" onClick={scrollToSection('intro')} className="group flex flex-col items-center gap-2 text-sm font-medium text-emerald-200 hover:text-white transition-colors cursor-pointer">
                            <span>EXPLORE</span>
                            <span className="p-2 border border-emerald-600 rounded-full group-hover:border-white transition-colors bg-white/10 backdrop-blur-md">
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
                            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">
                                <Brain size={14} /> The Concept
                            </div>
                            <h2 className="text-4xl font-bold mb-6 leading-tight text-slate-900">Beyond Vector Storage</h2>
                        </div>
                        <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
                            <p>
                                Most agents simply dump text into a vector database. Over time, this becomes a "digital junk drawer"—full of noise and duplicates.
                            </p>
                            <p>
                                <strong>A-MEM</strong> proposes that agents should act like researchers. When they learn something new, they shouldn't just store it; they should actively <em>link</em> it to related ideas, merge duplicates, and refine their understanding, inspired by the <strong>Zettelkasten</strong> note-taking method.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-emerald-50 border-t border-emerald-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-emerald-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-emerald-100 shadow-sm">
                                    <GitBranch size={14}/> MEMORY EVOLUTION
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Active Structuring</h2>
                                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                    A-MEM triggers a "Memory Evolution" process. It detects when new information conflicts with or enhances old data.
                                </p>
                                <ul className="space-y-4 text-slate-600">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 p-1 bg-emerald-200 rounded-full"></div>
                                        <span><strong>Merging:</strong> Compressing redundant observations into a single fact.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 p-1 bg-emerald-200 rounded-full"></div>
                                        <span><strong>Linking:</strong> Connecting disparate events (e.g., "Thunder" and "Rain") to form causal models.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex justify-center w-full">
                                <ZettelkastenDiagram />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
