
import Cookies from "js-cookie";

// post job api
export const post_job = async (formData) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json',
                'Authorization': `Bearer ${formData.token}` 
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Network response was not ok: ${res.status}`);
        }

        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        console.error('error in post job (service) => ', error);
        return { data: null, error };
    }
}


// get job api
export const get_job = async () => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/jobs`, {
            method: 'GET',
            headers : {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
        }
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        console.log('error in getting jobs (service) => ', error);
        return { data: null, error };
    }
}


// get specified job api
export const get_specified_job = async (id) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
        }
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        console.log('error in getting specified job (service) => ', error);
        return { data: null, error };
    }

}




// apply  job api

export const apply_job = async (formData ) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No authentication token found");
        }

        const res = await fetch(`http://127.0.0.1:8000/api/apply_jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData), 
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Network response was not ok: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Job application successful:', data);
        return { data, error: null };
    } catch (error) {
        console.error('error in applying for a job (service) => ', error);
        return { data: null, error };
    }
}




// get my all applied job api
 
export const get_my_applied_job = async (id, token) => {
    if (!id, token) {
        throw new Error("Missing user ID for fetching applied jobs");
    }
    try {

        const token = Cookies.get('token');
        if (!token) {
            throw new Error("No authentication token found");
        }

        const res = await fetch(`http://127.0.0.1:8000/api/users/${id}/applied_jobs`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Network response was not ok: ${res.status}`);
        }

        const data = await res.json();
        console.log('Successfully fetched applied jobs:', data);
        return { data, error: null };
    } catch (error) {
        console.error('error in getting my all applied jobs (service) => ', error);
        return { data: null, error };
    }
}




// get my all posted job api 

export const get_my_posted_job = async (id,token) => {
    try {
       

        const res = await fetch(`http://127.0.0.1:8000/api/jobs?user=/api/users/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
        }
        
        const data = await res.json();
        return { data, error: null };
    }
    catch (error) {
        console.error('error in getting my all posted jobs (service) => ', error);
        return { data: null, error };
    }
}



// get my all application of specified jobs api

export const get_all_applications = async (id) => {
    try {
        const res = await fetch(`http://localhost:8000/api/apply_jobs?page=1&job=${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
        }
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        console.log('error in getting all applications of specified jobs (service) => ', error);
        return { data: null, error };
    }
}



// change application status api

export const change_application_status = async (formData) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/job/applications/${formData.id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        });
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
        }
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        console.log('error in changing application status (service) => ', error);
        return { data: null, error };
    }
}



export const get_application_details = async (id) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/job/applications/${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        });
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
        }
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        console.log('error in getting application details (service) => ', error);
        return { data: null, error };
    }
}
