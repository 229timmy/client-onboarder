'use client';

import { useState } from 'react';
import { ClientFormData } from '../../types/form';
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface DesignPreferencesStepProps {
  formData: ClientFormData;
  updateFormData: (data: Partial<ClientFormData>) => void;
}

interface UploadedFile {
  name: string;
  url: string;
}

export default function DesignPreferencesStep({ formData, updateFormData }: DesignPreferencesStepProps) {
  const [mediaFiles, setMediaFiles] = useState<UploadedFile[]>([]);
  const [referenceFiles, setReferenceFiles] = useState<UploadedFile[]>([]);

  const removeMediaFile = (index: number) => {
    const newFiles = mediaFiles.filter((_, i) => i !== index);
    setMediaFiles(newFiles);
    updateFormData({
      mediaFiles: newFiles
    });
  };

  const removeReferenceFile = (index: number) => {
    const newFiles = referenceFiles.filter((_, i) => i !== index);
    setReferenceFiles(newFiles);
    updateFormData({
      referenceFiles: newFiles
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Design Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="desiredStyle" className="block text-sm font-medium text-gray-900 mb-1">
            Desired Website Style
          </label>
          <textarea
            id="desiredStyle"
            value={formData.desiredStyle}
            onChange={(e) => updateFormData({ desiredStyle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
            placeholder="Describe your preferred website style (e.g., modern, minimalist, corporate, playful)..."
          />
        </div>

        <div>
          <label htmlFor="colorPreferences" className="block text-sm font-medium text-gray-900 mb-1">
            Color Preferences
          </label>
          <textarea
            id="colorPreferences"
            value={formData.colorPreferences}
            onChange={(e) => updateFormData({ colorPreferences: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Any specific colors or color schemes you prefer?"
          />
        </div>

        <div>
          <label htmlFor="websiteExamples" className="block text-sm font-medium text-gray-900 mb-1">
            Website Examples
          </label>
          <textarea
            id="websiteExamples"
            value={formData.websiteExamples}
            onChange={(e) => updateFormData({ websiteExamples: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Please provide links to websites you like or want to draw inspiration from..."
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="existingBranding"
              checked={formData.existingBranding}
              onChange={(e) => updateFormData({ existingBranding: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="existingBranding" className="text-sm font-medium text-gray-900">
              Do you have existing branding materials?
            </label>
          </div>

          {formData.existingBranding && (
            <div>
              <textarea
                id="brandingMaterials"
                value={formData.brandingMaterials}
                onChange={(e) => updateFormData({ brandingMaterials: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                rows={3}
                placeholder="Please describe your existing branding materials (logo, style guide, etc.)..."
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Media Files for Website
          </label>
          <p className="text-sm text-gray-900 mb-2">
            Upload any images, videos, or other media you&apos;d like to use on your website
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res) {
                  const newFiles = res.map(f => ({
                    name: f.name,
                    url: f.url
                  }));
                  const updatedFiles = [...mediaFiles, ...newFiles];
                  setMediaFiles(updatedFiles);
                  updateFormData({
                    mediaFiles: updatedFiles
                  });
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              appearance={{
                button: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors",
                allowedContent: "text-gray-600 text-sm mt-2"
              }}
              content={{
                button({ ready }) {
                  if (ready) return 'Upload Media Files';
                  return 'Loading...';
                },
                allowedContent({ ready, fileTypes }) {
                  if (!ready) return 'Loading...';
                  return `Supports: Images up to 4MB`;
                }
              }}
            />
          </div>
          {mediaFiles.length > 0 && (
            <ul className="mt-4 space-y-2">
              {mediaFiles.map((file, index) => (
                <li key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-blue-600 hover:text-blue-800">
                    {file.name}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeMediaFile(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Reference Materials
          </label>
          <p className="text-sm text-gray-900 mb-2">
            Upload any additional reference materials (documents, PDFs, etc.)
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <UploadButton<OurFileRouter, "docUploader">
              endpoint="docUploader"
              onClientUploadComplete={(res) => {
                if (res) {
                  const newFiles = res.map(f => ({
                    name: f.name,
                    url: f.url
                  }));
                  const updatedFiles = [...referenceFiles, ...newFiles];
                  setReferenceFiles(updatedFiles);
                  updateFormData({
                    referenceFiles: updatedFiles
                  });
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              appearance={{
                button: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors",
                allowedContent: "text-gray-600 text-sm mt-2"
              }}
              content={{
                button({ ready }) {
                  if (ready) return 'Upload Reference Files';
                  return 'Loading...';
                },
                allowedContent({ ready, fileTypes }) {
                  if (!ready) return 'Loading...';
                  return `Supports: Images and PDFs up to 8MB`;
                }
              }}
            />
          </div>
          {referenceFiles.length > 0 && (
            <ul className="mt-2 space-y-2">
              {referenceFiles.map((file, index) => (
                <li key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-blue-600 hover:text-blue-800">
                    {file.name}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeReferenceFile(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 