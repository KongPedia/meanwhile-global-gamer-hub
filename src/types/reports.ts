// TypeScript interfaces for report and newsletter data structures

export interface KPI {
  label: string;
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
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  mentions: number;
  timeRange?: string;
}

export interface Quote {
  text: string;
  author?: string;
  source: string;
  url?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface DailyReport {
  id: string;
  game: string;
  date: string; // YYYY-MM-DD
  period: string; // e.g., "09:00 ~ 18:00"
  summary: string;
  kpi: KPI[];
  delta: {
    posts: number;
    engagement: number;
    sentiment: number;
  };
  keywords: Keyword[];
  issues: Issue[];
  quotes: Quote[];
  metadata?: {
    totalPosts: number;
    platforms: string[];
    languages: string[];
  };
}

export interface FeatureFeedback {
  feature: string;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  topComments: string[];
}

export interface Comparison {
  metric: string;
  current: number;
  previous: number;
  change: number;
}

export interface MilestoneReport {
  id: string;
  game: string;
  milestoneId: string;
  title: string;
  date: string; // YYYY-MM-DD
  period: string;
  executiveSummary: string;
  featureFeedback: FeatureFeedback[];
  comparison: Comparison[];
  keywords: Keyword[];
  highlights: string[];
  recommendations: string[];
  metadata?: {
    totalPosts: number;
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
  title: string;
  summary: string;
  highlights: {
    title: string;
    description: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
  topIssues: Issue[];
  communityMood: 'excited' | 'concerned' | 'mixed' | 'neutral';
  keyMetrics: {
    totalPosts: number;
    activeUsers: number;
    sentimentScore: number;
  };
  liaNote?: string; // CM Lia's personal note
}
