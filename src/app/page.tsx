'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { SeatShareChart } from '@/components/charts/SeatShareChart';
import { VoteShareChart } from '@/components/charts/VoteShareChart';
import { HistoricalTrendChart } from '@/components/charts/HistoricalTrendChart';
import { IndiaMap } from '@/components/charts/IndiaMap';
import { LeaderAvatar } from '@/components/ui/LeaderAvatar';
import { ElectionData, LeaderInfo } from '@/lib/mockData';
import { Users, Vote, CheckCircle2, Clock, ShieldCheck, Landmark } from 'lucide-react';

const LeaderCard = ({ leader }: { leader: LeaderInfo }) => {
  const partyColor = leader.party === 'BJP' ? '#FF9933' : (leader.party === 'INC' ? '#19AAED' : '#6366F1');
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-700 transition-all hover:shadow-md">
      <LeaderAvatar name={leader.name} image={leader.image} partyColor={partyColor} size="lg" />
      <div>
        <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{leader.name}</div>
        <div className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">{leader.designation}</div>
        {leader.party && <div className="text-[10px] font-bold mt-0.5" style={{ color: partyColor }}>{leader.party}</div>}
      </div>
    </div>
  );
};

export default function Home() {
  const [activeHouse, setActiveHouse] = useState<'LS' | 'RS'>('LS');
  const [data, setData] = useState<ElectionData | null>(null);
  const [historical, setHistorical] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveRes, histRes] = await Promise.all([
          fetch('/api/elections/live'),
          fetch('/api/elections/historical')
        ]);
        
        const liveData = await liveRes.json();
        const histData = await histRes.json();
        
        setData(liveData);
        setHistorical(histData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!data) return null;

  const houseData = activeHouse === 'LS' ? data : {
    totalSeats: data.rajyaSabha?.totalSeats || 245,
    declaredSeats: data.rajyaSabha?.totalSeats || 245,
    results: data.rajyaSabha?.results || []
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Parliament of India Dashboard</h1>
          <p className="text-zinc-500 flex items-center gap-2 mt-1">
            <Clock size={14} />
            Final Declared Results - {new Date(data.lastUpdated).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 w-fit">
          <button
            onClick={() => setActiveHouse('LS')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeHouse === 'LS' ? 'bg-white dark:bg-zinc-900 shadow-sm text-indigo-600' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50'}`}
          >
            Lok Sabha
          </button>
          <button
            onClick={() => setActiveHouse('RS')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeHouse === 'RS' ? 'bg-white dark:bg-zinc-900 shadow-sm text-indigo-600' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50'}`}
          >
            Rajya Sabha
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              title="Total Seats"
              value={houseData.totalSeats}
              icon={<Users size={20} />}
              description={activeHouse === 'LS' ? "Lower House of Parliament" : "Upper House of Parliament"}
            />
            <Card
              title="Status"
              value="Declared"
              icon={<CheckCircle2 size={20} />}
              description={`All ${houseData.totalSeats} seats finalized`}
            />
            <Card
              title="Majority Mark"
              value={Math.floor(houseData.totalSeats / 2) + 1}
              icon={<Vote size={20} />}
              description="Seats needed for majority"
            />
            <Card
              title="Leading Party"
              value={houseData.results[0].party}
              icon={<div className="w-2 h-2 rounded-full" style={{ backgroundColor: houseData.results[0].color }} />}
              description={`${houseData.results[0].seats} seats won`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <Landmark size={18} className="text-indigo-500" />
                House Composition
              </h3>
              <SeatShareChart data={houseData.results} />
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <Vote size={18} className="text-indigo-500" />
                {activeHouse === 'LS' ? 'Vote Share %' : 'Party-wise Distribution (%)'}
              </h3>
              <VoteShareChart data={houseData.results} />
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <ShieldCheck size={18} className="text-indigo-500" />
            National Leadership
          </h3>
          <div className="space-y-4">
            <LeaderCard leader={data.governance.national.president} />
            <LeaderCard leader={data.governance.national.primeMinister} />
            <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Key Cabinet Ministers</div>
              <div className="space-y-3">
                {data.governance.national.cabinet.map((m, i) => {
                  const partyColor = m.party === 'BJP' ? '#FF9933' : '#6366F1';
                  return (
                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors">
                      <LeaderAvatar name={m.name} image={m.image} partyColor={partyColor} size="sm" />
                      <div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{m.name}</div>
                        <div className="text-[9px] text-zinc-500">{m.designation}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeHouse === 'LS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <IndiaMap />
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm h-full">
            <h3 className="text-lg font-semibold mb-6 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <Clock size={18} className="text-indigo-500" />
              Historical Performance
            </h3>
            <p className="text-sm text-zinc-500 mb-8">Comparison of seats won by major parties over the last 3 general elections.</p>
            <HistoricalTrendChart data={historical} />
          </div>
        </div>
      )}
      
      {activeHouse === 'RS' && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">About Rajya Sabha</h3>
            <p className="text-zinc-500 leading-relaxed mb-6">
              The Rajya Sabha or Council of States is the upper house of the bicameral Parliament of India. 
              Membership is limited to 250 members, 238 of whom are elected by the legislatures of the states 
              and union territories using single transferable votes through proportional representation, 
              while the President appoints 12 members for their contributions to art literature science and social services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-700">
                <div className="text-sm font-semibold text-zinc-400 uppercase mb-1">Elected Members</div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">233</div>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-700">
                <div className="text-sm font-semibold text-zinc-400 uppercase mb-1">Nominated Members</div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">12</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
