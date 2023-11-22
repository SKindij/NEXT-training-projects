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

















