export type TVehicles = {
  id: string
  name: string
}

export type TOdometerEntries = {
  id: string
  vehicleId: string
  date: string
  odometer: number
  synced: boolean
  updatedAt: number
  deletedAt: number | null
}

export type TFuelEntries = {
  id: string
  vehicleId: string
  date: string
  odometer: number
  liters: number
  totalCost: number
  synced: boolean
  updatedAt: number
  deletedAt: number | null
}

