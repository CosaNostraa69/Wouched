import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import NavBar from '@/components/NavBar';
import JobsCard from '@/components/JobsCard';
import { setMyJobs } from '@/Utils/JobSlice';
import { get_my_posted_job } from '@/Services/job';
import { useAuth } from '@/Services/authContext';

export default function PostedJobs() {
    const { user, authLoading, token } = useAuth();
    const router = useRouter();
    const myJobs = useSelector(state => state?.Job?.myJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user && !authLoading) {
            router.push('/auth/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user && token) {
            get_my_posted_job(user.id, token)
                .then(res => {
                    // Assurez-vous d'extraire correctement les jobs de la réponse
                    const jobs = res.data['hydra:member'];
                    dispatch(setMyJobs(jobs));
                })
                .catch(err => {
                    toast.error(err.message || 'Error fetching jobs');
                });
        }
    }, [user, token, dispatch]);

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
