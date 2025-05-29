import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wrapper from "./pages/Wrapper";
import Goalpage from "./pages/Goalpage";
import Taskpage from "./pages/Taskpage";
import Visualizationpage from "./pages/Visualizationpage";
import About from "./pages/About";
import Visualpage from "./pages/Visualpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home */}
        <Route path="/" element={<Home />} />

        {/* register */}
        <Route path="/register" element={<Register />} />

        {/* dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <Wrapper>
              <Dashboard />
            </Wrapper>
          } 
        />
        {/* goalpage */}
        <Route 
          path="/goalpage/:id" 
          element={
            <Wrapper>
              <Goalpage />
            </Wrapper>
          }
        />
        {/* taskpage */}
        <Route 
          path="/taskpage/:id" 
          element={
            <Wrapper>
              <Taskpage />
            </Wrapper>
          }
        />
        {/* visualizationpage */}
        <Route 
          path="/visualizationpage" 
          element={
            <Wrapper>
              <Visualizationpage />
            </Wrapper>
          }
        />
        {/* about */}
        <Route 
          path="/about" 
          element={
            <Wrapper>
              <About />
            </Wrapper>
          }
        />
        {/* visualpage */}
        <Route 
          path="/visualpage/:id" 
          element={
            <Wrapper>
              <Visualpage />
            </Wrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;