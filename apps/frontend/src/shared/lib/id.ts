import { customAlphabet, nanoid } from 'nanoid';

export const genId = (size?: number) => nanoid(size);

const vehicleIdAlphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
export const genVehicleId = customAlphabet(vehicleIdAlphabet, 6);
