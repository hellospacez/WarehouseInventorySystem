import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import React from 'react'
import Add from './Add'
import { Inertia } from '@inertiajs/inertia';

export default function Index({ orders, auth, products, locations }: PageProps<{ orders: Array<any>, products: Array<any>, locations: Array<any>}>) {

    const [currentPage, setCurrentPage] = React.useState(1);

    const handleListDelete2 = async ( id: number): Promise<void> => {
        if (id) {

            Inertia.delete(`/order/${id}`);
        };
    };
 


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Order</h2>}
        >
            <Head title="Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">


                    

<Add products={products} locations={locations} auth={auth} />



                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f8f8f8' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>SKU</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Product Name</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Location</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>QTY</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Time</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>QTY</th>
                                    </tr>
                                </thead>

                                <tbody>


                                    {orders.slice((currentPage - 1) * 6, currentPage * 6).map((d) => (
                                        <tr key={d.id} style={{ borderBottom: '1px solid #ddd' }}>
                                            <td style={{ padding: '8px' }}>{products.find(product => product.id === d.product_id)?.SKU || 'Product not found'}</td>
                                            <td style={{ padding: '8px' }}>{products.find(product => product.id === d.product_id)?.name || 'Product not found'}</td>
                                            <td style={{ padding: '8px' }}>{locations.find(location => location.id === d.location_id)?.name || 'Product not found'}</td>
                                     
                                            <td style={{ padding: '8px' }}>{d.qty}</td>
                                            <td style={{ padding: '8px' }}>{new Date(d.created_at).toLocaleString('en-AU', {  month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                                            <td style={{ padding: '8px' }}>
                                                <button style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleListDelete2(d.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                            <div style={{ marginTop: '20px' }}>
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
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
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(orders.length / 6)}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: currentPage === Math.ceil(orders.length / 6) ? '#ccc' : '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: currentPage === Math.ceil(orders.length / 6) ? 'default' : 'pointer'
                                    }}
                                >
                                    Next
                                </button>

                            </div>



                        </div>




                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
