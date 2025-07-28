'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900">
              Bienvenue sur <span className="text-blue-600">edTech</span>
            </h1>
            <p className="text-xl text-gray-700">
              Une plateforme éducative intelligente qui réunit élèves, parents, enseignants et administrateurs pour une expérience d'apprentissage optimale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/login" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connexion
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                En savoir plus
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/education-hero.svg"
              alt="Education illustration"
              width={600}
              height={400}
              priority
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Pour chaque acteur de l'éducation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Élèves */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Image
                  src="/student-icon.svg"
                  alt="Élève"
                  width={24}
                  height={24}
                  className="text-white"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Élèves</h3>
              <p className="text-gray-700">
                Parcours personnalisé, suivi IA et support 24/7
              </p>
            </div>

            {/* Parents */}
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Image
                  src="/parent-icon.svg"
                  alt="Parent"
                  width={24}
                  height={24}
                  className="text-white"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Parents</h3>
              <p className="text-gray-700">
                Suivi en temps réel et communication directe
              </p>
            </div>

            {/* Enseignants */}
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Image
                  src="/teacher-icon.svg"
                  alt="Enseignant"
                  width={24}
                  height={24}
                  className="text-white"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enseignants</h3>
              <p className="text-gray-700">
                Outils IA et analytics avancés
              </p>
            </div>

            {/* Administrateurs */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Image
                  src="/admin-icon.svg"
                  alt="Administrateur"
                  width={24}
                  height={24}
                  className="text-white"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Administrateurs</h3>
              <p className="text-gray-700">
                Pilotage complet et sécurité renforcée
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-blue-100">Élèves</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-blue-100">Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-blue-100">Enseignants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-blue-100">Support IA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">edTech</h4>
              <p className="text-sm text-gray-400">
                La plateforme éducative nouvelle génération propulsée par l'IA.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">À propos</Link></li>
                <li><Link href="/features" className="hover:text-white">Fonctionnalités</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Tarifs</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Confidentialité</Link></li>
                <li><Link href="/terms" className="hover:text-white">Conditions</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Nous Suivre</h4>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <a href="#" className="hover:text-white">
                  <Image
                    src="/linkedin.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                  />
                </a>
                <a href="#" className="hover:text-white">
                  <Image
                    src="/twitter.svg"
                    alt="Twitter"
                    width={24}
                    height={24}
                  />
                </a>
                <a href="#" className="hover:text-white">
                  <Image
                    src="/facebook.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} edTech. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
