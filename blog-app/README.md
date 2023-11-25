# Next Blog App


#### Behind the scenes of the project:
> ``npx create-next-app@13.4``
>   + What is your project named? => blog-app
>   +  Would you like to use TypeScript? => Yes
>   +  Would you like to use ESLint? => Yes
>   +  Would you like to use Tailwind CSS? => No
>   +  Would you like to use `src/` directory? => No
>   +  Would you like to use App Router? (recommended) => Yes
>   +  Would you like to customize the default import alias (@/*)? => No
> 
> add file: ``echo {} > .prettierrc``


## Трішки теорії

### Компоненти

**Правила вкладення**
+ не можна імпортувати серверний компонент усередині клієнтського
+ можна прокидати серверні компоненти в клієнтські як `children`

**Використовуйте клієнтські компоненти:**
+ коли необхідно використовувати хуки
+ коли необхідні обробники подій на дії користувача
+ при використанні браузерного API
+ коли використовується класовий компонент

**Використовуйте серверні компоненти:**
+ коли ви отримуєте дані через серверне API
+ коли потрібний прямий доступ до ресурсів бекенда
+ коли використовується senstive інформація (ключі API, токени та ін.)
+ коли використовуються важкі залежності










