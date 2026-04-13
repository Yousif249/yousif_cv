import { useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'keycap';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  showIcon = false,
  className,
  style,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = cn(
    'relative overflow-hidden font-geist-mono inline-flex items-center justify-center gap-2',
    'transition-all duration-500 ease-out-quart font-bold',
    {
      'bg-blue-500 text-white rounded-2xl hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-1 active:translate-y-0': variant === 'primary',
      'bg-white text-exvia-black border border-exvia-border rounded-2xl hover:bg-blue-50 hover:border-blue-200 hover:-translate-y-1 transition-all shadow-lg': variant === 'secondary',
      'bg-transparent text-white border border-white/20 rounded-2xl hover:bg-white/5 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all': variant === 'outline',
      'bg-transparent text-white border border-white/40 rounded-2xl hover:bg-white/10 hover:border-white transition-all': variant === 'outline-white',
      'bg-blue-600 text-white border-b-[6px] border-blue-800 rounded-2xl hover:bg-blue-500 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] active:translate-y-[4px] active:border-b-0 shadow-lg': variant === 'keycap',
      'px-4 py-2 text-xs': size === 'sm',
      'px-6 py-3 text-sm': size === 'md',
      'px-10 py-5 text-lg': size === 'lg',
    },
    className
  );

  const content = (
    <>
      <span className="relative overflow-hidden h-5 flex items-center">
        <span
          className={cn(
            'block transition-transform duration-350 ease-out-quad',
            isHovered ? '-translate-y-[150%]' : 'translate-y-0'
          )}
        >
          {children}
        </span>
        <span
          className={cn(
            'absolute inset-0 flex items-center transition-transform duration-350 ease-out-quad',
            isHovered ? 'translate-y-0' : 'translate-y-[150%]'
          )}
        >
          {children}
        </span>
      </span>
      {showIcon && (
        <ArrowRight
          className={cn(
            'w-4 h-4 transition-transform duration-300 ease-out-quad',
            isHovered ? 'translate-x-1' : 'translate-x-0'
          )}
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseStyles}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseStyles}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </button>
  );
}
