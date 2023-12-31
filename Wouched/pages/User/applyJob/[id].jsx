import NavBar from '@/components/NavBar';
import { useAuth } from '@/Services/authContext';
import { apply_job } from '@/Services/job';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ApplyJob() {
    const router = useRouter();
    const { id } = router.query;
    const activeUser = useSelector(state => state.User.userData);
    const { user, authLoading, token } = useAuth();
    const [file, setFile] = useState(null)
    const [error, setError] = useState({ name: '', email: '', about: '', job: '', user: ''});
    const [formikData, setFormikData] = useState({ 
        name: '', 
        email: '', 
        about: '', 
        status:"",
        job:  `/api/jobs/15`, 
        user: `/api/users/15` 
    });
    const { name, email, about, job } = formikData;

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        


        if (!name) {
            setError({ ...error, name: "Name Field is required" })
            return;
        }

        if (!email) {
            setError({ ...error, email: "Email Field is required" })
            return;
        }

        if (!user) {
            return toast.error('Please Login First')
        }

        if (!job) {
            return toast.error('Please Follow Apply Process ')
        }

        if (!about) {
            setError({ ...error, about: "About Field is required" })
            return;
        }



        const form = new FormData();
        form.append('name', name);
        form.append('email', email);
        form.append('about', about);
        form.append('job', job);
        form.append('user', user);



        try {


            const res = await apply_job(formikData);
            toast.success(res.data.about);
            router.push('/')
        }
        catch (err) {
            toast.error(err.about || 'Error applying job');
        }

    }



    // useEffect(() => {
    //     if (id ) {
    //         setFormikData(fData => ({ ...fData, job: id, user:id }));
    //     }
    // }, [id]);
    
    

    return (
        <>
            <NavBar />
            <div className='w-full  py-20 flex items-center  justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Enter Your Info</h1>
                <form encType="multipart/form-data" onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4  h-full" >
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="title" className='mb-1 text-base font-semibold'>Name :</label>
                        <input name='name' onChange={(e) => setFormikData({ ...formikData, name: e.target.value })} type="text" id='title' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Name ' />
                        {
                            error.name && <p className="text-sm text-red-500">{error.name}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="email" className='mb-1 text-base font-semibold'>Email :</label>
                        <input name='email' onChange={(e) => setFormikData({ ...formikData, email: e.target.value })} type="email" id='email' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Email' />
                        {
                            error.email && <p className="text-sm text-red-500">{error.email}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>About :</label>
                        <textarea name='about' onChange={(e) => setFormikData({ ...formikData, about: e.target.value })} type="description" id='description' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter description' />
                        {
                            error.about && <p className="text-sm text-red-500">{error.about}</p>
                        }
                    </div>
                 
                    <button type="submit" className='w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
