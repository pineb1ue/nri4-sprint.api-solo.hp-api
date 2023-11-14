# 🧙‍♂️ Harry Potter API

## 🏖️ Overview

| method  | path | description |
| :------------- | :------------- | :-------------                          |
| GET     | `/characters`       | return harry potter characters         | 
| GET     | `/characters/{id}`  | return harry potter character by id    |
| GET     | `/search/characters`| return harry potter characters by name |
| POST    | `/characters`       | register harry potter character        |
| PATCH   | `/characters/{id}`  | update harry potter character          |
| DELETE  | `/characters/{id}`  | delete harry potter character          |

<br/>

## 🔨 Getting started

1. Install dependencies with `npm install`.
2. Copy `.env.example` and paste it as `.env.local`.
3. Replace environment values in the fresh new `.env.local` file.
4. Create database with `echo "CREATE DATABASE cc_store;" | psql`
5. Run the server with `npm start`
6. Request (See 🏖️ Overview)

<br/>

## 🧪 Test

```
npm run test-it
```

<br/>
