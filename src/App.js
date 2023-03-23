import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';
import Alert  from './componets/Alert';

function App() {

  return (
    <BrowserRouter>
        <Header/>
        <Routes>
        <Route path= "/" element={<Homepage/>} exact />
        <Route path="/coins/:id" element={<Coinpage/>} />
        </Routes>
        <Alert/>
    </BrowserRouter>
  );
}

export default App;
