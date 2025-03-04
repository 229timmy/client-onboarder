export interface ClientFormData {
  // Basic Information
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  
  // Project Goals
  projectDescription: string;
  targetAudience: string;
  mainObjectives: string[];
  
  // Design Preferences
  desiredStyle: string;
  colorPreferences: string;
  websiteExamples: string;
  existingBranding: boolean;
  brandingMaterials?: string;
  mediaFiles: Array<File | { name: string; url: string }>;
  referenceFiles: Array<File | { name: string; url: string }>;
  
  // Technical Requirements
  desiredFeatures: string[];
  contentManagement: boolean;
  ecommerce: boolean;
  expectedPages: number;
  specialFunctionality: string;
  socialMediaLinks: {
    platform: string;
    url: string;
  }[];
  
  // Timeline
  desiredTimeline: string;
  priorityLevel: 'Low' | 'Medium' | 'High';
  additionalNotes: string;
}

export type FormStep = 
  | 'basic-info'
  | 'project-goals'
  | 'design-preferences'
  | 'technical-requirements'
  | 'timeline';

export const FORM_STEPS: FormStep[] = [
  'basic-info',
  'project-goals',
  'design-preferences',
  'technical-requirements',
  'timeline'
]; 