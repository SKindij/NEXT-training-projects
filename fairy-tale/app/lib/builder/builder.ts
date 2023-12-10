// @path: @/app/lib/builder/builder.ts
import { v4 } from 'uuid';
import {
  Action, Condition, DefaultScene,
  Module, Option, Scene,
} from './types';
import { DuplicateSceneIdError } from './errors';
import { validateModuleScheme } from './validator';

type BasicScene = {
  id: string;
  description: string;
};

type BasicOption = {
  nextSceneId: string;
  description: string;
};

/*
 Клас відповідає за створення модулів для книги чи інтерактивного модуля 
 з визначеними сценами та опціями для користувача.
*/
export class ModuleBuilder<Features extends string> {
  private _startScene: Scene<Features> | undefined;
  private _scenes: Record<string, Scene<Features>> = {};
  private _sceneCursor: Scene<Features> | null = null;
  private _optionCursor: Option<Features> | null = null;
  private _state: Record<Features, number> = {} as Record<Features, number>;
  private _backgroundAction: Action<Features> | null = null;
  private _defaultScenes: Record<Features, DefaultScene<Features>[]> =
    {} as Record<Features, DefaultScene<Features>[]>;

  static create<T extends string>(name: string, id = name): ModuleBuilder<T> {
    return new ModuleBuilder<T>(name, id);
  }

  /**
   * додає початкову сцену для гри
   * @param scene Scene description
   * @returns
   */
  addEntryScene(scene: BasicScene) {
    const { description, id } = scene;
    this._startScene = {
      description,
      id,
      options: {},
    };

    this._sceneCursor = this._startScene;

    return this;
  }

  /**
   * додають вибори для поточної сцени
   * @param basicOption
   * @returns
   */
  addSceneChoices(basicOption: BasicOption) {
    const activeScene = this.getActiveScene();
    const optionId = v4();
    const newOption = { id: optionId, ...basicOption };
    activeScene.options[optionId] = newOption;
    this._optionCursor = newOption;
    return this;
  }

  /**
   * додають вибори для поточної сцени
   * @param basicOption
   * @param condition
   * @returns
   */
  addConditionalChoice(
    basicOption: BasicOption,
    condition: Condition<Features>
  ) {
    const activeScene = this.getActiveScene();
    const optionId = v4();
    const newOption = { id: optionId, ...basicOption, hidden: condition };
    activeScene.options[optionId] = newOption;
    this._optionCursor = newOption;
    return this;
  }

  /**
   * додає дії для вибраного варіанту
   * @param action
   * @returns
   */
  addChoiceAction(action: Action<Features>) {
    if (!this._optionCursor) {
      throw new Error('Add option first');
    }

    const activeOption = this._optionCursor;

    if (!activeOption) {
      throw new Error(`Option with id ${this._optionCursor} not found`);
    }

    const actions = activeOption.actions ?? [];
    actions.push(action);
    activeOption.actions = actions;

    return this;
  }

  /**
   * додає дії, які виконуються під час кожного ходу
   * @param action
   * @returns
   */
  addBackgroundAction(action: Action<Features>) {
    if (this._backgroundAction) {
      throw new Error(`Ony one background action allowed for now`);
    }
    this._backgroundAction = action;
    return this;
  }

  /**
   * додає сцену, яка з'являється при певних умовах
   * @param scene
   * @param condition
   * @returns
   */
  addConditionalScene(scene: BasicScene, condition: Condition<Features>) {
    if (!!this._scenes[scene.id]) {
      throw new DuplicateSceneIdError(scene.id);
    }

    const newScene = createScene<Features>(scene);
    const newDefaultScene = { scene: newScene, condition };

    const targetExists = !!this._defaultScenes[condition.target];

    targetExists
      ? this._defaultScenes[condition.target].push(newDefaultScene)
      : (this._defaultScenes[condition.target] = [newDefaultScene]);

    this._sceneCursor = newScene;
    this._optionCursor = null;

    return this;
  }

  /**
   * додає нову сцену
   * @param scene
   * @returns
   */
  addScene(scene: BasicScene) {
    if (this._scenes[scene.id]) {
      throw new DuplicateSceneIdError(scene.id);
    }
    const newScene = createScene<Features>(scene);
    this._sceneCursor = newScene;
    this._optionCursor = null;

    this._scenes[scene.id] = newScene;
    return this;
  }

  /**
   * встановлює початковий стан гри
   * @param state
   * @returns
   */
  addInitialState(state: Record<Features, number>) {
    this._state = state;
    return this;
  }

  /**
   * Finalize module
   * @returns
   */
  build(): Module<Features> {
    if (!this._startScene) {
      throw new Error('No initial scene found');
    }

    const isSchemeValid = validateModuleScheme(
      this._startScene,
      Object.values(this._scenes)
    );

    const { optionWithoutScenes, unreachableScenes, valid } = isSchemeValid;

    if (!valid) {
      if (optionWithoutScenes.length) {
        console.error(`Found options without scenes: `, ...optionWithoutScenes);
      }
      if (unreachableScenes.length) {
        console.error(
          `Found unreachable scenes: `,
          ...unreachableScenes.map((scene) => scene.id)
        );
      }

      throw new Error('Module is not valid');
    }

    this._sceneCursor = null;
    this._optionCursor = null;
    const defaultScenes = Object.values<DefaultScene<Features>[]>(
      this._defaultScenes
    ).flat();

    const backgroundAction = this._backgroundAction;
    if (backgroundAction) {
      const scenes = [
        this._startScene,
        ...Object.values(this._scenes),
        ...defaultScenes.map((x) => x.scene),
      ];

      scenes.forEach((scene) => {
        Object.values(scene.options).forEach((opt) => {
          opt.actions
            ? opt.actions.push(backgroundAction)
            : (opt.actions = [backgroundAction]);
        });
      });
    }

    return {
      startScene: this._startScene,
      scenes: {
        ...this._scenes,
        [this._startScene.id]: this._startScene,
        ...defaultScenes.reduce(
          (acc, scene) => ((acc[scene.scene.id] = scene.scene), acc),
          {} as Record<string, Scene<Features>>
        ),
      },
      state: this._state,
      name: this.moduleName,
      id: this.id,
      defaultScenes,
    };
  }

  private constructor(
    public readonly moduleName: string,
    public readonly id: string
  ) {}

  private getActiveScene(): Scene<Features> {
    if (this._sceneCursor == null) {
      throw new Error('Create a scene first');
    }

    return this._sceneCursor;
  }
}

function createScene<T>(scene: BasicScene): Scene<T> {
  return { ...scene, options: {} };
}