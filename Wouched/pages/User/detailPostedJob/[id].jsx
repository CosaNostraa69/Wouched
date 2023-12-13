import { useAuth } from '@/Services/authContext';
import { get_all_applications } from '@/Services/job';
import ApplicationsDataTable from '@/components/ApplicationsDataTable'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';


export default function PostedJobsDetails() {
    const { user, authLoading, token, isLoading } = useAuth();
    const router = useRouter();
    const [application, setApplication] = useState([]);
    const { id } = router.query;

    useEffect(() => {
        if (!user && !authLoading) {
            router.push('/auth/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user && token && id) {
            get_all_applications(id, token)
                .then(res => {
                    setApplication(res.data);
                })
                .catch(err => {
                    toast.error(err.message || 'Error fetching applications');
                });
        }
    }, [user, token, id]);
    

    return (
        <>
            {
                isLoading ? (
                    <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
                        <InfinitySpin width='200' color="#FF6600" />
                        <p className='text-xs uppercase'>Loading Resources Hold Tight...</p>
                    </div>
                ) : (
                    <>
                        <NavBar />
                        <div className='w-full pt-20'>
                            <div className='w-full h-20 bg-gray-50 text-indigo-600 font-bold flex items-center justify-center'>
                                <h1 className='text-xl md:text-3xl'>Detail List of Jobs Application</h1>
                            </div>
                            <div className='w-full h-full px-4 py-4 flex flex-col items-center justify-center overflow-y-auto'>
                                <ApplicationsDataTable application={application} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
    
}
