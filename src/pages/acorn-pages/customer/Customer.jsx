import './App.css';
import { Route, Routes } from 'react-router-dom';
import CustomerList from './CustomerList';
import CustomerInsForm from './CustomerInsForm';
import CustomerDetail from './CustomerDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CustomerList/>} />
        <Route path="/customer/new" element={<CustomerInsForm/>} />
        <Route path="/customer/:customerId/edit" element={<CustomerDetail/>} />
      </Routes>
    </div>
  );
}

export default App;



