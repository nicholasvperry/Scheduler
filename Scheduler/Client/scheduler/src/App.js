import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';
import { UserContext, UserProvider } from './Providers/UserProvider';
import { CustomerProvider } from './Providers/CustomerProvider';
import { SideBar } from './components/SideBar/SideBar';
import { useContext } from 'react';
import { JobProvider } from './Providers/JobProvider';
import { JobInstanceProvider } from './Providers/JobInstanceProvider';
import { UserJobInstanceProvider } from './Providers/UserJobInstanceProvider';


function App() {
  const { isLoggedIn } = useContext(UserContext);
  
  if (!isLoggedIn) {
    return (
      <Router>
        <Header />
        <CustomerProvider>
          <ApplicationViews />
        </CustomerProvider>
      </Router>
    );
  } else {
    return (
      <div className='App'>
        <Router>
          <CustomerProvider>
            <UserProvider>
              <JobProvider>
                <JobInstanceProvider>
                  <UserJobInstanceProvider>
                    <div className='header'>
                      <Header />
                    </div>
                    <div className='allViews'>
                      <SideBar />
                      <div className='applicationViews'>
                        <ApplicationViews />
                      </div>
                    </div>
                  </UserJobInstanceProvider>
                </JobInstanceProvider>
              </JobProvider>
            </UserProvider>
          </CustomerProvider>
        </Router>
      </div>
    )
  }

}

export default App;
