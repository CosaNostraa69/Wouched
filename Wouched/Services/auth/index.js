
export const register_me = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/users', { // Remplacez par l'URL de votre API
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
      return { success: true, token: data.token, user: data.user }; // Supposant que le token est retourné dans la réponse
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return { success: false, message: error.message };
    }
  };
  
export const login_me = async (formData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in login (service) => ', error);
    }
}



export const forget_password = async (formData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgetPassword`, {
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

