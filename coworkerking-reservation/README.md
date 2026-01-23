# Plateforme de Réservation de Coworking

Une plateforme web moderne et sécurisée pour la réservation d'espaces de coworking, développée avec Next.js, TypeScript, Prisma et Clerk.

Cahier des charge dans coworking/cahier-des-charges.md

## Installation

### 1. Cloner le Repository

```bash
git clone https://github.com/Soukina-NOUNOU/coworking-reservation-app.git
cd coworking-reservation-app/coworkerking-reservation
```

### 2. Installer les Dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration des Variables d'Environnement

#### Renommer le fichier .env.example

```bash
.env.example => .env
```

#### Remplir les Variables d'Environnement

Ouvrez le fichier `.env` et renseignez les valeurs suivantes :

```env
# === DATABASE ===
# URL de connexion PostgreSQL
# Format: postgresql://username:password@localhost:5432/database_name
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/coworking_db"

# === CLERK AUTHENTICATION ===
# Clés publiques (côté client)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"

# Clés secrètes (côté serveur)
CLERK_SECRET_KEY="sk_test_your_secret_key_here"
CLERK_WEBHOOK_SECRET="your_secret-webhook"

# === RESEND EMAIL ===
# Clé API Resend pour l'envoi d'emails
RESEND_API_KEY="re_your_resend_api_key_here"
```

### 4. Configuration de la Base de Données

#### Créer la base de données PostgreSQL

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE coworking_db;

# Quitter PostgreSQL
\q
```

#### Générer et appliquer les migrations Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push

# (Optionnel) Ajouter des données de test
npx prisma db seed
```

### 5. Lancement de l'Application

#### Mode Développement

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur : [http://localhost:3000](http://localhost:3000)

#### Mode Production

```bash
# Build de l'application
npm run build

# Lancement en production
npm start
```

## Fonctionnalités

- **Authentification sans mot de passe** avec Magic Link (Clerk)
- **Gestion des espaces** : consultation, réservation, galerie photos
- **Système de réservation** avec gestion des conflits et calcul automatique des prix
- **Notifications email** automatiques (confirmation, modification, annulation)
- **Gestion des rôles** : Utilisateurs et Administrateurs
- **Dashboard administrateur** avec statistiques en temps réel
- **Design responsive** et accessible

## Technologies Utilisées

- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : Clerk (Magic Link)
- **Styling** : Tailwind CSS
- **Emails** : Resend

## Configuration des Services Externes

### Configuration Clerk

1. **Créer un compte** sur [Clerk.dev](https://clerk.dev)
2. **Créer une nouvelle application**
3. **Configurer l'authentification** :
   - Activer **Email** comme méthode de connexion
   - Activer **Magic Link** 
   - Désactiver les mots de passe
4. **Récupérer les clés** dans le dashboard Clerk :
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
5. **Configurer les webhooks** :
   - URL : `https://your-domain.com/api/clerk/webhook`
   - Événements : `user.created`, `user.updated`, `user.deleted`

### Configuration Resend

1. **Créer un compte** sur [Resend.com](https://resend.com)
2. **Vérifier un domaine** (ou utiliser le domaine de test)
3. **Générer une clé API** dans le dashboard
4. **Ajouter la clé** dans votre `.env` :
   ```env
   RESEND_API_KEY="re_your_api_key_here"
   ```

## 👥 Gestion des Rôles

### Créer un Administrateur

Par défaut, tous les nouveaux utilisateurs ont le rôle `USER`. Pour créer un administrateur :

#### Option 1 : Via Prisma Studio
```bash
npx prisma studio
```
1. Ouvrir l'interface Prisma Studio
2. Aller dans la table `User`
3. Modifier le champ `role` de `USER` à `ADMIN`

#### Option 2 : Via SQL
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-admin-email@example.com';
```

## Structure du Projet

```
coworkerking-reservation/
├── prisma/                 # Configuration Prisma
│   ├── schema.prisma      # Schéma de base de données
│   └── seed.ts            # Données de test
├── public/                # Fichiers statiques
│   └── images/           # Images des espaces
├── src/
│   ├── app/              # App Router (Next.js 14+)
│   │   ├── admin/        # Interface administrateur
│   │   ├── api/          # API Routes
│   │   ├── reservations/ # Gestion des réservations
│   │   └── spaces/       # Gestion des espaces
│   ├── components/       # Composants React réutilisables
│   ├── controller/       # Logique métier (business logic)
│   ├── lib/             # Utilitaires et configuration
│   ├── model/           # Modèles de données (Prisma)
│   ├── serverAction/    # Server Actions (Next.js)
│   ├── types/           # Types TypeScript
│   └── middleware.ts    # Middleware d'authentification
├── .env.example         # Template des variables d'environnement
├── .env                 # Variables d'environnement (à créer)
└── package.json         # Dépendances et scripts
```

## Scripts Disponibles

```bash
# Développement
npm run dev                 # Lance le serveur de développement

# Build et Production
npm run build              # Build de production
npm start                  # Lance en mode production
npm run lint               # Vérification du code

# Base de données
npx prisma studio          # Interface graphique Prisma
npx prisma generate        # Génère le client Prisma
npx prisma db push         # Applique les changements de schéma
npx prisma db seed         # Ajoute les données de test
npx prisma migrate reset   # Reset complet de la base
```