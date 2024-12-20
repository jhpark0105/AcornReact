import './App.css';
import { Route, Routes } from 'react-router-dom';
import CustomerList from './CustomerList';
import CustomerInsForm from './CustomerInsForm';
import CustomerDetail from './CustomerDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customer/new" element={<CustomerInsForm />} />
        <Route path="/customer/:customerId/edit" element={<CustomerDetail />} />
      </Routes>
    </div>
  );
}

export default App;
