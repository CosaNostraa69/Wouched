import Cookies from "js-cookie";



// bookmark job api
export const book_mark_job = async (formData) => {

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/bookmarks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in bookmark job (service) => ', error);
    }
}

// get bookmark job api

export const get_book_mark_job = async (id) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/job/bookmark?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting bookmark job (service) => ', error);
    }
}


// delete bookmark job api

export const delete_book_mark_job = async (id) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/job/bookmark`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(id),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in deleting bookmark job (service) => ', error);
    }
}
