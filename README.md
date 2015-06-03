# Documentation

The purpose of this application is to allow the human ressources workers to be reminded on a regular basis to contact some people.
It will notify what users shall be recontacted and allow the creation of a new reminders on a specific date.

## Models
### Utilisateur
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
### Rappel
```
{
   id : AI, PK, int,
   date_rappel : date,
   date_rdv : date, nullable,
   commentaire : varchar, nullable,
   utilisateur_id : FK, int
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

#### Utilisateur

- **GET** an 'utilisateur' by its id
    ###### Request
        ```
        GET /utilisateur/{id}
        ```
    ###### Response
        ```
        HTTP/1.1 200 OK
        Content-Type: application/json; charset=utf-8
        {
            id : 15,
            nom : “Le Gallois”,
            prenom : “Perceval”,
            telephone :  0298475124,
            email : “le_gros_faisan@au-sud.com”,
            ...
        }
        ```

#### Rappel

- **GET** the 'rappel' by its id

    ###### Request
        ```
        GET /rappel/{id}
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
            utilisateur_id : 15
        }
        ```


- **GET** the upcoming 'rappels'
    ###### Request
        ```
        GET /rappel/upcoming
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
                  utilisateur_id : 15
              },
              {
              }, ...
          ]
        }
        ```

- **GET** the 'rappels' occurring in {day} day
    ###### Request
        ```
        GET /rappel/upcoming/{day}
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
                  utilisateur_id : 15
              },
              {
              }, ...
          ]
        }
        ```
