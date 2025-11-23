import React from 'react';
import { HorrorCategory, GeneratorConfig } from '../types';
import { CATEGORY_LABELS } from '../constants';

interface Props {
  config: GeneratorConfig;
  onChange: (newConfig: GeneratorConfig) => void;
  onGenerate: () => void;
  loading: boolean;
}

const GeneratorControls: React.FC<Props> = ({ config, onChange, onGenerate, loading }) => {
  const handleChange = (field: keyof GeneratorConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-2xl mb-8 relative overflow-hidden">
       {/* Decorative blood splatter effect css could go here, keeping it clean for now */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-red-500 font-bold tracking-widest text-sm uppercase">
            Select Nightmare Type
          </label>
          <select
            value={config.category}
            onChange={(e) => handleChange('category', e.target.value as HorrorCategory)}
            className="w-full bg-slate-950 text-slate-300 border border-slate-700 rounded p-3 focus:border-red-600 focus:outline-none transition-colors"
          >
            {Object.values(HorrorCategory).map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-red-500 font-bold tracking-widest text-sm uppercase">
            Specific Fears (Optional)
          </label>
          <input
            type="text"
            value={config.promptModifier}
            onChange={(e) => handleChange('promptModifier', e.target.value)}
            placeholder="e.g., submerged, dolls, freezing cold..."
            className="w-full bg-slate-950 text-slate-300 border border-slate-700 rounded p-3 focus:border-red-600 focus:outline-none transition-colors placeholder-slate-700"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-6">
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={config.generateImage}
              onChange={(e) => handleChange('generateImage', e.target.checked)}
              className="w-4 h-4 accent-red-600 bg-slate-950 border-slate-700 rounded"
            />
            <span className="text-slate-400 group-hover:text-red-400 transition-colors text-sm uppercase tracking-wider">Visualize</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={config.generateAudio}
              onChange={(e) => handleChange('generateAudio', e.target.checked)}
              className="w-4 h-4 accent-red-600 bg-slate-950 border-slate-700 rounded"
            />
            <span className="text-slate-400 group-hover:text-red-400 transition-colors text-sm uppercase tracking-wider">Auditory Hallucination</span>
          </label>
        </div>

        <button
          onClick={onGenerate}
          disabled={loading}
          className={`
            px-8 py-3 font-bold tracking-widest uppercase text-sm rounded transition-all duration-300
            ${loading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-red-900 hover:bg-red-700 text-white hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]'
            }
          `}
        >
          {loading ? 'Manifesting...' : 'Invoke Horror'}
        </button>
      </div>
    </div>
  );
};

export default GeneratorControls;
