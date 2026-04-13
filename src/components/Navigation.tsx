import { useState, useEffect, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedButton } from './AnimatedButton';
import { navigationConfig } from '@/config';

interface NavigationProps {
  onContactClick: () => void;
}

export function Navigation({ onContactClick }: NavigationProps) {
  if (!navigationConfig.logo && navigationConfig.links.length === 0) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in navbar after page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-6 left-0 right-0 z-50 transition-all duration-700 ease-out-quart px-6 lg:px-12',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
        )}
      >
        <div 
          className={cn(
            "max-w-7xl mx-auto transition-all duration-500 ease-in-out",
            "bg-[#111]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl",
            "border-b-[6px] border-blue-600/40",
            isScrolled ? "py-2 px-6 scale-[0.98]" : "py-4 px-10 scale-100"
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            {navigationConfig.logo && (
              <a href="#" className="flex items-center">
                <span className="text-2xl font-bold tracking-tight text-white">
                  {navigationConfig.logo}
                </span>
              </a>
            )}

            {/* Desktop Navigation */}
            {navigationConfig.links.length > 0 && (
              <div className="hidden lg:flex items-center gap-10">
                {navigationConfig.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            )}

            {/* Contact Button */}
            {navigationConfig.contactLabel && (
              <div className="hidden lg:block">
                <AnimatedButton
                  onClick={onContactClick}
                  variant="keycap"
                  size="sm"
                >
                  {navigationConfig.contactLabel}
                </AnimatedButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            {navigationConfig.links.length > 0 && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-4 flex flex-col justify-between">
                  <span
                    className={cn(
                      'w-full h-0.5 bg-white transition-all duration-500 origin-center',
                      isMenuOpen && 'translate-y-[7px] rotate-[-45deg]'
                    )}
                  />
                  <span
                    className={cn(
                      'w-full h-0.5 bg-white transition-all duration-300',
                      isMenuOpen && 'scale-x-0 opacity-0'
                    )}
                  />
                  <span
                    className={cn(
                      'w-full h-0.5 bg-white transition-all duration-500 origin-center',
                      isMenuOpen && '-translate-y-[7px] rotate-[45deg]'
                    )}
                  />
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {navigationConfig.links.length > 0 && (
        <div
          className={cn(
            'fixed inset-0 z-40 bg-white transition-all duration-500 ease-out-cubic lg:hidden',
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          )}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navigationConfig.links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'text-3xl font-semibold text-exvia-black transition-all duration-500 ease-out-quart',
                  isMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
            {navigationConfig.contactLabel && (
              <AnimatedButton
                onClick={() => {
                  setIsMenuOpen(false);
                  onContactClick();
                }}
                variant="keycap"
                size="lg"
                className={cn(
                  'mt-4 transition-all duration-500 ease-out-quart',
                  isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
              >
                {navigationConfig.contactLabel}
              </AnimatedButton>
            )}
          </div>
        </div>
      )}
    </>
  );
}
