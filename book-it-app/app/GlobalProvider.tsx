// @path: @/app/GlobalProvider.tsx
// компонент для виведення повідомлень
import { Toaster } from "react-hot-toast";

// надає зручний спосіб включити глобальний Toaster для виведення toast-повідомлень
export function GlobalProvider({ children }:{ children:React.ReactNode }) {
  return (
    <>
      {/* забезпечує відображення повідомлень поверх усього іншого */}
      <Toaster />
      {/* це контент, обгорнутий у GlobalProvider. */}
      {children}
    </>
  );
}
