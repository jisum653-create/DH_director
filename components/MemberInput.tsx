
import React, { useState } from 'react';
import { TeamMember } from '../types';
import { UserPlus, Trash2, Users, ArrowRight } from 'lucide-react';

interface Props {
  onComplete: (members: TeamMember[]) => void;
}

const MemberInput: React.FC<Props> = ({ onComplete }) => {
  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', major: '', strength: '' }
  ]);

  const addMember = () => {
    setMembers([...members, { id: Date.now().toString(), major: '', strength: '' }]);
  };

  const removeMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const updateMember = (id: string, field: keyof TeamMember, value: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const isValid = members.every(m => m.major.trim() && m.strength.trim());

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-indigo-600" />
        <h2 className="text-2xl font-bold text-slate-800">팀원의 전공과 강점을 알려주세요</h2>
      </div>
      
      <p className="text-slate-600 mb-8">
        각 팀원의 전문 지식을 입력해 주세요. 모든 팀원의 능력을 최대한 활용할 수 있는 맞춤형 전략을 제안해 드립니다.
      </p>

      <div className="space-y-4 mb-8">
        {members.map((m, index) => (
          <div key={m.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="md:col-span-1 flex items-center justify-center font-bold text-slate-400">
              #{index + 1}
            </div>
            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">전공 학과</label>
              <input 
                type="text"
                placeholder="예: 심리학과, 데이터사이언스"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                value={m.major}
                onChange={(e) => updateMember(m.id, 'major', e.target.value)}
              />
            </div>
            <div className="md:col-span-6 space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">주요 강점 / 전문 역량</label>
              <input 
                type="text"
                placeholder="예: 사용자 감정 분석, 통계 모델링"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                value={m.strength}
                onChange={(e) => updateMember(m.id, 'strength', e.target.value)}
              />
            </div>
            <div className="md:col-span-1 flex justify-center pb-1">
              <button 
                onClick={() => removeMember(m.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <button 
          onClick={addMember}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
        >
          <UserPlus size={18} />
          팀원 추가
        </button>

        <button 
          disabled={!isValid}
          onClick={() => onComplete(members)}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
            isValid ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-slate-300 cursor-not-allowed shadow-none'
          }`}
        >
          주제 선정 단계로
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default MemberInput;
