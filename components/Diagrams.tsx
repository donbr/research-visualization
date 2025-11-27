
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity, Cpu, BarChart2, Database, Brain, Clock, ArrowRight, Search, FileText, GitMerge, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

// --- SURFACE CODE DIAGRAM ---
export const SurfaceCodeDiagram: React.FC = () => {
  // 3x3 grid of data qubits (9 total)
  // Interspersed with 4 stabilizers (checkers)
  const [errors, setErrors] = useState<number[]>([]);
  
  // Map data qubit indices (0-8) to affected stabilizers (0-3)
  // Layout:
  // D0  S0  D1
  // S1  D4  S2
  // D3  S3  D5
  // (Simplified layout for viz)
  
  // Adjacency list: DataQubit Index -> Stabilizer Indices
  const adjacency: Record<number, number[]> = {
    0: [0, 1],
    1: [0, 2],
    2: [1, 3],
    3: [2, 3],
    4: [0, 1, 2, 3], // Center affects all in this simplified tightly packed model
  };

  const toggleError = (id: number) => {
    setErrors(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  // Calculate active stabilizers based on parity (even errors = off, odd errors = on)
  const activeStabilizers = [0, 1, 2, 3].filter(stabId => {
    let errorCount = 0;
    Object.entries(adjacency).forEach(([dataId, stabs]) => {
        if (errors.includes(parseInt(dataId)) && stabs.includes(stabId)) {
            errorCount++;
        }
    });
    return errorCount % 2 !== 0;
  });

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">Interactive: Surface Code Detection</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        Click the grey <strong>Data Qubits</strong> to inject errors. Watch the colored <strong>Stabilizers</strong> light up when they detect an odd number of errors.
      </p>
      
      <div className="relative w-64 h-64 bg-[#F5F4F0] rounded-lg border border-stone-200 p-4 flex flex-wrap justify-between content-between relative">
         {/* Grid Lines */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
            <div className="w-2/3 h-2/3 border border-stone-400"></div>
            <div className="absolute w-full h-[1px] bg-stone-400"></div>
            <div className="absolute h-full w-[1px] bg-stone-400"></div>
         </div>

         {/* Stabilizers (Z=Blue, X=Red) - positioned absolutely for control */}
         {[
             {id: 0, x: '50%', y: '20%', type: 'Z', color: 'bg-blue-500'},
             {id: 1, x: '20%', y: '50%', type: 'X', color: 'bg-red-500'},
             {id: 2, x: '80%', y: '50%', type: 'X', color: 'bg-red-500'},
             {id: 3, x: '50%', y: '80%', type: 'Z', color: 'bg-blue-500'},
         ].map(stab => (
             <motion.div
                key={`stab-${stab.id}`}
                className={`absolute w-10 h-10 -ml-5 -mt-5 flex items-center justify-center text-white text-xs font-bold rounded-sm shadow-sm transition-all duration-300 ${activeStabilizers.includes(stab.id) ? stab.color + ' opacity-100 scale-110 ring-4 ring-offset-2 ring-stone-200' : 'bg-stone-300 opacity-40'}`}
                style={{ left: stab.x, top: stab.y }}
             >
                 {stab.type}
             </motion.div>
         ))}

         {/* Data Qubits */}
         {[
             {id: 0, x: '20%', y: '20%'}, {id: 1, x: '80%', y: '20%'},
             {id: 4, x: '50%', y: '50%'}, // Center
             {id: 2, x: '20%', y: '80%'}, {id: 3, x: '80%', y: '80%'},
         ].map(q => (
             <button
                key={`data-${q.id}`}
                onClick={() => toggleError(q.id)}
                className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 ${errors.includes(q.id) ? 'bg-stone-800 border-stone-900 text-nobel-gold' : 'bg-white border-stone-300 hover:border-stone-500'}`}
                style={{ left: q.x, top: q.y }}
             >
                {errors.includes(q.id) && <Activity size={14} />}
             </button>
         ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-stone-800"></div> Error</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-blue-500"></div> Z-Check</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-red-500"></div> X-Check</div>
      </div>
      
      <div className="mt-4 h-6 text-sm font-serif italic text-stone-600">
        {errors.length === 0 ? "System is stable." : `Detected ${activeStabilizers.length} parity violations.`}
      </div>
    </div>
  );
};

// --- TRANSFORMER DECODER DIAGRAM ---
export const TransformerDecoderDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">AlphaQubit Architecture</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        The model processes syndrome history using a recurrent transformer, attending to spatial and temporal correlations.
      </p>

      <div className="relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-8 p-4">
        
        {/* Input Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 0 ? 'border-nobel-gold bg-nobel-gold/10' : 'border-stone-200 bg-stone-50'}`}>
                <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${Math.random() > 0.7 ? 'bg-stone-800' : 'bg-stone-300'}`}></div>)}
                </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Syndrome</span>
        </div>

        {/* Arrows */}
        <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3, x: step >= 1 ? 0 : -5 }}>→</motion.div>

        {/* Transformer Stage */}
        <div className="flex flex-col items-center gap-2">
             <div className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden ${step === 1 || step === 2 ? 'border-stone-800 bg-stone-900 text-white' : 'border-stone-200 bg-stone-50'}`}>
                <Cpu size={24} className={step === 1 || step === 2 ? 'text-nobel-gold animate-pulse' : 'text-stone-300'} />
                {step === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[1px] bg-nobel-gold absolute top-1/3 animate-ping"></div>
                        <div className="w-full h-[1px] bg-nobel-gold absolute top-2/3 animate-ping delay-75"></div>
                    </div>
                )}
             </div>
             <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Transformer</span>
        </div>

        {/* Arrows */}
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3, x: step >= 3 ? 0 : -5 }}>→</motion.div>

        {/* Output Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 3 ? 'border-green-500 bg-green-50' : 'border-stone-200 bg-stone-50'}`}>
                {step === 3 ? (
                    <span className="text-2xl font-serif text-green-600">X</span>
                ) : (
                    <span className="text-2xl font-serif text-stone-300">?</span>
                )}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Correction</span>
        </div>

      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-nobel-gold' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- PERFORMANCE CHART ---
export const PerformanceMetricDiagram: React.FC = () => {
    const [distance, setDistance] = useState<3 | 5 | 11>(5);
    
    // Values represent Logical Error Rate (approx %).
    // Lower is better.
    // Updated with correct Paper values:
    // Dist 3: MWPM 3.5%, Alpha 2.9%
    // Dist 5: MWPM 3.6%, Alpha 2.75%
    // Dist 11: MWPM ~0.0041%, Alpha ~0.0009% (Based on paper's hard input simulation data)
    const data = {
        3: { mwpm: 3.5, alpha: 2.9 },
        5: { mwpm: 3.6, alpha: 2.75 },
        11: { mwpm: 0.0041, alpha: 0.0009 } 
    };

    const currentData = data[distance];
    // Normalize to max value of current set to visually fill the chart, with some headroom
    const maxVal = Math.max(currentData.mwpm, currentData.alpha) * 1.25;
    
    const formatValue = (val: number) => {
        if (val < 0.01) return val.toFixed(4) + '%';
        return val.toFixed(2) + '%';
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">Performance vs Standard</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    AlphaQubit consistently achieves lower logical error rates (LER) than the standard Minimum-Weight Perfect Matching (MWPM) decoder.
                </p>
                <div className="flex gap-2 mt-6">
                    {[3, 5, 11].map((d) => (
                        <button 
                            key={d}
                            onClick={() => setDistance(d as any)} 
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${distance === d ? 'bg-nobel-gold text-stone-900 border-nobel-gold' : 'bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200'}`}
                        >
                            Distance {d}
                        </button>
                    ))}
                </div>
                <div className="mt-6 font-mono text-xs text-stone-500 flex items-center gap-2">
                    <BarChart2 size={14} className="text-nobel-gold" /> 
                    <span>LOGICAL ERROR RATE (LOWER IS BETTER)</span>
                </div>
            </div>
            
            <div className="relative w-64 h-72 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex justify-around items-end">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                </div>

                {/* MWPM Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                    <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-5 w-full text-center text-sm font-mono text-stone-400 font-bold bg-stone-900/90 py-1 px-2 rounded backdrop-blur-sm border border-stone-700/50 shadow-sm">{formatValue(currentData.mwpm)}</div>
                        <motion.div 
                            className="w-full bg-stone-600 rounded-t-md border-t border-x border-stone-500/30"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentData.mwpm / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                    </div>
                    <div className="h-6 flex items-center text-xs font-bold text-stone-500 uppercase tracking-wider">Standard</div>
                </div>

                {/* AlphaQubit Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-5 w-full text-center text-sm font-mono text-nobel-gold font-bold bg-stone-900/90 py-1 px-2 rounded backdrop-blur-sm border border-nobel-gold/30 shadow-sm">{formatValue(currentData.alpha)}</div>
                        <motion.div 
                            className="w-full bg-nobel-gold rounded-t-md shadow-[0_0_20px_rgba(197,160,89,0.25)] relative overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: Math.max(1, (currentData.alpha / maxVal) * 100) + '%' }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
                        >
                           {/* Shine effect */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                        </motion.div>
                    </div>
                     <div className="h-6 flex items-center text-xs font-bold text-nobel-gold uppercase tracking-wider">AlphaQubit</div>
                </div>
            </div>
        </div>
    )
}

// --- ZEP: TEMPORAL GRAPH DIAGRAM ---
export const TemporalGraphDiagram: React.FC = () => {
    const [timeline, setTimeline] = useState<'T1' | 'T2'>('T1');

    return (
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 my-8">
            <h3 className="text-xl font-bold mb-2 text-slate-900">Bi-Temporal Knowledge Graph</h3>
            <p className="text-sm text-slate-500 mb-6 text-center max-w-md">
                Resolving contradictions without deleting history. See how the memory evolves when the user changes their mind.
            </p>

            <div className="flex gap-4 mb-6">
                 <button 
                    onClick={() => setTimeline('T1')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${timeline === 'T1' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                 >
                    Sept 07: "I love Adidas"
                 </button>
                 <button 
                    onClick={() => setTimeline('T2')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${timeline === 'T2' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                 >
                    Oct 14: "I'll wear Nike"
                 </button>
            </div>

            <div className="relative w-full max-w-lg h-64 bg-slate-50 rounded-lg border border-slate-200 p-8 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode='wait'>
                    <motion.div className="flex items-center justify-between w-full relative z-10">
                        {/* USER NODE */}
                        <div className="flex flex-col items-center gap-2 z-20">
                            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center shadow-lg border-2 border-white">
                                <span className="text-white font-bold text-xs">Robbie</span>
                            </div>
                        </div>

                        {/* EDGES & TARGETS */}
                        <div className="flex-1 h-32 relative mx-8">
                            {/* ADIDAS EDGE */}
                            <motion.div 
                                className="absolute top-1/2 left-0 w-full flex items-center"
                                animate={{ 
                                    opacity: timeline === 'T1' ? 1 : 0.3,
                                    y: timeline === 'T2' ? -30 : 0,
                                    filter: timeline === 'T2' ? 'grayscale(100%)' : 'grayscale(0%)'
                                }}
                            >
                                <div className={`flex-1 h-1 ${timeline === 'T2' ? 'bg-slate-300 border-t border-b border-dashed border-slate-400 bg-transparent h-0.5' : 'bg-blue-500'}`}></div>
                                <ArrowRight size={16} className={timeline === 'T2' ? 'text-slate-300' : 'text-blue-500'} />
                                <div className={`absolute top-[-20px] left-1/2 -translate-x-1/2 text-[10px] font-mono bg-white px-2 py-0.5 rounded border ${timeline === 'T2' ? 'border-red-200 text-red-400' : 'border-blue-200 text-blue-600'}`}>
                                    {timeline === 'T1' ? 'LOVES' : 'INVALIDATED'}
                                </div>
                            </motion.div>
                            
                            {/* NIKE EDGE (Only visible in T2) */}
                             <motion.div 
                                className="absolute top-1/2 left-0 w-full flex items-center"
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                animate={{ 
                                    opacity: timeline === 'T2' ? 1 : 0,
                                    scale: timeline === 'T2' ? 1 : 0.8,
                                    y: 30
                                }}
                            >
                                <div className="flex-1 h-1 bg-blue-600"></div>
                                <ArrowRight size={16} className="text-blue-600" />
                                <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-600 shadow-sm">
                                    WILL_WEAR
                                </div>
                            </motion.div>
                        </div>

                        {/* BRAND NODES */}
                        <div className="flex flex-col gap-8 justify-center z-20">
                             <motion.div 
                                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md border-2 transition-colors duration-500 ${timeline === 'T1' ? 'bg-blue-600 border-white' : 'bg-slate-200 border-slate-300'}`}
                                animate={{ y: timeline === 'T2' ? -30 : 0 }}
                             >
                                <span className={`font-bold text-[10px] ${timeline === 'T1' ? 'text-white' : 'text-slate-500'}`}>Adidas</span>
                             </motion.div>

                             <motion.div 
                                className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-md border-2 border-white absolute right-0"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ 
                                    opacity: timeline === 'T2' ? 1 : 0,
                                    y: 30
                                }}
                             >
                                <span className="text-white font-bold text-[10px]">Nike</span>
                             </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            
             <div className="mt-6 grid grid-cols-2 gap-8 w-full max-w-md">
                <div className="flex items-start gap-2">
                    <Clock size={16} className="text-blue-500 mt-1" />
                    <div>
                        <div className="text-xs font-bold text-slate-700 uppercase">Valid Time</div>
                        <p className="text-[10px] text-slate-500 leading-tight">When the fact is true in the real world.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-2">
                    <Database size={16} className="text-slate-500 mt-1" />
                    <div>
                        <div className="text-xs font-bold text-slate-700 uppercase">Transaction Time</div>
                        <p className="text-[10px] text-slate-500 leading-tight">When the system recorded the fact.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- ZEP: PERFORMANCE CHART ---
export const ZepPerformanceDiagram: React.FC = () => {
    return (
         <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-slate-900 text-white rounded-xl my-8 border border-slate-800 shadow-lg overflow-hidden relative">
             <div className="absolute top-0 right-0 p-32 bg-blue-600 blur-[120px] opacity-20 rounded-full pointer-events-none"></div>

            <div className="flex-1 min-w-[240px] z-10">
                <h3 className="text-xl font-bold mb-2 text-white">Efficiency Breakthrough</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    Graphiti optimizes for rapid, precise retrieval without needing to re-process raw data at query time, drastically reducing latency and token usage compared to standard RAG.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
                        <div className="text-2xl font-bold text-blue-400 mb-1">90%</div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400">Lower Latency</div>
                    </div>
                     <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
                        <div className="text-2xl font-bold text-green-400 mb-1">98%</div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400">Fewer Tokens</div>
                    </div>
                </div>
            </div>
            
            <div className="relative w-full max-w-xs z-10">
                 <div className="flex flex-col gap-4">
                     {/* Latency Comparison */}
                     <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>Response Latency (gpt-4o)</span>
                            <span className="text-white font-mono">2.58s vs 28.9s</span>
                        </div>
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '9%' }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="bg-blue-500 h-full rounded-full relative group"
                            >
                                <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-1 left-0 bg-slate-800 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap">Zep: 2.58s</div>
                            </motion.div>
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '91%' }}
                                transition={{ duration: 1 }}
                                className="bg-red-500/30 h-full rounded-r-full relative group"
                            >
                                 <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-1 right-0 bg-slate-800 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap">RAG: 28.9s</div>
                            </motion.div>
                        </div>
                     </div>

                     {/* Token Comparison */}
                     <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>Context Tokens</span>
                            <span className="text-white font-mono">1.6k vs 115k</span>
                        </div>
                         <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '2%' }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="bg-green-500 h-full rounded-full relative group"
                            >
                                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-1 left-0 bg-slate-800 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap">Zep: 1.6k</div>
                            </motion.div>
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: '98%' }}
                                transition={{ duration: 1 }}
                                className="bg-red-500/30 h-full rounded-r-full relative group"
                            >
                                <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-1 right-0 bg-slate-800 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap">RAG: 115k</div>
                            </motion.div>
                        </div>
                     </div>
                 </div>
            </div>
        </div>
    );
}

// --- A-MEM: SELF-ORGANIZING DIAGRAM ---
export const ZettelkastenDiagram: React.FC = () => {
    // A simplified visual of nodes clustering
    const [nodes, setNodes] = useState<{id: number, x: number, y: number, color: string}[]>([
        { id: 1, x: 20, y: 30, color: 'bg-emerald-500' },
        { id: 2, x: 30, y: 40, color: 'bg-emerald-500' },
        { id: 3, x: 25, y: 20, color: 'bg-emerald-500' }, // Cluster 1
        { id: 4, x: 70, y: 60, color: 'bg-amber-500' },
        { id: 5, x: 80, y: 70, color: 'bg-amber-500' }, // Cluster 2
    ]);

    const addMemory = () => {
        // Add a new random node that moves to a cluster
        const type = Math.random() > 0.5 ? 'A' : 'B';
        const startX = 50;
        const startY = 50;
        const targetX = type === 'A' ? 25 + Math.random() * 20 : 75 + Math.random() * 20;
        const targetY = type === 'A' ? 30 + Math.random() * 20 : 65 + Math.random() * 20;
        const color = type === 'A' ? 'bg-emerald-500' : 'bg-amber-500';

        const newNode = { id: Date.now(), x: startX, y: startY, color };
        setNodes(prev => [...prev, newNode]);

        // Animate to position
        setTimeout(() => {
            setNodes(prev => prev.map(n => n.id === newNode.id ? { ...n, x: targetX, y: targetY } : n));
        }, 50);
    };

    return (
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-emerald-100 my-8">
            <div className="flex items-center justify-between w-full mb-6">
                <h3 className="text-xl font-bold text-emerald-900">Self-Organizing Memory</h3>
                <button 
                    onClick={addMemory}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors text-sm font-bold"
                >
                    <Activity size={16} /> New Memory
                </button>
            </div>
            
            <div className="relative w-full h-64 bg-emerald-50/50 rounded-lg border border-emerald-100 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                {/* Nodes */}
                {nodes.map(node => (
                    <motion.div
                        key={node.id}
                        layout
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ left: `${node.x}%`, top: `${node.y}%`, scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                        className={`absolute w-6 h-6 rounded-full ${node.color} shadow-sm border-2 border-white z-10`}
                    />
                ))}

                {/* Connecting lines for clusters (Visual fake) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                     <circle cx="25%" cy="30%" r="20%" fill="#10b981" />
                     <circle cx="75%" cy="65%" r="20%" fill="#f59e0b" />
                </svg>

                <div className="absolute bottom-4 left-4 text-xs text-emerald-600 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                    Active Clusters: 2
                </div>
            </div>
             <p className="text-sm text-emerald-800 mt-4 text-center">
                New memories (Zettels) automatically find and link to relevant semantic clusters.
            </p>
        </div>
    );
}

// --- DEEP RESEARCH DIAGRAM ---
export const DeepResearchDiagram: React.FC = () => {
    const [state, setState] = useState<'idle' | 'planning' | 'searching' | 'synthesizing'>('idle');

    const runSimulation = () => {
        setState('planning');
        setTimeout(() => setState('searching'), 1500);
        setTimeout(() => setState('synthesizing'), 3500);
        setTimeout(() => setState('idle'), 5000);
    }

    return (
        <div className="flex flex-col items-center p-8 bg-[#FAFAFA] rounded-xl shadow-sm border border-purple-200 my-8">
             <h3 className="text-xl font-bold mb-6 text-purple-900">Just-in-Time Memory Research</h3>
            
            <div className="relative w-full max-w-lg h-64 flex flex-col items-center justify-center gap-8">
                
                {/* User Query / Result */}
                <div className="z-10 relative">
                     <motion.div 
                        className={`w-48 h-12 rounded-full border-2 flex items-center justify-center gap-2 bg-white shadow-sm transition-colors duration-500 ${state === 'idle' ? 'border-purple-200' : 'border-purple-600'}`}
                     >
                        {state === 'idle' ? (
                            <span className="text-sm text-purple-900 font-medium">Complex Query</span>
                        ) : state === 'synthesizing' ? (
                            <span className="text-sm text-purple-900 font-bold animate-pulse">Synthesizing Answer...</span>
                        ) : (
                            <span className="text-sm text-purple-500 font-medium">Processing...</span>
                        )}
                     </motion.div>
                </div>

                {/* Workers */}
                <div className="flex gap-4 h-24 items-end relative w-full justify-center">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-12 h-12 rounded-lg bg-purple-100 border border-purple-300 flex items-center justify-center absolute"
                            initial={{ y: 0, x: 0, opacity: 0 }}
                            animate={{ 
                                opacity: state !== 'idle' ? 1 : 0,
                                y: state === 'searching' ? 40 : 0,
                                x: state === 'searching' ? (i - 2) * 60 : 0,
                                scale: state === 'synthesizing' ? 0 : 1
                            }}
                            transition={{ duration: 0.5 }}
                        >
                           <Search size={16} className="text-purple-600" />
                        </motion.div>
                    ))}
                    
                    {/* Database / History */}
                    <div className="absolute bottom-[-20px] w-full h-[2px] bg-purple-200"></div>
                    <div className="absolute bottom-[-40px] text-[10px] text-purple-400 uppercase tracking-widest">Raw Interaction History</div>
                </div>

            </div>

             <button 
                onClick={runSimulation}
                disabled={state !== 'idle'}
                className="mt-8 flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             >
                {state === 'idle' ? <><Play size={16} /> Run Research Simulation</> : 'Simulating...'}
             </button>
        </div>
    )
}

// --- REFLECTION LOOP DIAGRAM ---
export const ReflectionLoopDiagram: React.FC = () => {
    const [step, setStep] = useState(0); // 0: Action, 1: Error, 2: Critique, 3: Update, 4: Success

    const nextStep = () => {
        setStep(prev => (prev + 1) % 5);
    }

    const steps = [
        { label: "Action", icon: <Play size={20} />, color: "bg-orange-100 text-orange-600" },
        { label: "Failure", icon: <AlertTriangle size={20} />, color: "bg-red-100 text-red-600" },
        { label: "Reflection", icon: <Brain size={20} />, color: "bg-blue-100 text-blue-600" },
        { label: "Update", icon: <RefreshCw size={20} />, color: "bg-purple-100 text-purple-600" },
        { label: "Success", icon: <CheckCircle size={20} />, color: "bg-green-100 text-green-600" }
    ];

    const stepDetails = [
        {
            title: "Step 1: Agent Action",
            desc: "The agent generates code to solve the user's task.",
            code: "run_python(\"pandas.read_csv('data.csv')\")"
        },
        {
            title: "Step 2: Execution Failure",
            desc: "The environment halts execution due to an error.",
            code: "❌ FileNotFoundError: [Errno 2] No such file or directory: 'data.csv'",
            isError: true
        },
        {
            title: "Step 3: Self-Reflection",
            desc: "The agent generates a critique to understand why it failed.",
            code: "🤔 CRITIQUE: I assumed the file was in the root directory. I should have listed files first to verify the path.",
            isCritique: true
        },
        {
            title: "Step 4: Policy Update",
            desc: "The agent adds a new rule to its long-term memory.",
            code: "📝 Rule Added: 'Always run list_files() before reading specific files to avoid path errors.'"
        },
        {
            title: "Step 5: Retry & Success",
            desc: "The agent applies the new rule and succeeds.",
            code: "✅ list_files() -> 'data/2025/data.csv' -> read_csv(...)"
        }
    ];

    return (
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-orange-100 my-8 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-8 text-orange-900">Iterative Self-Correction</h3>
            
            <div className="relative w-64 h-64 mb-6">
                {/* Circular Path */}
                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#fed7aa" strokeWidth="4" />
                    <motion.circle 
                        cx="50%" cy="50%" r="45%" fill="none" stroke="#f97316" strokeWidth="4"
                        strokeDasharray="283" // 2 * PI * 45
                        animate={{ strokeDashoffset: 283 - (283 * (step + 1)) / 5 }}
                        transition={{ duration: 0.5 }}
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8">
                     <AnimatePresence mode="wait">
                        <motion.div 
                            key={step}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center"
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${steps[step].color}`}>
                                {steps[step].icon}
                            </div>
                            <div className="font-bold text-slate-800">{steps[step].label}</div>
                        </motion.div>
                     </AnimatePresence>
                </div>
            </div>

            {/* Info Box */}
            <div className="w-full bg-stone-50 rounded-lg border border-stone-200 p-5 min-h-[140px] transition-all duration-300 relative overflow-hidden">
                <AnimatePresence mode="wait">
                     <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative z-10"
                     >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">{stepDetails[step].title}</span>
                        </div>
                        <p className="text-sm text-stone-800 mb-3 font-medium">{stepDetails[step].desc}</p>
                        <div className={`font-mono text-xs p-3 rounded border overflow-x-auto ${stepDetails[step].isError ? 'bg-red-50 border-red-200 text-red-700' : stepDetails[step].isCritique ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-stone-200 text-stone-600'}`}>
                            {stepDetails[step].code}
                        </div>
                     </motion.div>
                </AnimatePresence>
            </div>

            <button 
                onClick={nextStep}
                className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-transform active:scale-95"
            >
                {step === 4 ? "Reset Loop" : "Next Step"}
            </button>
        </div>
    )
}
