// TypeScript interfaces for report and newsletter data structures

export interface I18nText {
  ko: string;
  en: string;
  ja: string;
  zh?: string;
  es?: string;
}

export interface KPI {
  label: string | I18nText;
  value: number;
  delta: number; // percentage change
  unit?: string;
}

export interface Keyword {
  term: string;
  frequency: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  score?: number;
}

export interface Issue {
  title: string | I18nText;
  description: string | I18nText;
  severity: 'high' | 'medium' | 'low';
  mentions: number;
  timeRange?: string;
}

export interface Quote {
  text: string | I18nText;
  author?: string;
  source: string;
  url?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface PositiveKeyword {
  community: string | I18nText;
  keyword: string | I18nText;
  previousCount: number;
  currentCount: number;
  note: string | I18nText;
}

export interface CommunityMetrics {
  totalPosts: number;
  postsDelta: number; // percentage
  totalComments: number;
  commentsDelta: number; // percentage
  positiveMentions: number;
  positiveDelta: number; // percentage points
  improvementMentions: number;
  improvementDelta: number; // percentage points
  neutralMentions: number;
  neutralDelta: number; // percentage points
}

export interface DailyReport {
  id: string;
  game: string;
  date: string; // YYYY-MM-DD
  period: string; // e.g., "09:00 ~ 18:00"
  title: string | I18nText;
  summary: I18nText[];  // Array of summary points
  positiveKeywords: PositiveKeyword[];
  communityMetrics: CommunityMetrics;
  issues: Issue[];
  quotes: Quote[];
  metadata?: {
    platforms: string[];
    languages: string[];
  };
}

export interface FeatureFeedback {
  feature: string | I18nText;
  sentimentScore: number; // -1 to 1
  description: string | I18nText;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  topComments: (string | I18nText)[];
}

export interface BeforeAfterComparison {
  feature: string | I18nText;
  before: number; // expectation score
  after: number; // satisfaction score
}

export interface MilestoneReport {
  id: string;
  game: string;
  milestoneId: string;
  title: string | I18nText;
  date: string; // YYYY-MM-DD
  period: string;
  scale?: string | I18nText; // 대규모, 중규모 등
  summary: {
    achievement: I18nText;
    problem: I18nText;
    recommendation: I18nText;
  };
  overallMetrics: {
    totalPosts: number;
    totalLikes: number;
    sentimentScore: number; // -1 to 1
  };
  featureFeedback: FeatureFeedback[];
  beforeAfterComparison: BeforeAfterComparison[];
  keywords?: Keyword[];
  metadata?: {
    platforms: string[];
    languages: string[];
  };
}

export interface Newsletter {
  id: string;
  gameId: string;
  gameName: string;
  date: string; // YYYY-MM-DD
  weekNumber: number;
  title: string | I18nText;
  summary: string | I18nText;
  highlights: {
    title: string | I18nText;
    description: string | I18nText;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
  topIssues: Issue[];
  communityMood: 'excited' | 'concerned' | 'mixed' | 'neutral';
  liaNote?: {
    main: I18nText;
    threads: {
      title: I18nText;
      content: I18nText;
    }[];
  };
}
