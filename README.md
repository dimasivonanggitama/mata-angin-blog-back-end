# mata-angin-blog-back-end

• Versioning Code:\
v(F).(FU).(C).(CU)\
F = Feature\
&emsp;F = 1 = Preparation\
&emsp;F = 2 = Routes\
&emsp;F = 3 = Controller\
&emsp;F = 4 = Migration\
&emsp;F = 5 = Model\
&emsp;F = 6 = Middleware\
&emsp;F = 7 = Email Template\
&emsp;F = 8 = Helpers\
FU = Feature Update (current version of feature)\
&emsp;v1.10 = Preparation\
&emsp;v2.1 = Routes\
&emsp;v3.1 = Controller\
&emsp;v5.1 = Model\
&emsp;v6.1 = Middleware\
&emsp;v7.1 = Email Template\
&emsp;v8.1 = Helpers\
C = Component\
&emsp;v1.(FU).1 = .env\
&emsp;v1.(FU).2 = .gitignore\
&emsp;v1.(FU).3 = index.js (outermost)\
&emsp;v1.(FU).4 = Config\
&emsp;v2.(FU).1 = index.js (routes folder)\
&emsp;v2.(FU).2 = Auth Routes\
&emsp;v2.(FU).3 = Blog Routes\
&emsp;v3.(FU).1 = index.js (controllers folder)\
&emsp;v3.(FU).2 = authController\
&emsp;v4.(FU).1 = Create User Table\
&emsp;v5.(FU).1 = index.js (models folder)\
&emsp;v5.(FU).2 = User Model\
&emsp;v6.(FU).1 = index.js (middleware folder)\
&emsp;v6.(FU).2 = Auth: Input Verificator\
&emsp;v6.(FU).3 = Auth: DB Verificator\
&emsp;v6.(FU).4 = Auth: Token Verificator\
&emsp;v7.(FU).1 = Email Template: Verification Email\
&emsp;v7.(FU).2 = Email Template: Forgot Password\
&emsp;v7.(FU).3 = Email Template: Change Email\
&emsp;v7.(FU).4 = Email Template: Change Password\
&emsp;v7.(FU).5 = Email Template: Change Username\
&emsp;v7.(FU).6 = Email Template: Change Phone\
&emsp;v8.(FU).1 = Helpers: Email Transporter\
CU = Component Update\

• Alur sistem:\
index.js (paling luar) -> routes -> controllers -> models

• Dependency installation
1. npm init --y
2. npm install --save-dev sequelize-cli
3. npm install sequelize
4. npm install mysql2
5. npx sequelize-cli init
6. tambahkan .env
7. npm install dotenv
8. npm install bcrypt
9. npm install jsonwebtoken
10. npm install nodemailer


• ORM: Sequelize
1. Create migration file
npx sequelize-cli migration:generate --name create-user-table
npx sequelize-cli migration:generate --name create-blog-table

2. Execute create table from migration file:
npx sequelize-cli db:migrate
npx sequelize db:migrate

