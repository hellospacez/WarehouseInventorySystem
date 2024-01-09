import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { PageProps } from '@/types';
import Select from 'react-select';

import AsyncSelect from 'react-select/async';

export default function Add({ products, locations }: PageProps<{ products: Array<any>, locations: Array<any> }>) {


    const [product_id, setProduct] = useState('');

    const [location_id, setLocation] = useState('');
    const [qty, setQty] = useState('');

    const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct(event.target.value);
    };

    const loadOptions = (inputValue: any, callback: (arg0: any[]) => void) => {
        // 这里你可以根据用户的输入过滤你的产品列表
        const filteredProducts = products.filter(product =>
            product.name.includes(inputValue)
        );

        // 最多返回6个选项
        callback(filteredProducts.slice(0, 6));
    };


    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLocation(event.target.value);
    }

    const handleQtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setQty(event.target.value);
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            product_id: product_id,
            location_id: location_id,
            qty: qty
        };
        Inertia.post('/order/add', data);
    };



    return (
        <div className="p-6 text-gray-900">



            <div className="d-flex align-items-center justify-content-between mb-3">

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>













                    <div className="form-group">

                        <select id="SKU" value={product_id} onChange={handleProductChange} className="form-control">
                            <option value="">Select a Product</option>
                            {products.map((product) => (

                                <option value={product.id}>{product.SKU}</option>
                            ))}
                        </select>
                    </div>




             
                    <div className="form-group">

                        <select id="Location" value={location_id} onChange={handleLocationChange} className="form-control">
                            <option value="">Select a Location</option>
                            {locations.map((location) => (

                                <option value={location.id}>{location.name}</option>
                            ))}
                        </select>
                    </div>







                    <div className="form-group">
                    QTY: 
                        <input type="number" step="1" id="qty" placeholder="QTY" value={qty}  defaultValue="1"  onChange={handleQtyChange} className="form-control" />
                        
                    </div>
                    <button type="submit" style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }} className="btn btn-primary">Finalise Order</button>
                </form>

            </div>
        </div>
    )
}
