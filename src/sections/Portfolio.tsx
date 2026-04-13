import { } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '@/config';

function ProjectCard({ project, index, isVisible }: { project: { title: string; category: string; year: string; image: string; featured?: boolean }; index: number; isVisible: boolean }) {
  return (
    <div
      className={cn(
        'group relative cursor-pointer transition-all duration-1000 ease-out-quart',
        project.featured ? 'lg:col-span-2' : '',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className={cn(
          'relative overflow-hidden rounded-2xl aspect-[4/3] mb-6',
          project.featured && 'lg:aspect-[16/9]'
        )}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out-cubic group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Top Indicators */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
             <span className="px-3 py-1 text-[10px] font-geist-mono uppercase tracking-widest bg-blue-500/20 backdrop-blur-md rounded-full text-blue-300 border border-blue-500/30">
              {project.category}
            </span>
            <span className="px-3 py-1 text-[10px] font-geist-mono bg-white/10 backdrop-blur-md rounded-full text-white/70 border border-white/10">
              {project.year}
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="px-4 pb-4 flex justify-between items-end">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-500">
            <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface PortfolioProps {
  onContactClick: () => void;
}

export function Portfolio({ onContactClick }: PortfolioProps) {
  if (!portfolioConfig.heading && portfolioConfig.projects.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, visibleItems } = useStaggerAnimation(portfolioConfig.projects.length + 1, 120);

  return (
    <section id="portfolio" className="w-full py-24 lg:py-32 bg-transparent text-white">
      <div className="container-large px-6 lg:px-12">
        {/* Header */}
        <div 
          ref={headerRef} 
          className={cn(
            "max-w-4xl mb-20 space-y-6 p-10 lg:p-16 border border-white/10 rounded-[2.5rem] bg-black/40 backdrop-blur-2xl transition-all duration-1000 ease-out-quart",
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-xs font-geist-mono uppercase tracking-[0.3em] text-blue-400 block font-bold">
            {portfolioConfig.label}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            {portfolioConfig.heading}
          </h2>
          <p className="text-xl text-white/50 leading-relaxed font-light max-w-2xl">
            {portfolioConfig.description}
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioConfig.projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isVisible={visibleItems[index] || false}
            />
          ))}

          {/* Decorative CTA Card */}
          {portfolioConfig.cta.heading && (
            <div
              className={cn(
                'relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-3xl border border-white/10 rounded-3xl p-10 flex flex-col justify-between transition-all duration-1000 ease-out-quart aspect-[4/3]',
                visibleItems[portfolioConfig.projects.length] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="space-y-4">
                <span className="text-xs font-geist-mono uppercase tracking-widest text-blue-400">
                  {portfolioConfig.cta.label}
                </span>
                <h3 className="text-3xl font-bold text-white leading-tight">
                  {portfolioConfig.cta.heading}
                </h3>
              </div>
              <button 
                onClick={onContactClick} 
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-2xl font-bold text-sm hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all duration-500 self-start group"
              >
                <span>{portfolioConfig.cta.linkText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              
              {/* Decorative shapes */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
              <div className="absolute top-10 right-10 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
