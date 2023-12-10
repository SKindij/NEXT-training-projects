// @path: @/app/lib/runner/runner.ts
import { applyAction, isConditionMet } from './helpers';
import { Module, Scene, State } from '../builder/types';

// Клас, який виконує логіку взаємодії з книжкою/модулем
export class BookRunner<T extends string> {
  private readonly _module: Module<T>; // Поточний модуль
  private _currentScene: Scene<T>; // Поточна сцена
  private _state: State<T>; // Поточний стан
  // Геттер для опису поточної сцени
  get sceneDescription() {
    return this._currentScene.description;
  }
  // Геттер для виборів, доступних на поточній сцені
  get choices() {
    const allChoices = Object.values(this._currentScene.options);
    return allChoices.filter((x) => !isConditionMet(this._state, x.hidden));
  }
  // Геттер для поточного стану
  get state() {
    return this._state;
  }
  // Геттер для ідентифікатора модуля
  get moduleId() {
    return this._module.id;
  }
  // Конструктор класу BookRunner
  constructor(module: Module<T>) {
    this._module = module; // Ініціалізуємо поточний модуль
    this._currentScene = module.startScene; // Встановлюємо початкову сцену
    this._state = module.state; // Встановлюємо початковий стан
  }
  // Метод для вибору варіанту дії на поточній сцені
  act(choiceId: string) {
    const selectedChoice = this._currentScene.options[choiceId];
    if (selectedChoice == null) {
      throw new Error(`Choice with choiceId ${choiceId} not found`);
    }

    const shouldBeHidden = isConditionMet(this._state, selectedChoice.hidden);

    if (shouldBeHidden) {
      throw new Error(`Choice with choiceId ${choiceId} should be hidden`);
    }

    if (!selectedChoice.actions) {
      this._currentScene = this._module.scenes[selectedChoice.nextSceneId];
      return;
    }
    // Застосовуємо дії вибраного варіанту
    const newState = applyAction(this._state, selectedChoice.actions);
    // Перевіряємо умову для вибору нової сцени наступного кроку
    const conditionalScheme = this._module.defaultScenes.find((scene) =>
      isConditionMet(newState, scene.condition)
    );
    // Вибираємо наступну сцену для відображення
    this._currentScene =
      conditionalScheme?.scene ??
      this._module.scenes[selectedChoice.nextSceneId];
  }
}