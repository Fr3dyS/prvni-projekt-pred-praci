import { Navigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { httpDelete, httpGet, httpPost, httpPut } from '../utils/http-client';
import Layout from '../components/layout/AuthLayout';
import { toast, ToastContainer } from 'react-toastify';
import { User } from '../types/user.types';
import { FaUser } from 'react-icons/fa';
import Modal from '../components/layout/ModalLayout';

export default function DetailUserScreen() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User>();
    const [showModal, setShowModal] = useState(false); // State pro zobrazení modálního okna pro smazání uživatele
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null); // State pro uchování ID uživatele, ktery bude smazán
    const [isDeleted, setDeleted] = useState(false);

    // Funkce pro smazání uživatele
    const deleteUser = async (id: number) => {
        const res = await httpDelete(`users/${id}`);
        if (res.status === 200) {
            toast.success('User successfully deleted.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            setDeleteUserId(null);
            setShowModal(false);
            setTimeout(() => {
                setDeleted(true);
            }, 2000);

        } else if (res.status === 403) {
            toast.error('User does not have delete permissions.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    const fetchData = async () => {
        const res = await httpGet(`users/${id}`);
        if (res.status === 200) {
            setUser(res.data.payload);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (isDeleted) {
        return <Navigate to={'/users'} />;
    }


    return (
        <Layout>
            <div className="min-h-screen bg-gray-100" style={{ overflowX: 'hidden' }}>
                {user ? (
                    <div className="bg-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="py-8 md:py-12">
                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                        <div className="px-6 py-4">
                                            <div className="flex items-center">
                                                <FaUser className="text-3xl text-gray-400" />
                                                <div className="ml-4">
                                                    <h1 className="text-2xl font-bold text-gray-900">
                                                        User Detail
                                                    </h1>
                                                    <p className="text-gray-600">{user.username}</p>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">First Name</dt>
                                                        <dd className="mt-1 text-lg font-medium text-gray-900">{user.firstName}</dd>
                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                                        <dd className="mt-1 text-lg font-medium text-gray-900">{user.lastName}</dd>
                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">User ID</dt>
                                                        <dd className="mt-1 text-lg font-medium text-gray-900">{user.id}</dd>
                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Role</dt>
                                                        <dd className="mt-1 text-lg font-medium text-gray-900">{user.role}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-6">
                                            <Link to={`/users/edit/${id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium ml-2 mb-2">
                                                Editace
                                            </Link>
                                            <button onClick={() => {
                                                setDeleteUserId(user.id);
                                                setShowModal(true);
                                            }}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-2"
                                            >
                                                Delete
                                            </button>
                                            <Link to={'/users/'} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md text-sm font-medium mr-2 mb-2">
                                                Zpět
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div>Loading...</div>
                )
                }
                {
                    showModal && (
                        <Modal
                            message='Opravdu chcete smazat tohoto uživatele?'
                            confirmText='Smazat'
                            onConfirm={() => {
                                deleteUser(deleteUserId!); // Call the deleteUser function with the user ID
                                setShowModal(false);
                            }}
                            onCancel={() => {
                                setDeleteUserId(null); // Reset the deleteUserId state variable
                                setShowModal(false);
                                toast.warning('Nothing was deleted.', { // zobrazení hlášky o ukončení modal boxu bez smazaní uživatele
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: 2000, // milliseconds
                                });
                            }}
                        />

                    )
                }
                <ToastContainer />
            </div >
        </Layout >
    );
}