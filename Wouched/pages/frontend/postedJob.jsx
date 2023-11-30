import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import NavBar from '@/components/NavBar';
import JobsCard from '@/components/JobsCard';
import { InfinitySpin } from 'react-loader-spinner';
import { setMyJobs } from '@/Utils/JobSlice';
import { get_my_posted_job } from '@/Services/job';
import { useAuth } from '@/Services/authContext';

export default function PostedJobs() {
    const { user } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();
    const myJobs = useSelector(state => state?.Job?.myJobs);

    useEffect(() => {
        if (!user || !user._id) {
            router.push('/auth/login');
        }
    }, [user, router]);

    const fetcher = url => get_my_posted_job(user._id).then(res => res.data);
    const { data, error, isValidating } = useSWR(user && user._id ? '/getMyPostedJobs' : null, fetcher);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            dispatch(setMyJobs(data));
        }
    }, [data, dispatch]);

    if (error) {
        toast.error("Error loading jobs.");
        return null;
    }

    if (isValidating || !data) {
        return <InfinitySpin width='200' color="#FF6600" />;
    }

    return (
        <>
            <NavBar />
            <div className='w-full pt-20'>
                <div className='w-full h-20 bg-gray-50 text-orange-600 font-bold flex items-center justify-center flex-col'>
                    <h1 className='text-3xl'>Posted Jobs</h1>
                </div>
                <div className='w-full h-full px-4 py-4 flex overflow-y-auto flex-wrap'>
                    {Array.isArray(myJobs) && myJobs.length > 0 ? (
                        myJobs.map((job, index) => (
                            <JobsCard key={index} job={job} posted={true} />
                        ))
                    ) : (
                        <div className='flex justify-center items-center w-full h-full'>
                            <p>No jobs posted yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
