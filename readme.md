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