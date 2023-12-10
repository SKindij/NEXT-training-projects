// @path: app/[chapterId]/page.tsx
import { notFound } from 'next/navigation';
import { availableModules } from '../book';
import { H } from '../shared/typography/h';
import { AppLink } from '../shared/component/app-link';
import { AppText } from '../shared/typography/app-text';

// Функціональний компонент сторінки розділу казки
export default function ChapterPage({
  params,
}: {
  params: { chapterId: string };
}) {
  const { chapterId } = params;
  // Знаходимо обраний модуль за його ідентифікатором chapterId
  const selectedModule = availableModules.find((m) => m.id === chapterId);
  // Якщо обраний модуль не знайдено, викликаємо функцію для відображення "Not Found"
  if (!selectedModule) {
    notFound();
  }

  return (
    <>
      {/* Відображення назви обраного модуля */}
      <H>
        <AppText>{selectedModule.name}</AppText>
      </H>
      {/* посилання, яке веде на початкову сцену обраного модуля */}
      <AppLink href={`/${chapterId}/${selectedModule.startScene.id}`}>
        <AppText>Почати казку</AppText>
      </AppLink>
    </>
  );
}