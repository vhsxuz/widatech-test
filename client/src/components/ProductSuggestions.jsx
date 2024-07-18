import React, { useState } from 'react';

const ProductSuggestions = ({ products, onSelect }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleProductSelect = (product) => {
    onSelect(product);
    setInputValue(product.name);
    setFilteredProducts([]);
  };

  return (
    <div className="product-suggestions w-full max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <input
        type="text"
        value={inputValue}
        placeholder="Search products"
        onChange={handleInputChange}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
      />
      {filteredProducts.length > 0 && (
        <ul className="list-none mb-0">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              onClick={() => handleProductSelect(product)}
              className="flex items-center py-4 px-4 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={product.picture}
                alt={product.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <p className="text-gray-600">Price: ${product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSuggestions;