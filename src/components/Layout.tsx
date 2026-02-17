
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageRoute } from '../types';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || PageRoute.HOME;

  const NavItem = ({ route, icon, label }: { route: PageRoute, icon: string, label: string }) => {
    const isActive = currentPath === route;
    return (
      <Link 
        to={`/${route === PageRoute.HOME ? '' : route}`}
        className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'active-pill' : 'text-slate-400'}`}
      >
        <div className={`px-5 py-2 rounded-full flex items-center gap-2 ${isActive ? 'bg-nav-blue text-primary' : ''}`}>
          <span className="material-symbols-outlined text-[26px]">{icon}</span>
          {isActive && <span className="text-sm font-semibold">{label}</span>}
        </div>
        {!isActive && <span className="text-[10px] font-medium">{label}</span>}
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
