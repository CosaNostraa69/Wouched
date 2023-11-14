import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import JobsCard from "@/components/JobsCard";

export default function DisplayJobs() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/jobs', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setJobs(data['hydra:member']); 
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
            setError(error);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <NavBar />
            <div className="w-full py-20 flex items-center md:px-8 px-2 justify-center flex-col">
                <h1 className="px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-orange-600 text-3xl font-semibold">
                    Available Jobs
                </h1>
                <div className="w-full h-full py-4 flex overflow-y-auto items-center justify-center flex-wrap">
                    {jobs.length > 0 ? (
                        jobs.map((job) => <JobsCard job={job} key={job.id} />) // Affichage de chaque annonce
                    ) : (
                        <p>No jobs found</p>
                    )}
                </div>
            </div>
        </>
    );
}
