# Documentation

Human resources staff needs to be reminded when and why a job applicant should be contacted. This application is meant to fulfil that need.


#Installation

Pre-requisites : git, MySQL server, node, bower

1. Clone the project : `git clone http://github.com/GTrebaol/hr-reminder.git`.
2. Install the backend dependencies : get in the project folder and launch `npm install`.
3. Install the frontend dependencies : get in the `/public/` folder and launch `bower install`.
4. Load the MySQL schema script existing in `/utils/sql/1.create_schema.sql`.
5. Check the configuration values in the files `/app/config/`
6. Choose your environment by setting the NODE_ENV value.
7. Launch the server : `node app.js`


## Models
### User
```
{
   id : AI, PK, int,
   nom : varchar,
   prenom : varchar,
   telephone : varchar, nullable,
   mail : varchar, nullable,
   discr : enum,
   formation : varchar, nullable,
   annees_etudes : int, nullable,
   competences : varchar, nullable,
   pretentions : int, nullable,
   mobilite : varchar, nullable,
   remarques : varchar, nullable,
   decision : boolean, nullable,
   source : varchar, nullable,
   date_embauche : date, nullable,
   dernier_ese: date, nullable,
   prochain_ese : date, nullable,
   client_actuel : date, nullable,
}
```
### Reminder
```
{
   id : AI, PK, int,
   date_rappel : date,
   date_rdv : date, nullable,
   commentaire : varchar, nullable,
   user_id : FK, int
}
```

## Rest API
The Rest API is very simple as we do not need (for now) an entire CRUD management.
### Version
0.1
### Revision
(current) 0.1: entities access + relationships
(next) 0.2: entities creation.

### Successful request
#### GET
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```
### Errors handled
#### GET
```
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
```
```
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
```
```
HTTP/1.1 500 Server Error
Content-Type: application/json; charset=utf-8
```

### Endpoints


#### User


- **GET** an 'user' by its id
    ###### Request
        ```
        GET /user/{id}
        ```
    ###### Response
        ```
        HTTP/1.1 200 OK
        Content-Type: application/json; charset=utf-8
        {
            id : 15,
            nom : “Le Gallois”,
            prenom : “Perceval”,
            telephone :  “0298475124”,
            email : “le_gros_faisan@au-sud.com”,
            ...
        }
        ```

- **GET** an 'utilisateur' by its name
    ###### Request
        ```
        GET /user/name/{name}
        ```
    ###### Response
        ```
        HTTP/1.1 200 OK
        Content-Type: application/json; charset=utf-8
        {
            id : 15,
            nom : “Karadoc”,
            prenom : “Croc”,
            telephone :  “0298475124”,
            email : “le_graal_par_ci@le_graal_par_la.kmltt”,
            ...
        }
        ```

#### Reminder


- **GET** a 'reminder' by its id

    ###### Request
        ```
        GET /reminder/{id}
        ```
    ###### Response
        ```
        HTTP/1.1 200 OK
        Content-Type: application/json; charset=utf-8
        {
            id : 150,
            date_rappel : “2015-05-05”,
            date_rdv : “2015-06-05”,
            commentaire : “Salut, Sire. Je trouve qu’il fait beau, mais encore frais, mais beau !”,
            user_id : 15
            ...
        }
        ```

- **GET** the upcoming 'reminders'
    ###### Request
        ```
        GET /reminder/upcoming
        ```
    ###### Response
        ```
        HTTP/1.1 200 OK
        Content-Type: application/json; charset=utf-8
        {
          [
              {
                  id : 150,
                  date_rappel : “2015-05-05”,
                  date_rdv : “2015-06-05”,
                  commentaire : “Bref, tout ça pour dire, que je voudrais bien qu’on me considère en tant que tel.”,
                  user_id : 15
              },
              {
              }, ...
          ]
        }
        ```

- **GET** the 'reminders' occurring in {day} day
    ###### Request
        ```
        GET /reminder/upcoming/{day}
        ```
    ###### Response
        ```
        HTTP/1.1 200 OK
        Content-Type: application/json; charset=utf-8
        {
          [
              {
                  id : 150,
                  date_rappel : “2015-05-05”,
                  date_rdv : “2015-06-05”,
                  commentaire : “ j’lis jamais rien. C’est un vrai piège à cons c’t’histoire-là. En plus j’sais pas lire.”,
                  user_id : 15
              },
              {
              }, ...
          ]
        }
        ```


## TODO
- Develop a csv import from a specific format in order to populate the database.
- Attach a CV file (pdf only?) to an 'User'.
- Identify the different type of users (Candidat, Consultant, Independant) and display different fields for each.
- For a 'Candidat', we should have a first interview date, and the source shall be choose from a predefined list of values
- For an 'Independant', new fields : 'TJM', 'Ancien sous-traitant' (checkbox).
- For an 'Consultant', new fields : 'Annee embauche', 'Annee départ', 'Accord pour recontact', 'Eligible', 'Salaire'.

### Thoughts
I created only one table for all the different types of users that will be contained in this app. The thing is I will need to display different informations
base on that type. I was wondering if I should try to do some inheritance with the model...
