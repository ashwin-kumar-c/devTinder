import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import Feed from "./components/Feed"
import { Provider } from "react-redux";
import store from "./store/store";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";

function App() {

  /* 
    Login and Signup comps must be kept outside the Body Comp:
    cause when we go to login page, the code in body comp executes 1st, then the code(api call) in login comp executes
    this is because login comp present inside the Body comp. To avoid this, Login comp should be outside Body comp.
  */

  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} /> 

          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections/>} />
            <Route path="/requests" element={<Requests/>} />
            <Route path="/chat/:targetUserId" element={<Chat/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
