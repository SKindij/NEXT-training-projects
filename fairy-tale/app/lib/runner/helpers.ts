// @path: @/app/lib/runner/helpers.ts
import { Action, Condition } from '../builder/types';

// Функція, що перевіряє, чи виконується умова для заданого стану
export function isConditionMet(
  state: Record<string, number>, // Поточний стан
  condition: Condition<string> | undefined // Умова
): boolean {
  if (condition == null) {
    return false; // Повертає false, якщо умова не визначена
  }
  // Отримання значення зі стану за вказаним ключем
  const targetValue = state[condition.target];
  // Очікуване значення для порівняння
  const value = condition.value;

  switch (condition.operator) {
    case 'eq':
      return targetValue === value;
    case 'gt':
      return targetValue > value;
    case 'lt':
      return targetValue < value;
    case 'neq':
      return targetValue !== value;
  }
}

// Функція для застосування дій до стану
export function applyAction(
  state: Record<string, number>, // Поточний стан
  actions: Action<string>[] // Масив дій
) {
  for (const action of actions) {
    if (action.operator === 'increment') {
      // Збільшення значення за ключем на певне число
      state[action.target] += action.value;
      continue;
    }

    if (action.operator === 'set') {
      // Встановлення нового значення для ключа
      state[action.target] = action.value;
      continue;
    }

    if (action.operator === 'decrement') {
      // Зменшення значення за ключем на певне число
      state[action.target] -= action.value;
      continue;
    }
  }
  // Повертає оновлений стан після застосування всіх дій
  return { ...state };
}