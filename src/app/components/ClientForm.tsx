'use client';

import { useState } from 'react';
import { ClientFormData, FormStep, FORM_STEPS } from '../types/form';
import BasicInfoStep from './form-steps/BasicInfoStep';
import ProjectGoalsStep from './form-steps/ProjectGoalsStep';
import DesignPreferencesStep from './form-steps/DesignPreferencesStep';
import TechnicalRequirementsStep from './form-steps/TechnicalRequirementsStep';
import TimelineStep from './form-steps/TimelineStep';

const initialFormData: ClientFormData = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  projectDescription: '',
  targetAudience: '',
  mainObjectives: [],
  desiredStyle: '',
  colorPreferences: '',
  websiteExamples: '',
  existingBranding: false,
  brandingMaterials: '',
  mediaFiles: [],
  referenceFiles: [],
  desiredFeatures: [],
  contentManagement: false,
  ecommerce: false,
  expectedPages: 1,
  specialFunctionality: '',
  socialMediaLinks: [],
  budget: '',
  desiredTimeline: '',
  priorityLevel: 'Medium',
  additionalNotes: ''
};

export default function ClientForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('basic-info');
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateFormData = (data: Partial<ClientFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    const currentIndex = FORM_STEPS.indexOf(currentStep);
    if (currentIndex < FORM_STEPS.length - 1) {
      setCurrentStep(FORM_STEPS[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = FORM_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(FORM_STEPS[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData(initialFormData);
      setCurrentStep('basic-info');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'basic-info':
        return <BasicInfoStep formData={formData} updateFormData={updateFormData} />;
      case 'project-goals':
        return <ProjectGoalsStep formData={formData} updateFormData={updateFormData} />;
      case 'design-preferences':
        return <DesignPreferencesStep formData={formData} updateFormData={updateFormData} />;
      case 'technical-requirements':
        return <TechnicalRequirementsStep formData={formData} updateFormData={updateFormData} />;
      case 'timeline':
        return <TimelineStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  const currentStepIndex = FORM_STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === FORM_STEPS.length - 1;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {FORM_STEPS.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${index !== FORM_STEPS.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStepIndex ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-900'
                }`}
              >
                {index + 1}
              </div>
              {index !== FORM_STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Thank you! Your form has been submitted successfully. We&apos;ll be in touch soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Sorry, there was an error submitting your form. Please try again or contact us directly.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStep()}

        <div className="flex justify-between mt-8">
          {!isFirstStep && (
            <button
              type="button"
              onClick={goToPreviousStep}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Previous
            </button>
          )}
          {!isLastStep ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
              disabled={isSubmitting}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-auto disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 