from django.db import models

# Create your models here.
class Utilisateur(models.Model):
    ROLE_CHOICES = [
        ('client' , 'Client'),
        ('receptionniste' , 'Receptionniste'),
        ('administrateur' , 'Administrateur'),
    ]

    nom_utilisateur = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    mot_de_passe = models.CharField(max_length=128)

    prenom = models.CharField(max_length=50 , blank=True , null=True)
    nom = models.CharField(max_length=50,blank=True,null=True)
    telephone = models.CharField(max_length=20 , blank=True, null=True)

    langue_preference = models.CharField(max_length=10, default='fr')

    date_creation = models.DateTimeField(auto_now_add=True)
    dernier_login = models.DateTimeField(blank=True , null=True)

    est_actif = models.BooleanField(default=True)
    role = models.CharField(max_length=30 ,choices=ROLE_CHOICES)

    avatar_url = models.URLField(max_length=500 , blank=True,null=True)

    def __str__(self):
        return self.nom_utilisateur
    

class Chambre(models.Model):
    TYPE_CHOICES = [
        ('chambre_simple', 'Chambre Simple'),
        ('chambre_double', 'Chambre Double'),
        ('chambre_familiale', 'Chambre Familiale'),
        ('suite_junior', 'Suite Junior'),
        ('suite_executive', 'Suite Executive'),
        ('suite_presidentielle', 'Suite Presidentielle'),
        ('villa_privee', 'Villa Privee'),
    ]

    CATEGORY_CHOICES = [
        ('standard', 'Standard'),
        ('deluxe', 'Deluxe'),
        ('premium', 'Premium'),
        ('signature', 'Signature'),
        ('royal', 'Royal'),
    ]

    STATUT_CHOICES = [
        ('disponible', 'Disponible'),
        ('occupee', 'Occupee'),
        ('maintenance', 'Maintenance'),
        ('nettoyage', 'Nettoyage'),
        ('indisponible', 'Indisponible'),
    ]

    numero_chambre = models.CharField(max_length=10,unique=True)
    type_chambre = models.CharField(max_length=50 , choices=TYPE_CHOICES)
    categorie_luxury = models.CharField(max_length=30,choices=CATEGORY_CHOICES,blank=True,null=True)

    prix_base_nuit = models.DecimalField(max_digits=10, decimal_places=2)
    devise = models.CharField(max_length=3,default='EUR')

    capacite_adultes = models.IntegerField()
    capacite_enfants = models.IntegerField(default=0)
    capacite_bebes = models.IntegerField(default=0)

    etage = models.IntegerField(blank=True,null=True)
    vue = models.CharField(max_length=50,blank=True,null=True)
    superficie_m2 = models.IntegerField(blank=True, null=True)

    description = models.TextField(blank=True,null=True)

    # JSONB في PostgreSQL
    equipements = models.JSONField(blank=True, null=True)
    services_inclus = models.JSONField(blank=True, null=True)
    amenagements_speciaux = models.JSONField(blank=True, null=True)

    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='disponible')

    image_urls = models.JSONField(blank=True, null=True)
    caracteristiques_luxury = models.JSONField(blank=True,null=True)

    date_creation = models.DateTimeField(auto_now_add=True)
    date_mise_a_jour = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Chambre {self.numero_chambre}"
