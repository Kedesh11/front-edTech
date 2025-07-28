'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success && result.user) {
      // Rediriger vers le dashboard approprié
      router.push(`/${result.user.role}/dashboard`);
    } else {
      setError(result.error || 'Une erreur est survenue');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h2 className="text-4xl font-bold text-blue-600">edTech</h2>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Connexion à votre espace
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Votre rôle sera automatiquement détecté à partir de votre email
          </p>
        </div>

        {/* Comptes de test */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-blue-800">
              Comptes de test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-blue-600 space-y-1">
              <p>Élève : eleve@gmail.com / eleve1234</p>
              <p>Parent : parent@gmail.com / parent1234</p>
              <p>Enseignant : enseignant@gmail.com / enseignant1234</p>
              <p>Admin : admin@gmail.com / admin1234</p>
              <p>Technicien : technicien@gmail.com / technicien1234</p>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire de connexion */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Adresse email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
              />
              
              <Input
                label="Mot de passe"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Votre mot de passe"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Se souvenir de moi
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center p-3 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Besoin d&apos;aide ?{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-500">
              Contactez le support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
