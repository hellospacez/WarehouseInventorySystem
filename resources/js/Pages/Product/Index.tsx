import { PageProps } from "@/types";
import { Fragment, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Add from "../Product/Add";
import { Inertia } from '@inertiajs/inertia';



export default function Index({ products, auth }: PageProps<{ products: Array<any> }>) {

    const [currentPage, setCurrentPage] = useState(1);

    const handleListDelete = async ( id: number): Promise<void> => {
        if (id) {

            Inertia.delete(`/product/${id}`)
        };
    };

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product</h2>}
        >
            <Head title="Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <Add />

                        <div className="p-6 text-gray-900">

                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f8f8f8' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Id</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>SKU</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Action</th>
                                    </tr>
                                </thead>

                                <tbody>


                                    {products.slice((currentPage - 1) * 6, currentPage * 6).map((d) => (
                                        <tr key={d.id} style={{ borderBottom: '1px solid #ddd' }}>
                                            <td style={{ padding: '8px' }}>{d.id}</td>
                                            <td style={{ padding: '8px' }}>{d.SKU}</td>
                                            <td style={{ padding: '8px' }}>{d.name}</td>
                                            <td style={{ padding: '8px' }}>
                                                <button style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleListDelete(d.id)}>Delete</button>
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
                                    disabled={currentPage === Math.ceil(products.length / 6)}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: currentPage === Math.ceil(products.length / 6) ? '#ccc' : '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: currentPage === Math.ceil(products.length / 6) ? 'default' : 'pointer'
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

    );






}

