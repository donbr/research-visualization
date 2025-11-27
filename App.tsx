
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, FileText, Layers, Clock, Zap, Database, AlertTriangle, Layout } from 'lucide-react';
import { AlphaQubitContent } from './components/AlphaQubit';
import { ZepContent } from './components/Zep';
import { AMemContent } from './components/AMem';
import { DeepResearchMemoryContent } from './components/DeepResearchMemory';
import { AgentRContent } from './components/AgentR';
import { Explainer, Slide } from './components/Explainer';

const zepSlides: Slide[] = [
    {
        id: '1',
        title: "The Future of AI is Agentic",
        subtitle: "The Problem",
        content: "Agents are powerful, but they have a fatal flaw: Digital Amnesia. \n\nWithout a persistent memory, they are merely forgetful assistants, unable to learn from interactions or solve complex, long-horizon problems.",
        theme: 'alert',
        visual: (
            <div className="flex flex-col items-center gap-4 text-stone-400">
                <div className="w-16 h-16 border-2 border-dashed border-stone-300 rounded-full flex items-center justify-center">?</div>
                <div className="text-sm font-mono">MEMORY_NOT_FOUND</div>
            </div>
        )
    },
    {
        id: '2',
        title: "When Memory Fails",
        subtitle: "Use Case",
        content: "Consider a user who says 'I only wear Adidas' in September, but switches to 'I'll be wearing Nike' in October.\n\nStandard agents fail to resolve this contradiction. They either halluncinate or stubbornly stick to the old fact, delivering a frustrating experience.",
        visual: (
            <div className="flex justify-between items-center w-full px-4">
                 <div className="p-4 bg-white shadow-sm border border-stone-200 rounded-lg opacity-50">
                    <div className="text-[10px] uppercase text-stone-400 mb-1">Sept 07</div>
                    <div className="font-bold text-stone-800">Adidas</div>
                 </div>
                 <ArrowRight className="text-red-400" />
                 <div className="p-4 bg-white shadow-md border-l-4 border-l-red-500 rounded-lg">
                    <div className="text-[10px] uppercase text-red-400 mb-1">Oct 14</div>
                    <div className="font-bold text-stone-800">Nike</div>
                 </div>
            </div>
        )
    },
    {
        id: '3',
        title: "Why RAG Fails",
        subtitle: "Current Tech",
        content: "Traditional RAG (Retrieval Augmented Generation) and Vector Databases are optimized for similarity, not truth.\n\nThey inject massive, unfiltered text into prompts ('Context Stuffing'), causing extreme latency, high costs, and confusion about which facts are current.",
        theme: 'alert',
        visual: (
             <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full h-24 bg-stone-200 rounded animate-pulse flex items-center justify-center text-stone-400 text-xs">
                    115,000 Tokens (Waste)
                </div>
                <div className="text-red-500 font-bold text-sm">~30s Latency</div>
             </div>
        )
    },
    {
        id: '4',
        title: "Zep: Living Memory",
        subtitle: "The Solution",
        content: "Zep gives agents a dynamic, persistent memory that grows smarter with every interaction.\n\nIt continuously learns and adapts, fusing chat history and business data into a unified, evolving Knowledge Graph.",
        theme: 'brand',
        visual: (
            <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-0 border-2 border-blue-500 rounded-full flex items-center justify-center bg-white shadow-xl text-blue-600 font-bold text-xl">Zep</div>
            </div>
        )
    },
    {
        id: '5',
        title: "Bi-Temporal Graph",
        subtitle: "Architecture",
        content: "The Graphiti Engine uses a bi-temporal model, tracking two timelines for every fact: \n1. Valid Time (When it's true)\n2. Transaction Time (When we learned it)\n\nThis resolves contradictions without deleting history.",
        visual: (
             <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-600">
                    <Clock size={14} /> T_VALID: 2024-10-14
                </div>
                 <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                    <Database size={14} /> T_RECORDED: 2024-10-14
                </div>
             </div>
        )
    },
    {
        id: '6',
        title: "Engineered for Speed",
        subtitle: "Performance",
        content: "By structuring data during ingestion, retrieval becomes a fast database operation.\n\n• 90% Lower Latency (<200ms)\n• 98% Fewer Tokens\n• No LLM calls at query time",
        theme: 'brand',
        visual: (
            <div className="grid grid-cols-2 gap-4 w-full text-center">
                 <div className="p-4 bg-green-50 border border-green-200 rounded">
                    <div className="text-2xl font-bold text-green-600">200ms</div>
                    <div className="text-[10px] text-green-800">Latency</div>
                 </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <div className="text-2xl font-bold text-blue-600">1.6k</div>
                    <div className="text-[10px] text-blue-800">Tokens</div>
                 </div>
            </div>
        )
    }
];

