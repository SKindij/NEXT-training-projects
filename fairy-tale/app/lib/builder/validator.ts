// @path: @/app/lib/builder/validator.ts
import { Scene } from "./types";

// Функція для перевірки валідності схеми модуля
export function validateModuleScheme(
  initialScene: Scene<any>, // Початкова сцена модуля
  scenes: Scene<any>[] // Масив усіх сцен модуля
) {
  // Створення масиву, що містить усі сцени, включно з початковою
  const allScenes = [initialScene, ...scenes];
  // Отримання всіх опцій з усіх сцен модуля
  const allOptions = allScenes.map((x) => Object.values(x.options)).flat();
  // Фільтрація сцен, до яких неможливо дістатися
  const unreachableScenes = scenes.filter((scene) =>
    allOptions.every((opt) => opt.nextSceneId !== scene.id)
  );
  // Фільтрація опцій, що посилаються на неіснуючі сцени
  const optionWithoutScenes = allOptions.filter((opt) =>
    allScenes.every((scene) => scene.id !== opt.nextSceneId)
  );
  // Повернення об'єкта з результатами перевірки
  return {
    valid: !unreachableScenes.length && !optionWithoutScenes.length, // Валідність схеми
    unreachableScenes, // Недосяжні сцени
    optionWithoutScenes, // Опції без посилань на сцени
  };
}