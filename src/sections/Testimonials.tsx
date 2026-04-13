import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight, Quote, GraduationCap, Award } from 'lucide-react';
import { testimonialsConfig } from '@/config';

export function Testimonials() {
  if (!testimonialsConfig.heading && testimonialsConfig.testimonials.length === 0) return null;

  const testimonials = testimonialsConfig.testimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || testimonials.length === 0) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating, testimonials.length]);

  const nextSlide = useCallback(() => {
    if (testimonials.length === 0) return;
    goToSlide((activeIndex + 1) % testimonials.length);
  }, [activeIndex, goToSlide, testimonials.length]);

  const prevSlide = useCallback(() => {
    if (testimonials.length === 0) return;
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  }, [activeIndex, goToSlide, testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="w-full py-24 lg:py-32 bg-transparent text-white">
      <div ref={sectionRef} className="container-large px-6 lg:px-12">
        <div className="relative bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 lg:p-16 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="max-w-2xl mb-16 space-y-4 relative z-10">
            <span className={cn(
              'text-xs font-geist-mono uppercase tracking-[0.3em] text-white/40 block transition-all duration-800',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              {testimonialsConfig.label}
            </span>
            <h2 className={cn(
              'text-4xl lg:text-5xl font-bold text-white transition-all duration-800 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}>
              {testimonialsConfig.heading}
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
            {/* Image Side */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={cn(
                      'absolute inset-0 transition-all duration-1000 ease-out-cubic',
                      index === activeIndex
                        ? 'opacity-100 scale-100 filter-none'
                        : 'opacity-0 scale-110 blur-sm'
                    )}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                  </div>
                ))}
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center border-8 border-black shadow-xl animate-bounce-slow">
                <Award className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-7 space-y-10">
              <Quote className="w-12 h-12 text-blue-500/30" />
              
              <div className="relative min-h-[160px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={cn(
                      'absolute inset-0 transition-all duration-700 ease-out-quart',
                      index === activeIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8 pointer-events-none'
                    )}
                  >
                    <p className="text-2xl lg:text-3xl text-white font-light leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Author Info */}
              <div className="pt-10 border-t border-white/10">
                <div className="relative h-20">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={cn(
                        'absolute inset-0 transition-all duration-500 ease-out-quart flex items-center gap-4',
                        index === activeIndex
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 translate-x-12 pointer-events-none'
                      )}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400">
                        <GraduationCap size={24} />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white uppercase tracking-wide">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-blue-400 font-geist-mono">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-10 pt-4">
                <div className="flex gap-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-500',
                        index === activeIndex
                          ? 'bg-blue-500 w-12'
                          : 'bg-white/10 w-4 hover:bg-white/30'
                      )}
                    />
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={prevSlide}
                    className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/30 text-white transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/30 text-white transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
