import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ici, vous devrez remplacer avec l'URL de votre API de traitement des contacts
    try {
      const response = await axios.post('/api/contact', formData);
      console.log(response.data);
      setLoading(false);
      // Afficher un message de succès ou rediriger l'utilisateur
      router.push('/thank-you');
    } catch (error) {
      console.error('Il y a eu un problème avec votre soumission:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-full h-screen pt-20 flex items-center justify-center flex-col'>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Nom
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                placeholder="Jean Dupont"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
                placeholder="jeandupont@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="message"
                placeholder="Votre message ici..."
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
