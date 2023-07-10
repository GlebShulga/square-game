export type RoutesPathType = 'home' | 'game' | 'fallback';

export const RoutesPath: Record<RoutesPathType, string> = {
    home: '/',
    game: '/game',
    fallback: '*',
};
