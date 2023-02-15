# ChatGPT AI App in Javascript

Following this [tutorial](https://www.youtube.com/watch?v=2FeymQoKvrk) to learn how to build and deploy ChatGPT AI app using:

- OpenAI API
- Client - Vanilla JS using [Vite](https://vitejs.dev/)
- Server - NodeJS 
- Prism for code highlighting

## Scaffolding

### Client side

```
mkdir client && cd $_
npm create vite@latest --template vanilla 
```

### Server side

```
mkdir server && cd $_
npm init -y
npm install express cors dotenv nodemon openai
```

### Api Key

- Add `.env` file inside `server` folder
- Grab OpenAi api key from [here](https://beta.openai.com/account/api-keys)
- Add below to `.env` file

```
OPENAI_API_KEY=your-api-key-goes-here
```

## Deploy

- Push to Github
- Deploy server folder to [Render](https://render.com/) free account
- Update the server host url in client script file and push to Github
- Deploy client side to [Vercel](https://vercel.com/) free account

Compare [Render vs Vercel](https://bejamas.io/compare/render-vs-vercel/)
