# Financial Dashboard
>  Interactive course from [Next.js](https://nextjs.org/learn/) to learn the main features of Next.js by building a full-stack web application.\
> The project is written in TypeScript.\
> Setting Up a PostgreSQL database using @vercel/postgres [instruction](https://nextjs.org/learn/dashboard-app/setting-up-your-database)

## Project Overview

Simplified version of the financial dashboard that has:
* A public home page.
* A login page.
* Dashboard pages that are protected by authentication.
* The ability for users to add, edit, and delete invoices.
* The dashboard have an accompanying database.

Features from this course:
+ **Styling:** The different ways to style your application in Next.js.
+ **Optimizations:** How to optimize images, links, and fonts.
+ **Routing:** How to create nested layouts and pages using file-system routing.
+ **Data Fetching:** How to set up a database on Vercel, and best practices for fetching and streaming.
+ **Search and Pagination:** How to implement search and pagination using URL Search Params.
+ **Mutating Data:** How to mutate data using React Server Actions, and revalidate the Next.js cache.
+ **Error Handling:** How to handle general and 404 not found errors.
+ **Form Validation and Accessibility:** How to do server-side form validation and tips for improving accessibility.
+ **Authentication:** How to add authentication to your application using [NextAuth.js](https://next-auth.js.org/) and Middleware.
+ **Metadata:** How to add metadata and prepare your application for social sharing.

### Creating a new project

To create a Next.js app, open your terminal, <kbd>cd</kbd> into the folder you'd like to keep your project, and run the following command:\
``npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"``

> Unlike tutorials that have you write code from scratch, much of the code for this course is already written for you.
> This better reflects real-world development, where you'll likely be working with existing codebases.

``npm run dev`` starts your Next.js development server on port 3000\
 Open http://localhost:3000 on your browser.

### Folder structure

* ``/app``:
  - Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
* ``/app/lib``:
  - Contains functions used in your application, such as reusable utility functions and data fetching functions.
* ``/app/ui``:
  - Contains all the UI components for your application, such as cards, tables, and forms.
  - To save time, we've pre-styled these components for you.
* ``/public``:
  - Contains all the static assets for your application, such as images.
* ``/scripts``:
  - Contains a seeding script that you'll use to populate your database.
* ``Config Files``:
  - such as next.config.js at the root of your application.
  - Most of these files are created and pre-configured when you start a new project using create-next-app.
  - You will not need to modify them in this course.

- - -

## CSS Styling
Let's look at the different ways you can style your Next.js application.

### Global styles

You can use `/app/ui/global.css` file to add CSS rules to all the routes in your application - such as CSS reset rules, site-wide styles for HTML elements like links, and more.\
Add global styles to your application by navigating to `/app/layout.tsx` and importing the global.css file.

### CSS Modules

This allow you to scope CSS to a component by automatically **creating unique class names**, so you don't have to worry about style collisions as well.

### Using the [clsx library](https://github.com/lukeed/clsx) to toggle class names

_There may be cases where you may need to conditionally style an element based on state or some other condition._

> Suppose that you want to create an InvoiceStatus component which accepts status. The status can be 'pending' or 'paid'.
> - If it's 'paid', you want the color to be green.
> - If it's 'pending', you want the color to be gray.

### Other styling solutions

You can also style your Next.js application with:
+ Sass which allows you to import .css and .scss files.
+ CSS-in-JS libraries such as styled-jsx, styled-components, and emotion.

### Adding a primary font

> Fonts play a significant role in the design of a website, but using custom fonts in your project can affect performance if the font files need to be fetched and loaded.

Next.js automatically optimizes fonts in the application when you use the `next/font module`. It downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.

In your `/app/ui` folder, create a new file called `fonts.ts`. You'll use this file to keep the fonts that will be used throughout your application.

> Import the Inter font from the `next/font/google module` - this will be your primary font. Then, specify what subset you'd like to load. In this case, 'latin'.

Finally, add the font to the `<body>` element in `/app/layout.tsx`.

### Optimizing Images

Next.js can serve static assets, like images, under the top-level `/public` folder. Files inside `/public` can be referenced in your application.

> Instead of manually implementing different optimizations, you can use the **next/image component** to automatically optimize your images.

The ``<Image>`` Component is an extension of the HTML ``<img>`` tag, and comes with automatic image optimization, such as:
+ Preventing layout shift automatically when images are loading.
+ Resizing images to avoid shipping large images to devices with a smaller viewport.
+ Lazy loading images by default (images load as they enter the viewport).
+ Serving images in modern formats, like WebP and AVIF, when the browser supports it.

> _It's good practice to set the width and height of your images to avoid layout shift, these should be an aspect ratio identical to the source image._

## Creating Layouts and Pages

### Nested routing (Вкладена маршрутизація)

Next.js uses file-system routing where folders are used to create nested routes. Each folder represents a route segment that maps to a URL segment.

You can create separate UIs for each route using layout.tsx and page.tsx files.
> `/app/page.tsx` - this is the home page associated with the route `/`\
> `/app/dashboard/page.tsx` is associated with the `/dashboard path`\
> `layout.tsx` file create UI that is shared between multiple pages

One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called partial rendering.

### Navigating Between Pages

In Next.js, you can use the `<Link />` Component to link between pages in your application. `<Link>` allows you to do client-side navigation with JavaScript.

You should be able to navigate between the pages without seeing a full refresh. 
> _Although parts of your application are rendered on the server, there's no full page refresh, making it feel like a web app. _

Futhermore, in production, whenever <Link> components appear in the browser's viewport, Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!

#### Pattern: Showing active links

A common UI pattern is to show an active link to indicate to the user what page they are currently on. To do this, you need to get the user's current path from the URL. Next.js provides a hook called `usePathname()` that you can use to check the path and implement this pattern.
















