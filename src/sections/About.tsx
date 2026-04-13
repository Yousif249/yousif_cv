import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { aboutConfig } from '@/config';

export function About() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { containerRef: imagesRef, visibleItems } = useStaggerAnimation(aboutConfig.images.length || 4, 150);

  return (
    <section id="about" className="w-full py-24 lg:py-32 bg-transparent text-white">
      <div className="container-large px-6 lg:px-12">
        <div 
          ref={sectionRef} 
          className={cn(
            "relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-16 shadow-2xl overflow-hidden",
            "transition-all duration-1000 ease-out-quart",
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          {/* Subtle light effect on the card */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            {/* Left Column - Text Content */}
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-xs font-geist-mono uppercase tracking-[0.3em] text-white/50 block">
                  {aboutConfig.label}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  تحويل الرؤية الميدانية <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">إلى حلول ذكية</span>
                </h2>
              </div>

              <p className="text-xl text-white/70 leading-relaxed font-light">
                {aboutConfig.description}
              </p>

              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
                {aboutConfig.stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <span className="block text-4xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs uppercase tracking-widest text-white/40">{stat.label}</span>
                  </div>
                ))}
              </div>
              
              {/* Contact Info Chips */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-white/60">
                  <MapPin size={14} className="text-blue-400" /> مكة المكرمة
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-white/60">
                  <Mail size={14} className="text-blue-400" /> yousif.tariq@zohomail.com
                </div>
              </div>
            </div>

            {/* Right Column - Image Collage */}
            <div ref={imagesRef} className="grid grid-cols-2 gap-4 h-full">
              {aboutConfig.images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative overflow-hidden rounded-2xl bg-white/5 aspect-square transition-all duration-700 ease-out-quart',
                    visibleItems[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
                    index % 2 === 1 ? 'mt-8' : ''
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
