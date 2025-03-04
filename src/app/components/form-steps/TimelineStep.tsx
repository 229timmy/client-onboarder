'use client';

import { ClientFormData } from '../../types/form';

interface TimelineStepProps {
  formData: ClientFormData;
  updateFormData: (data: Partial<ClientFormData>) => void;
}

const PRIORITY_LEVELS = ['Low', 'Medium', 'High'] as const;

export default function TimelineStep({ formData, updateFormData }: TimelineStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Timeline & Additional Information</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="desiredTimeline" className="block text-sm font-medium text-gray-900 mb-1">
            Desired Timeline
          </label>
          <input
            type="text"
            id="desiredTimeline"
            value={formData.desiredTimeline}
            onChange={(e) => updateFormData({ desiredTimeline: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="When would you like the project to be completed?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Project Priority Level
          </label>
          <div className="flex gap-4">
            {PRIORITY_LEVELS.map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priorityLevel"
                  value={level}
                  checked={formData.priorityLevel === level}
                  onChange={(e) => updateFormData({ priorityLevel: e.target.value as typeof PRIORITY_LEVELS[number] })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-900">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-900 mb-1">
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Any additional information or special requirements you'd like to share?"
          />
        </div>
      </div>
    </div>
  );
} 