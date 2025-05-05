# 📚 CRUD 2.0 - Application de Gestion de Livres

BiblioAfrika une application full-stack moderne pour la gestion de livres avec authentification et opérations CRUD complètes.

## ✨ Fonctionnalités

### Frontend (React + TypeScript + Vite)
- Interface utilisateur responsive avec Tailwind CSS
- Système d'authentification complet
- Gestion des livres (CRUD)
- Routing avec React Router
- Context API pour la gestion d'état
- Composants réutilisables

### Backend (Node.js + Express + MongoDB)
- API RESTful sécurisée
- Authentification JWT
- Modèles Mongoose pour les données
- Middlewares personnalisés
- Gestion centralisée des erreurs

## 🛠 Stack Technologique

**Frontend**:
- React 19
- TypeScript 5.7
- Vite 6
- Tailwind CSS 3
- React Router 7
- Context API

**Backend**:
- Node.js 18
- Express 4
- MongoDB (Mongoose 7)
- JWT pour l'authentification
- CORS pour la sécurité

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- MongoDB Atlas
- Git

### Configuration

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/kheuchahightech/CRUD.git
   cd CRUD


2. **Scripts utiles**

    npm run dev	Lance le frontend en mode développement
    npm run build	Build le frontend pour production
    npm start	Lance le backend en production

3. **Structure du Projet**
backend/
├── config/       # Configuration DB
├── controllers/  # Logique métier
├── middlewares/  # Middlewares personnalisés
├── models/       # Modèles Mongoose
├── routes/       # Routes API
├── utils/        # Utilitaires
├── .env          # Variables d'environnement
└── server.js     # Point d'entrée

frontend/
├── public/       # Assets publics
├── src/
│   ├── components/ # Composants React
│   ├── context/    # Contexts globaux
│   ├── pages/      # Pages de l'application
│   ├── types/      # Types TypeScript
│   ├── utils/      # Utilitaires frontend
│   ├── App.tsx     # Composant principal
│   └── main.tsx    # Point d'entrée
├── tailwind.config.js # Config Tailwind
└── vite.config.ts  # Config Vite

## 🎥 Démonstration vidéo

Une vidéo de démonstration est disponible dans le dossier Video