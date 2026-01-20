
import React, { useState } from 'react';
import { AppStep, TeamMember, ProposalContent } from './types';
import { generateProposal } from './services/geminiService';
import MemberInput from './components/MemberInput';
import TopicInput from './components/TopicInput';
import ProposalDisplay from './components/ProposalDisplay';
import { Loader2, Sparkles, Users } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.MEMBERS);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [topic, setTopic] = useState('');
  const [proposal, setProposal] = useState<ProposalContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartPlanning = async (selectedTopic: string) => {
    setTopic(selectedTopic);
    setIsLoading(true);
    setStep(AppStep.PLANNING);
    try {
      const result = await generateProposal(selectedTopic, members);
      setProposal(result);
      setStep(AppStep.RESULT);
    } catch (error) {
      console.error("Failed to generate proposal:", error);
      alert("기획안 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setStep(AppStep.TOPIC);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep(AppStep.MEMBERS);
    setMembers([]);
    setTopic('');
    setProposal(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="max-w-4xl w-full text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
          <Sparkles size={16} />
          <span>AI 기반 콘텐츠 전략 수립</span>
        </div>
        <h1 className="text-5xl font-bold serif tracking-tight text-slate-900 mb-4">
          인문학 <span className="text-indigo-600">x</span> 데이터
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          사회적 데이터 트렌드와 깊은 인문학적 가치를 결합하여 사람들의 마음을 움직이는 콘텐츠를 기획합니다.
        </p>
      </header>

      <main className="max-w-4xl w-full">
        {step === AppStep.MEMBERS && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <MemberInput 
              onComplete={(m) => {
                setMembers(m);
                setStep(AppStep.TOPIC);
              }} 
            />
          </div>
        )}

        {step === AppStep.TOPIC && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TopicInput 
              onSubmit={handleStartPlanning}
              onBack={() => setStep(AppStep.MEMBERS)}
            />
          </div>
        )}

        {step === AppStep.PLANNING && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-xl border border-slate-100">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">인사이트를 합성하는 중입니다</h2>
            <div className="text-slate-500 text-center space-y-2">
              <p>유튜브 댓글과 SNS 트렌드를 분석 중...</p>
              <p>역사적 맥락과 뉴스 기사를 수집 중...</p>
              <p>{members.map(m => m.major).join(', ')}의 관점을 반영 중...</p>
            </div>
          </div>
        )}

        {step === AppStep.RESULT && proposal && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <ProposalDisplay proposal={proposal} members={members} onReset={reset} />
          </div>
        )}
      </main>

      <footer className="mt-20 text-slate-400 text-sm pb-8">
        &copy; 2024 창의적 AI 기획 스튜디오. 기술을 통한 깊은 통찰.
      </footer>
    </div>
  );
};

export default App;