const papers = [
  {
    id: 'alphaqubit',
    title: 'AlphaQubit',
    subtitle: 'AI for Quantum Error Correction',
    desc: 'Visualizing Nature (2024): A recurrent transformer-based neural network that learns to decode the surface code with unprecedented accuracy.',
    date: 'Nov 2024',
    theme: 'stone',
    url: 'https://doi.org/10.1038/s41586-024-08148-8',
    component: AlphaQubitContent,
    slides: null
  },
  {
    id: 'zep',
    title: 'Zep: Living Memory',
    subtitle: 'Long-term Memory for AI Agents',
    desc: 'Visualizing arXiv (2025): A temporal knowledge graph engine that solves "digital amnesia" in autonomous agents.',
    date: 'Jan 2025',
    theme: 'blue',
    url: 'https://arxiv.org/html/2501.13956v1',
    component: ZepContent,
    slides: zepSlides
  },
  {
    id: 'amem',
    title: 'A-MEM',
    subtitle: 'Self-Organizing Agent Memory',
    desc: 'Visualizing arXiv (2025): Agents that actively link, merge, and refine their own memories using a Zettelkasten-inspired approach.',
    date: 'Feb 2025',
    theme: 'emerald',
    url: 'https://arxiv.org/abs/2502.12110',
    component: AMemContent,
    slides: null
  },
  {
    id: 'deep-research',
    title: 'Deep Research Memory',
    subtitle: 'Just-in-Time Context Construction',
    desc: 'Visualizing arXiv (2025): A system that treats memory recall as an active, deep research process rather than a database lookup.',
    date: 'Nov 2025',
    theme: 'purple',
    url: 'https://arxiv.org/abs/2511.18423',
    component: DeepResearchMemoryContent,
    slides: null
  },
  {
    id: 'agent-r',
    title: 'Agent-R',
    subtitle: 'Reflective Memory',
    desc: 'Visualizing arXiv (2025): Training language model agents to reflect on past failures and store self-critiques for future improvement.',
    date: 'Jan 2025',
    theme: 'orange',
    url: 'https://arxiv.org/abs/2501.11425',
    component: AgentRContent,
    slides: null
  }
];

