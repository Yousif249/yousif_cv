import { type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight } from 'lucide-react';
import { footerConfig } from '@/config';
import * as LucideIcons from 'lucide-react';
import { type ElementType } from 'react';

function getIcon(iconName: string): ElementType {
  const icons = LucideIcons as unknown as Record<string, ElementType>;
  return icons[iconName] || LucideIcons.Circle;
}

export function Footer() {
  if (!footerConfig.logo && footerConfig.columns.length === 0 && footerConfig.socialLinks.length === 0) return null;

  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer ref={ref} className="w-full bg-transparent text-white py-16 lg:py-24">
      <div className="container-large px-6 lg:px-12">
        <div 
          className={cn(
            "relative bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 lg:p-20 shadow-2xl overflow-hidden transition-all duration-1000 ease-out-quart",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          {/* Subtle light effect */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-8">
              {footerConfig.logo && (
                <a href="#" className="inline-block group">
                  <span className="text-3xl font-bold tracking-tighter transition-all group-hover:text-blue-400">
                    {footerConfig.logo.split(' ').map((word, i) => (
                      <span key={i} className={i === 1 ? "text-blue-400" : ""}>{word} </span>
                    ))}
                  </span>
                </a>
              )}
              {footerConfig.description && (
                <p className="text-base text-white/50 max-w-xs leading-relaxed font-light">
                  {footerConfig.description}
                </p>
              )}

              {/* Social Links */}
              {footerConfig.socialLinks.length > 0 && (
                <div className="flex gap-4 pt-4">
                  {footerConfig.socialLinks.map((social) => {
                    const Icon = getIcon(social.iconName);
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-12 h-12 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 hover:bg-blue-500 hover:text-white hover:border-blue-400 hover:-translate-y-1 transition-all duration-500 shadow-xl"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              {footerConfig.columns.map((column, colIndex) => (
                <div key={column.title} className="space-y-6">
                  <h4 className="text-[10px] font-geist-mono uppercase tracking-[0.3em] text-blue-400 font-bold">
                    {column.title}
                  </h4>
                  <ul className="space-y-4">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="text-sm text-white/50 hover:text-white transition-all duration-300 inline-flex items-center gap-2 group font-light"
                        >
                          <span className="w-1 h-1 bg-blue-500/0 rounded-full group-hover:bg-blue-500 group-hover:w-2 transition-all" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter Column */}
            {footerConfig.newsletterHeading && (
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-geist-mono uppercase tracking-[0.3em] text-blue-400 font-bold">
                    {footerConfig.newsletterHeading}
                  </h4>
                  {footerConfig.newsletterDescription && (
                    <p className="text-sm text-white/50 leading-relaxed font-light">
                      {footerConfig.newsletterDescription}
                    </p>
                  )}
                </div>
                <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder={footerConfig.newsletterPlaceholder || "your@email.com"}
                    className="w-full pl-6 pr-16 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all shadow-inner"
                  />
                  {footerConfig.newsletterButtonText && (
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition-all flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            {footerConfig.copyright && (
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-geist-mono">
                {footerConfig.copyright}
              </p>
            )}
            {footerConfig.credit && (
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-geist-mono">
                {footerConfig.credit}
              </p>
            )}
            <div className="flex gap-8">
               <span className="text-[10px] uppercase tracking-widest text-white/20 font-geist-mono hover:text-blue-400 transition-colors cursor-pointer">Privacy</span>
               <span className="text-[10px] uppercase tracking-widest text-white/20 font-geist-mono hover:text-blue-400 transition-colors cursor-pointer">Terms</span>
            </div>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
        </div>
      </div>
    </footer>
  );
}
