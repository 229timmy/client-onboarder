'use client';

import { useState } from 'react';
import { ClientFormData } from '../../types/form';

interface ProjectGoalsStepProps {
  formData: ClientFormData;
  updateFormData: (data: Partial<ClientFormData>) => void;
}

export default function ProjectGoalsStep({ formData, updateFormData }: ProjectGoalsStepProps) {
  const [newObjective, setNewObjective] = useState('');

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      updateFormData({
        mainObjectives: [...formData.mainObjectives, newObjective.trim()]
      });
      setNewObjective('');
    }
  };

  const handleRemoveObjective = (index: number) => {
    updateFormData({
      mainObjectives: formData.mainObjectives.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Project Goals</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Project Description
          </label>
          <textarea
            id="projectDescription"
            value={formData.projectDescription}
            onChange={(e) => updateFormData({ projectDescription: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
            placeholder="Please describe your project in detail..."
          />
        </div>

        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
            Target Audience
          </label>
          <textarea
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => updateFormData({ targetAudience: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
            placeholder="Who is your target audience?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Objectives
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add an objective..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddObjective()}
            />
            <button
              type="button"
              onClick={handleAddObjective}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {formData.mainObjectives.map((objective, index) => (
              <li key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <span className="flex-1">{objective}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveObjective(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 