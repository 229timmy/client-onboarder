'use client';

import { useState } from 'react';
import { ClientFormData } from '../../types/form';

interface TechnicalRequirementsStepProps {
  formData: ClientFormData;
  updateFormData: (data: Partial<ClientFormData>) => void;
}

const commonFeatures = [
  'Contact Form',
  'Blog',
  'Newsletter Signup',
  'Social Media Integration',
  'Search Functionality',
  'Image Gallery',
  'Video Integration',
  'User Authentication',
  'Maps Integration',
  'Analytics Integration'
];

const socialMediaPlatforms = [
  'Facebook',
  'Twitter',
  'Instagram',
  'LinkedIn',
  'YouTube',
  'TikTok',
  'Pinterest'
];

export default function TechnicalRequirementsStep({ formData, updateFormData }: TechnicalRequirementsStepProps) {
  const [newFeature, setNewFeature] = useState('');
  const [newSocialPlatform, setNewSocialPlatform] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.desiredFeatures.includes(newFeature.trim())) {
      updateFormData({
        desiredFeatures: [...formData.desiredFeatures, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleToggleFeature = (feature: string) => {
    const updatedFeatures = formData.desiredFeatures.includes(feature)
      ? formData.desiredFeatures.filter(f => f !== feature)
      : [...formData.desiredFeatures, feature];
    updateFormData({ desiredFeatures: updatedFeatures });
  };

  const handleAddSocialLink = () => {
    if (newSocialPlatform && newSocialUrl) {
      updateFormData({
        socialMediaLinks: [
          ...(formData.socialMediaLinks || []),
          { platform: newSocialPlatform, url: newSocialUrl }
        ]
      });
      setNewSocialPlatform('');
      setNewSocialUrl('');
    }
  };

  const handleRemoveSocialLink = (index: number) => {
    updateFormData({
      socialMediaLinks: formData.socialMediaLinks.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Technical Requirements</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Common Features
          </label>
          <div className="grid grid-cols-2 gap-3">
            {commonFeatures.map(feature => (
              <div key={feature} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={feature}
                  checked={formData.desiredFeatures.includes(feature)}
                  onChange={() => handleToggleFeature(feature)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={feature} className="text-sm text-gray-900">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>

        {formData.desiredFeatures.includes('Social Media Integration') && (
          <div className="mt-4 p-4 border border-blue-100 rounded-md bg-blue-50">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Social Media Links
            </label>
            <div className="flex gap-2 mb-2">
              <select
                value={newSocialPlatform}
                onChange={(e) => setNewSocialPlatform(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="" className="text-gray-700">Select Platform</option>
                {socialMediaPlatforms.map(platform => (
                  <option key={platform} value={platform} className="text-gray-900">{platform}</option>
                ))}
              </select>
              <input
                type="url"
                value={newSocialUrl}
                onChange={(e) => setNewSocialUrl(e.target.value)}
                placeholder="Enter URL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddSocialLink}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!newSocialPlatform || !newSocialUrl}
              >
                Add
              </button>
            </div>
            {formData.socialMediaLinks && formData.socialMediaLinks.length > 0 && (
              <ul className="space-y-2">
                {formData.socialMediaLinks.map((link, index) => (
                  <li key={index} className="flex items-center gap-2 bg-white p-2 rounded">
                    <span className="font-medium text-gray-900">{link.platform}:</span>
                    <span className="flex-1 text-gray-900">{link.url}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialLink(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Additional Features
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a custom feature..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          {formData.desiredFeatures.filter(f => !commonFeatures.includes(f)).length > 0 && (
            <ul className="space-y-2">
              {formData.desiredFeatures
                .filter(f => !commonFeatures.includes(f))
                .map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <span className="flex-1 text-gray-900">{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleFeature(feature)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ×
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="contentManagement" className="flex items-center gap-2">
              <input
                type="checkbox"
                id="contentManagement"
                checked={formData.contentManagement}
                onChange={(e) => updateFormData({ contentManagement: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-900">
                Content Management System
              </span>
            </label>
          </div>

          <div>
            <label htmlFor="ecommerce" className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ecommerce"
                checked={formData.ecommerce}
                onChange={(e) => updateFormData({ ecommerce: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-900">
                E-commerce Functionality
              </span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="expectedPages" className="block text-sm font-medium text-gray-900 mb-1">
            Expected Number of Pages
          </label>
          <input
            type="number"
            id="expectedPages"
            min="1"
            value={formData.expectedPages}
            onChange={(e) => updateFormData({ expectedPages: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="specialFunctionality" className="block text-sm font-medium text-gray-900 mb-1">
            Special Functionality Requirements
          </label>
          <textarea
            id="specialFunctionality"
            value={formData.specialFunctionality}
            onChange={(e) => updateFormData({ specialFunctionality: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Describe any special functionality or technical requirements not covered above..."
          />
        </div>
      </div>
    </div>
  );
} 