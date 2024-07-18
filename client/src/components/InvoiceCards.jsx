import React from 'react'
import rightArrow from '../assets/icon-arrow-right.svg'
import { Link } from 'react-router-dom'

function InvoiceCard({ id, clientName, total }) {
    return (
        <Link
        to={`invoice?id=${id}`}
        >
            {/* Big Screen  */}
            <div className=' hidden md:flex cursor-pointer duration-100  ease-in-out  hover:border border-purple-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg items-center justify-between mt-4 ms-32 me-8'>
                <div className=' flex items-center '>
                    <h2 className=' dark:text-white '>
                        <span className=' text-[#7e88c3]'>
                            #
                        </span>
                        {id}
                    </h2>

                    <h2 className=' text-sm text-gray-400 font-light ml-10'>
                        {clientName}
                    </h2>


                </div>

                <div className='  flex  items-center '>

                    <h1 className=' text-xl mr-8  dark:text-white'>
                        $ {total}
                    </h1>

                    <img src={rightArrow} className=' ml-4' />


                </div>

            </div>

            {/* Phone Screen */}
            <div className=' md:hidden flex cursor-pointer hover:border border-purple-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg  items-center justify-between'>

                <div className=' flex flex-col'>
                    <h2 className=' dark:text-white '>
                        <span className=' text-[#7e88c3]'>
                            #
                        </span>
                        {id}
                    </h2>

                    <h1 className=' text-xl  dark:text-white'>
                        $ {total}
                    </h1>
                </div>

                <div className=' flex   flex-col'>
                    <h2 className=' text-sm mb-4 text-gray-400 font-light  text-right  '>
                        {clientName}
                    </h2>

                </div>
            </div>
        </Link>
    )
}

export default InvoiceCard