import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { APPLICATIONS_OPEN } from '@/config/membership';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Events', path: '/events' },
  { label: 'Officers', path: '/officers' },
  { label: 'Recognition', path: '/recognition' },
  { label: 'Foundation', path: '/foundation-giving' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileMenuOpen(false), [location.pathname]);

  const isActiveRoute = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#faf9f7]/95 backdrop-blur-sm">
      <div className="editorial-shell flex h-[72px] items-center justify-between">
        <Link to="/" aria-label="Rotaract Club of Zamboanga City West home">
          <img
            src="/lovable-uploads/e48a4b78-bd32-41b7-b192-969232e8378f.png"
            alt="Rotaract Club of Zamboanga City West"
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActiveRoute(item.path) ? 'page' : undefined}
              className={cn(
                'border-b py-1 text-sm font-semibold transition-colors',
                isActiveRoute(item.path)
                  ? 'border-cranberry-600 text-cranberry-700'
                  : 'border-transparent text-slate-600 hover:text-slate-950'
              )}
            >
              {item.label}
            </Link>
          ))}
          {APPLICATIONS_OPEN && (
            <a
              href="/#join"
              className="border-l border-slate-300 pl-6 text-sm font-semibold text-cranberry-700"
            >
              Applications open
            </a>
          )}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center text-slate-800 lg:hidden"
          onClick={() => setMobileMenuOpen(open => !open)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-[#faf9f7] px-5 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-7xl divide-y divide-slate-200">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActiveRoute(item.path) ? 'page' : undefined}
                className={cn(
                  'py-3 text-base font-semibold',
                  isActiveRoute(item.path)
                    ? 'text-cranberry-700'
                    : 'text-slate-700'
                )}
              >
                {item.label}
              </Link>
            ))}
            {APPLICATIONS_OPEN && (
              <a
                href="/#join"
                className="py-3 text-base font-semibold text-cranberry-700"
              >
                Applications open
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
