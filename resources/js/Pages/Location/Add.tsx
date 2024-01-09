import { Inertia } from '@inertiajs/inertia';
import { FormEvent } from 'react';



function Add(this: any) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string; // 类型断言，假定 'name' 是一个 string
        const data = {
            name: name,
            // 其他字段
        };

        // 使用 Inertia 发送 POST 请求到 Laravel 后端
        Inertia.post('/location/add', data);
    };

    return (





        <div className="p-6 text-gray-900">


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

                {/* 其他表单字段 */}

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
            </form>

        </div>


    );
}

export default Add;