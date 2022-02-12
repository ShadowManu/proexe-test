import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import { Provider } from "react-redux";

import { store } from "./core/store";
import UsersList from "./pages/users-list";

const App = () => {
  return (
    <Provider store={store}>
      <Container className="py-4">
        <h1 className="mb-4">Dashboard</h1>

        <UsersList />
      </Container>
    </Provider>
  );
};

export default App;
