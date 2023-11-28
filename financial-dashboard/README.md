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

> You can use the `clsx` library to conditionally apply class names when the link is active. When `link.href` matches the `pathname`, the link should displayed with blue text and a light blue background.

## Create a Vercel account

1. Visit [vercel.com/signup](https://vercel.com/signup) to create an account.
2. Choose the free "hobby" plan.
3. Select Continue with GitHub to connect your GitHub and Vercel accounts.
4. Next select and import the GitHub repository.
5. Name your project and click Deploy.

Hooray! 🎉 Your project is now deployed.

> By connecting your GitHub repository, whenever you push changes to your main branch, Vercel will automatically redeploy your application with no configuration needed. 

## Create a Postgres database

1. Next, to set up a database, click Storage tab from your project dashboard.
2. Select Connect Store → Create New → Postgres → Continue.
3. Accept the terms, assign a name to your database, and ensure your database region is set to Washington D.C (iad1) - this is also the default region for all new Vercel projects.
> _By placing your database in the same region or close to your application code, you can reduce latency for data requests._
4. Once connected, navigate to the **.env.local** tab, click Show secret and Copy Snippet.
5. Paste in the copied contents from Vercel to `.env`.
6. Finally, run `npm i @vercel/postgres` in your terminal to install the Vercel Postgres SDK.

## Fetching Data

### API layer

APIs are an intermediary layer between your application code and database. There are a few cases where you might use an API:
* If you're using 3rd party services that provide an API.
* If you're fetching data from the client, you want to have an API layer that runs on the server to avoid exposing your database secrets to the client.

In Next.js, you can create API endpoints using [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).

### Database queries

When you're creating a full-stack application, you'll also need to write logic to interact with your database. For [relational databases](https://aws.amazon.com/ru/relational-database/) like Postgres, you can do this with SQL, or an [ORM](https://vercel.com/docs/storage/vercel-postgres/using-an-orm#) like [Prisma](https://www.prisma.io/).

There are a few cases where you have to write database queries:
* When creating your API endpoints, you need to write logic to interact with your database.
* If you are using React Server Components (fetching data on the server), you can skip the API layer, and query your database directly without risking exposing your database secrets to the client.

#### Using Server Components to fetch data

By default, Next.js applications use **React Server Components**. Fetching data with Server Components is a relatively new approach and there are a few benefits of using them:
+ Server Components support promises, providing a simpler solution for asynchronous tasks like data fetching. You can use `async/await` syntax without reaching out for `useEffect`, `useState` or data fetching libraries.
+ Server Components execute on the server, so you can keep expensive data fetches and logic on the server and only send the result to the client.
+ As mentioned before, since Server Components execute on the server, you can query the database directly without an additional API layer.

#### Using SQL

There are a few reasons why we'll be using SQL:
+ SQL is the industry standard for querying relational databases (e.g. ORMs generate SQL under the hood).
+ Having a basic understanding of SQL can help you understand the fundamentals of relational databases, allowing you to apply your knowledge to other tools.
+ SQL is versatile, allowing you to fetch and manipulate specific data.
+ The [Vercel Postgres SDK](https://vercel.com/docs/storage/vercel-postgres/sdk) provides protection against SQL injections.

- - -

However... there are two things you need to be aware of.

#### Request Waterfalls

A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.

This pattern is not necessarily bad. There may be cases where you want waterfalls because you want a condition to be satisfied before you make the next request. For example, you might want to fetch a user's ID and profile information first. Once you have the ID, you might then proceed to fetch their list of friends. In this case, each request is contingent on the data returned from the previous request.

However, this behavior can also be unintentional and impact performance.

#### Parallel data fetching

A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

In JavaScript, you can use the `Promise.all()` or `Promise.allSettled()` functions to initiate all promises at the same time. 

By using this pattern, you can:
+ Start executing all data fetches at the same time, which can lead to performance gains.
+ Use a native JavaScript pattern that can be applied to any library or framework.

However, there is one disadvantage of relying only on this JavaScript pattern: what happens if one data request is slower than all the others?

- - -

## Static and Dynamic Rendering

With **static rendering**, data fetching and rendering happens on the server at build time (when you deploy) or during [revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data). The result can then be distributed and cached in a Content Delivery Network (CDN).

> _Revalidation is the process of purging the Data Cache and re-fetching the latest data. This is useful when your data changes and you want to ensure you show the latest information._

Whenever a user visits application, the cached result is served. There are a couple of benefits of static rendering:
+ **Faster Websites** - Prerendered content can be cached and globally distributed. This ensures that users around the world can access your website's content more quickly and reliably.
+ **Reduced Server Load** - Because the content is cached, your server does not have to dynamically generate content for each user request.
+ **SEO** - Prerendered content is easier for search engine crawlers to index, as the content is already available when the page loads. This can lead to improved search engine rankings.

**Static rendering** is useful for UI with **no data** or **data that is shared across users**, such as a static blog post or a product page. It might not be a good fit for a dashboard that has personalized data that is regularly updated.

With **dynamic rendering**, content is rendered on the server for each user at request time (when the user visits the page). There are a couple of benefits of dynamic rendering:
+ **Real-Time Data** - Dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often.
+ **User-Specific Content** - It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction.
+ **Request Time Information** - Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.

> By default, `@vercel/postgres` doesn't set its own caching semantics. This allows the framework to set its own static and dynamic behavior.

You can use a Next.js API called `unstable_noStore` inside your Server Components or data fetching functions to opt out of static rendering.

**With dynamic rendering, your application is only as fast as your slowest data fetch.**

- - -

## Streaming

> Let's look at how you can improve the user experience when there are slow data requests.

Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.

By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

> _Streaming works well with React's component model, as each component can be considered a chunk._

There are two ways you implement streaming in Next.js:

### Streaming a whole page with loading.tsx

It is a special Next.js file built on top of Suspense, it allows you to create fallback UI to show as a replacement while page content loads.

#### Adding loading skeletons

It is a simplified version of the UI. Many websites use them as a placeholder (or fallback) to indicate to users that the content is loading. Any UI you embed into loading.tsx will be embedded as part of the static file, and sent first. Then, the rest of the dynamic content will be streamed from the server to the client.

Route groups allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses `()`, the name won't be included in the URL path.

> However, you can also use route groups to separate your application into sections (e.g. (marketing) routes and (shop) routes) or by teams for larger applications.

#### Streaming a component

You can be more granular and stream specific components using React Suspense.

Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in Suspense. Then, pass it a fallback component to show while the dynamic component loads.

- - -

## Search and Pagination

> * `<Search/>` allows users to search for specific invoices.
> * `<Pagination/>` allows users to navigate between pages of invoices.
> * `<Table/>` displays the invoices.

Search functionality will span the client and the server.
> When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.

#### There are a couple of benefits of implementing search with URL params:
+ **Bookmarkable and Shareable URLs:**
  - Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.
+ **Server-Side Rendering and Initial Load:**
  - URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
+ **Analytics and Tracking:**
  - Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.

### client hooks to implement the search functionality:
+ **useSearchParams**
  - allows you to access the parameters of the current URL. 
  - search params for this URL `/dashboard/invoices?page=1&query=pending` would look like this: `{page: '1', query: 'pending'}`.
  - provides utility methods for manipulating the URL query parameters
+ **usePathname**
  - Lets you read the current URL's pathname.
  - for route `/dashboard/invoices`, usePathname would return `'/dashboard/invoices'`.
+ **useRouter**
  - Enables navigation between routes within client components programmatically. 
  - There are [multiple methods](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter) you can use.

#### Quick overview of the implementation steps:
1. Capture the user's input.
2. Update the URL with the search params.
3. Keep the URL in sync with the input field.
4. Update the table to reflect the search query.

#### defaultValue vs. value / Controlled vs. Uncontrolled
> If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component. This means React would manage the input's state.
> 
> However, since you're not using state, you can use defaultValue. This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.

#### When to use the useSearchParams() hook vs. the searchParams prop?
You might have noticed you used two different ways to extract search params. Whether you use one or the other depends on whether you're working on the client or the server.
* `<Search>` is a Client Component, so you used the `useSearchParams()` hook to access the params from the client.
* `<Table>` is a Server Component that fetches its own data, so you can pass the `searchParams` prop from the page to the component.

As a general rule, if you want to read the params from the client, use the `useSearchParams()` hook as this avoids having to go back to the server.

#### Best practice: Debouncing

Debouncing is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

**How Debouncing Works:**
1. Trigger Event:
     - When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
2. Wait:
     - If a new event occurs before the timer expires, the timer is reset.
3. Execution:
     - If the timer reaches the end of its countdown, the debounced function is executed.

To keep things simple, we'll use a library called [use-debounce](https://www.npmjs.com/package/use-debounce).

### Adding pagination

Adding pagination allows users to navigate through the different pages to view all the invoices. 

> You don't want to fetch data on the client as this would expose your database secrets (remember, you're not using an API layer). Instead, you can fetch the data on the server, and pass it to the component as a prop.

- - -

## Mutating Data

### Server Actions

React Server Actions allow you to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate your data. Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server Components.

Security is a top priority for web applications, as they can be vulnerable to various threats. This is where Server Actions come in. They offer an effective security solution, protecting against different types of attacks, securing your data, and ensuring authorized access. Server Actions achieve this through techniques like POST requests, encrypted closures, strict input checks, error message hashing, and host restrictions, all working together to significantly enhance your app's safety.

#### Using forms with Server Actions

In React, you can use the `action` attribute in the `<form>` element to invoke actions. The action will automatically receive the native [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object, containing the captured data.

```typescript
  // Server Component
  export default function Page() {
    // Action
    async function create(formData: FormData) {
      'use server';
      // Logic to mutate data...
    } 
    // Invoke the action using the "action" attribute
    return <form action={create}>...</form>;
  }
```

An advantage of invoking a Server Action within a Server Component is progressive enhancement - forms work even if JavaScript is disabled on the client.

#### Next.js with Server Actions

Server Actions are also deeply integrated with Next.js [caching](https://nextjs.org/docs/app/building-your-application/caching). When a form is submitted through a Server Action, not only can you use the action to mutate data, but you can also revalidate the associated cache using APIs like `revalidatePath` and `revalidateTag`.

#### Creating an invoice
1. Create a form to capture the user's input.
2. Create a Server Action and invoke it from the form.
3. Inside your Server Action, extract the data from the formData object.
4. Validate and prepare the data to be inserted into your database.
5. Insert the data and handle any errors.
6. Revalidate the cache and redirect the user back to invoices page.

> By adding the `'use server'`, you mark all the exported functions within the file as server functions. These server functions can then be imported into Client and Server components, making them extremely versatile.

#### Good to know: 
In HTML, you'd pass a URL to the `action` attribute. This URL would be the destination where your form data should be submitted (usually an API endpoint).

However, in React, the `action` attribute is considered a special prop - meaning React builds on top of it to allow actions to be invoked.

Behind the scenes, Server Actions create a `POST` API endpoint. This is why you don't need to create API endpoints manually when using Server Actions.

You'll need to extract the values of `formData`, there are a couple of [methods](https://developer.mozilla.org/en-US/docs/Web/API/FormData/append) you can use. 

> **Tip:** If you're working with `forms` that have many fields, you may want to consider using the [`entries()`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries) method with JavaScript's [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries).\
> For example:\
> ``const rawFormData = Object.fromEntries(formData.entries())``

_Now that your data is in the shape of an object, it'll be much easier to work with._

#### Type validation and coercion
Before sending the `form data` to your database, you want to ensure it's in the correct format and with the correct types. 

You'll notice that amount is of type `string` and not `number`. This is because `input` elements with `type="number"` actually return a string, not a number!

To handle type validation, you have a few options. While you can manually validate `types`, using a type validation library can save you time and effort. For your example, we'll use [Zod](https://zod.dev/), a TypeScript-first validation library that can simplify this task for you.

> It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy.

Now that you have all the values you need for your database, you can create an SQL query to insert the new invoice into your database and pass in the variables.

Next.js has a **Client-side Router Cache** that stores the route segments in the user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.

> Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server. You can do this with the `revalidatePath` function from Next.js.

#### Update an invoice:
1. Create a new dynamic route segment with the invoice id.
2. Read the invoice id from the page params.
3. Fetch the specific invoice from your database.
4. Pre-populate the form with the invoice data.
5. Update the invoice data in your database.
















