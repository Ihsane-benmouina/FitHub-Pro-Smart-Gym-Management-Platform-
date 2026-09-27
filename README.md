# 🏋️ FitHub Pro

> Application web Full Stack de gestion d'une salle de sport destinée
> aux **administrateurs**, **coachs**, **réceptionnistes** et
> **adhérents**.

**Stack principale :** React • Vite • Laravel • Sanctum • MySQL • Docker

------------------------------------------------------------------------

## 📌 Présentation du projet

**FitHub Pro** est une application web permettant de centraliser la
gestion quotidienne d'une salle de sport.

Le frontend est développé avec **React + Vite** et communique avec une
**API REST Laravel** grâce à **Axios**. Laravel gère la logique métier,
l'authentification avec **Sanctum**, les autorisations selon les rôles
et l'accès aux données avec **Eloquent ORM**. Les données sont stockées
dans **MySQL** et l'environnement de développement est conteneurisé avec
**Docker**.

L'application distingue quatre rôles :

-   **Administrateur**
-   **Coach**
-   **Réceptionniste**
-   **Adhérent**

------------------------------------------------------------------------

## 🎯 Objectifs du projet

FitHub Pro permet notamment de :

-   centraliser la gestion d'une salle de sport ;
-   gérer les utilisateurs et leurs rôles ;
-   gérer les abonnements et les paiements ;
-   organiser les activités et les réservations ;
-   permettre aux coachs de gérer les programmes d'entraînement ;
-   suivre la progression des adhérents ;
-   gérer les présences et le QR Code ;
-   gérer les équipements et leurs maintenances ;
-   sécuriser les accès selon le rôle de l'utilisateur.

------------------------------------------------------------------------

## 🖼️ Aperçu de l'application

### Page de connexion

```{=html}
![alt text](image-2.png)
```
### Dashboard Administrateur

```{=html}
![alt text](image-3.png)
```
### Gestion des utilisateurs

```{=html}
![alt text](image-4.png)
```
### Dashboard Coach

```{=html}
![alt text](image-7.png)
```
### Programmes d'entraînement

```{=html}
![alt text](image-8.png)
```
### Dashboard Réceptionniste

```{=html}
![alt text](image-5.png)
```
### Gestion des présences

```{=html}
![alt text](image-6.png)
```
### Dashboard Adhérent

```{=html}
![alt text](image.png)
```
### QR Code Adhérent

```{=html}
![alt text](image-1.png)
```

------------------------------------------------------------------------

## ✨ Fonctionnalités

### 🔐 Authentification

-   inscription d'un adhérent ;
-   connexion et déconnexion ;
-   récupération et réinitialisation du mot de passe ;
-   gestion du profil ;
-   authentification API avec Laravel Sanctum ;
-   protection des pages avec `ProtectedRoute` ;
-   contrôle des autorisations backend avec `RoleMiddleware`.

### 👨‍💼 Administrateur

-   dashboard administratif ;
-   gestion des utilisateurs ;
-   création de comptes Coach et Réceptionniste ;
-   gestion des rôles et des statuts ;
-   gestion des plans d'abonnement ;
-   gestion des activités ;
-   association des coachs aux activités ;
-   gestion des équipements ;
-   gestion des maintenances.

### 🏃 Coach

-   dashboard coach ;
-   gestion des disponibilités ;
-   consultation des réservations ;
-   acceptation et refus des réservations ;
-   gestion des exercices ;
-   création des programmes d'entraînement ;
-   affectation d'un programme à un adhérent ;
-   ajout d'exercices à un programme ;
-   configuration des séries, répétitions, poids et temps de repos ;
-   suivi de la progression.

### 🧾 Réceptionniste

-   dashboard réception ;
-   gestion des paiements ;
-   enregistrement des présences ;
-   check-in / check-out ;
-   gestion du flux de présence par QR Code.

### 👤 Adhérent

-   dashboard personnel ;
-   gestion de l'abonnement ;
-   consultation des paiements ;
-   réservations ;
-   consultation des programmes ;
-   consultation de la progression ;
-   historique des présences ;
-   QR Code personnel ;
-   gestion du profil.

