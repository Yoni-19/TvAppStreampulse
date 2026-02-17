
import React from 'react';
import { FAVORITES, RECENT_WATCHED, NEW_RELEASES } from '../constants';
import MediaCard from '../components/MediaCard';

const Profile: React.FC = () => {
  return (
    <div className="space-y-8 px-6 pt-12">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-primary overflow-hidden">
               <img 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl9ACgxF7ZpqWlvWipdekqDoJceQIxX6o4ef4s6_EH4Hy17UfrFyvljfQO5iSBj8nxNaD8P-TNlnQA35gYB56r837gDk4yFm9K7bdgSQtbXJtscdP645X6Z95sk7YGUEDcjZY7z66y6p4LSAPeFoQDYMenPkReWwj7BkatiHzYJaILl7_fX382TicCdvwHPXgR7hB35SAScdZGLy_4VmusrDTrr_ELGKC5uF0PNLfWicXvxIYvTT5GZnm_gGP_BqZZzlou_Ih9hnE" 
                 alt="Profile" 
                 className="w-full h-full object-cover" 
               />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary w-5 h-5 rounded-full border-2 border-background-dark flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] text-white">edit</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-none">Alex Johnson</h1>
            <p className="text-sm text-slate-400 mt-1">Premium Member</p>
          </div>
        </div>
        <button className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <section className="grid grid-cols-3 gap-3">
        <div className="bg-card-dark p-3 rounded-2xl text-center border border-white/5">
          <p className="text-xs text-slate-500">Movies</p>
          <p className="font-bold text-lg">124</p>
        </div>
        <div className="bg-card-dark p-3 rounded-2xl text-center border border-white/5">
          <p className="text-xs text-slate-500">Series</p>
          <p className="font-bold text-lg">42</p>
        </div>
        <div className="bg-card-dark p-3 rounded-2xl text-center border border-white/5">
          <p className="text-xs text-slate-500">Minutes</p>
          <p className="font-bold text-lg">12k+</p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">My Favorites</h2>
          <button className="text-sm text-primary font-medium">See all</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
          {FAVORITES.map(item => (
            <div key={item.id} className="relative group">
              <MediaCard item={item} />
              <div className="absolute top-2 right-2 text-red-500 drop-shadow-md">
                <span className="material-symbols-outlined text-[20px] fill-current">favorite</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recently Watched</h2>
        </div>
        <div className="space-y-4">
          {RECENT_WATCHED.map(item => (
            <div key={item.id} className="flex gap-4 items-center bg-card-dark p-2 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
               <div className="relative w-32 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                  </div>
               </div>
               <div className="flex-1 min-w-0 pr-2">
                  <h3 className="text-sm font-bold truncate text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 mb-1">{item.subtitle}</p>
                  <p className="text-[10px] text-primary font-semibold">{item.timeRemaining}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">New Recommendations</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {NEW_RELEASES.map(item => (
            <MediaCard key={item.id} item={item} type="landscape" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
