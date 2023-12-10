// @path: @/app/[chapterId]/[sceneId]/page.tsx
'use client';

import { AppLink } from '@/app/shared/component/app-link';
import { useBook } from '../book.context';
import { P } from '@/app/shared/typography/p';
import { Li, Ul } from '@/app/shared/component/app-list';
import { AppText } from '@/app/shared/typography/app-text';

// Функціональний компонент сторінки розділу та сцени
export default function ChapterPage({}) {
  // Використання хука для отримання екземпляра BookRunner
  const bookRunner = useBook();

  return (
    <>
      {/* Відображення опису сцени, який отримуємо з bookRunner */}
      <P>
        <AppText>{bookRunner.sceneDescription}</AppText>
      </P>
      {/* Відображення списку варіантів вибору для користувача */}
      <Ul>
        {bookRunner.choices.map((c) => (
          <Li key={c.id}>
            {/* посилання на наступну сцену, що відповідає за перехід користувача */}
            <AppLink
              href={`/${bookRunner.moduleId}/${c.nextSceneId}`}
              onClick={() => bookRunner.act(c.id)} // для зміни поточної сцени
            >
              {/* Відображення опису вибору */}
              <AppText>{c.description}</AppText>
            </AppLink>
          </Li>
        ))}
      </Ul>
    </>
  );
}