------------------------------------------------------------------------

## 🏗️ Architecture de l'application

``` text
Utilisateur
    │
    ▼
React + Vite
Frontend
    │
    ▼
Axios
Requêtes HTTP
    │
    ▼
Laravel REST API
Routes + Controllers
    │
    ▼
Eloquent ORM
Models
    │
    ▼
MySQL
Base de données
```

### Flux général

``` text
Page React
   ↓
Axios
   ↓
Route API Laravel
   ↓
Controller
   ↓
Model / Eloquent
   ↓
MySQL
   ↓
Réponse JSON
   ↓
React met à jour l'interface
```

> React ne communique pas directement avec MySQL. Toutes les opérations
> passent par l'API Laravel.

------------------------------------------------------------------------

## 🧰 Outils et technologies

  Partie              Technologies
  ------------------- ------------------------------------------------
  Frontend            React, Vite, React Router, Axios, Tailwind CSS
  Backend             PHP, Laravel
  Architecture API    REST
  Authentification    Laravel Sanctum
  ORM                 Eloquent
  Base de données     MySQL
  Conteneurisation    Docker, Docker Compose
  Administration DB   phpMyAdmin
  Versioning          Git, GitHub
  Conception          UML, ERD, Figma
  Planification       Jira

------------------------------------------------------------------------

## 🗂️ Structure générale

``` text
FitHub-Pro/
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Middleware/
│   │   │   └── Requests/
│   │   └── Models/
│   ├── database/
│   │   └── migrations/
│   └── routes/
│       └── api.php
│
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       │   ├── auth/
│       │   ├── admin/
│       │   ├── coach/
│       │   ├── reception/
│       │   └── member/
│       └── App.jsx
│
├── docker/
├── docker-compose.yml
└── README.md
```

------------------------------------------------------------------------

## 🔐 Authentification et autorisation

FitHub Pro utilise **Laravel Sanctum** pour l'authentification de l'API.

### Flux de connexion

``` text
Login.jsx
   ↓
Axios
   ↓
POST /api/auth/login
   ↓
AuthController
   ↓
Vérification des identifiants
   ↓
Création du token Sanctum
   ↓
Réponse : utilisateur + token
   ↓
Frontend
   ↓
Redirection selon le rôle
```

Les quatre rôles métier sont :

``` text
admin
coach
receptionniste
adherent
```

La protection est appliquée à deux niveaux :

-   **Frontend :** `ProtectedRoute` contrôle l'accès aux interfaces.
-   **Backend :** `auth:sanctum` et `RoleMiddleware` contrôlent les
    routes API.

------------------------------------------------------------------------

## 🗃️ Base de données

Les principales entités métier concernent :

-   les utilisateurs ;
-   les abonnements ;
-   les plans d'abonnement ;
-   les paiements ;
-   les activités ;
-   les réservations ;
-   les disponibilités ;
-   les exercices ;
-   les programmes ;
-   la progression ;
-   les présences ;
-   les équipements ;
-   les maintenances.

### Relations Many-to-Many

#### Coach ↔ Activité

``` text
User (Coach)
     │
     ▼
activity_coach
     ▲
     │
Activity
```

#### Programme ↔ Exercice

``` text
Program
   │
   ▼
program_exercise
   ▲
   │
Exercise
```

La table pivot `program_exercise` permet également de stocker les
informations spécifiques d'un exercice dans un programme, par exemple
les séries, répétitions, poids et temps de repos.

------------------------------------------------------------------------

# 📐 Conception

## Diagramme de cas d'utilisation

```{=html}
c:\Users\user\Downloads\ChatGPT Image 26 sept. 2026, 14_03_11 (2).png
```
## Diagramme de classes

```{=html}
c:\Users\user\Downloads\ChatGPT Image 26 sept. 2026, 14_07_20.png
```
## ERD --- Entity Relationship Diagram

```{=html}
c:\Users\user\Downloads\ChatGPT Image 27 sept. 2026, 13_07_58.png
```
------------------------------------------------------------------------

