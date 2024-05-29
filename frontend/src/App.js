import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/login/create/create";
import Login from "./components/login/signin/signin";
import Main from "./components/main/main";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Routes>
            {/* <Route exact path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path='/register' element={<CreateUser />}></Route>
            <Route path='/users/:userId/notes' element={<Main />}></Route>
            <Route path='/users/:userId/addNote' element={<NoteCreate />}></Route>
            <Route path="/users/:userId/notes/:noteId" element={<NoteDetail />} />
            <Route path="/users/:userId" element={<Profile />} /> */}
            <Route exact path="/" element={<Create />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Create />}></Route>
            <Route path='/tournaments' element={<Main />}></Route>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
