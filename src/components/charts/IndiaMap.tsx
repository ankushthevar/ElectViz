'use client';

import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { stateWiseResults, mockStateDetails, StateDetail } from '@/lib/mockData';
import { ArrowLeft, MapPin, Users, Trophy, Scale, Briefcase } from 'lucide-react';

const INDIA_TOPO_JSON = 'https://raw.githubusercontent.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json';

const partyColors: Record<string, string> = {
  'BJP': '#FF9933',
  'INC': '#19AAED',
  'SP': '#27AE60',
  'TMC': '#20B2AA',
  'DMK': '#FF0000',
  'TDP': '#FFEB3B',
  'YSRCP': '#003366',
  'SHS': '#F39C12',
  'SS(UBT)': '#F39C12',
  'NCP': '#00FF00',
  'NCP(SP)': '#2ECC71',
  'AAP': '#00ADEE',
  'JD(U)': '#003399',
  'BJD': '#006400',
  'CPM': '#D21D24',
  'CPI': '#D21D24',
  'AIMIM': '#00593E',
  'SAD': '#0000FF',
  'VPP': '#7B1FA2',
  'SKM': '#FF00FF',
  'ZPM': '#FF4500',
  'OTH': '#A9A9A9',
};

const colorScale = scaleQuantile<string>()
  .domain(stateWiseResults.map(d => d.totalSeats))
  .range([
    "#eff6ff",
    "#dbeafe",
    "#bfdbfe",
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
    "#1e40af",
  ]);

