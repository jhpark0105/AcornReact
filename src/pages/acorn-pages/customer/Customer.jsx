import './App.css';
import { Route, Routes } from 'react-router-dom';
import CustomerList from './CustomerList';
import CustomerInsForm from './CustomerInsForm';
import CustomerDetail from './CustomerDetail';
import { ToastContainer,toast } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<CustomerList/>} />
        <Route path="/customer/new" element={<CustomerInsForm/>} />
        <Route path="/customer/:customerId/edit" element={<CustomerDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