const App: React.FC = () => {
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>('alphaqubit');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [explainerOpen, setExplainerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedPaper = papers.find(p => p.id === selectedPaperId);
  const PaperComponent = selectedPaper ? selectedPaper.component : null;

  if (!selectedPaper) {
    // Landing Page / Paper Selector
    return (
      <div className="min-h-screen bg-[#F9F8F4] flex flex-col font-sans">
        <header className="py-12 px-6 border-b border-stone-200 bg-white">
           <div className="container mx-auto">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center font-serif font-bold">R</div>
                <span className="font-bold tracking-wider text-stone-900">RESEARCH VISUALIZER</span>
             </div>
             <p className="text-stone-500 max-w-lg">Interactive explorations of breakthrough papers in AI and Quantum Computing.</p>
           </div>
        </header>

        <main className="flex-1 container mx-auto px-6 py-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-8">Select a Paper</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {papers.map(paper => (
                   <div key={paper.id} className="group flex flex-col bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => setSelectedPaperId(paper.id)}>
                      <div className="p-8 flex-1">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit 
                            ${paper.theme === 'blue' ? 'bg-blue-100 text-blue-700' : 
                              paper.theme === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                              paper.theme === 'purple' ? 'bg-purple-100 text-purple-700' :
                              paper.theme === 'orange' ? 'bg-orange-100 text-orange-700' :
                              'bg-stone-100 text-stone-600'}`}>
                            {paper.date}
                        </div>
                        <h3 className="text-2xl font-serif text-stone-900 mb-2 group-hover:text-blue-600 transition-colors">{paper.title}</h3>
                        <p className="text-sm text-stone-500 mb-6 italic">{paper.subtitle}</p>
                        <p className="text-stone-600 leading-relaxed text-sm mb-8">{paper.desc}</p>
                      </div>
                      
                      {/* Card Footer Actions */}
                      <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                         <button className="flex items-center gap-2 font-bold text-stone-900 group-hover:translate-x-2 transition-transform">
                            Read Visualization <ArrowRight size={18} />
                         </button>
                         {paper.slides && (
                             <div className="flex items-center gap-2 text-xs text-stone-500 bg-white px-2 py-1 rounded border border-stone-200">
                                <Layers size={12} />
                                <span>PDF Slides</span>
                             </div>
                         )}
                      </div>
                   </div>
                ))}
            </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`relative ${selectedPaper.theme === 'stone' ? 'font-serif' : 'font-sans'}`}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedPaperId(null)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm pb-1 
                ${selectedPaper.theme === 'blue' ? 'bg-blue-600 font-sans' : 
                  selectedPaper.theme === 'emerald' ? 'bg-emerald-600 font-sans' :
                  selectedPaper.theme === 'purple' ? 'bg-purple-600 font-sans' :
                  selectedPaper.theme === 'orange' ? 'bg-orange-600 font-sans' :
                  'bg-nobel-gold font-serif'}`}>
                {selectedPaper.title[0]}
            </div>
            <div className="flex flex-col">
                 <span className={`font-bold text-lg tracking-wide leading-none ${scrolled ? 'text-stone-900' : 'text-stone-900 md:text-white'}`}>
                    {selectedPaper.title}
                </span>
                <span className={`text-[10px] uppercase tracking-widest ${scrolled ? 'text-stone-500' : 'text-stone-400 md:text-white/70'}`}>Research Visualization</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-sm font-medium tracking-wide">
             <button onClick={() => setSelectedPaperId(null)} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${scrolled ? 'text-stone-600 hover:bg-stone-100' : 'text-white/80 hover:bg-white/10'}`}>
                <FileText size={14} /> All Papers
             </button>

             {selectedPaper.slides && (
                 <button 
                    onClick={() => setExplainerOpen(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors border ${scrolled ? 'border-stone-200 text-stone-700 hover:bg-stone-50' : 'border-white/30 text-white hover:bg-white/10'}`}
                 >
                    <Layout size={14} /> View Slides
                 </button>
             )}

             <a 
              href={selectedPaper.url}
              target="_blank" 
              rel="noopener noreferrer" 
              className={`px-5 py-2 rounded-full text-white shadow-sm cursor-pointer transition-colors 
                ${selectedPaper.theme === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 
                  selectedPaper.theme === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                  selectedPaper.theme === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                  selectedPaper.theme === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                  'bg-stone-900 hover:bg-stone-800'}`}
            >
              Source PDF
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2 z-50" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu className={scrolled ? 'text-stone-900' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
             <button onClick={() => { setSelectedPaperId(null); setMenuOpen(false); }} className="hover:text-blue-600 transition-colors cursor-pointer uppercase">Back to Papers</button>
            {selectedPaper.slides && (
                <button onClick={() => { setExplainerOpen(true); setMenuOpen(false); }} className="flex items-center gap-2 hover:text-blue-600">
                    <Layout size={20} /> View Explainer Slides
                </button>
            )}
            <a 
              href={selectedPaper.url}
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer"
            >
              View Source PDF
            </a>
        </div>
      )}

      {/* Render Active Paper */}
      <PaperComponent />

      {/* Explainer Modal */}
      {selectedPaper.slides && (
          <Explainer 
            title={selectedPaper.title}
            slides={selectedPaper.slides} 
            isOpen={explainerOpen} 
            onClose={() => setExplainerOpen(false)} 
          />
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-bold text-2xl mb-2">Research Visualizer</div>
                <p className="text-sm">Explaining complex papers with interactive design.</p>
            </div>
             <button onClick={() => { window.scrollTo(0,0); setSelectedPaperId(null); }} className="text-sm hover:text-white transition-colors">
                Browse all visualizations
             </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
