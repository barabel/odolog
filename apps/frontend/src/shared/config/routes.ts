export const ROUTES = {
  patterns: {
    vehicle: ':vehicleId',
    analytics: 'analytics',
    settings: 'settings',
  },
  list: (vehicleId: string) => `/${vehicleId}`,
  analytics: (vehicleId: string) => `/${vehicleId}/analytics`,
  settings: (vehicleId: string) => `/${vehicleId}/settings`,
} as const;
