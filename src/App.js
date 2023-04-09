import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {Route, Switch} from 'react-router';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Protectedroute from './ProtectedRoute';
import InviteForm from './components/invitation';
import { useEffect, useState } from 'react';
import ProjectsList from './components/ProjectsList';
////////////
import UploadFile from "./components/UploadFile";
import HomeeeRE from "./pages/dashboardHome";
import Fileapk from "./pages/fileapk";
import Qr from "./pages/QRCODE"
import Card from "./pages/Card";
import UPdate from "./pages/Details";
import Info from "./pages/InfoRelease";
import InfoDetails from "./pages/infodetails";
import Statstique from "./pages/stastique";

function App() {

  // Check If User is Logged In
  const [auth, setauth] = useState(false);
  const [auth1, setauth1] = useState(true);

  const isLoggedIn = async () => {
    try {
      const res = await fetch('/auth', {
        method : "GET",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials : "include"
      });

      if(res.status === 200){
        setauth(true)
        setauth1(false)
      }
      if(res.status === 401){
        setauth(false)
        setauth1(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <>
      <Navbar auth={auth1}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={Fileapk} auth={auth}/>

        <Route exact path="/about" component={About} />
        <Route exact path="/service" component={Services} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/invitation" component={InviteForm} />
        <Route exact path="/dashboard" component={HomeeeRE} />
        <Route exact path="/ProjectLits" component={ProjectsList} />
        {/* arij */}
        <Route exact path="/Release" component={HomeeeRE} auth={auth}/>
        <Route exact path="/uploadFile" component={UploadFile} auth={auth}/>
        <Route exact path="/Release/:id" component={UPdate} auth={auth}/>
        <Route exact path="/info/:id" component={Info} auth={auth}/>
        <Route exact path="/qrcode/:id" component={Qr} auth={auth}/>
        <Route exact path="/Android/:id" component={InfoDetails} auth={auth}/>
        <Route exact path="/statstique" component={Statstique} auth={auth}/>
        {/* end */}

        <Route exact path="/login" component={Login} auth={auth1}/>
        <Route exact path="/register" component={Register} auth={auth1}/>
        <Route exact path="/dashboard" component={Dashboard} auth={auth}/>
        <Route exact path="/logout" component={Logout} auth={auth}/>

      </Switch>
      <Footer/>
    </>
  );
}

export default App;


// Now we have to Procted Out Route Like Without Login
// You can not go to Dashboard
// And After login you can not login again
// We need Protected Routes

// We Cant Acces Them If Auth is False

// Now we need to Change Navbar Dynamically