export const IndiaMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<any | null>(null);

  const stateDetail = useMemo(() => 
    selectedState ? mockStateDetails[selectedState] || null : null
  , [selectedState]);

  const handleStateClick = (geo: any) => {
    const stateId = geo.id || geo.properties.name || geo.properties.ST_NM;
    setSelectedState(stateId);
  };

  if (selectedState) {
    return (
      <div className="relative w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm overflow-hidden min-h-[600px] animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setSelectedState(null)}
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to India Map</span>
          </button>
          <div className="text-right">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{stateDetail?.name || selectedState}</h3>
            <p className="text-zinc-500">Parliamentary Constituencies Detail</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {stateDetail?.governance && (
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                  <Scale size={14} className="text-indigo-500" />
                  State Governance
                </h4>
import { LeaderAvatar } from '@/components/ui/LeaderAvatar';
...
                <div className="space-y-4">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-700 flex items-center gap-3">
                    <LeaderAvatar 
                      name={stateDetail.governance.chiefMinister.name} 
                      image={stateDetail.governance.chiefMinister.image} 
                      partyColor={partyColors[stateDetail.governance.chiefMinister.party || ''] || '#6366F1'} 
                      size="md" 
                    />
                    <div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase mb-0.5">Chief Minister</div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{stateDetail.governance.chiefMinister.name}</div>
                      <div className="text-[10px] text-orange-500 font-bold mt-0.5">{stateDetail.governance.chiefMinister.party}</div>
                    </div>
                  </div>
                  
                  {stateDetail.governance.deputyCMs && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-zinc-400 uppercase">Deputy CMs</div>
                      <div className="grid grid-cols-1 gap-2">
                        {stateDetail.governance.deputyCMs.map((d, i) => (
                          <div key={i} className="text-xs font-semibold px-2 py-1.5 bg-zinc-50 dark:bg-zinc-800/50 rounded border border-zinc-100 dark:border-zinc-700">
                            {d.name} <span className="text-[10px] text-zinc-400 ml-1">({d.party})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase mb-3 flex items-center gap-1">
                      <Briefcase size={10} />
                      Cabinet Ministers
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {stateDetail.governance.cabinet.map((m, i) => (
                        <div key={i} className="flex justify-between items-start text-xs border-b border-zinc-50 dark:border-zinc-800 pb-2 last:border-0">
                          <div>
                            <div className="font-bold text-zinc-800 dark:text-zinc-200">{m.name}</div>
                            <div className="text-[10px] text-zinc-500">{m.designation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 border border-zinc-100 dark:border-zinc-700">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">State Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Total Seats</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-50">{stateDetail?.totalSeats || stateWiseResults.find(s => s.id === selectedState)?.totalSeats || 'N/A'}</span>
                </div>
                {stateDetail?.results.map(res => (
                  <div key={res.party} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">{res.party}</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-50">{res.seats}</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${(res.seats / (stateDetail?.totalSeats || 1)) * 100}%`,
                          backgroundColor: res.color 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {stateDetail?.constituencies && (
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 border border-zinc-100 dark:border-zinc-700">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">Key Contests</h4>
                <div className="space-y-3">
                  {stateDetail.constituencies.map(c => (
                    <div key={c.id} className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50">{c.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${c.status === 'won' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {c.status}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-500 mb-2">{c.candidate}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: partyColors[c.party] || '#A9A9A9' }} />
                        <span className="text-xs font-semibold">{c.party}</span>
                        <span className="text-[10px] text-zinc-400 ml-auto">Margin: {c.margin.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-zinc-100 dark:border-zinc-700 h-full">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-6 flex items-center gap-2">
                <MapPin size={14} />
                Parliament Seat Map (Constituencies)
              </h4>
              
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {Array.from({ length: stateDetail?.totalSeats || stateWiseResults.find(s => s.id === selectedState)?.totalSeats || 0 }).map((_, i) => {
                  const constituency = stateDetail?.constituencies[i];
                  return (
                    <div 
                      key={i}
                      className="aspect-square rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-sm transition-transform hover:scale-110 cursor-help relative group"
                      style={{ 
                        backgroundColor: constituency ? (partyColors[constituency.party] || '#A9A9A9') : '#E4E4E7'
                      }}
                    >
                      {i + 1}
                      {constituency && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-40 bg-zinc-900 text-white p-2 rounded shadow-xl text-xs">
                          <div className="font-bold mb-1">{constituency.name}</div>
                          <div className="flex justify-between">
                            <span>{constituency.party}</span>
                            <span>{constituency.status}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                {Object.entries(partyColors).map(([party, color]) => (
                  <div key={party} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                    <span className="text-[10px] font-medium text-zinc-500">{party}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm overflow-hidden">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">National Map View</h3>
          <p className="text-sm text-zinc-500">Click on a state to see detailed constituency results.</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-zinc-400 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: partyColors['BJP'] }} />
            <span>NDA Leading</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: partyColors['INC'] }} />
            <span>INDIA Leading</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: partyColors['OTH'] }} />
            <span>Others</span>
          </div>
        </div>
      </div>
      
      <div className="h-[600px] flex items-center justify-center">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1000,
            center: [82, 22]
          }}
          className="w-full h-full"
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateId = geo.id || geo.properties.name || geo.properties.ST_NM;
                const stateData = stateWiseResults.find(s => 
                  s.id === stateId || 
                  s.name === geo.properties.name || 
                  s.name === geo.properties.ST_NM
                );
                const isHovered = hoveredState?.id === stateId;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleStateClick(geo)}
                    onMouseEnter={() => {
                      setHoveredState({ id: stateId, properties: geo.properties, data: stateData });
                    }}
                    onMouseLeave={() => {
                      setHoveredState(null);
                    }}
                    style={{
                      default: {
                        fill: stateData?.leading ? (partyColors[stateData.leading] || "#F5F5F5") : "#F5F5F5",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: 'all 250ms'
                      },
                      hover: {
                        fill: "#4F46E5",
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: "#3730A3",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-700">
        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mr-2">Map Legend:</div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: partyColors['BJP'] }} />
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">NDA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: partyColors['INC'] }} />
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">INDIA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: partyColors['SP'] }} />
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">SP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: partyColors['TMC'] }} />
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">TMC</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: partyColors['OTH'] }} />
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Others</span>
        </div>
      </div>
      
      {hoveredState && (
        <div className="absolute bottom-6 left-6 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 min-w-[200px] animate-in fade-in slide-in-from-left-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-amber-500" />
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{hoveredState.properties.name || hoveredState.properties.ST_NM}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Total Seats</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">{hoveredState.data?.totalSeats || 'N/A'}</span>
            </div>
            {hoveredState.data?.leading && (
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Leading</span>
                <span className="font-bold" style={{ color: partyColors[hoveredState.data.leading] }}>{hoveredState.data.leading}</span>
              </div>
            )}
            <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-700 text-[10px] text-zinc-400 italic">
              Click to view constituencies
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
