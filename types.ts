
export interface TeamMember {
  id: string;
  major: string;
  strength: string;
}

export interface ProposalContent {
  title: string;
  intent: string;
  dataInsight: {
    youtube: string;
    news: string;
    sns: string;
    history: string;
  };
  humanitiesValue: string;
  creativeConcept: {
    format: 'Video' | 'Storybook';
    storyline: string;
    visualStyle: string;
    teamUtilization: string;
  };
  persuasiveness: string;
  originality: string;
}

export enum AppStep {
  MEMBERS = 'members',
  TOPIC = 'topic',
  PLANNING = 'planning',
  RESULT = 'result'
}
