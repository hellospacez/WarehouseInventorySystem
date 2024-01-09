import { PageProps } from "@/types";
import { Fragment, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Add from "../Location/Add";
import Del from "../Location/Del";

export default function Index({ auth, locations }: PageProps<{ locations: Array<any>, auth?: any }>) {

 
    const handleDelete2 = async ( id: number): Promise<void> => {
        if (id) {

            Inertia.delete(`/location/${id}`)
        };
    };

    console.log(Array.isArray(locations));

    const [currentPage, setCurrentPage] = useState(1);

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Location</h2>}
        >
            <Head title="Location" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

   
                           
                            <Add />

                            <div className="p-6 text-gray-900">
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8f8f8' }}>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Id</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Location</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {locations.slice((currentPage - 1) * 6, currentPage * 6).map((d) => (
                                            <tr key={d.id} style={{ borderBottom: '1px solid #ddd' }}>
                                                <td style={{ padding: '8px' }}>{d.id}</td>
                                                <td style={{ padding: '8px' }}>{d.name}</td>
                                                <td style={{ padding: '8px' }}>
                                                    <button style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleDelete2( d.id)}>Delete</button>
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
                                        disabled={currentPage === Math.ceil(locations.length / 6)}
                                        style={{
                                            padding: '10px',
                                            backgroundColor: currentPage === Math.ceil(locations.length / 6) ? '#ccc' : '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: currentPage === Math.ceil(locations.length / 6) ? 'default' : 'pointer'
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                        
                            <Del locations={locations} auth={auth} />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );






}


