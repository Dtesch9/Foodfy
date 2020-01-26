# Desafio-Final-Bootcamp-LaunchBase
Lastest Version of Foodfy web app

# Foodfy

Foodfy is a fiction webpage about food demonstration

## Built with

HTML, CSS, JS, Node.js, PostgresSQL

## Dependencies

- Nodejs-crypto 
- bcrypt 
- multer
- nunjucks
- express
- express-session
- connect-pg-simple
- nodemailer

## About Foodfy

Foodfy has been created as a challenge of knowledge measurement in Rocketseat Launchbase course.

## Page for demonstration only

```python
Most of the contents are made up.
```
## RUN: DEVELOPER MODE

```python
#INSTALL NODE.JS

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs

#INSTALL NPM
sudo apt install npm

# RUN THE APPLICATION WITH:
npm dev
```
## Get Started

```python
1. Start by cloning the repository

2. Have already installed [Postgresql](https://www.postgresql.org/) on your machine

3. Inside your **TERMINAL** Browse inside the directory you have just cloned

4. Go to src/config/db.js
  Then insert your postgres information on: 
  user: 'postgresUser',
  password: 'postgresPassword',
  host: 'localhost',
  port: 5432,
  database: 'foodfydb'
  
5. Configure Mailer [mailtrap.io](https://mailtrap.io/)
  Create a box mail and copy the smpt Credentials
  Then past in src/lib/mailer.js
  
6. Get back to root directory you have cloned
  Then **RUN** node seed.js to obtain your database
  
7. **RUN** npm dev or yarn dev **this command may variable according to your package manager**
```

## Guide

**Only admin can create your login account** 

## User menu
<p align="center">
  <img src="https://i.imgur.com/WprIcUH.png" width="350" title="hover text">
  <img src="https://i.imgur.com/Fn1mYom.png" width="350" alt="accessibility text">
</p>

|===========================================================================================================================|

## Administration area | **Create user option allowed for admin only**

<p align="center">
  <img src="https://imgur.com/vnwn2uD.png" width="350" border="1px solid orange" title="hover text">
  <img src="https://imgur.com/E9wXAkP.png" width="350" alt="accessibility text">
</p>

|===========================================================================================================================|

## Password Recover | use [mailtrap.io](https://mailtrap.io/)

<p align="center">
  <img src="https://imgur.com/kosxpDs.png" width="350" title="hover text">
  <img src="https://imgur.com/FuRFPLf.png" width="350" alt="accessibility text">
</p>

|===========================================================================================================================|

## Messages

<p align="center">
  <img src="https://i.imgur.com/SDL0FC6.png" width="350" title="hover text">
  <img src="https://imgur.com/0FQXE68.png" width="350" alt="accessibility text">
</p>

|===========================================================================================================================|

## Creation
```bash
Douglas Tesch beginner developer
```
Feel free to make changes and of course, enjoy it.

## License
[MIT](https://choosealicense.com/licenses/mit/)
