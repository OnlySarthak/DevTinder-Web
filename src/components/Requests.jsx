import axios from 'axios';
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/userRequests';
import { toast } from 'react-toastify';

const Requests = () => {
    let requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const handleRejectRequest = async (id) => {
        try {
            const res = await axios.delete(BASE_URL + '/request/delete/' + id, {
                withCredentials: true
            })

            console.log(res);

            requests = requests.filter((request) => request._id !== id);
            dispatch(addRequests(requests));
            toast.success("user deleted successfully...")
        } catch (error) {
            console.error(error);
            toast.error(error)
        }
    }

    const handleAcceptRequest = async (fromUserId, id) => {
        try {
            const res = await axios.post(BASE_URL + '/request/review/accepted/' + fromUserId,{}, {
                withCredentials: true
            })

            console.log(res);

            requests = requests.filter((request) => request._id !== id);
            dispatch(addRequests(requests));
            toast.success("user accepted successfully...")
        } catch (error) {
            console.error(error);
            toast.error(error)
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/request/received',
                { withCredentials: true }
            );
            console.log(res.data);
            dispatch(addRequests(res.data.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRequests(); // call your dispatch logic here
        console.log(requests);
    }, []);

    if (!requests) return null;

    if (requests.length === 0) return (
        <div className="items-center my-10 flex">
            <ul className="list bg-base-300 rounded-box shadow-md min-w-2xl max-w-3xl m-auto p-8">
                <li className="flex items-center gap-2">
                    <h1 className="font-bold text-2xl">No requests</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={fetchRequests} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                </li>
            </ul>
        </div>
    );

    if (requests) return (
        <div className="items-center my-10 flex">
            <ul className="list bg-base-300 rounded-box shadow-md min-w-2xl max-w-3xl m-auto p-8">
                <li className="flex items-center gap-2">
                    <h1 className="font-bold text-2xl">Requets</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={fetchRequests} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                </li>

                {requests.map((request, index) => {
                    return (<li className="list-row" key={request._id}>
                        <div className="text-4xl font-thin opacity-30 tabular-nums">{index}</div>
                        <div><img className="size-20 rounded-box" src={request.data.photourl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFc5RPTXrd_aINy3a9AewvAreBJAtOD4hgg&s"} /></div>
                        <div className="list-col-grow">
                            <div>{request.data.firstName + " " + request.data.lastName}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">
                                {request.data.age + ", " + request.data.gender}</div>
                        </div>
                        <button className='btn btn-primary' 
                        onClick={() => handleAcceptRequest(request.data._id, request._id)}>Accept</button>
                        <button className='btn btn-warning' 
                        onClick={() => handleRejectRequest(request._id)}>Reject</button>

                    </li>)
                })}

            </ul>
        </div>
    );
}

export default Requests