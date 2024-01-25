import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from "./pages/Home";
// import PostPage, { loader as postLoader } from "./pages/Post";
import RootLayout from "./pages/Root";

// funkcja lazy ładuje komponent asynchronicznie, czyli dopiero wtedy, gdy jest potrzebny
const BlogPage = React.lazy(() => import("./pages/Blog"));

const PostPage = React.lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            // jako że lazy ładuje asynchronicznie, to musimy użyć Suspense, żeby rozwiązać promise
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              // zamiast wskazania loadera tworzymy funkcję, która używa import()
              // to zwraca promise, można więc dodać then, doktórego będzie przekazany moduł
              // moduł zawiera wszystkie eksporty z pliku, więc też loader w tym wypadku
              import("./pages/Blog").then((module) => module.loader()),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>Loading post...</p>}>
                <PostPage />
              </Suspense>
            ),
            // loader przyjmuje automatycznie obiekt z parametrami i mozna go przekazać do funkcji
            // loader: ({ params }) =>
            //   import("./pages/Post").then((module) =>
            //     module.loader({ params })
            //   ),

            // drugie podejście to przekazanie obiektu meta, który równiez w sobie zawiera parametry
            loader: (meta) =>
              import("./pages/Post").then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
