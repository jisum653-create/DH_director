
import React, { useState } from 'react';
import { Lightbulb, ArrowLeft, Send } from 'lucide-react';

interface Props {
  onSubmit: (topic: string) => void;
  onBack: () => void;
}

const TopicInput: React.FC<Props> = ({ onSubmit, onBack }) => {
  const [topic, setTopic] = useState('');

  const suggestions = [
    "디지털 고독의 진화와 사회적 연결",
    "2024년 SNS 트렌드 속의 세대 갈등",
    "고전 예술을 통해 본 현대 환경 윤리",
    "AI 시대, 인간의 노동이 갖는 미래 가치",
    "K-컬처의 글로벌 확산과 문화적 정체성"
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="text-amber-500" />
        <h2 className="text-2xl font-bold text-slate-800">콘텐츠의 핵심 주제는 무엇인가요?</h2>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <textarea 
            className="w-full h-32 px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-lg resize-none"
            placeholder="기획하고 싶은 주제나 키워드를 입력해 주세요..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">추천 주제</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button 
                key={i}
                onClick={() => setTopic(s)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 font-medium hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            팀원 입력으로 돌아가기
          </button>
          
          <button 
            disabled={!topic.trim()}
            onClick={() => onSubmit(topic)}
            className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-white transition-all shadow-xl ${
              topic.trim() ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            기획안 생성하기
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicInput;
