import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections, removeConnections } from '../utils/userConnections';
import { toast } from 'react-toastify';

const Connections = () => {
    let connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const handleDeleteConnection = async (id) => {
        try {
            const res = await axios.delete(BASE_URL + '/request/delete/' + id, {
                withCredentials: true
            })

            console.log(res);

            connections = connections.filter((connection) => connection._id !== id);
            dispatch(addConnections(connections));
            toast.success("user deleted successfully...")
        } catch (error) {
            console.error(error);
            toast.error(error)
        }
    }

    const fetchConnections = async () => {
        try {

            const res = await axios.get(BASE_URL + '/user/connections',
                { withCredentials: true }
            );
            console.log(res.data.data);

            dispatch(addConnections(res.data.data));


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchConnections(); // call your dispatch logic here
        console.log(connections);

    }, []);

    if (!connections) return null;

    if (connections.length === 0) return (
        <div className="items-center my-10 flex">
            <ul className="list bg-base-300 rounded-box shadow-md min-w-2xl max-w-3xl m-auto p-8">
                <li className="flex items-center gap-2">
                    <h1 className="font-bold text-2xl">No connections</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={fetchConnections} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                </li>
            </ul>
        </div>
    );

    if (connections) return (
        <div className="items-center my-10 flex">
            <ul className="list bg-base-300 rounded-box shadow-md min-w-2xl max-w-3xl m-auto p-8">
                <li className="flex items-center gap-2">
                    <h1 className="font-bold text-2xl">Connections</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={fetchConnections} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                </li>


                {connections.map((connection, index) => (
                    <li className="list-row" key={connection._id}>
                        <div className="text-4xl font-thin opacity-30 tabular-nums">{index}</div>
                        <div><img className="size-20 rounded-box" src={connection.data.photourl} /></div>
                        <div className="list-col-grow">
                            <div>{connection.data.firstName + " " + connection.data.lastName}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{connection.data.age + ", " + connection.data.gender}</div>
                        </div>
                        <button className="btn btn-square btn-ghost" onClick={() => handleDeleteConnection(connection._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </li>
                ))}


            </ul>
        </div>
    );
}

export default Connections