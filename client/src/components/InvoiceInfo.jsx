import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataById } from '../redux/actions';

const InvoiceInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const invoiceId = params.get('id');
  const { loading, data, error } = useSelector(state => state);
  const [customerName, setCustomerName] = useState("");
  const [salespersonName, setSalespersonName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    console.log("ID: ", invoiceId)
    dispatch(fetchDataById(invoiceId));
  }, [dispatch, invoiceId]);

  useEffect(() => {
    if (data && data.transaction) {
      const transaction = data.transaction;
      setCustomerName(transaction.customers.name);
      setSalespersonName(transaction.sales?.name?? '');
      setPaymentMethod(transaction.payment_methods.name);
      setNotes(transaction.notes?? '');
      setTotalPrice(transaction.total_price);
    }
  }, [data]);

  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-2xl mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white rounded shadow-md text-center">
        <h2 className="text-lg font-bold mb-4">Invoice Summary</h2>
        <div className="flex flex-wrap mb-4 justify-center">
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <p className="text-gray-600">Customer Name:</p>
            <p className="text-lg font-bold">{customerName}</p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <p className="text-gray-600">Salesperson Name:</p>
            <p className="text-lg font-bold">{salespersonName}</p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <p className="text-gray-600">Payment Method:</p>
            <p className="text-lg font-bold">{paymentMethod}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Notes:</p>
          <p className="text-lg">{notes}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">Total Amount Paid:</p>
          <p className="text-lg font-bold">${totalPrice}</p>
        </div>
        <Link to="/" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded inline-block">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default InvoiceInfo;