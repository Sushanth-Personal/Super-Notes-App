import { createRoot } from "react-dom/client";
import MainPage from "./pages/mainpage.jsx";
import { UserProvider } from "./Contexts/UserContext";
import {NotesProvider} from "./Contexts/NotesContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <NotesProvider>
      <MainPage />
    </NotesProvider>
  </UserProvider>
);
