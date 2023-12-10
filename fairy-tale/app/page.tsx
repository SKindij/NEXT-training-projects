// @path: @/app/page.tsx
import { availableModules } from './book';
import { H } from './shared/typography/h';
import { AppLink } from './shared/component/app-link';
import { P } from './shared/typography/p';
import { Li, Ul } from './shared/component/app-list';
import { AppText } from './shared/typography/app-text';

// Головна сторінка додатка "Чарівна Казка"
export default function Home() {
  return (
    <>
      <H>
        {/* Заголовок сторінки */}
        <AppText>🧙‍♂️ Вітаю у Чарівному світі казок!🌳🌸🌲</AppText>
      </H>
      <P>
        {/* Підзаголовок */}
        <AppText>Оберіть собі історію із переліку</AppText>
      </P>
      <Ul>
         {/* Створення списку доступних казок за допомогою мапування */}
        {availableModules.map((m) => (
          <Li key={m.id}>
            {/* Створення посилання на казку */}
            <AppLink href={`/${m.id}`}>
              {/* Виведення назви казки */}
              <AppText>{m.name}</AppText>
            </AppLink>
          </Li>
        ))}
      </Ul>
    </>
  );
}
