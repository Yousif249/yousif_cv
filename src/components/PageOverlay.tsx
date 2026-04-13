import { } from 'react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config';

interface PageOverlayProps {
  isVisible: boolean;
}

export function PageOverlay({ isVisible }: PageOverlayProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none transition-all duration-1000',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Background Panels - Split effect */}
      <div 
        className={cn(
          "absolute inset-y-0 left-0 w-1/2 bg-[#050505] transition-transform duration-[1200ms] ease-expo",
          !isVisible && "-translate-x-full"
        )} 
      />
      <div 
        className={cn(
          "absolute inset-y-0 right-0 w-1/2 bg-[#050505] transition-transform duration-[1200ms] ease-expo",
          !isVisible && "translate-x-full"
        )} 
      />

      {/* Content */}
      <div className={cn(
        "relative z-10 flex flex-col items-center gap-8 transition-all duration-700",
        !isVisible && "opacity-0 scale-110 blur-xl"
      )}>
        <div className="relative group">
          {/* Glowing ring */}
          <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          
          <h1 className="text-4xl lg:text-6xl font-black text-white tracking-[0.2em] relative">
            {siteConfig.title.split(' | ')[0] || 'YOUSIF TARIQ'}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 animate-[grow_1.5s_ease-out_forwards]" />
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-[loading_1s_infinite_0ms]" />
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-[loading_1s_infinite_200ms]" />
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-[loading_1s_infinite_400ms]" />
          </div>
          <span className="text-[10px] font-geist-mono uppercase tracking-[0.5em] text-white/30 animate-pulse">
            Initializing Systems
          </span>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); color: #3b82f6; }
        }
        @keyframes grow {
          0% { scale: 0; opacity: 0; }
          100% { scale: 1; opacity: 1; }
        }
        .ease-expo {
          transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
        }
      `}</style>
    </div>
  );
}
