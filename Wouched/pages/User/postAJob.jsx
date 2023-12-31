import NavBar from '@/components/NavBar';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post_job } from '@/Services/job';
import { useRouter } from 'next/router';
import { useAuth } from '@/Services/authContext';

export default function PostAJob() {
    const { user } = useAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    

    useEffect(() => {
      setIsClient(true);
    }, []);



    const [formData, setFormData] = useState({
        user: user?._id,
        title: "", 
        salary: 0, 
        email: "", 
        company: "", 
        description: "", 
        jobCategory: "", 
        jobType: "", 
        jobExperience: "", 
        jobVacancy: 0, 
    });

    const [error, setError] = useState({
        user: "", 
        title: "", 
        salary: "", 
        email: "", 
        company: "", 
        description: "", 
        jobCategory: "", 
        jobType: "", 
        jobExperience: "", 
        jobVacancy: "", 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!formData.title) {
            setError({ ...error, title: "title Field is required" })
            return;
        }

        if (!formData.salary) {
            setError({ ...error, salary: "salary Field is required" })
            return;
        }

        if (!formData.email) {
            setError({ ...error, email: "Email Field is Required" })
            return;
        }


        if (!formData.company) {
            setError({ ...error, company: "company Field is required" })
            return;
        }
        if (!formData.description) {
            setError({ ...error, description: "description Field is required" })
            return;
        }
        if (!formData.job_category) {
            setError({ ...error, job_category: "job_category Field is required" })
            return;
        }
        if (!formData.job_type) {
            setError({ ...error, job_type: "job_type Field is required" })
            return;
        }
        if (!formData.job_experience) {
            setError({ ...error, job_experience: "job_experience Field is required" })
            return;
        }
        if (!formData.job_vacancy) {
            setError({ ...error, job_vacancy: "job_vacancy Field is required" })
            return;
        }
      

        if (user == null) {
            return toast.error("Please Login First");
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please Login First");
            return;
        }
        
        formData.user="/api/users/" + user.id
        const response = await post_job({ ...formData, token });
        if (response.data && response.error == null) {
            toast.success("Job Posted Successfully !");
            setTimeout(() => {
                router.push('/User/displayJobs');
            }, 1000);
        } else {
            toast.error(response.error || "An error occurred while posting the job.");
        }
    };

    const options = [
        { value: 'fulltime', label: 'Full Time' },
        { value: 'parttime', label: 'Part Time' },
        { value: 'internship', label: 'Internship' },
        { value: 'contract', label: 'Contract' },
    ];






    return (
        <>
            <NavBar />
            <div className='w-full py-20 flex items-center justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-orange-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Enter Job Details</h1>
                <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full" >
                <div className='w-full mb-4 flex flex-col items-start justify-center'>
                    <label htmlFor="title" className='mb-1 text-base font-semibold'>Title :</label>
                    <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" id='title' className='w-full py-2 px-3 mb-2 border border-orange-600 rounded' placeholder='Enter title of job' />
                    {error.title && <p className="text-sm text-red-500">{error.title}</p>}
                </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="salary" className='mb-1 text-base font-semibold'>Salary :</label>
                        <input onChange={(e) => setFormData({ ...formData, salary: e.target.value })} type="number" id='salary' className='w-full py-2 px-3 mb-2 border border-orange-600 rounded' placeholder='Enter Salary for this job' />
                        {
                            error.salary && <p className="text-sm text-red-500">{error.salary}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="email" className='mb-1 text-base font-semibold'>Email :</label>
                        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id='email' className='w-full py-2 px-3 mb-2 border border-orange-600 rounded' placeholder='Enter Email to be Contacted for this job' />
                        {
                            error.email && <p className="text-sm text-red-500">{error.email}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="company" className='mb-1 text-base font-semibold'>Company :</label>
                        <input onChange={(e) => setFormData({ ...formData, company: e.target.value })} type="text" id='company' className='w-full py-2 px-3 mb-2 border border-orange-600 rounded' placeholder='Enter Company of job' />
                        {
                            error.company && <p className="text-sm text-red-500">{error.company}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>Description :</label>
                        <textarea onChange={(e) => setFormData({ ...formData, description: e.target.value })}  type="text" id='description' className='w-full py-2 px-3 mb-2 border border-orange-600 rounded' placeholder='Enter description of job' />
                        {
                            error.description && <p className="text-sm text-red-500">{error.description}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobCategory" className='mb-1 text-base font-semibold'>Job Category :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_category: e.target.value })} type="text" id='jobCategory' className='w-full py-2 px-3 mb-2 border border-orange-600 rounded' placeholder='Enter Category of job' />
                        {
                            error.job_category && <p className="text-sm text-red-500">{error.job_category}</p>
                        }
                    </div>
                    <Select onChange={(e) => setFormData({ ...formData, job_type: e.value })} placeholder="Please Select Job type" options={options} />
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        {
                            error.job_category && <p className="text-sm text-red-500">{error.job_category}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobExperience" className='mb-1 text-base font-semibold'>Job Experience :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_experience: e.target.value })} type="text" id='jobExperience' className='w-full py-2 px-3 mb-2 border border-orange-600 rounded' placeholder='Enter Experience Required for this job' />
                        {
                            error.job_experience && <p className="text-sm text-red-500">{error.job_experience}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobva" className='mb-1 text-base font-semibold'>Job Vacancy :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_vacancy: e.target.value })} type="number" id='jobva' className='w-full py-2 px-3 mb-2 border border-orange-600 rounded' placeholder='Enter Number  of Vacancies' />
                        {
                            error.job_vacancy && <p className="text-sm text-red-500">{error.job_vacancy}</p>
                        }
                    </div>
                    {/* <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobva" className='mb-1 text-base font-semibold'>Job Deadline :</label>
                        <input onChange={(e) => setFormData({ ...formData, job_deadline: e.target.value })} type="datetime-local" id='jobva' className='w-full py-2 px-3 mb-2 border border-orange-600 rounded' placeholder='Enter Deadline of job' />
                        {
                            error.job_deadline && <p className="text-sm text-red-500">{error.job_deadline}</p>
                        }
                    </div> */}
                   <button type="submit" className='w-full py-2 rounded bg-orange-600 text-white font-semibold tracking-widest'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
