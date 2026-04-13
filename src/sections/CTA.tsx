import { } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedButton } from '@/components/AnimatedButton';
import { ArrowRight, Mail } from 'lucide-react';
import { ctaConfig } from '@/config';

interface CTAProps {
  onContactClick: () => void;
}

export function CTA({ onContactClick }: CTAProps) {
  if (!ctaConfig.heading && !ctaConfig.description) return null;

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="contact" className="relative w-full py-32 lg:py-48 overflow-hidden bg-transparent">
      {/* Background Overlay or subtle gradient if needed */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div ref={sectionRef} className="relative z-10 container-large px-6 lg:px-12">
        <div 
          className={cn(
            "max-w-4xl mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 lg:p-24 shadow-2xl relative overflow-hidden",
            "transition-all duration-1000 ease-out-quart",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          {/* Decorative Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Role Tags */}
            {ctaConfig.tags.length > 0 && (
              <div
                className={cn(
                  'flex flex-wrap justify-center gap-3 mb-8 transition-all duration-800 ease-out-quart',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                {ctaConfig.tags.map((tag, index) => (
                  <span key={index} className="px-4 py-2 text-xs font-geist-mono text-blue-300 border border-blue-500/20 rounded-full bg-blue-500/5">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Main Heading */}
            {ctaConfig.heading && (
              <h2
                className={cn(
                  'text-4xl lg:text-6xl font-bold text-white leading-tight transition-all duration-800 ease-out-quart',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: '100ms' }}
              >
                {ctaConfig.heading}
              </h2>
            )}

            {/* Subtext */}
            {ctaConfig.description && (
              <p
                className={cn(
                  'mt-8 text-xl text-white/60 max-w-xl mx-auto leading-relaxed transition-all duration-800 ease-out-quart',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: '200ms' }}
              >
                {ctaConfig.description}
              </p>
            )}

            {/* CTA Buttons */}
            <div
              className={cn(
                'flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 transition-all duration-800 ease-out-quart',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '300ms' }}
            >
              <AnimatedButton
                onClick={onContactClick}
                variant="keycap"
                size="lg"
              >
                {ctaConfig.buttonText || 'ابدأ مشروعك الآن'}
              </AnimatedButton>

              {ctaConfig.email && (
                <button
                  onClick={onContactClick}
                  className="inline-flex items-center gap-3 text-base text-white/50 hover:text-white transition-all duration-500 group py-3 px-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>{ctaConfig.email}</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 text-blue-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
