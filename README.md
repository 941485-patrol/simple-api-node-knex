#### NodeJS API using ExpressJS, Joi, KnexJS and PostgreSQL.
### Demo
https://some-nodejs-api.herokuapp.com
username: username
password: Password1234
*Note: Use [Talend](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm?hl=en) or [Postman](https://www.postman.com/) to open the website.

### Instructions
- Clone repo
```sh
git clone https://github.com/941485-patrol/simple-api-node-knex.git
```
- Install npm dependencies
```sh
npm install
```
- Edit env-example to your desired settings
- Migrate
```sh
npm run knex migrate:latest
```
- Seed database
```sh
npm run knex seed:run
```
- Run development server
```sh
npm run dev
```
- Or run tests
```sh
npm run test
```
*Note: Be sure to run postgresql server and create a database before cloning.
*Test notes: Be sure to run seeder again after testing.

### Endpoints
|Method|URL|Form|Description|
|------|---|----|-----------|
|POST|/api/user/register|[username][password][repeat_password]|Register a user.
|POST|/api/user/login|[username][password]|Log in a user.
|GET|/api/user/logout|None|Log out a user.
|GET|/api/animal|None|Get all animals.
|POST|/api/animal|[name][description][status_id][type_id]|Create an animal.
|GET|/api/animal/:id|None|Get an animal by id.
|PUT|/api/animal/:id|[name][description][status_id][type_id]|Update an animal.
|DELETE|/api/animal/:id|None|Delete an animal.
|GET|/api/status|None|Get all status.
|POST|/api/status|[name][description]|Create a status.
|GET|/api/status/:id|None|Get a status by id.
|PUT|/api/status/:id|[name][description]|Update a status.
|DELETE|/api/status/:id|None|Delete a status.
|GET|/api/type|None|Get all types.
|POST|/api/type|[name][environment]|Create a type.
|GET|/api/type/:id|None|Get a type by id.
|PUT|/api/type/:id|[name][environment]|Update a type.
|DELETE|/api/type/:id|None|Delete a type.

### Query strings
|Parameter|Description|
|---------|-----------|
|sort|Sort by [id], [name], [description] or [environment (type only)]. Add "-" for descending order.|
|s|Search by [name].|
|page|Page number.|