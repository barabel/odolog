/**
 * Проверяет массив ли элемент и не пустой ли он (length > 0)
 */
export const isArrayAndNotEmpty = <T>(array?: T[]): array is T[] => {
  return Array.isArray(array) && array.length > 0;
};
