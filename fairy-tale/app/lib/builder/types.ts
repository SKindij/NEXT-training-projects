// @path: @/app/lib/builder/types.ts
/*
 Модель модуля, яка містить інформацію про його ідентифікатор, 
 назву, початкову сцену, список сцен, стан та сцени за замовчуванням.
*/
export type Module<Features extends string> = {
  id: string;
  name: string;
  startScene: Scene<Features>;
  scenes: Record<string, Scene<Features>>;
  state: State<Features>;
  defaultScenes: DefaultScene<Features>[];
};
/*
 Сцена за замовчуванням, що складається з сцени та умови.
*/
export type DefaultScene<TFeature> = {
  scene: Scene<TFeature>;
  condition: Condition<TFeature>;
};
/*
 Опис сцени з її ідентифікатором, описом, списком опцій.
*/
  export type Scene<Target> = {
    id: string;
    description: string;
    options: Record<string, Option<Target>>;
  };
/*
 Опція в межах сцени, що має унікальний ідентифікатор, 
 наступну сцену, опис та можливі дії.
*/
  export type Option<Target> = {
    id: string;
    nextSceneId: string;
    description: string;
    actions?: Action<Target>[];
    hidden?: Condition<Target>;
  };
/*
 Складна умова, що має ціль, оператор порівняння та значення.
*/
  export type Condition<Target> = {
    target: Target;
    operator: 'eq' | 'gt' | 'lt' | 'neq';
    value: number;
  };
  
  export type ComplexCondition<Target> = [
    Condition<Target> | ComplexCondition<Target>,
    LogicOperator,
    Condition<Target> | ComplexCondition<Target>
  ];
  
  export type LogicOperator = 'and' | 'or';
/*
 Дія, яка може бути здійснена над ціллю, включаючи операції збільшення, 
 зменшення або встановлення значення.
*/
  export type Action<Target> = {
    operator: 'increment' | 'decrement' | 'set';
    target: Target;
    value: number;
  };
/*
 Стан, який може бути записаний у рядок цілочисельних значень за ключем цілі.
*/
export type State<Target extends string> = Record<Target, number>;