import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../redux/actions';
import InvoiceCard from './InvoiceCards';
import { Link } from 'react-router-dom';

const Center = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  console.log('data:', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className='text-white'>Data</h1>
      <ul>
        {data && data.transactions && data.transactions.map(item => (
          <InvoiceCard key={item.id} id={item.id} clientName={item.customers.name} total={item.total_price} />
        ))}
      </ul>
      <Link to="/add-invoice">
        <button className="bg-teal-500 hover:opacity-70 text-white font-bold ms-32 mt-16 py-2 px-4 rounded">
          Add New Invoice
        </button>
      </Link>
    </div>
  )
}

export default Center