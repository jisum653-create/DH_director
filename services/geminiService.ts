
import { GoogleGenAI, Type } from "@google/genai";
import { ProposalContent, TeamMember } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateProposal = async (
  topic: string,
  members: TeamMember[]
): Promise<ProposalContent> => {
  const model = "gemini-3-pro-preview";
  
  const memberContext = members
    .map((m, i) => `팀원 ${i + 1} (전공: ${m.major}): ${m.strength}`)
    .join("\n");

  const prompt = `
    다음 내용을 바탕으로 데이터 분석과 인문학적 통찰이 결합된 창의적인 콘텐츠 기획안을 작성해 주세요. 
    **모든 답변은 반드시 한국어로 작성해야 합니다.**

    주제: "${topic}"
    팀 구성 및 역량:
    ${memberContext}

    기획안 구성 요건:
    1. 유튜브 댓글, 뉴스 기사, SNS 텍스트, 역사적 자료를 바탕으로 한 데이터적 근거를 포함할 것.
    2. 주제가 인간의 본성, 가치, 윤리 등 인문학적으로 어떤 의미를 갖는지 깊이 있게 다룰 것.
    3. AI를 활용한 영상(Video) 또는 스토리북(Storybook) 형식 중 하나를 선택하여 구체적인 실행 계획을 제안할 것.
    4. 각 팀원의 전공 특성과 강점이 기획안의 구체적인 부분에 어떻게 반영되었는지 명시할 것.

    데이터 소스별 상세 분석 가이드:
    - YouTube: 대중의 여론과 주요 키워드 분석
    - News: 현재 사회적 트렌드 및 이슈 식별
    - SNS: 실시간 감정 변화 및 유행어 포착
    - History: 장기적 관점의 시대적 배경 또는 역사적 선례 제공

    응답은 반드시 지정된 JSON 형식으로만 작성해 주세요.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "기획안 제목" },
          intent: { type: Type.STRING, description: "기획 의도" },
          dataInsight: {
            type: Type.OBJECT,
            properties: {
              youtube: { type: Type.STRING, description: "유튜브 데이터 분석 내용" },
              news: { type: Type.STRING, description: "뉴스 데이터 분석 내용" },
              sns: { type: Type.STRING, description: "SNS 데이터 분석 내용" },
              history: { type: Type.STRING, description: "역사 자료 분석 내용" },
            },
            required: ["youtube", "news", "sns", "history"]
          },
          humanitiesValue: { type: Type.STRING, description: "인문학적 가치 및 성찰" },
          creativeConcept: {
            type: Type.OBJECT,
            properties: {
              format: { type: Type.STRING, enum: ["Video", "Storybook"], description: "콘텐츠 형식" },
              storyline: { type: Type.STRING, description: "주요 스토리라인 또는 구성" },
              visualStyle: { type: Type.STRING, description: "시각적 스타일 및 연출 방식" },
              teamUtilization: { type: Type.STRING, description: "팀원 전공 역량 활용 방안" },
            },
            required: ["format", "storyline", "visualStyle", "teamUtilization"]
          },
          persuasiveness: { type: Type.STRING, description: "기획의 설득력 및 기대 효과" },
          originality: { type: Type.STRING, description: "기획의 독창성 및 차별화 요소" }
        },
        required: ["title", "intent", "dataInsight", "humanitiesValue", "creativeConcept", "persuasiveness", "originality"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
