// // src/App.js
// import React from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import Sender from './components/Sender';
// import Receiver from './components/Receiver';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/sender/:sessionCode",
//     element: <Sender />,
//   },
//   {
//     path: "/receiver/:sessionCode",
//     element: <Receiver />,
//   },
// ]);

// function App() {
//   return (
//     <div className="App">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;

// src/App.js


// App.js
// App.js
// App.js
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import Sender from './components/Sender';
import Receiver from './components/Receiver';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
              <ErrorBoundary>
              <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sender/:sessionCode" element={<Sender />} />
                    <Route path="/receiver/:sessionCode" element={<Receiver />} />
                </Routes>
              </ErrorBoundary>
                
            </div>
        </BrowserRouter>
    );
}

export default App;