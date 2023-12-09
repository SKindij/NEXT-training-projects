// @path: @/app/shared/component/app-list.tsx
import styles from './app-list.module.css';

// Функціональний компонент для створення тегу <ul> списку
export function Ul({ children }: WithChildren) {
  return <ul className={styles.ul}>{children}</ul>;
}

// Функціональний компонент для створення тегу <li> елемента списку
export function Li({ children }: WithChildren) {
  return <li className={styles.li}>{children}</li>;
}