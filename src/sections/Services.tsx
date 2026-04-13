import { useState, type ElementType } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useServiceParallax } from '@/hooks/useMouseParallax';
import { servicesConfig } from '@/config';
import * as LucideIcons from 'lucide-react';

function getIcon(iconName: string): ElementType {
  const icons = LucideIcons as unknown as Record<string, ElementType>;
  return icons[iconName] || LucideIcons.Circle;
}

interface ServiceCardProps {
  service: { iconName: string; title: string; description: string; image: string };
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { containerRef, getTransform } = useServiceParallax();
  const Icon = getIcon(service.iconName);

  return (
    <div
      ref={containerRef}
      className={cn(
        'group relative p-8 lg:p-10 border border-white/10 rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden',
        'bg-black/40 backdrop-blur-2xl hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-2'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Icon Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full transition-all duration-500 group-hover:bg-blue-400/20" />
      
      <div className="relative z-10 flex flex-col h-full space-y-6">
        {/* Icon */}
        <div className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-2xl bg-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="w-7 h-7 text-blue-400" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">{service.title}</h3>
          <p className="text-base text-white/50 leading-relaxed font-light">
            {service.description}
          </p>
        </div>

        {/* Index Number */}
        <div className="mt-auto pt-4 text-xs font-geist-mono text-white/10 group-hover:text-white/30 transition-colors">
          /0{index + 1}
        </div>
      </div>

      {/* Hover Image Overlay */}
      <div
        className={cn(
          'absolute right-8 top-1/2 -translate-y-1/2 w-48 h-32 lg:w-64 lg:h-40 overflow-hidden rounded-2xl shadow-2xl pointer-events-none z-20',
          'transition-all duration-700 ease-out-quart border border-white/20',
          isHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-6'
        )}
        style={getTransform(40, 4)}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
      </div>
    </div>
  );
}

export function Services() {
  if (!servicesConfig.heading && servicesConfig.services.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="services" className="w-full py-24 lg:py-32 bg-transparent text-white">
      <div className="container-large px-6 lg:px-12">
        {/* Header */}
        <div 
          ref={headerRef} 
          className={cn(
            "max-w-2xl mb-20 space-y-4 p-8 lg:p-12 border border-white/10 rounded-[2rem] bg-black/40 backdrop-blur-2xl transition-all duration-1000 ease-out-quart",
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-xs font-geist-mono uppercase tracking-[0.3em] text-blue-400 block font-bold">
            {servicesConfig.label}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            {servicesConfig.heading}
          </h2>
        </div>

        {/* Services Grid */}
        {servicesConfig.services.length > 0 && (
          <div
            ref={servicesRef}
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ease-out-quart',
              servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {servicesConfig.services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
