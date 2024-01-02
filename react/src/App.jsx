import { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import './components/frontend.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Navbar />
        <Home />
        <Main />
        <Footer />
      </div>
    </>

  )
}

export default App
