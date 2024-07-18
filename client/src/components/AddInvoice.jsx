import React, { useState } from 'react';
import ProductSuggestions from './ProductSuggestions';
import { addData } from '../redux/actions';
import { useDispatch } from 'react-redux';

const AddInvoice = () => {
  const dispatch = useDispatch();
  const products = [
    {
      id: 1,
      name: "Bitcoin",
      picture: "https://mzeqikntarkkhvkvmpbn.supabase.co/storage/v1/object/public/Crypto/bitcoin.png",
      stock: 20,
      price: 10
    },
    {
      id: 2,
      name: "Ethereum",
      picture: "https://mzeqikntarkkhvkvmpbn.supabase.co/storage/v1/object/public/Crypto/etherium.png",
      stock: 20,
      price: 7
    },
    {
      id: 3,
      name: "Solana",
      picture: "https://mzeqikntarkkhvkvmpbn.supabase.co/storage/v1/object/public/Crypto/solana.png",
      stock: 20,
      price: 5
    }
  ]
  const [formData, setFormData] = useState({
    date: "",
    customer_name: "",
    sales_name: "",
    payment_method_id: 1,
    notes: "",
    products: []
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value });
  };

  const handleProductSelect = (product) => {
    setFormData({
     ...formData,
      products: [...formData.products, product]
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
     !formData.date ||
     !formData.customer_name ||
     !formData.sales_name ||
      formData.products.length === 0
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    console.log(formData)

    const result = dispatch(addData(formData));
    setMessage("Invoice added successfully!");

    
  };

  const handleBack = () => {
    // navigate back to previous page or route
    window.history.back();
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Invoice</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
              Date:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="customer_name">
              Customer Name:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sales_name">
              Salesperson Name:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="sales_name"
              value={formData.sales_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="notes">
              Notes:
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <ProductSuggestions
          products={products}
          onSelect={handleProductSelect}
        />
        <div className="flex">

        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add Invoice
        </button>

        <button
        className="bg-red-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={handleBack}
      >
        Back
      </button>
        </div>
      </form>


    </div>
  );
};

export default AddInvoice;