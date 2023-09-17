import React from "react";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home/home.component";
import Notes from "./pages/Notes/notes.component";
import Share from "./pages/Share/share.component";
import NoteDetail from "./pages/Note-detail/note-detail.component";
import Login from "./pages/Login/login.component";
import SignupPersonal from "./pages/Signup-personal/signup-personal.component";
import SignupAccount from "./pages/SIgnup-account/signup-account.component";
import Profile from "./pages/Profile/profile.component";
import EditAccount from "./pages/Edit-account/edit-account.component";
import EditNote from "./pages/Edit-note/edit-note.component";
import ChangePassword from "./pages/Change-password/change-password.component";
import AboutUs from "./pages/About-us/about-us.component";
import ContactUs from "./pages/Contact-us/contact-us.component";

const App = () => {
  const [signupInfo, setSignUp] = React.useState({
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
      status: ""
  })
  let location = useLocation()
  const reg_pages = ["/login", "/signup-personal", "/signup-account"]

  const handleChange = (event) => {
    const {name, value} = event.target;
    setSignUp(prev=>({
      ...prev,
      [name]: value
    }))
  }
  // console.log(signupInfo);
  return (
    <div style={{
      minHeight: "100vh"
    }}>
      {reg_pages.includes(location.pathname) ? null : <Header/>}
      <Routes>
        <Route path="/signup-personal" element={<SignupPersonal signupInfo={signupInfo} handleChange={handleChange}/>}/>
        <Route path="/signup-account" element={<SignupAccount setSignUp={setSignUp} signupInfo={signupInfo} handleChange={handleChange}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/edit-account" element={<EditAccount/>}/>
        <Route path="/edit-note" element={<EditNote/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
        <Route path="/notes" element={<Notes/>}/>
        <Route path="/share" element={<Share/>}/>
        <Route path="/notes/detail" element={<NoteDetail/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      {reg_pages.includes(location.pathname) ? null : <Footer/>}
    </div>
  )
}

export default App;