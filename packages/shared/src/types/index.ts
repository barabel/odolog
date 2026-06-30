export type TVehicles = {
  id: string
  name: string
}

export type TEntryBase = {
  id: string
  vehicleId: string
  measuredAt: number
  odometer: number
  createdAt: number
  updatedAt: number
  deletedAt: number | null
  synced: boolean
}

export type TOdometerEntry = TEntryBase & { type: 'odometer' }

export type TFuelEntry = TEntryBase & { type: 'fuel'; liters: number; totalCost: number }

export type TEntries = TOdometerEntry | TFuelEntry
