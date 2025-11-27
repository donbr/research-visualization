
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { NetworkScene } from './QuantumScene';
import { TemporalGraphDiagram, ZepPerformanceDiagram } from './Diagrams';
import { ArrowDown, BookOpen, Brain, GitBranch, Zap } from 'lucide-react';

export const ZepContent: React.FC = () => {
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
        <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-200">
            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
                <NetworkScene />
                
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/90 pointer-events-none" />

                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <a 
                      href="https://arxiv.org/html/2501.13956v1" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mb-4 px-3 py-1 border border-blue-400/50 text-blue-300 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-blue-900/20 hover:bg-blue-900/40 transition-colors cursor-pointer"
                    >
                        arXiv • Jan 2025 ↗
                    </a>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 drop-shadow-lg tracking-tight">
                        Living Memory <br/><span className="text-blue-400">for AI Agents</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-12">
                        Introducing Zep and the Graphiti Engine: Solving "Digital Amnesia" with a dynamic, bi-temporal Knowledge Graph.
                    </p>
                    
                    <div className="flex justify-center">
                        <a href="#amnesia" onClick={scrollToSection('amnesia')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">
                            <span>EXPLORE</span>
                            <span className="p-2 border border-slate-600 rounded-full group-hover:border-white transition-colors bg-white/10 backdrop-blur-md">
                                <ArrowDown size={16} />
                            </span>
                        </a>
                    </div>
                </div>
            </header>

            <main>
                {/* Introduction: The Problem */}
                <section id="amnesia" className="py-24 bg-white">
                    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4">
                            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-red-500 uppercase mb-3">
                                <Brain size={14} /> The Problem
                            </div>
                            <h2 className="text-4xl font-bold mb-6 leading-tight text-slate-900">Digital Amnesia</h2>
                            <div className="w-16 h-1 bg-blue-500 mb-6 rounded-full"></div>
                        </div>
                        <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
                            <p>
                                <strong className="text-slate-900">The Future of AI is Agentic.</strong> But today's agents have a critical flaw: they can't remember. This "digital amnesia" turns powerful tools into forgetful assistants.
                            </p>
                            <p>
                                Traditional fixes like RAG (Retrieval Augmented Generation) are brittle. They retrieve static documents but fail to understand how facts evolve over time. If a user changes their mind—"I used to like Adidas, now I want Nike"—standard systems either hallucinate or get stuck in the past. To solve complex problems, agents need a <strong className="text-blue-600">living memory</strong>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Solution: Temporal Graph */}
                <section className="py-24 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-blue-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-blue-100 shadow-sm">
                                    <GitBranch size={14}/> THE INNOVATION
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">The Graphiti Engine</h2>
                                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                    Zep is powered by <strong>Graphiti</strong>, a temporal Knowledge Graph designed for changing data. Unlike static vector databases, it uses a "bi-temporal" model.
                                </p>
                                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                    It tracks two timelines: <em>Transaction Time</em> (when the AI learned a fact) and <em>Valid Time</em> (when the fact is true in the world). This allows the agent to resolve contradictions without deleting history, understanding the user's evolving state perfectly.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <TemporalGraphDiagram />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Architecture & Performance */}
                <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-blue-400 uppercase mb-3">
                                <Zap size={14} /> Performance
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Engineered for Speed</h2>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                By performing complex data structuring during ingestion, retrieval becomes a highly optimized database operation. Zep eliminates slow, expensive LLM calls at query time.
                            </p>
                        </div>

                        <ZepPerformanceDiagram />
                    </div>
                </section>
            </main>
        </div>
    );
};
