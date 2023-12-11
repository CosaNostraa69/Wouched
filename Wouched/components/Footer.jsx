import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div>
          <h2 className="text-lg font-semibold">Votre Site</h2>
          <p className="text-sm mt-2">© 2023 Votre Société. Tous droits réservés.</p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <div className="mx-2">
            <h3 className="text-lg font-semibold">Liens</h3>
            <ul className="text-sm mt-2">
              <li><a href="#" className="hover:text-gray-300">Accueil</a></li>
              <li><a href="#" className="hover:text-gray-300">À Propos</a></li>
              <li><a href="#" className="hover:text-gray-300">Services</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
          <div className="mx-2">
            <h3 className="text-lg font-semibold">Ressources</h3>
            <ul className="text-sm mt-2">
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
              <li><a href="#" className="hover:text-gray-300">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <h3 className="text-lg font-semibold">Suivez-nous</h3>
          <div className="flex mt-2">
            {/* Ici, ajoutez vos liens vers les réseaux sociaux avec des icônes */}
            <a href="#" className="mr-2 hover:text-gray-300">FB</a>
            <a href="#" className="mr-2 hover:text-gray-300">TW</a>
            <a href="#" className="hover:text-gray-300">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
