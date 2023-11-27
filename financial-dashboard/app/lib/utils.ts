// @file: /app/lib/utils
import { Revenue } from './definitions';

// повертає строкове представлення грошової суми в доларах США
export const formatCurrency = (amount:number) => {
  // для форматування числа в грошовий формат
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

// повертає дату у вигляді строки залежно від локалізації
export const formatDateToLocal = (
  dateStr:string,
  locale:string = 'en-US',
) => {
  // створюємо новий об'єкт Date з переданого рядка дати
  const date = new Date(dateStr);
  // опції форматування дати в рядкове представлення
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  // створюємо об'єкт Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat(locale, options);
  // використовуємо створений форматер
  return formatter.format(date);
};

// функція для генерації даних для вісі Y графіка на основі надходжень
export const generateYAxis = (revenue:Revenue[]) => {
  // масив для зберігання підписів для вісі Y
  const yAxisLabels = [];
  // знайдення найвищого показника надходжень серед всіх місяців
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  // визначення верхнього підпису на вісі Y, округленого вгору 
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;
  // заповнення масиву підписів для вісі Y від верхнього значення до 0
  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }
  // об'єкт, що містить масив підписів та верхнє значення для вісі Y
  return { yAxisLabels, topLabel };
};

// генерує масив для компонента пагінації
export const generatePagination = (currentPage:number, totalPages:number) => {
  // якщо загальна кількість сторінок <= 7, 
  if (totalPages <= 7) {
    // повертаємо масив з усіма сторінками від 1 до totalPages
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // якщо поточна сторінка <= 3,
  if (currentPage <= 3) {
    // показуємо перші три сторінки, '...' та останні дві сторінки
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // якщо поточна сторінка >= totalPages - 2,
  if (currentPage >= totalPages - 2) {
    // показуємо перші дві сторінки, '...', та останні три сторінки.
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // у всіх інших випадках показуємо
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
