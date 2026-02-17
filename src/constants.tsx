
import { MediaItem } from './types';

export const HERO_MOVIE: MediaItem = {
  id: 'h1',
  title: 'Avengers: Endgame',
  subtitle: 'Marvel Studios',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-nZ0veUCHuEfaoQ2brD-mrNFNZKnbNanAie2URfTZY54xEhEpW2Fr5pY07Z2-7ZPhLGsjqs_W3aP9xRmCUi2C7TpqHtdPf6ZYsMrdhjoJ_jk9AaTWsaUb-KDmEsL-e9W7kNuDB0M3cRthn1zua2ozw3EilBAON6WThxvHlKOgAoJ1CnaL4Nzm3fFcWHPfyOgrraNR75E0AyTszI_xsIBn0hdK-WKXWRWrD8ohMv9QWVcC7MtQOUF5UwZS8OCAm3eayoPsELFvAQQ',
};

export const TRENDING_MEDIA: MediaItem[] = [
  { id: 't1', title: 'Zero', subtitle: 'Red Chillies', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EXzK7l-CESYZflBpi5JrgmVk2pkLmHjWP21VKZD3si0L3ZTHqFT_NR1tDr-WkaJLXBiwEnp5UZG-y2au8nORW8B8MTuvaLjwBz3hG_i_v9f0L9EFo2vxD6c2KnA-lJEKH8mnznkCZcGDdiOeSqG08mzWm_G32AlQs_EC2zeJSdr8SCUyvlUxS-4YyH49NhizLVr6671Iu1onr0FJOTvfutvANcsjf9pHCcSRTHzIAT0U2hCgpRH7sjufYnJgxnStPjN2UOmdYGA', rating: 3 },
  { id: 't2', title: 'Sanju', subtitle: 'RH Films', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKe89ikAnJyaJrqY8A2pVdr9-zBium_I3YrnMEX5nRpy4xqDfRWewF0TChFyW3H2hUipC2XJF3bCg5BIKD_N4fLsc9nXTtDZdzQp2BN-Ux0dXYVXdIcmOELVANbIvJP85nfIZ_Lrt8bqwKVYaroi_HzQcv3vIw76iyq3DQaQaMiOXWgAmcc3lNqM6sZt-ArrASYsOWRXs8fYAcoQ6bC0PxcHii9HVl40k5MpMb6FGyuFc5vd6gxYB1akfVjXdO-mrFtWNhAyTQNRM', rating: 4 },
  { id: 't3', title: 'Barfi', subtitle: 'Ishana M', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxv97HoVKEQeIfZHIpZp2tOJLpDdDTvNgYHBTS697KlB4y5oy_vabVKzKxwhnIMCExsia_uOlr2gsNA0pZopX2E2lrxejhX_dA1iOG0ksRfr81HkaOYDKAzwgzn1wTGy2-os8vNc4803DdBKJuyBUTgJMfnbE-4eoy6M3jQ71rAdaqwEL99r2PID_IBNoVJSMSLnB3xXRhj3af1EpTmkmcx2kpCp79TEe0eLH2AUPWMexCL1kB_XCL6xzINx3FVVilXIKCwtfFhYM', rating: 5 },
];

export const RECENT_WATCHED: MediaItem[] = [
  { id: 'rw1', title: 'Stranger Things', subtitle: 'S4 • E8 "Papa"', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhlCJKav3TSliDThSnPxCr-zmcGxGIzHQOdwYCnGRxbDMrcIaL1CT_OvwOaL_4aVg87FL-iDgq0jbUZ19gRLeV19bhAjXmD8qmFB05oUn6Pzk-ZVLgErKsAuoqa3lscgLuoFax8jcXS6VgV_kXg7G53EHVCMS0copKr016E-hq4FR2J0qpm1b9sYlByfE22WiNndGsuF8ggVKN6dAI8sdSML1mzbzBuLgc6tG6W5MTZvpRX6V6H6GxvuQ80If9WMtV0QvKmGN-R3U', progress: 75, timeRemaining: '12m remaining' },
  { id: 'rw2', title: 'The Mandalorian', subtitle: 'S3 • E1 "The Apostate"', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWR8aBkyl016iRHJtCLkb0NiIYfzAa0ndadQW21x0cOjO68475ceE0kMAzN2fOsgo-oGsU-OuyAxpnnLKfEaQ414mPZaoHNfB_Ztymj8Uow_mPnWk0PMKRSJNTHcBgtRMVb0IXjk9AKpKZuMYbnyiwU7NhmzVh6IQgEvUGl7HzXDqKKEgxcax_w_HIpku0fmqcbFSdqDLv8QyJFfD0lepS89OBC2qFRm0hK2gzAIfQEGB5-84tsA7h35uEAmpx0zda8U7qOju_Shc', progress: 30, timeRemaining: '32m remaining' },
];

export const FAVORITES: MediaItem[] = [
  { id: 'f1', title: 'Interstellar', subtitle: 'Sci-Fi • 2014', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx_1wv7DyfKe7B4CKw1CE35rEnS-zDuQlbZkDZ7bE1QMDiRfG64Mqq6BJIYOzv_-zW0ariulNkgrMCC7aBtIiAzSJF4CZWHYmSySGeQ8l42wJLrceA8_d6e10JugKJ1Npud_1ZstsqiUZyuruD6wR26WrHRyzCnzg7ETP3Z4xIp3vc-jQjJLl50qGoXXuo0OWnitqT1UNPJYCuxJgjtDmcXcKPVtQcgo-tvJqeUMw8Nos9ONzTSyPmX0xObX9pf3O5IED95WUFCEE' },
  { id: 'f2', title: 'Joker', subtitle: 'Crime • 2019', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLHUpYxRhMfz21K9PG_WqNjupp8UJetPI34AoozLVe-68fyW2T9wVdTxPnvRb5bOG8529TVzDgmTJsLtx5_bKLRuxmKilt-Srrd731waclR-1z67ayGHz4IFNsys26nCOwwOp0mmBNFzsXH5lS_pkqbzUG1jUTlONQT769U_RBf9IxcdYga0o1Se96jbyWRRjjeybDwHlwdbiuBniKCv54Q4v0sZhayocGnUh3J4kkuGcEhUby1Z_hKVhSUnpF7UARWayYFJZiBEk' },
  { id: 'f3', title: 'Inception', subtitle: 'Action • 2010', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPYBrXlsA4tOpL0_Ge1MnyFtGI6PuwZWNnWEZGfvQBDzGA7rb2IsT9enOyhqYQfHD2fqEYBuYCnUvkDMmLQRbgW5GmWGb39Y8DNTD25yHPdS2TRotMVHyfrb9L1t9h2LmKKp6m2u4LzQ_UEC0zP7KzGR9jnQ_tR1UjCYxD5gziFUZ9CTWi8Tnys2ZrVPXAR8BVEbQkvfSthP6sIrNPhdPVzcPAK7X6Pl42CYlu0daRB8NrHIMqSzqoqfUQRXT6-otLf6CfeqxG60c' },
];

export const NEW_RELEASES: MediaItem[] = [
  { id: 'nr1', title: 'Cyberpunk 2077', subtitle: 'Sci-Fi', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKC-nRRWF_dYPVG7d4TBEWZKWpzJEemY9v4y2nRTEFsd0VrX_vWoYHiYujOTAEslPoM_JbFhVwRY7JVNO2ZerMOLW-nrlT8hyJeZ1Z_3pnMK9u1PnPYkkLp7Plm5VQOvNlH9nyAS7XXd-GID_DM2mFgbMMauR35dHhje4txrs5ad6Gb7Wi1AddhIIlZAlQnNF2Hg1QXUnLJyrLefNCir7Lpi9iMTn82dxgezgjhTOrSYHTs0IVwA0EHvmck4Jt2vbK-84c6DYEnY', isNew: true },
  { id: 'nr2', title: 'Deep Space Nine', subtitle: 'Sci-Fi', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHLFSUdjtZaAinh2gSv6XfOymPstYW0SCfm-imSQDCQc9CCZTqgdkWOVuJsQiy5vkvk5Fc1D-XkLzHuXIEGLhPGJKQ9XQkoQo71kV6tyg2-TcWy1QXB7at8B1UZdvHMCvrWd_rlnmd66XK09fYf01OYj3rKHmazrcPRO2cvMu569BXMrgZBNK1hvN1HTV19G7VPM8zmGSA997I3WS7UrsTxLA38vxCZwId4t4AMYoQUxbRmo97mmN1rYXLMgY4grF7SM6boFCrMyk', isNew: true },
];
