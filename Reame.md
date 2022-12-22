//https://sequelize.org/docs/v6/

//inisialisasi project

- npm init -y

//install express

- npm i express

//membuat file awal yang akan dijalankan

- touch server.js

//base route
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
res.send('Hello World!');
});

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

//install dependencies

- npm install express sequelize pg pg-hstore body-parser cors jsonwebtoken bcryptjs --save

//instal sequelize

- npm install --save-dev sequelize-cli

// buat otomatis skeleton models, config, seeder dll

- npx sequelize-cli init

//set db at config/config.json
"development": {
"username": "postgres",
"password": "1234",
"database": "baseProjectDb",
"host": "127.0.0.1",
"port": 5433,
"dialect": "postgres"
}

//lihat model/index.js. sudah di konekin antara db dan routes

//generate sample table, setiap bikin file index. si terminal masuk ke folder appnya, bakal di generate sama si sequelizenya

- npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

//folder model/user.js - ini yang barusan di buat - buat relasinya perkelas di associates

//migrate filenya
-npx sequelize-cli db:migrate

//creating seeder, liat nanti jadi di folder seeder

- npx sequelize-cli seed:generate --name demo-user

//jalanin seeder

- npx sequelize-cli db:seed:all

//di dbnya ada file sequelize meta. itu migration. buat migrasi manual. bisa buat rollback.

//buat insert otomatis
npx sequelize-cli migration:create --name seeder-demo-user

//habis itu coba migrate

//kalau di seeder dia bisa berulang kali
//kalau di migrations dia sekali aja

//https://github.com/isoteriksoftware/express-response-helper

- npm install express-response-helper --save

buka server.js

- add require
- add app use nya, registerin
- const responseHelper = require('express-response-helper').helper();
- app.use(responseHelper);

//check localhost/user

//buat middleware buat ngehandle responnya

//buat struktur si controllernya, routenya sama mvcnya

// https://www.bezkoder.com/node-js-jwt-authentication-postgresql/#Create_Middleware_functions

- yang config auth //token yang dikirim frontend sama ga
  // buat folder middleware/verify bla bla

//buat migration role
//npx sequelize-cli migration:create --name Role

//migrate
//npx sequelize-cli db:migrate

//buat modela
//copas aja dari user. terus ubah jadi Role lah ya
//terus tambahin relasi
//role.js di associate
this.belongsToMany(models.user, {
through: "user_roles",
foreignKey: "roleId",
otherKey: "userId"
});
//user.js di associate
this.belongsToMany(models.role, {
through: "user_roles",
foreignKey: "userId",
otherKey: "roleId"
});

//add variabel roles di models/index.js
db.ROLES = ["user", "admin", "moderator"];

//new folder controllers
//new folder routes
//bikin config file
