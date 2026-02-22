import { RouterProvider } from "react-router";

import { router } from "@/app/lib/router";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
