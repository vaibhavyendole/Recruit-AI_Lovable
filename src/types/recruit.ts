export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  applicantsCount: number;
  status: 'draft' | 'screening' | 'shortlist_ready' | 'interviewing' | 'closed';
  createdAt: Date;
  skills: string[];
  experience: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  matchScore: number;
  experience: string;
  currentRole: string;
  company: string;
  matchedSkills: string[];
  missingSkills: string[];
  reasoning: string;
  status: 'new' | 'screening' | 'shortlisted' | 'rejected' | 'interview_scheduled';
  education: string;
  location: string;
  resumeUrl?: string;
}

export interface JobCriteria {
  responsibilities: string[];
  requiredSkills: string[];
  minimumExperience: string;
  mandatoryTech: string[];
  niceToHave: string[];
}

export interface ScreeningMessage {
  id: string;
  role: 'agent' | 'candidate';
  content: string;
  timestamp: Date;
}

export interface SkillRating {
  skill: string;
  rating: number;
  maxRating: number;
}

export type AppStep = 
  | 'login'
  | 'dashboard'
  | 'create-job'
  | 'upload-resumes'
  | 'shortlist'
  | 'candidate-profile'
  | 'screening-chat'
  | 'scheduling'
  | 'summary';
