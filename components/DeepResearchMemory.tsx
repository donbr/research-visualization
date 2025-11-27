
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { DataStreamScene } from './QuantumScene';
import { DeepResearchDiagram } from './Diagrams';
import { ArrowDown, Search, Database, Layers } from 'lucide-react';

export const DeepResearchMemoryContent: React.FC = () => {
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
        <div className="min-h-screen bg-purple-50 text-purple-900 selection:bg-purple-200">
            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                <DataStreamScene />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/50 to-purple-900/50 pointer-events-none" />

                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <a 
                      href="https://arxiv.org/abs/2511.18423" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mb-4 px-3 py-1 border border-purple-400/50 text-purple-300 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-purple-900/20 hover:bg-purple-900/40 transition-colors cursor-pointer"
                    >
                        arXiv • Nov 2025 ↗
                    </a>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 drop-shadow-lg tracking-tight">
                        Deep Research <br/><span className="text-purple-400">Just-in-Time Memory</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-purple-100 font-light leading-relaxed mb-12">
                        Why index everything? This system treats memory recall as an active, real-time research project for every complex query.
                    </p>
                    
                    <div className="flex justify-center">
                        <a href="#intro" onClick={scrollToSection('intro')} className="group flex flex-col items-center gap-2 text-sm font-medium text-purple-200 hover:text-white transition-colors cursor-pointer">
                            <span>EXPLORE</span>
                            <span className="p-2 border border-purple-600 rounded-full group-hover:border-white transition-colors bg-white/10 backdrop-blur-md">
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
                            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-purple-600 uppercase mb-3">
                                <Search size={14} /> The Paradigm Shift
                            </div>
                            <h2 className="text-4xl font-bold mb-6 leading-tight text-slate-900">Against Pre-Computation</h2>
                        </div>
                        <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
                            <p>
                                Traditional RAG systems try to "pre-compute" relevance by turning everything into vectors. But you can't predict what specific detail will be important for a future question.
                            </p>
                            <p>
                                <strong>Just-in-Time (JIT) Memory</strong> argues that we should leave history raw and unstructured. When the agent faces a problem, it spawns a "Researcher" sub-agent that actively queries this raw history, constructing a bespoke memory context on the fly.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-purple-50 border-t border-purple-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-purple-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-purple-100 shadow-sm">
                                    <Database size={14}/> DYNAMIC RETRIEVAL
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Active Investigation</h2>
                                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                    Instead of a simple database lookup, recall becomes a multi-step workflow.
                                </p>
                                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                    The system breaks a complex user goal into sub-questions, runs parallel searches across its history, and synthesizes the results. It trades a few seconds of latency for vastly higher precision and context awareness.
                                </p>
                            </div>
                            <div className="flex justify-center w-full">
                                <DeepResearchDiagram />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
