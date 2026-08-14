/**
 * Types for Global Success Differentiated AI Lesson Plan Assistant
 */

export type GenerationMode = 'select' | 'upload';

export type GradeLevel = 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9';

export interface UnitInfo {
  number: number;
  title: string;
  topic: string;
  keyGrammarAndVocab?: string;
}

export type LessonType =
  | 'Getting Started'
  | 'A Closer Look 1'
  | 'A Closer Look 2'
  | 'Communication'
  | 'Skills 1'
  | 'Skills 2'
  | 'Looking Back & Project';

export interface QuickSelectionPayload {
  grade: GradeLevel;
  unitNumber: number;
  unitTitle: string;
  lessonType: LessonType;
  keyGrammarAndVocab?: string;
  customTopicDetails?: string;
  classProfile?: {
    totalStudents?: number;
    supportGroupPct?: number; // e.g. 20%
    challengeGroupPct?: number; // e.g. 20%
    specialNotes?: string;
  };
}

export interface UploadPayload {
  fileName?: string;
  fileType?: string;
  rawContent: string;
  gradeLevel?: string;
  lessonTitle?: string;
  userNotes?: string;
}

export interface PrinciplesFocusConfig {
  generalDifferentiation: boolean; // Principle A
  threeTieredTasks: boolean;        // Principle B
  quickDiagnostics: boolean;        // Principle C
  groupWorkAndFastFinishers: boolean; // Principle D
  processAssessment: boolean;       // Principle E
  temperature: number;              // AI Temperature (0.0 to 1.0)
}

export interface DirectiveRequest {
  mode: GenerationMode;
  quickSelection?: QuickSelectionPayload;
  uploadData?: UploadPayload;
  principlesConfig: PrinciplesFocusConfig;
}

export interface SavedDirective {
  id: string;
  createdAt: string;
  title: string;
  grade: string;
  unit: string;
  lessonType: string;
  mode: GenerationMode;
  markdownContent: string;
  tags: string[];
}

export interface PrincipleDetail {
  id: string;
  code: 'A' | 'B' | 'C' | 'D' | 'E';
  title: string;
  shortDesc: string;
  fullDesc: string;
  keyTechniques: string[];
  examples: string[];
  iconName: string;
}
