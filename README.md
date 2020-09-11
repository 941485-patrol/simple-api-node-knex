## Instructions

- Download MongoDb
- Make db/data/ to your root folder
```sh
mkdir db
cd db
mkdir data
```
- Create database
```sh
mongo
> use your_database_name
> exit
```
- Install dependencies
```sh
npm install
```
- Rename .env-example file to .env and configure
```sh
PORT=3000
DB_NAME=your_database_name
```
- Run server
```sh
npm run dev
```