
import React from 'react';
import MediaCard from '../components/MediaCard';

const Series: React.FC = () => {
  const popularSeries = [
    { id: 'ps1', title: 'The Last of Us', subtitle: 'Action • Adventure • Drama', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhlCJKav3TSliDThSnPxCr-zmcGxGIzHQOdwYCnGRxbDMrcIaL1CT_OvwOaL_4aVg87FL-iDgq0jbUZ19gRLeV19bhAjXmD8qmFB05oUn6Pzk-ZVLgErKsAuoqa3lscgLuoFax8jcXS6VgV_kXg7G53EHVCMS0copKr016E-hq4FR2J0qpm1b9sYlByfE22WiNndGsuF8ggVKN6dAI8sdSML1mzbzBuLgc6tG6W5MTZvpRX6V6H6GxvuQ80If9WMtV0QvKmGN-R3U' },
    { id: 'ps2', title: 'The Mandalorian', subtitle: 'Sci-Fi • Space Opera', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWR8aBkyl016iRHJtCLkb0NiIYfzAa0ndadQW21x0cOjO68475ceE0kMAzN2fOsgo-oGsU-OuyAxpnnLKfEaQ414mPZaoHNfB_Ztymj8Uow_mPnWk0PMKRSJNTHcBgtRMVb0IXjk9AKpKZuMYbnyiwU7NhmzVh6IQgEvUGl7HzXDqKKEgxcax_w_HIpku0fmqcbFSdqDLv8QyJFfD0lepS89OBC2qFRm0hK2gzAIfQEGB5-84tsA7h35uEAmpx0zda8U7qOju_Shc' }
  ];

  const newReleases = [
    { id: 'nr1', title: 'Dark Matter', subtitle: 'Sci-Fi', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx_1wv7DyfKe7B4CKw1CE35rEnS-zDuQlbZkDZ7bE1QMDiRfG64Mqq6BJIYOzv_-zW0ariulNkgrMCC7aBtIiAzSJF4CZWHYmSySGeQ8l42wJLrceA8_d6e10JugKJ1Npud_1ZstsqiUZyuruD6wR26WrHRyzCnzg7ETP3Z4xIp3vc-jQjJLl50qGoXXuo0OWnitqT1UNPJYCuxJgjtDmcXcKPVtQcgo-tvJqeUMw8Nos9ONzTSyPmX0xObX9pf3O5IED95WUFCEE', isNew: true },
    { id: 'nr2', title: 'The Bear', subtitle: 'Drama', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLHUpYxRhMfz21K9PG_WqNjupp8UJetPI34AoozLVe-68fyW2T9wVdTxPnvRb5bOG8529TVzDgmTJsLtx5_bKLRuxmKilt-Srrd731waclR-1z67ayGHz4IFNsys26nCOwwOp0mmBNFzsXH5lS_pkqbzUG1jUTlONQT769U_RBf9IxcdYga0o1Se96jbyWRRjjeybDwHlwdbiuBniKCv54Q4v0sZhayocGnUh3J4kkuGcEhUby1Z_hKVhSUnpF7UARWayYFJZiBEk' },
    { id: 'nr3', title: 'Silo', subtitle: 'Mystery', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYBrXlsA4tOpL0_Ge1MnyFtGI6PuwZWNnWEZGfvQBDzGA7rb2IsT9enOyhqYQfHD2fqEYBuYCnUvkDMmLQRbgW5GmWGb39Y8DNTD25yHPdS2TRotMVHyfrb9L1t9h2LmKKp6m2u4LzQ_UEC0zP7KzGR9jnQ_tR1UjCYxD5gziFUZ9CTWi8Tnys2ZrVPXAR8BVEbQkvfSthP6sIrNPhdPVzcPAK7X6Pl42CYlu0daRB8NrHIMqSzqoqfUQRXT6-otLf6CfeqxG60c' },
    { id: 'nr4', title: 'The Boys', subtitle: 'Action', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSb_nqBLhJIfUM54-I2LjEekjThAK4pvdsdj09kUatSx73-E4onSoVVfYAFlD54tPaMCQP8jaEarnkXQqgu-d3BlVLMLPdiNJj83Rp46jIHeN-VvGkj6SHCY3PPobziJcj442DYc23U0cVqMgk-SKXrJIoPXoOR9rUNEjx1WSi6Wbi61tFHwPLRQxicjaLp_MhXwU-4DDpN1lL4dCSGz2P_qejcFa1IXdjqITZToboBfA8cS2tIRmEr1FkPAOjw1TCU0IpUkjS_Bo' },
    { id: 'nr5', title: 'Severance', subtitle: 'Sci-Fi', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKC-nRRWF_dYPVG7d4TBEWZKWpzJEemY9v4y2nRTEFsd0VrX_vWoYHiYujOTAEslPoM_JbFhVwRY7JVNO2ZerMOLW-nrlT8hyJeZ1Z_3pnMK9u1PnPYkkLp7Plm5VQOvNlH9nyAS7XXd-GID_DM2mFgbMMauR35dHhje4txrs5ad6Gb7Wi1AddhIIlZAlQnNF2Hg1QXUnLJyrLefNCir7Lpi9iMTn82dxgezgjhTOrSYHTs0IVwA0EHvmck4Jt2vbK-84c6DYEnY' },
    { id: 'nr6', title: 'Fallout', subtitle: 'Sci-Fi', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHLFSUdjtZaAinh2gSv6XfOymPstYW0SCfm-imSQDCQc9CCZTqgdkWOVuJsQiy5vkvk5Fc1D-XkLzHuXIEGLhPGJKQ9XQkoQo71kV6tyg2-TcWy1QXB7at8B1UZdvHMCvrWd_rlnmd66XK09fYf01OYj3rKHmazrcPRO2cvMu569BXMrgZBNK1hvN1HTV19G7VPM8zmGSA997I3WS7UrsTxLA38vxCZwId4t4AMYoQUxbRmo97mmN1rYXLMgY4grF7SM6boFCrMyk' }
  ];

  return (
    <div className="space-y-8 px-6 pt-12">
      <header className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold tracking-tight">Series</h1>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800">
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-sm font-medium">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Genres
          </button>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Popular Series</h2>
          <button className="text-primary text-sm font-medium">See all</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
          {popularSeries.map(item => (
            <div key={item.id} className="min-w-[85vw] relative aspect-[16/9] rounded-2xl overflow-hidden group">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase mb-2 inline-block backdrop-blur-sm">Featured</span>
                <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                <p className="text-xs text-slate-300">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New Releases</h2>
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-6">
          {newReleases.map(item => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Trending Now</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
           {[1, 2, 3].map(i => (
              <div key={i} className="flex-shrink-0 w-32 relative aspect-[2/3] rounded-xl overflow-hidden group">
                <img src={newReleases[i].image} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[10px] text-white font-bold tracking-wider">#{i} Trending</p>
                </div>
              </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Series;
