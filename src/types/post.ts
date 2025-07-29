export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
  sourceURL: string;
  discordURL: string;
  communityId: string;
  projectId: string;
}

export interface CommunityPostsData {
  [language: string]: CommunityPost[];
}
