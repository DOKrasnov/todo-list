import "./App.css";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { TodoList } from "./TodoList";
/**
 * @function App contains all the app elements
 *
 */
function App() {
  return (
    <>
      <Header />
      <TodoList />
      <Footer />
    </>
  );
}

export default App;
