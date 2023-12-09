// @path: @/app/nav.tsx
import { AppText } from './shared/typography/app-text';
import styles from './nav.module.css';
import { AppLink } from './shared/component/app-link';

// Функція, яка відображає навігаційне меню
export function AppNav() {
  return (
    <nav className={styles.root}>
      {/* Посилання на головну сторінку */}
      <AppLink href="/">
        <AppText size='sm'>На головну</AppText>
      </AppLink>
    </nav>
  );
}