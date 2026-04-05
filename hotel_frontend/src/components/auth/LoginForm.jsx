import React from 'react'
import { useState } from 'react';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        nom_utilisateur: '',
        mot_de_passe: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const validateForm = () => {
        const newErrors = {};

        if (!credentials.nom_utilisateur.trim()) {
            newErrors.nom_utilisateur = "Nom d'utilisateur ou email est requis";
        }
        if (!credentials.mot_de_passe) {
            newErrors.mot_de_passe = "Mot de passe est requis";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    identifiant: credentials.nom_utilisateur,
                    mot_de_passe: credentials.mot_de_passe,
                    remember_me: rememberMe
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_role', data.role);

                switch (data.role) {
                    case 'administrateur':
                        window.location.href = '/admin/dachboard';
                        break;
                    case 'receptionniste':
                        window.location.href = '/reception/dachboard';
                        break;
                    default:
                        window.location.href = '/dashboard';
                }
            } else {
                setErrors({ general: data.message || 'identifiants incorrects' });
            }
        } catch (error) {
            setErrors({ general: 'Erreur de connexion au serveur' });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Connexion</h2>
            {errors.general && (
                <div>
                    {errors.general}
                </div>
            )}
            <div>
                <label htmlFor="nom_utilisateur">Nom d'utilisateur ou Email:</label>
                <input
                    type="text" id="nom_utilisateur" name="nom_utilisateur" value={credentials.nom_utilisateur}
                    placeholder="Votre nom d'utilisateur ou email" onChange={handleChange}
                />
                {errors.nom_utilisateur && (
                    <span>{errors.nom_utilisateur}</span>
                )}
            </div>
            <div>
                <label htmlFor="mot_de_passe">Mot de passe:</label>
                <input
                    type="password" id="mot_de_passe" name="mot_de_passe" placeholder='••••••••' value={credentials.mot_de_passe}
                    onChange={handleChange}
                />
                {errors.mot_de_passe && (
                    <span>{errors.mot_de_passe}</span>
                )}
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    Se souvenir de moi
                </label>
                <a href="/forgot-password">
                    Mot de passe oublie?
                </a>
            </div>
            <button type='submit' disabled={isLoading}>
                {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
            <p>
                pas encore de compte? <a href="/register">S'inscrire</a>
            </p>
        </form>
    );
};

export default LoginForm;