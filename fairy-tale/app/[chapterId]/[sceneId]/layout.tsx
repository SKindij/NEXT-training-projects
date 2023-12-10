// @path: @/app/[chapterId]/[sceneId]/layout.tsx
import { availableModules } from '@/app/book';

// Генерує статичні параметри для відображення сторінок з вказаними розділами та сценами
export function generateStaticParams({
  params,
}: {
  params: { chapterId: string };
}) {
  // Знаходимо доступний модуль за ідентифікатором розділу
  const gameModule = availableModules.find((x) => x.id === params.chapterId);
  // Отримуємо список всіх сцен модуля, включаючи стартову та стандартні сцени
  const allScenes = Object.keys(gameModule?.scenes ?? {});
  const startScenes = gameModule?.startScene.id ?? '';
  const defaultScenes = gameModule?.defaultScenes.map((x) => x.scene.id) ?? [];
  // масив об'єктів, які містять ідентифікатори розділу та сцени для всіх доступних сцен
  const avaialableScenes = [...allScenes, startScenes, ...defaultScenes].map(
    (sceneId) => ({
      moduleName: params.chapterId,
      sceneId,
    })
  );

  return avaialableScenes;
}

// Компонент для макету сцени, який відображає вміст дочірніх компонентів
export default function SceneLayout({ children }: WithChildren) {
  return <>{children}</>;
}