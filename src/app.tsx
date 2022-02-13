import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { store } from "./core/store";
import UsersList from "./pages/users-list";
import UsersPost from "./pages/users-post";

const AppWithProviders = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Dashboard</h1>

      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="new" element={<UsersPost />} />
      </Routes>
    </Container>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppWithProviders />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
