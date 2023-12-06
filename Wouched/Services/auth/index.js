
export const register_me = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/users', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erreur de réseau ou du serveur');
      }
  
      const data = await response.json();
      return { success: true, token: data.token, user: data.user }; 
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return { success: false, message: error.message };
    }
  };
  
  export const login_me = async (formData, router) => {

    try {
        const res = await fetch(`http://localhost:8000/api/login_check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = await res.json();
        
   
      console.log(data);
      localStorage.setItem('token', data.token);
      router.push('/');

    
   
    } catch (error) {
        console.log('error in login (service) => ', error);
    }
}



export const forget_password = async (formData) => {
    try {
        const res = await fetch(`http://localhost:8000/api/forgetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in forget Password (service) => ', error);
    }
}

