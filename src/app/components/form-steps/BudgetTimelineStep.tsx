'use client';

import { ClientFormData } from '../../types/form';

interface BudgetTimelineStepProps {
  formData: ClientFormData;
  updateFormData: (data: Partial<ClientFormData>) => void;
}

const PRIORITY_LEVELS = ['Low', 'Medium', 'High'] as const;

export default function BudgetTimelineStep({ formData, updateFormData }: BudgetTimelineStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Budget & Timeline</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Project Budget
          </label>
          <input
            type="text"
            id="budget"
            value={formData.budget}
            onChange={(e) => updateFormData({ budget: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="What is your budget range for this project?"
          />
        </div>

        <div>
          <label htmlFor="desiredTimeline" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
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
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
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