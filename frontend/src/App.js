import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";
import UserDashBoard from "./screens/UserDashBoard";
import UserScreen from "./screens/UserScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import TeamScreen from "./screens/TeamScreen";
import AdminScreen from "./screens/AdminScreen";
import AdminDashboard from "./screens/AdminDashboard";
import ManageEmployeeScreen from "./screens/ManageEmployeeScreen";

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/">
        <Route path="login" element={<LoginScreen />} />
      </Route>
      <Route path="/user" element={<UserScreen />}>
        <Route path="dashboard" element={<UserDashBoard />} />
        <Route path="team" element={<TeamScreen />} />
      </Route>
      <Route path="/admin" element={<AdminScreen />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employee/operation" element={<ManageEmployeeScreen />} />
        <Route path="team" element={<TeamScreen />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={false} persistor={persistor}>
          <RouterProvider router={routers} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
