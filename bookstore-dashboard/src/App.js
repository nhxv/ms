import "./App.scss";
import {Routes, Route, Navigate} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import PrivateOutlet from "./components/PrivateOutlet";
import BookManagementPage from "./pages/BookManagementPage";
import AuthorManagementPage from "./pages/AuthorManagementPage";
import AuthorDetail from "./components/AuthorDetail";
import { useSelector } from "react-redux";
import BookDetail from "./components/BookDetail";
import HomePage from "./pages/HomePage";

function App() {
  const isAuth = useSelector(state => state.authSlice.isAuth);

  return (
    <>
      <div className="sidebar-layout">
        {isAuth ? <Sidebar /> : <></>}
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginPage/>} />
            {/* Private routes */}
            <Route path="/" element={<PrivateOutlet auth={isAuth} />}>
              <Route index element={<HomePage />} />
              <Route path="books">
                <Route index element={<BookManagementPage />} />
                <Route path=":bookId" element={<BookDetail />} />
              </Route>
              <Route path="authors">
                <Route index element={<AuthorManagementPage />} />
                <Route path=":authorId" element={<AuthorDetail />} />
              </Route>
            </Route>
            
            <Route path="/home" element={<Navigate replace to="/" />} />

          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
