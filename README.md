
# Services for CathES #

Repository made for applications of CathES project

Get to know more about it on: https://github.com/mateusrcm/cathes-documentation/tree/cathes-mobile

  

---
## How to run this project:
  

## 1. Database - MongoDB ##

Assuming you have MongoDb server installed - link for MongoDb Community below:

https://docs.mongodb.com/manual/administration/install-community/

  

```

npm install

```

  

### On windows CLI:

  

##### Default service directory - Without Environment Variable set

```

cd C:\Program Files\MongoDB\Server\4.0\bin

```

  

##### Default database directory/port

```

mongod --port 27017 --dbpath C:\data\db

```

*If the command above didn't work right, try it out:* https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#if-you-installed-mongodb-as-a-windows-service

  

##### Start the Database Service

Go to the project directory and type in:

```

node routing/app.js

```

  

---

### On linux CLI:

  

##### Default service directory - Assuming default settings from MongoDb package manager

```

sudo service mongod

```

*If the command above didn't work right, select you dist and read the Run MongoDB X Edition Section:* https://docs.mongodb.com/manual/administration/install-on-linux/

  

---

  

## 2. QR Code Generator ##

> This will be the next service, wait and wonder :)