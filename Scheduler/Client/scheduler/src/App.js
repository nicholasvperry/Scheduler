import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import ApplicationViews from './components/ApplicationViews';
import { UserProvider } from './Providers/UserProvider';

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <ApplicationViews />
      </UserProvider>
    </Router>
  );
}

export default App;
