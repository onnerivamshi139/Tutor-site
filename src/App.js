import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { FcReadingEbook } from "react-icons/fc";
import Home from './components/home/Home'
import Signup from './components/Signup/Signup'
import Login from './components/login/Login';
import Contactus from './components/Contactus';
import Personalinfo from './userdashboard/Profile/Personalinfo';
import Posts from './userdashboard/Posts';
import Tutors from './userdashboard/Tutor/Tutors';
import Footer from './components/Footer/footer';
import { useSelector } from 'react-redux';
import { clearLoginStatus } from './Slice/userSlice';
import { cleartutorLoginStatus } from './Slice/tutorSlice';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Userdashboard from './userdashboard/userdashboard';
import Tutordashboard from './components/tutordashboard/Tutordashboard';
import Tutorsignup from './components/Signup/Tutorsignup';
import TutorLogin from './components/login/TutorLogin';
import Updatedetails from './userdashboard/Profile/Updatedetails'
import Tutorfeedback from './userdashboard/feedback/Tutorfeedback';
import EXtradetails from './components/tutordashboard/Extradetails/EXtradetails';
import Request from './components/tutordashboard/Request/Request';
import Dashboard from './components/tutordashboard/Dashboard';
import Requirements from './userdashboard/Profile/Requirements/Requirements';
import Profile from './userdashboard/Profile/Profile';
import TutorProfile from './components/tutordashboard/TutorProfile/TutotProfile';
import ProfileParent from './components/tutordashboard/TutorProfile/ProfileParent';
import TutorHome from './components/tutordashboard/TutorProfile/TutorHome';
import Students from './components/tutordashboard/TutorProfile/Students';
import Addavailability from './components/tutordashboard/TutorProfile/Addavailability';
import './App.css';


function App() {

  let { userobj, isSuccess } = useSelector((state) => {
    //  console.log('state',state)
    return state.user
  });
  let { tutorobj,isSuccesstutor } = useSelector((state) => state.tutor);


  let dispatch = useDispatch()

  let navigate = useNavigate();

  const userLogout = () => {
    localStorage.clear();
    var x = clearLoginStatus()
    dispatch(x);
    navigate('/login')
  }
  const tutorLogout = () => {
    localStorage.clear();
    var x = cleartutorLoginStatus()
    dispatch(x);
    navigate('/tutorlogin')
  }

  const shouldDisplayHome = !isSuccess && !isSuccesstutor;
  const shouldDisplayUserLogout = isSuccess;
  const shouldDisplayTutorLogout = isSuccesstutor;


  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          
          <Navbar.Brand href="#home">Tutor Site</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="justify-content-end">
          <Nav fill variant="pills" className="me-auto">
            {shouldDisplayHome && (
              <>
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/contactus">
                  Contactus
                </NavLink>
               
                
              </>
            )}
            {shouldDisplayUserLogout && (<>
              
              <NavLink className="nav-link" to="/Userdashboard/tutors">Tutors</NavLink>
            <NavLink className="nav-link" to="/Userdashboard/posts">posts</NavLink>

            {/* <NavLink className="nav-link" to="/Userdashboard/personalinfo">Profile</NavLink> */}
            <NavDropdown title={userobj ? userobj.username : 'temp'} id="basic-nav-dropdown">
                {/* ... User dropdown menu ... */}
                <NavDropdown.Item as={NavLink} to="/Userdashboard/personalinfo" >Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
              </>
              
            )}
            {shouldDisplayTutorLogout && (<>
              <NavLink className="nav-link" to="/Dashboard/request">Requests</NavLink>
            
              <NavDropdown title={tutorobj ? tutorobj.username : 'temp'} id="basic-nav-dropdown">
                {/* ... Tutor dropdown menu ... */}
                <NavDropdown.Item as={NavLink} to="/Dashboard/profileparent" >Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={tutorLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
              
              </>
            )}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Tutorsignup" element={<Tutorsignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tutorlogin" element={<TutorLogin />} />
        <Route path="/contactus" element={<Contactus />} />



        <Route path="/userdashboard" element={<Userdashboard />} >
            <Route path="tutors" element={<Tutors />} />
           
            <Route path="posts" element={<Posts />} />
            <Route path="feedback/:tutorId" element={<Tutorfeedback />} />
           <Route path="personalinfo" element={<Personalinfo />} > 
           <Route path="profile" element={<Profile />} />
              <Route path="requirements" element={<Requirements />} />
              <Route path="updatedetails" element={<Updatedetails />} />
              <Route path="" element={<Navigate to="updatedetails" />} />
           </Route>


          <Route path="" element={<Navigate to="tutors" />} />
          
      </Route>
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path="tutordashboard" element={<Tutordashboard />} />
          <Route path="request" element={<Request/>} />
          <Route path="profileparent" element={<ProfileParent/>}>
              <Route path="addavailability" element={<Addavailability />} />
              <Route path="tutorhome" element={<TutorHome />} />
              <Route path="students" element={<Students />} />
              <Route path="extradetails" element={<EXtradetails />} />
              <Route path="tutorprofile" element={<TutorProfile/>} />
              <Route path="" element={<Navigate to="tutorprofile" />} />
          </Route>
          
          
          <Route path="" element={<Navigate to="request" replace />} />
        </Route>


      </Routes>

      

    </div>
  );
}

export default App;