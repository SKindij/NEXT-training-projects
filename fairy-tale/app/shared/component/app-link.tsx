// @path: @/app/shared/component/app-link.tsx
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import styles from './app-link.module.css'

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// Компонент, який забезпечує зручний спосіб створення посилань у додатку
export function AppLink({ children, ...props }: AppLinkProps) {
  return <Link className={styles.a} {...props}>{children}</Link>;
}