## ⚙️ Installation du projet

### Prérequis

Avant de lancer FitHub Pro :

-   Git
-   Docker Desktop
-   Docker Compose

### 1. Cloner le repository

``` bash
git clone <URL_DU_REPOSITORY>
cd FitHub-Pro
```

### 2. Préparer l'environnement Laravel

Si `backend/.env` n'existe pas :

``` bash
cd backend
cp .env.example .env
cd ..
```

Configuration MySQL utilisée par Docker :

``` env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=fithub
DB_USERNAME=fithub
DB_PASSWORD=fithub
```

### 3. Construire et démarrer Docker

À la racine du projet :

``` bash
docker compose up -d --build
```

### 4. Générer la clé Laravel si nécessaire

``` bash
docker compose exec backend php artisan key:generate
```

### 5. Lancer les migrations

``` bash
docker compose exec backend php artisan migrate
```

Si le projet possède les seeders nécessaires :

``` bash
docker compose exec backend php artisan db:seed
```

### 6. Vérifier les conteneurs

``` bash
docker compose ps
```

------------------------------------------------------------------------

## 🌐 Accès aux services

  Service                   Adresse
  ------------------------- -------------------------
  Frontend React            `http://localhost:5173`
  Backend Laravel           `http://localhost:8000`
  phpMyAdmin                `http://localhost:8081`
  MySQL depuis la machine   `localhost:3307`

Dans le réseau Docker, Laravel communique avec MySQL via :

``` text
Host : mysql
Port : 3306
```

------------------------------------------------------------------------

## 🐳 Docker

``` text
FitHub Pro
│
├── frontend
│   └── React + Vite : 5173
│
├── backend
│   └── Laravel API : 8000
│
├── mysql
│   └── MySQL : 3307 → 3306
│
└── phpmyadmin
    └── phpMyAdmin : 8081 → 80
```

------------------------------------------------------------------------

## 🧪 Vérification du projet

### Backend

Afficher les routes :

``` bash
docker compose exec backend php artisan route:list
```

Lancer les tests :

``` bash
docker compose exec backend php artisan test
```

### Frontend

Vérifier le build :

``` bash
docker compose exec frontend npm run build
```

> Les fonctionnalités utilisant directement le matériel du navigateur,
> comme le scan par caméra, doivent également être testées manuellement.

------------------------------------------------------------------------

## 🌿 Git et GitHub

Le projet utilise **Git** et **GitHub** pour le versioning et le suivi
des modifications.

Commandes utiles :

``` bash
git status
git branch
git log --oneline
```

Les fonctionnalités et corrections peuvent être développées sur des
branches séparées avant leur intégration dans `main`.

**Repository GitHub :** `À AJOUTER`

------------------------------------------------------------------------

## 🔒 Sécurité

FitHub Pro applique notamment :

-   Laravel Sanctum ;
-   authentification par token ;
-   protection des routes frontend ;
-   protection des routes backend ;
-   contrôle d'accès selon le rôle ;
-   validation backend des données ;
-   gestion sécurisée des mots de passe par Laravel.

------------------------------------------------------------------------

## 🚀 Perspectives d'amélioration

Le projet peut évoluer avec :

-   notifications en temps réel ;
-   statistiques plus avancées ;
-   amélioration de l'expérience QR sur mobile ;
-   déploiement dans un environnement de production ;
-   couverture de tests automatisés plus complète.

> Ces éléments sont des perspectives d'évolution et ne sont pas
> présentés comme des fonctionnalités actuellement implémentées.

------------------------------------------------------------------------

## 👩‍💻 Auteur

**Ihsane Ben-Mouina**

Projet Full Stack --- **FitHub Pro**

------------------------------------------------------------------------

## 📄 Licence

Projet réalisé dans un cadre pédagogique.

------------------------------------------------------------------------

```{=html}
<p align="center">
```
`<strong>`{=html}FitHub Pro --- Simplifier la gestion, améliorer
l'expérience sportive.`</strong>`{=html}
```{=html}
</p>
```
