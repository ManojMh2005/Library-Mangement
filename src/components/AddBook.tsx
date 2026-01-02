import { useState } from 'react';
import { libraryService } from '@/lib/library-service';

interface AddBookProps {
  onBack: () => void;
}

const AddBook = ({ onBack }: AddBookProps) => {
  const [step, setStep] = useState(0);
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = () => {
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum) || yearNum < 1000 || yearNum > new Date().getFullYear()) {
      setResult({ success: false, message: 'Invalid year. Please enter a valid year.' });
      return;
    }

    const response = libraryService.addBook({
      isbn: isbn.trim(),
      title: title.trim(),
      author: author.trim(),
      year: yearNum
    });
    setResult(response);
  };

  const handleKeyDown = (e: React.KeyboardEvent, nextStep: () => void) => {
    if (e.key === 'Enter') {
      nextStep();
    }
  };

  const prompts = [
    { label: 'Enter ISBN', value: isbn, setValue: setIsbn },
    { label: 'Enter Title', value: title, setValue: setTitle },
    { label: 'Enter Author', value: author, setValue: setAuthor },
    { label: 'Enter Publication Year', value: year, setValue: setYear },
  ];

  if (result) {
    return (
      <div className="fade-in">
        <div className="terminal-text-amber text-lg mb-4">
          === ADD NEW BOOK ===
        </div>
        
        <div className={result.success ? 'terminal-text mb-4' : 'terminal-text-red mb-4'}>
          {result.message}
        </div>
        
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
        === ADD NEW BOOK ===
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
      
      {step === prompts.length - 1 && year && (
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

export default AddBook;
