import { RouterProvider } from "react-router";

import { router } from "@/app/lib/router";
import { LocationProvider } from "@/features/map/provider/location-provider";

function App() {
  return (
    <LocationProvider>
      <RouterProvider router={router}></RouterProvider>
    </LocationProvider>
  );
}

export default App;
