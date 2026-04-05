import React from 'react';
import { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        nom_utilisateur: '',
        email: '',
        mot_de_passe: '',
        prenom: '',
        nom: '',
        telephone: '',
        adresse_facturation: '',
        adresse_livraison: '',
        date_naissance: '',
        nationalite: '',
        document_identite: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    const validateForm = () => {
        const newErrors = {};

        if (!formData.nom_utilisateur.trim()) {
            newErrors.nom_utilisateur = "Nom d'utilisateur est requis";
        }

        if (!formData.email, trim()) {
            newErrors.email = "Email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email invalide";
        }

        if (!formData.mot_de_passe) {
            newErrors.mot_de_passe = "Mot de passe est requis";
        } else if (formData.mot_de_passe.length < 8) {
            newErrors.mot_de_passe = "Mot de passe doit contenir au moins 8 carracteres";
        }

        if (!formData.nom.trim()) {
            newErrors.nom = "Nom est requis";
        }

        if (!formData.adresse_facturation.trim()) {
            newErrors.adresse_facturation = "Asresse de facturation est requise";
        }

        if (!formData.date_naissance.trim()) {
            newErrors.date_naissance = "Date de naissance est requise";
        }

        if (!formData.nationalite) {
            newErrors.nationalite = "Nationalité est requise";
        }

        if (!formData.document_identite.trim()) {
            newErrors.document_identite = "Pièce d'identité est requise";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleChange) return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    utilisateur: {
                        nom_utilisateur: formData.nom_utilisateur,
                        email: formData.email,
                        mot_de_passe: formData.mot_de_passe,
                        prenom: formData.prenom,
                        nom: formData.nom,
                        telephone: formData.telephone,
                        role: 'client'
                    },
                    client: {
                        adresse_facturation: formData.adresse_facturation,
                        adresse_livraison: formData.adresse_livraison,
                        date_naissance: formData.date_naissance,
                        nationalite: formData.nationalite,
                        document_identite: formData.document_identite
                    }
                })
            });

            const data = await response.json();

            if (Response.ok) {
                alert('Conpte cree avec succes!');
                window.location.href = '/login';
            } else {
                setErrors({ general: data.message || 'Erreur lors de l\'inscription' });
            }
        } catch (error) {
            setErrors({ general: 'Erreur de connexion au serveur' });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Creer un compte</h2>
            {errors.general && (
                <div>
                    {errors.general}
                </div>
            )}
            <div>
                <h3>Informations de base</h3>
                <div>
                    <label htmlFor="nom_utilisateur">Nom d'utilisateur:</label>
                    <input
                        type="text"
                        id="nom_utilisateur"
                        name="nom_utilisateur"
                        value={formData.nom_utilisateur}
                        onChange={handleChange}
                    />
                    {errors.nom_utilisateur && (
                        <span>{errors.nom_utilisateur}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <span>{errors.email}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="mot_de_passe">Mot de passe :</label>
                    <input
                        type="password" id="mot_de_passe" name="mot_de_passe" value={formData.mot_de_passe}
                        onChange={handleChange}
                    />
                    {errors.mot_de_passe && (
                        <span>{errors.mot_de_passe}</span>
                    )}
                    <small>Minimun 8 caracteres</small>
                </div>
                <div>
                    <div>
                        <label htmlFor="prenom">Prenom :</label>
                        <input
                            type="text" id="prenom" name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                        {errors.prenom && (
                            <span>{errors.prenom}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="nom">Nom :</label>
                        <input
                            type="text" id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                        />
                        {errors.nom && (
                            <span>{errors.nom}</span>
                        )}
                    </div>
                </div>
                <div>
                    <label htmlFor="telephone">Telephone</label>
                    <input
                        type="tel"
                        id="telephone" name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <h3>Informations client</h3>

                <div>
                    <label htmlFor="adresse_facturation">Adresse de facturation :</label>
                    <textarea name="adresse_facturation" id="adresse_facturation"
                        value={formData.adresse_facturation}
                        onChange={handleChange}
                    />
                    {errors.adresse_facturation && (
                        <span>{errors.adresse_facturation}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="adresse_livraison">Adresse de livraison</label>
                    <textarea name="adresse_livraison" id="adresse_livraison"
                        value={formData.adresse_livraison}
                        onChange={handleChange}
                        rows="3"
                    />
                    <small>Laissez vie si identique a l'adresse de facturation</small>
                </div>
                <div>
                    <div>
                        <label htmlFor="data_naissance">Date de naissance</label>
                        <input type="date" id="date_naissance" name="date_naissance"
                            value={formData.date_naissance}
                            onChange={handleChange}
                        />
                        {errors.date_naissance && (
                            <span>{errors.date_naissance}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="">Nationalite</label>
                        <select name="nationalite" id="nationalite"
                            value={formData.nationalite}
                            onChange={handleChange}
                        >
                            <option value="">Sélectionnez votre nationalité</option>
                            <option value="Française">Française</option>
                            <option value="Algérienne">Algérienne</option>
                            <option value="Marocaine">Marocaine</option>
                            <option value="Tunisienne">Tunisienne</option>
                            <option value="Taiwan ">Taiwan</option>
                            <option value="Japan">Japan</option>
                            <option value="China">China</option>
                            <option value="Autre">Autre</option>
                        </select>
                        {errors.nationalite && (
                            <span>{errors.nationalite}</span>
                        )}
                    </div>
                </div>
                <div>
                    <label htmlFor="document_identite">Piece d'identite</label>
                    <input type="text" id="document_identite" name="document_identite"
                        value={formData.document_identite}
                        onChange={handleChange}
                        placeholder="Numéro de passeport ou carte d'identité"
                    />
                    {errors.document_identite && (
                        <span>{errors.document_identite}</span>
                    )}
                </div>
            </div>
            <div>
                <label>
                    <input type="checbox" required />
                    J'accepte les <a href="">Conditions generales</a> et la <a href="">Politique de confidentialite</a>
                </label>
            </div>
            <button type='submit' disabled={isLoading}>
                {isLoading ? 'Creation en cours...' : 'Creer mon compte'}
                Creer mon compte
            </button>
            <p>
                Vous avez deja un compte? <a href="/login">Se connecter</a>
            </p>
        </form>
    );
};

export default RegisterForm;