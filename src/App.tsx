import React, { useState, useEffect, useRef } from 'react';
import { Loader2, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const LOADING_MESSAGES = [
  "Running DNA Analysis...",
  "Consulting Elon Musk...",
  "Hacking NASA For Data...",
  "Calling to Stephen Hawking...",
  "Calculating with fingers...",
  "Analysing Epstein file...",
  "Finalizing prediction..."
];

export default function App() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading && loadingMessageIndex < LOADING_MESSAGES.length) {
      timer = setTimeout(() => {
        setLoadingMessageIndex(prev => prev + 1);
      }, 2000); // 2 seconds
    } else if (isLoading && loadingMessageIndex === LOADING_MESSAGES.length) {
      setIsLoading(false);
      setIsFinished(true);
    }
    return () => clearTimeout(timer);
  }, [isLoading, loadingMessageIndex]);

  const handlePredict = () => {
    if (!selectedDay) return;
    setIsLoading(true);
    setLoadingMessageIndex(0);
    setIsFinished(false);
  };

  const handleReset = () => {
    setSelectedDay(null);
    setIsLoading(false);
    setLoadingMessageIndex(0);
    setIsFinished(false);
    setSliderValue(0);
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!isDragging || !sliderRef.current || !selectedDay) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const thumbWidth = 56;
      const maxX = rect.width - 8; // total width minus padding
      let x = e.clientX - rect.left;
      let percentage = ((x - thumbWidth / 2) / (maxX - thumbWidth)) * 100;
      percentage = Math.max(0, Math.min(percentage, 100));
      setSliderValue(percentage);
      
      if (percentage > 95) {
        setIsDragging(false);
        setSliderValue(100);
        setIsLoading(true);
        setLoadingMessageIndex(0);
        setIsFinished(false);
      }
    };

    const handleGlobalPointerUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      setSliderValue(prev => prev > 95 ? 100 : 0);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handleGlobalPointerMove);
      window.addEventListener('pointerup', handleGlobalPointerUp);
      window.addEventListener('pointercancel', handleGlobalPointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, [isDragging, selectedDay]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!selectedDay) return;
    setIsDragging(true);
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] bg-gradient-to-br from-[#302b63] via-[#24243e] to-[#0f0c29] flex flex-col items-center p-4 font-sans relative overflow-x-hidden text-white">
      {/* Liquid Orbs (Background) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
      <div className="absolute top-[40%] left-[40%] w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob animation-delay-6000"></div>

      {/* Sticky Header */}
      <header className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="glass-card w-full max-w-4xl rounded-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between pointer-events-auto transition-all duration-300">
          {/* Logo */}
          <div className="font-extrabold text-lg md:text-xl tracking-tight flex items-center gap-2 text-white">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-inner text-sm md:text-base">
              D
            </div>
            <span className="hidden sm:inline">DayPredictor</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            <a href="#predict" className="hover:text-white transition-colors">Predict</a>
            <a href="#technology" className="hover:text-white transition-colors">Technology</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </nav>

          {/* Status Badge */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 md:gap-2 bg-green-500/10 border border-green-400/30 text-green-100 backdrop-blur-md text-[10px] md:text-xs font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
              System Online
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full mt-32 relative z-10 mb-12 max-w-5xl mx-auto space-y-24">
        
        {/* Hero Description */}
        <section id="about" className="text-center space-y-6 max-w-3xl px-4">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            The Future of <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">Chronological Prediction</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed drop-shadow-sm">
            Leveraging quantum entanglement, blockchain-backed temporal arrays, and a really big calendar we bought at the dollar store to accurately predict what day comes after today.
          </p>
        </section>

        {/* Prediction Applet */}
        <section id="predict" className="w-full flex justify-center px-4">
          <div className="relative bg-white/10 backdrop-blur-3xl backdrop-saturate-150 border border-white/20 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.1),inset_0_24px_32px_-24px_rgba(255,255,255,0.3)] w-full max-w-md h-[480px] sm:h-[520px] flex flex-col p-6 md:p-8 text-center z-10 overflow-hidden">
          {/* Inner glass highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-20 mb-6 md:mb-8 shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 drop-shadow-md bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">Day Predictor AI</h1>
            <span className="inline-block bg-red-500/10 border border-red-500/30 text-red-200 backdrop-blur-md text-[10px] md:text-xs font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]">
              Please kids stay away
            </span>
          </div>

          <div className="relative z-20 flex-1 flex flex-col justify-center w-full">
            {!isLoading && !isFinished && (
              <div className="w-full space-y-6">
              <p className="text-lg font-medium text-white/90 drop-shadow-sm">Tomorrow is which day?</p>
              
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {DAYS.slice(0, 6).map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`relative overflow-hidden py-2.5 md:py-3 px-2 md:px-4 rounded-xl md:rounded-2xl text-sm md:text-base font-medium transition-all duration-300 border backdrop-blur-md ${
                      selectedDay === day
                        ? 'border-blue-400/50 bg-blue-500/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.5)] scale-[1.02]'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                    }`}
                  >
                    {selectedDay === day && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>}
                    <span className="relative z-10">{day}</span>
                  </button>
                ))}
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => setSelectedDay(DAYS[6])}
                    className={`relative overflow-hidden w-[60%] md:w-1/2 py-2.5 md:py-3 px-2 md:px-4 rounded-xl md:rounded-2xl text-sm md:text-base font-medium transition-all duration-300 border backdrop-blur-md ${
                      selectedDay === DAYS[6]
                        ? 'border-blue-400/50 bg-blue-500/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.5)] scale-[1.02]'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                    }`}
                  >
                    {selectedDay === DAYS[6] && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>}
                    <span className="relative z-10">{DAYS[6]}</span>
                  </button>
                </div>
              </div>

              <div 
                ref={sliderRef}
                className={`relative h-14 md:h-16 rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-300 ${
                  selectedDay
                    ? 'bg-white/5 border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                    : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                }`}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500/60 to-purple-500/60 backdrop-blur-md transition-all"
                  style={{ width: `${sliderValue}%`, transitionDuration: isDragging ? '0ms' : '300ms' }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <span className={`font-bold text-sm md:text-lg tracking-wider ${selectedDay ? 'text-white/90 drop-shadow-md' : 'text-white/30'}`}>
                    SLIDE TO PREDICT
                  </span>
                </div>
                <div className="absolute inset-y-1 left-1 right-1">
                  <div 
                    className={`absolute h-full w-12 md:w-14 bg-white/20 backdrop-blur-xl border border-white/40 rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.6)] z-10 touch-none ${selectedDay ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed'} ${isDragging ? 'scale-110 shadow-[0_0_20px_rgba(255,255,255,0.5)]' : ''}`}
                    style={{ 
                      left: `${sliderValue}%`, 
                      transform: `translateX(-${sliderValue}%)`,
                      transition: isDragging ? 'transform 100ms ease-out, box-shadow 100ms ease-out' : 'all 300ms ease-out'
                    }}
                    onPointerDown={handlePointerDown}
                  >
                    {isDragging && (
                      <div className="absolute inset-0 rounded-xl bg-white/30 animate-ping opacity-75"></div>
                    )}
                    <ChevronRight className={`text-white transition-transform w-5 h-5 md:w-6 md:h-6 ${isDragging ? 'scale-125' : ''}`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="w-full flex flex-col items-center justify-center space-y-6 md:space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                  <img 
                    src="https://media.giphy.com/media/ne3xrYlWtQFtC/giphy.gif" 
                    alt="Calculating..." 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="h-16 md:h-20 flex items-center justify-center w-full px-2">
                <p 
                  key={loadingMessageIndex}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-center animate-in zoom-in fade-in duration-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-cyan-200"
                >
                  {LOADING_MESSAGES[loadingMessageIndex] || LOADING_MESSAGES[LOADING_MESSAGES.length - 1]}
                </p>
              </div>
            </div>
          )}

          {isFinished && (() => {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const actualTomorrow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][tomorrow.getDay()];
            const isCorrect = selectedDay === actualTomorrow;

            return (
              <div className="w-full flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-700">
                <div className="relative">
                  <div className={`absolute inset-0 ${isCorrect ? 'bg-green-500' : 'bg-red-500'} rounded-full blur-xl opacity-50 animate-pulse`}></div>
                  {isCorrect ? (
                    <CheckCircle2 className="w-20 h-20 text-green-400 relative z-10" />
                  ) : (
                    <XCircle className="w-20 h-20 text-red-400 relative z-10" />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-medium text-white/90 drop-shadow-md">
                    {isCorrect ? (
                      <>Yes, you are correct! Tomorrow is <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{selectedDay}</span></>
                    ) : (
                      <>No, you are wrong! Tomorrow is actually <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-300">{actualTomorrow}</span></>
                    )}
                  </p>
                  <p className={`${isCorrect ? 'text-green-300/90' : 'text-red-300/90'} font-medium mt-4 drop-shadow-sm`}>
                    {isCorrect ? 'Your IQ is higher than 99.9% of all humanity' : 'Your IQ might be lower than room temperature'}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-8 px-6 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors border border-transparent hover:border-white/20 rounded-full hover:bg-white/5 backdrop-blur-sm"
                >
                  Predict Again
                </button>
              </div>
            );
          })()}
          </div>
        </div>
        </section>

        {/* Core Technology Section */}
        <section id="technology" className="w-full px-4 space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Our "Core Technology"</h3>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto px-2">How we achieve 100% accuracy in predicting tomorrow (unless it's a leap year, then we get confused).</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                title: "Quantum Guessing",
                desc: "We put all 7 days in a box. Until you open it, tomorrow is simultaneously Monday and Friday.",
                icon: "📦"
              },
              {
                title: "AI-Powered If-Statements",
                desc: "Our neural network consists of exactly 7 highly optimized 'if' statements written by an intern.",
                icon: "🧠"
              },
              {
                title: "NASA Satellites",
                desc: "We bounce signals off the moon just to feel important while checking the system clock.",
                icon: "🛰️"
              }
            ].map((tech, i) => (
              <div key={i} className="group relative bg-white/10 backdrop-blur-3xl backdrop-saturate-150 border border-white/20 rounded-[2rem] p-6 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.1),inset_0_24px_32px_-24px_rgba(255,255,255,0.3)] hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.4),0_0_30px_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full mix-blend-overlay filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl mb-4 md:mb-6 drop-shadow-lg">{tech.icon}</div>
                  <h4 className="text-xl md:text-2xl font-bold text-white/90 mb-3 drop-shadow-md">{tech.title}</h4>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto relative z-10 mt-auto mb-6 px-4">
        <div className="relative bg-white/10 backdrop-blur-3xl backdrop-saturate-150 border border-white/20 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.1)] px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center gap-3 opacity-90">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-inner">
              D
            </div>
            <span className="text-base font-semibold tracking-wide text-white drop-shadow-md">DayPredictor AI</span>
          </div>
          <p className="relative z-10 text-sm text-white/60 text-center font-medium">
            © {new Date().getFullYear()} DayPredictor AI. Not responsible if tomorrow never comes.
          </p>
          <div className="relative z-10 flex gap-6 text-sm text-white/60 font-medium">
            <a href="#" className="hover:text-white transition-colors drop-shadow-sm">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors drop-shadow-sm">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
