import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { tmdbService, getImageUrl } from '../services/tmdb';
import { MediaItem } from '../interfaces/types';
import MediaCard from '../components/MediaCard';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites(); // <--- 1. Traemos los favoritos del sistema
  
  // Estado para guardar la info completa de los favoritos
  const [favoriteItems, setFavoriteItems] = useState<MediaItem[]>([]);
  // Estado para recomendaciones (datos reales de API)
  const [recommendations, setRecommendations] = useState<MediaItem[]>([]);
  // Estado para "Recently Watched" (Simulado con datos reales)
  const [recent, setRecent] = useState<MediaItem[]>([]);

  // Añade esto debajo de tus otros useState
  const [showSettings, setShowSettings] = useState(false);

  // 1. Creamos la referencia
  const menuRef = useRef<HTMLDivElement>(null);

  const [activeModal, setActiveModal] = useState<'none' | 'edit' | 'settings'>('none');

  // Estados para la información del usuario
  // Estados para la información del usuario con lectura inicial de LocalStorage
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || 'Alex Johnson';
  });

  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('userEmail') || 'alex@ejemplo.com';
  });

  // Estados para Ajustes (con persistencia)
  const [pushNotifications, setPushNotifications] = useState(() => {
    return localStorage.getItem('pushNotifications') === 'true'; 
  });

  const [wifiOnly, setWifiOnly] = useState(() => {
    return localStorage.getItem('wifiOnly') === 'true';
  });


  // 2. El guardián que vigila los clics
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Si el clic ocurrió y NO fue dentro de nuestro contenedor 'menuRef', lo cerramos
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    // Si el menú está abierto, empezamos a escuchar los clics en la pantalla
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Limpieza vital: dejamos de escuchar cuando el componente se desmonta o el menú se cierra
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // A. CARGAR FAVORITOS REALES
        if (favorites.length > 0) {
          // Tomamos solo los últimos 4 para la vista previa
          const idsToLoad = favorites.slice(0, 4); 
          const data = await tmdbService.getByIds(idsToLoad);
          
          const formattedFavs: MediaItem[] = data.map((item: any) => ({
            id: item.id.toString(),
            title: item.title || item.name,
            subtitle: item.media_type === 'movie' ? 'Película' : 'Serie',
            image: getImageUrl(item.poster_path),
            type: item.media_type || (item.title ? 'movie' : 'tv'),
            rating: Number(item.vote_average.toFixed(1)),
          }));
          setFavoriteItems(formattedFavs);
        } else {
          setFavoriteItems([]);
        }

        // B. CARGAR RECOMENDACIONES (Top Rated)
        const topRated = await tmdbService.getTopRated();
        setRecommendations(topRated.results.slice(0, 5).map((item: any) => ({
             id: item.id.toString(),
             title: item.title,
             image: getImageUrl(item.backdrop_path), // Usamos backdrop para variar
             type: 'movie'
        })));

        // C. CARGAR "RECENTLY WATCHED" (Usamos 'Now Playing' para simular)
        const nowPlaying = await tmdbService.getNowPlaying();
        setRecent(nowPlaying.results.slice(0, 2).map((item: any) => ({
             id: item.id.toString(),
             title: item.title,
             subtitle: `S1 • E${Math.floor(Math.random() * 10) + 1}`, // Inventamos episodio
             image: getImageUrl(item.backdrop_path),
             type: 'movie'
        })));

      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    };

    fetchData();
  }, [favorites]); // <--- Se ejecuta cada vez que cambias un favorito

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Borramos la sesión
    // AÑADIMOS replace: true
    navigate('/login', { replace: true }); 
  };

  return (
    <div className="min-h-screen bg-background-dark pb-32">
      
      {/* 1. HEADER DEL PERFIL */}
      <div className="px-6 pt-10 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          
          {/* CONTENEDOR RELATIVO (Para el menú flotante) */}
          <div className="relative" ref = {menuRef}>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="w-16 h-16 rounded-full bg-linear-to-tr from-primary to-purple-400 p-0.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <img 
                src="https://i.pravatar.cc/150?img=11" 
                alt="User" 
                className="w-full h-full rounded-full object-cover border-2 border-background-dark"
              />
            </button>

            {/* EL MENÚ FLOTANTE */}
            {showSettings && (
              <div className="absolute top-20 left-0 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                <button 
                  onClick={() => {
                    setActiveModal('edit');
                    setShowSettings(false); // Cierra el menú al hacer clic
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-3 transition"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Editar Perfil
                </button>

                <button 
                  onClick={() => {
                    setActiveModal('settings');
                    setShowSettings(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-3 transition"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  Ajustes
                </button>
                
                <div className="h-px bg-white/10 my-1"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">{userName}</h1>
            <p className="text-slate-400 text-sm">Miembro Premium</p>
          </div>
        </div>

        {/* Campanita de notificaciones (reemplaza al botón de logout suelto) */}
        <button 
          title="Notificaciones"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>

      {/* 2. ESTADÍSTICAS (Estáticas por ahora) */}
      <div className="px-6 grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Movies', value: '124' },
          { label: 'Series', value: '42' },
          { label: 'Horas', value: '12k+' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
            <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 3. MY FAVORITES (REALES) */}
      <section className="px-6 mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-white">Mis Favoritos</h2>
          <button 
            onClick={() => navigate('/favorites')}
            className="text-primary text-sm font-semibold hover:text-primary/80 transition"
          >
            Ver todo
          </button>
        </div>

        {favoriteItems.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
             {favoriteItems.slice(0, 3).map((item) => (
               <MediaCard key={item.id} item={item} type="poster" className="w-full" />
             ))}
          </div>
        ) : (
          <div 
            onClick={() => navigate('/search')}
            className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center text-slate-500 cursor-pointer hover:border-primary/50 transition"
          >
            <p className="text-sm">No tienes favoritos aún</p>
            <p className="text-xs mt-1 text-primary">Explorar contenido</p>
          </div>
        )}
      </section>

      {/* 4. RECENTLY WATCHED (DISEÑO MEJORADO) */}
      <section className="px-6 mb-8">

        <h2 className="text-lg font-bold text-white mb-4">Continuar Viendo</h2>

        <div className="space-y-4">

          {recent.map((item, idx) => (

            <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-3 pr-4 items-center border border-white/5 hover:bg-white/10 transition group cursor-pointer">
              {/* Thumbnail con botón Play */}
              <div className="relative w-24 aspect-video rounded-lg overflow-hidden shrink-0">

                <img src={item.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition"/>

                <div className="absolute inset-0 flex items-center justify-center">

                   <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">

                      <span className="material-symbols-outlined text-white text-sm">play_arrow</span>
                      
                   </div>

                </div>
                
                {/* Barra de progreso */}

                <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">

                  <div className="h-full bg-primary" style={{ width: idx === 0 ? '75%' : '30%' }}></div>

                </div>

              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">

                <h3 className="text-white font-medium truncate">{item.title}</h3>
                <p className="text-slate-400 text-xs mb-2">Restan {20 + idx * 10} min</p>

              </div>

              <span className="material-symbols-outlined text-slate-500">more_vert</span>

            </div>

          ))}

        </div>

      </section>

      {/* 5. NEW RECOMMENDATIONS (DISEÑO MEJORADO) */}
      <section className="pl-6">

        <h2 className="text-lg font-bold text-white mb-4">Recomendado para ti</h2>

        <div className="flex gap-4 overflow-x-auto pb-4 pr-6 no-scrollbar">

          {recommendations.map((item) => (
             <div 
               key={item.id} 
               onClick={() => navigate(`/details/movie/${item.id}`)}
               className="relative w-40 aspect-video rounded-xl overflow-hidden shrink-0 group cursor-pointer"
             >

                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>

                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-3">
                   <div>
                      <span className="bg-yellow-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mb-1 inline-block">Nuevo</span>
                      <p className="text-white text-xs font-bold truncate w-32">{item.title}</p>
                   </div>
                </div>

             </div>
          ))}

        </div>

      </section>

      {/* ---------------- MODALES SUPERPUESTOS ---------------- */}
      {activeModal !== 'none' && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
            
            {/* Botón de cerrar (X) universal para ambos modales */}
            <button 
              onClick={() => setActiveModal('none')}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* --- CONTENIDO: EDITAR PERFIL --- */}
            {activeModal === 'edit' && (
              <div>

                <h2 className="text-xl font-bold text-white mb-6">Editar Perfil</h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Evita que la página se recargue
                    const formData = new FormData(e.currentTarget);
                    const newName = formData.get('nombre') as string;
                    const newEmail = formData.get('correo') as string;
                    
                    // 1. Actualizamos los estados (lo que ya hacíamos)
                    setUserName(newName);
                    setUserEmail(newEmail);
                    
                    // 2. ¡NUEVO! Guardamos físicamente en el navegador
                    localStorage.setItem('userName', newName);
                    localStorage.setItem('userEmail', newEmail);
                    
                    // 3. Cerramos el modal
                    setActiveModal('none');
                  }}
                  className="space-y-4"
                >

                  <div>

                    <label className="text-xs text-slate-400 mb-1 block">Nombre de usuario</label>
                    <input 
                      type="text"
                      name="nombre" 
                      defaultValue={userName}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-primary transition" 
                    />

                  </div>

                  <div>

                    <label className="text-xs text-slate-400 mb-1 block">Correo electrónico</label>
                    <input 
                      type="email" 
                      name="correo"
                      defaultValue={userEmail}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-primary transition" 
                    />

                  </div>

                  <button 


                    type = "submit"
                    className="w-full mt-4 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/80 transition"

                  >
                    Guardar Cambios
                  </button>

                </form>

              </div>
            )}

            {/* --- CONTENIDO: AJUSTES --- */}
            {activeModal === 'settings' && (
              <div>

                <h2 className="text-xl font-bold text-white mb-6">Ajustes</h2>

                <div className="space-y-4">

                  <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">

                    <span className="text-sm text-white">Notificaciones Push</span>

                    <input 
                      type="checkbox" 
                      checked={pushNotifications}
                      onChange={(e) => {
                        const val = e.target.checked;
                        setPushNotifications(val);
                        localStorage.setItem('pushNotifications', String(val));
                      }}
                      className="toggle-checkbox w-10 h-5 accent-primary cursor-pointer"                       
                    />

                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">

                    <span className="text-sm text-white">Descargas solo con Wi-Fi</span>

                    <input 
                      type="checkbox" 
                      checked={wifiOnly}
                      onChange={(e) => {
                        const val = e.target.checked;
                        setWifiOnly(val);
                        localStorage.setItem('wifiOnly', String(val));
                      }}
                      className="toggle-checkbox w-10 h-5 accent-primary cursor-pointer" 
                    />

                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">

                    <span className="text-sm text-white">Idioma de la app</span>
                    <span className="text-sm text-primary cursor-pointer">Español</span>

                  </div>

                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;