import React from 'react';

interface Step19Props {
  nextStep: () => void;
  consentToDataSharing: boolean;
  setConsentToDataSharing: (consent: boolean) => void;
}

export const Step19: React.FC<Step19Props> = ({ nextStep, consentToDataSharing, setConsentToDataSharing }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Data Consent & AI Plan</h2>
      <p className="text-muted-foreground mb-8">Allow us to use your data to generate your personalized plan.</p>
      
      <div className="flex items-center gap-3 mb-8">
        <input 
          type="checkbox" 
          id="consent" 
          checked={consentToDataSharing}
          onChange={(e) => setConsentToDataSharing(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="consent" className="text-sm">
          I consent to data sharing for AI plan generation
        </label>
      </div>
    </div>
  );
};