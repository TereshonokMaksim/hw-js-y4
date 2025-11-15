To launch server of this application, type "npm start" with terminal opened in this thing.
If this is not working, make sure you installed modules required for work (write "npm install" for installing) and check if your npm works at all (if not - download one from internet)

### Change log (since Module 2):

#### 10.10.2025 - Mod2 Task1

    Changed JS to TS.
    Added basic typing.

#### 14.10.2025 - Mod2 Task2

    Impoved typing using interfaces and types. 
    Added first Contract, for easier work between files. 
    Added link to update posts by ID with a lot of conditions using PATCH method.

#### 17.10.2025 - Mod2 Task3

    Added Post Controller contract, for better understanding of types.
    Used Request and Response generic types, for good readability of Controller part.
    Added likes check on Post creation in Controller part.

#### 21.10.2025 - Mod2 Task4

    Added Prisma to project.
    Created actual models of Post and Tag.
    Created seed for putting test data into database.

#### 25.10.2025 - Mod2 Task5

    Succesfully used Prisma to make types be same as in DB schema.
    Changed DB from JSON file to Prisma ORM with Sqlite DB.
    Added Post deletion.

#### 01.11.2025 - Mod2 Task6

    Added Repository layer for Post and Tag modules
    Moved prisma client to another module - client
    Created new module - Tag. It contains links to get all tags and tag by id

#### 12.11.2025 - Mod2 Task7

    Added User model and relations to Post
    Added registration, login and getting info about Yourself routes
    Setted up some generic types and env