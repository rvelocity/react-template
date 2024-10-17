import { RouterProvider } from "react-router-dom";
import "./App.css";
import { APIProvider } from "./api/apiProvider";
import router from "./router";

function App() {
  return (
    <APIProvider>
      <RouterProvider router={router} />
    </APIProvider>
  );
}

export default App;
