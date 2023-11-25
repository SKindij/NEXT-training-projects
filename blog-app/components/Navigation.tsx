"use client";
// @file: /app/components/Navigation.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

// типу для кожного пункту навігації
type NavLink = {
  label:string;
  href:string;
};
// тип для пропсів (вхідних параметрів) компонента
type Props = {
  navLinks:NavLink[];
};
// основний компонент навігації
const Navigation = ({ navLinks }:Props) => {
  // хук для отримання поточного шляху (URL) сторінки
  const pathname = usePathname();

  return (
    <>
      {/* проходження по кожному пункту навігації і генерація посилань */}
      {navLinks.map((link) => {
        // визначення активного стану навігації на основі поточного URL
        // змінна отримує true або false в залежності чи збігаються ці два значення
        const isActive = pathname === link.href;

        return (
          // компонента для створення посилань
          <Link
            key={link.label}
            href={link.href}
            className={isActive ? "active" : ""}
          >
            {/* текст або мітка посилання */}
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export { Navigation };