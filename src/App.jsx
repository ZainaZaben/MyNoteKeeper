import Header from "./components/Header/Header";
import { NoteAppProvider } from "./context/NoteAppContext";
import "./App.css";
import NotesPage from "./pages/Notes";

export default function App() {
  return (
    <div className="app-container">
      
      <NoteAppProvider>
      <Header />
        <NotesPage />
      </NoteAppProvider>
    </div>
  );
}
