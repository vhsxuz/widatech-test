import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const InvoiceInfo = () => {
  const { id } = useParams();

  console.log(id)

  useEffect(() => {
    console.log('useEffect hook executed');
    console.log("HEHE");
  }, [id]); // Add id to the dependency array

  return (
    <div className='text-white'>InvoiceInfo</div>
  );
};

export default InvoiceInfo