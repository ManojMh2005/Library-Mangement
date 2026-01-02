interface ExitScreenProps {
  onBack: () => void;
}

const ExitScreen = ({ onBack }: ExitScreenProps) => {
  return (
    <div className="fade-in text-center py-12">
      <pre className="terminal-text text-xs sm:text-sm mb-8">
{`
  ╔════════════════════════════════════════════════════════════╗
  ║                                                            ║
  ║   ████████╗██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗███████╗     ║
  ║   ╚══██╔══╝██║  ██║██╔══██╗████╗  ██║██║ ██╔╝██╔════╝     ║
  ║      ██║   ███████║███████║██╔██╗ ██║█████╔╝ ███████╗     ║
  ║      ██║   ██╔══██║██╔══██║██║╚██╗██║██╔═██╗ ╚════██║     ║
  ║      ██║   ██║  ██║██║  ██║██║ ╚████║██║  ██╗███████║     ║
  ║      ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝     ║
  ║                                                            ║
  ║           FOR USING THE LIBRARY SYSTEM!                    ║
  ║                                                            ║
  ╚════════════════════════════════════════════════════════════╝
`}
      </pre>
      
      <div className="terminal-text-dim mb-8">
        Your data has been saved successfully.
      </div>
      
      <button
        onClick={onBack}
        className="terminal-text hover:terminal-text-amber focus:outline-none"
      >
        [Click here to restart the system...]
      </button>
    </div>
  );
};

export default ExitScreen;
