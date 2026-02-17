
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageRoute } from '../types';
import { cn } from '../lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || PageRoute.HOME;

  const NavItem = ({ route, icon, label }: { route: PageRoute, icon: string, label: string }) => {
    const isActive = currentPath === route || (route === PageRoute.HOME && currentPath === '');
    return (
      <Link 
        to={`/${route === PageRoute.HOME ? '' : route}`}
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300", // Flex row siempre
          isActive 
            ? "bg-primary/20 text-primary" 
            : "text-slate-400 hover:text-white hover:bg-white/5"
        )}
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
          {icon}
        </span>
        <span className={cn("text-sm font-medium", isActive ? "font-bold" : "")}>
          {label}
        </span>
      </Link>
    );
  };

  return (
    <div className="flex justify-center bg-background-dark min-h-screen">
      <div className="w-full max-w-[430px] relative pb-32">
        {children}
        
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background-dark/80 backdrop-blur-2xl border-t border-white/5 px-6 pt-4 pb-8 flex justify-around items-center z-50">
          <NavItem route={PageRoute.HOME} icon="home" label="Home" />
          <NavItem route={PageRoute.SERIES} icon="live_tv" label="Series" />
          <NavItem route={PageRoute.PROFILE} icon="person" label="Perfil" />
        </nav>
      </div>
    </div>
  );
};

export default Layout;
