// @path: @/app/shared/typography/h.tsx
import { HTMLAttributes } from 'react';
import styles from './h.module.css';
type PProps = WithChildren<HTMLAttributes<HTMLHeadingElement>>;

// Компонент заголовка для сторінок з підтримкою різних розмірів
export const H = ({ children, ...props }: PProps) => (
  // Відображення заголовка з врахуванням стилів та переданих атрибутів
  <h1 className={styles.root} {...props}>
    {children}
  </h1>
);