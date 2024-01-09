import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'; // Import the 'Inertia' module
import { PageProps } from '@/types';

export default function Del({ locations }: PageProps<{ locations: Array<any> }>) {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null satisfies {
        id: number;
    } | null);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };
    const handleLocationSelect = (location: any): void => {
        setSelectedLocation(location);
    };
    const filteredLocations = locations.filter(location => location.name.includes(searchTerm));
    const handleDelete = async (selectedLocation: { id: number } | null): Promise<void> => {
        if (selectedLocation) {
            Inertia.delete(`/location/${selectedLocation.id}`);
        }
    };

    return (

        <div className="p-6 text-gray-900">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginRight: '10px' }}
            />
            <select
                onChange={(e) => handleLocationSelect(locations.find(location => location.id === Number(e.target.value)))}
                style={{ marginRight: '10px' }}
            >
                <option value="">Select a location</option>
                {filteredLocations.slice(0, 6).map(location => (
                    <option key={location.id} value={location.id}>
                        {location.name}
                    </option>
                ))}
            </select>
            <button
                onClick={() => handleDelete(selectedLocation)}
                disabled={!selectedLocation}
                style={{
                    padding: '10px',
                    backgroundColor: !selectedLocation ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: !selectedLocation ? 'default' : 'pointer'
                }}
            >
                Delete Selected Location
            </button>
        </div>
    )
}
