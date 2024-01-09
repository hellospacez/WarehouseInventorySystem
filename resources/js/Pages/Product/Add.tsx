import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Add: React.FC = () => {
    const [productName, setProductName] = useState('');

    const [SKU, setSKU] = useState('');

    const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    };

 

    const handleSKUChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSKU(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            name: productName,
            SKU: SKU
        };
        Inertia.post('/product/add', data);
    };

    return (
        <div className="p-6 text-gray-900">
            <div className="d-flex align-items-center justify-content-between mb-3">
           
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <div className="form-group">
                        {/* <label htmlFor="sku">SKU: </label> */}
                        <input type="text" id="sku" placeholder="SKU"  value={SKU} onChange={handleSKUChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="productName">Product Name: </label> */}
                        <input type="text" id="productName" placeholder="Product Name" value={productName} onChange={handleProductNameChange} className="form-control" />
                    </div>
                    <button type="submit" style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }} className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>





        /* 
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <input
                type="text"
                name="name"
                placeholder="Location Name"
                style={{
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}
            />
        
        
        
            <button
                type="submit"
                style={{
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Add Location
            </button>
        </form> */




    );
};

export default Add;