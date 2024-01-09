import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React, { useState } from 'react' // Import useState





export default function Index({ stocks, auth, products, locations }: PageProps<{ stocks: Array<any>, products: Array<any>, locations: Array<any>}>) {
  const [currentPage, setCurrentPage] = useState(1); // Declare and initialize currentPage state




  
  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stock</h2>}
>
    <Head title="Stock" />

    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">


                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f8f8f8' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Stock Id</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Product SKU</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Location</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>QTY</th>
                                    
                                     
                                    </tr>
                                </thead>

                                <tbody>


                                    {stocks.slice((currentPage - 1) * 40, currentPage * 40).map((d) => (
                                        <tr key={d.id} style={{ borderBottom: '1px solid #ddd' }}>
                                            <td style={{ padding: '8px' }}>{d.id}</td>
                                            <td style={{ padding: '8px' }}>{products.find(product => product.id === d.product_id)?.SKU || 'Product not found'}</td>
                                            <td style={{ padding: '8px' }}>{locations.find(location => location.id === d.location_id)?.name || 'Product not found'}</td>
                            
                                              <td style={{ padding: '8px' }}>{d.sqty}</td> 
                                           
                                        
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                      <div style={{ marginTop: '20px' }}>
                                <button
                                    disabled={currentPage === 1}
                                    style={{
                                        marginRight: '10px',
                                        padding: '10px',
                                        backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: currentPage === 1 ? 'default' : 'pointer'
                                    }}
                                    onClick={() => setCurrentPage(currentPage - 1)} // Fix the onClick event handler
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(stocks.length / 40)}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: currentPage === Math.ceil(stocks.length / 40) ? '#ccc' : '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: currentPage === Math.ceil(stocks.length / 40) ? 'default' : 'pointer'
                                    }}
                                >
                                    Next
                                </button>

                            </div>
                   
                </div>
                </div>
            </div> </div>

        </AuthenticatedLayout>
  )
}
