import { RouterProvider } from "react-router";

import { router } from "@/app/lib/router";
import { LocationProvider } from "@/entities/map/provider/location-provider";

function App() {
  return (
    <LocationProvider>
      <RouterProvider router={router}></RouterProvider>
    </LocationProvider>
  );
}

export default App;
