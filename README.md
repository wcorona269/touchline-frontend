# Touchline Soccer

## Introduction
Touchline Soccer is a comprehensive soccer platform that provides a Twitter-style posts timeline, along with features such as commenting, reposts, and likes. Additionally, the platform includes profile pages for leagues, clubs, and players. Users can also create a 'Favorite' list, adding their preferred clubs, players, or leagues to receive personalized news based on their favorites.

## Technologies Used
The project utilizes a Python3 Flask backend, a React frontend, and retrieves data from the [API-SPORTS FOOTBALL-API](https://api-sports.io/).

## Features

### Posts
- Twitter-style posts timeline
- Users can create, destroy, like, repost, and comment on posts.


### League
- Detailed profile pages for soccer leagues
- Statistics, match information, and league-specific data

### Club
- Profile pages for soccer clubs
- Club-specific information, achievements, and player roster

### Player
- Individual player profile pages
- Player statistics, performance history, and achievements

### Favorite Model
- Users can add their favorite clubs, players, or leagues to their profiles
- Personalized news feed based on the user's favorites

## Getting Started

### Prerequisites
- Python3 installed
- Node.js and npm installed
- API key from [API-SPORTS FOOTBALL-API](https://api-sports.io/)

### Installation
1. Clone the repository: `git clone https://github.com/your-username/touchline-soccer.git`
2. Navigate to the project directory: `cd touchline-soccer`
3. Install backend dependencies: `pip install -r requirements.txt`
4. Install frontend dependencies: `cd frontend && npm install`
5. Set up your API key in the appropriate configuration file
6. Run the application:
   - Backend: `cd flask-server && flask run`
   - Frontend: `cd client && npm start`
