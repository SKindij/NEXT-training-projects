# NEXT-training-projects

## => [Financial Dashboard](https://github.com/SKindij/NEXT-training-projects/tree/main/financial-dashboard)

  - implementation: https://nextjs-dashboard-tau-orpin.vercel.app/
  - source: [nextjs.org/learn](https://nextjs.org/learn) course

## => [Book It App](https://github.com/SKindij/NEXT-training-projects/tree/main/book-it-app)

  - implementation: 
  - source: [Build Full Stack Apps with Next.js & TypeScript](https://www.udemy.com/course/nextjs-build-full-stack-apps-with-nextjs-using-redux/) Udemy course
    
## => [Blog App](https://github.com/SKindij/NEXT-training-projects/tree/main/blog-app)

  - implementation:
  - source: [NextJS 13 app](https://www.youtube.com/playlist?list=PLiZoB8JBsdzlgeYHZDJ_orG0vy8JiEhKr) YouTube course


- - -

# Official Documentation

## Partial Prerendering (Optional)

Most routes are not fully static or dynamic. You may have a route that has both static and dynamic content. 

> For example, let's say you have a social media feed, the posts would be static, but the likes for the post would be dynamic. Or an ecommerce site, where the product details are static, but the user's cart is dynamic.

**Partial Prerendering** is an experimental feature that allows you to render a route with a static loading shell, while keeping some parts dynamic. In other words, you can isolate the dynamic parts of a route.

When a user visits a route:
+ A static route shell is served, this makes the initial load fast.
+ The shell leaves holes where dynamic content will load in async.
+ The async holes are loaded in parallel, reducing the overall load time of the page.

Partial Prerendering combines ultra-quick static edge delivery with fully dynamic capabilities and we believe it has the potential to become the default rendering model for web applications, bringing together the best of static site generation and dynamic delivery.

### How does Partial Prerendering work?

Partial Prerendering leverages React's Concurrent APIs and uses Suspense to defer rendering parts of your application until some condition is met (e.g. data is loaded).

The fallback is embedded into the initial static file along with other static content. At build time (or during revalidation), the static parts of the route are prerendered, and the rest is postponed until the user requests the route.

The great thing about Partial Prerendering is that you don't need to change your code to use it. As long as you're using Suspense to wrap the dynamic parts of your route, Next.js will know which parts of your route are static and which are dynamic.

