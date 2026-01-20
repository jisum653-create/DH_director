
import React from 'react';
import { ProposalContent, TeamMember } from '../types';
import { 
  BarChart3, 
  Book, 
  Video, 
  Newspaper, 
  History, 
  Hash,
  RefreshCw,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface Props {
  proposal: ProposalContent;
  members: TeamMember[];
  onReset: () => void;
}

const ProposalDisplay: React.FC<Props> = ({ proposal, members, onReset }) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header Summary */}
      <div className="bg-white rounded-3xl p-10 shadow-xl border-l-8 border-l-indigo-600 border border-slate-100">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-4xl font-bold serif text-slate-900 leading-tight">
            {proposal.title}
          </h2>
          <button 
            onClick={onReset}
            className="flex items-center gap-2 p-2 px-4 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors text-sm"
          >
            <RefreshCw size={16} />
            새로 만들기
          </button>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-widest mb-1">기획 의도 (Intent)</h3>
            <p className="text-slate-700 leading-relaxed">{proposal.intent}</p>
          </div>
        </div>
      </div>

      {/* Grid: Data Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-800">데이터적 근거 (Data Evidence)</h3>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                <Video size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-700 text-sm mb-1">YouTube 여론 분석</h4>
                <p className="text-sm text-slate-600">{proposal.dataInsight.youtube}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <Newspaper size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-700 text-sm mb-1">뉴스 및 사회 트렌드</h4>
                <p className="text-sm text-slate-600">{proposal.dataInsight.news}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                <Hash size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-700 text-sm mb-1">SNS 실시간 반응</h4>
                <p className="text-sm text-slate-600">{proposal.dataInsight.sns}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                <History size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-700 text-sm mb-1">역사적 맥락과 배경</h4>
                <p className="text-sm text-slate-600">{proposal.dataInsight.history}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Book className="text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-800">인문학적 통찰 (Humanities Value)</h3>
          </div>
          <div className="flex-1 p-6 rounded-2xl bg-slate-50 border border-slate-100 italic text-slate-700 leading-relaxed text-lg">
            "{proposal.humanitiesValue}"
          </div>
          <div className="mt-6 space-y-3">
             <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                <CheckCircle2 size={16} />
                설득력 평가: 우수
             </div>
             <p className="text-xs text-slate-500">{proposal.persuasiveness}</p>
          </div>
        </section>
      </div>

      {/* Creative Concept */}
      <section className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          {proposal.creativeConcept.format === 'Video' ? <Video size={120} /> : <Book size={120} />}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-amber-400 fill-amber-400" />
            <h3 className="text-2xl font-bold tracking-tight">AI {proposal.creativeConcept.format === 'Video' ? '영상' : '스토리북'} 제작 계획</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h4 className="text-amber-400 font-bold text-sm uppercase mb-2 tracking-widest">주요 구성 및 스토리 (Storyline)</h4>
                <p className="text-slate-300 leading-relaxed text-lg">{proposal.creativeConcept.storyline}</p>
              </div>
              <div>
                <h4 className="text-amber-400 font-bold text-sm uppercase mb-2 tracking-widest">시각적 스타일 (Visual Style)</h4>
                <p className="text-slate-300">{proposal.creativeConcept.visualStyle}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-indigo-400 font-bold text-sm uppercase mb-4 tracking-widest">팀원 전공 역량 시너지</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{proposal.creativeConcept.teamUtilization}</p>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {members.map(m => (
                    <span key={m.id} className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                      {m.major}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <h4 className="text-amber-400 font-bold text-sm uppercase mb-2 tracking-widest">독창성 포인트 (Innovation)</h4>
                <p className="text-slate-200 text-sm">{proposal.originality}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center pt-8">
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          PDF로 기획안 내보내기
        </button>
      </div>
    </div>
  );
};

export default ProposalDisplay;
