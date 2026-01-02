import { useState } from 'react';
import { libraryService } from '@/lib/library-service';

interface RegisterMemberProps {
  onBack: () => void;
}

const RegisterMember = ({ onBack }: RegisterMemberProps) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string; memberId?: string } | null>(null);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setResult({ success: false, message: 'All fields are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setResult({ success: false, message: 'Invalid email format.' });
      return;
    }

    const response = libraryService.registerMember({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    });
    setResult(response);
  };

  const handleKeyDown = (e: React.KeyboardEvent, nextStep: () => void) => {
    if (e.key === 'Enter') {
      nextStep();
    }
  };

  const prompts = [
    { label: 'Enter Name', value: name, setValue: setName },
    { label: 'Enter Email', value: email, setValue: setEmail },
    { label: 'Enter Phone', value: phone, setValue: setPhone },
  ];

  if (result) {
    return (
      <div className="fade-in">
        <div className="terminal-text-amber text-lg mb-4">
          === REGISTER MEMBER ===
        </div>
        
        <div className={result.success ? 'terminal-text mb-2' : 'terminal-text-red mb-4'}>
          {result.message}
        </div>
        
        {result.memberId && (
          <div className="terminal-text-cyan mb-4">
            Member ID: {result.memberId}
          </div>
        )}
        
        <button
          onClick={onBack}
          className="terminal-text hover:terminal-text-amber focus:outline-none"
        >
          [Press any key to return to menu...]
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="terminal-text-amber text-lg mb-4">
        === REGISTER MEMBER ===
      </div>
      
      <div className="space-y-3 mb-6">
        {prompts.slice(0, step + 1).map((prompt, index) => (
          <div key={index} className="flex items-center">
            <span className="terminal-text-dim mr-2">{prompt.label}:</span>
            {index === step ? (
              <input
                type="text"
                value={prompt.value}
                onChange={(e) => prompt.setValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => {
                  if (step < prompts.length - 1) {
                    setStep(step + 1);
                  } else {
                    handleSubmit();
                  }
                })}
                className="terminal-input flex-1"
                autoFocus
              />
            ) : (
              <span className="terminal-text">{prompt.value}</span>
            )}
          </div>
        ))}
      </div>
      
      {step === prompts.length - 1 && phone && (
        <button
          onClick={handleSubmit}
          className="terminal-text hover:terminal-text-amber focus:outline-none mr-4"
        >
          [Submit]
        </button>
      )}
      
      <button
        onClick={onBack}
        className="terminal-text-dim hover:terminal-text focus:outline-none"
      >
        [Cancel]
      </button>
    </div>
  );
};

export default RegisterMember;
