# pantry-tracker
A full-stack CRUD web application that serves as a pantry/fridge management tool to help users keep track of what items they currently have at home as well as their expiration dates. Additionally, the application uses the Spoonacular API to recommend recipes for the user based on the current state of their pantry/fridge.

Try it out [here](https://kianezaz.github.io/pantry-tracker/)

## Technologies used
- Node.js
- React.js
- Express
- MongoDB

## To run locally on your machine

### Clone the repo
```
git clone https://github.com/kianezaz/pantry-tracker.git
cd pantry-tracker
```

### Env variables setup
Create a .env file in the server backend directory
```
MONGODB_URI = your mongodb uri
PORT = your backend port (default is 5000)
JWT_SECRET = your jwt secret
SPOONACULAR_API_KEY = your spoonacular API key
```

### Install dependencies (frontend & backend)
```
npm install
cd server
npm install
cd ..
```

### Running the application
```
npm start
```