# Concesionaria
Descripcion:
El proyecto es una concesionaria de autos, la idea es que los usuarios se registren, una vez registrados, pueden crear, editar y remover tanto autos como ventas.
De otra forma, sin logearse, el unico permiso que tienen es de leer.

Entidades:
Usuarios
Autos
Ventas

Endpoints:

# -LOGIN-


[POST] /api/login
```
  Body:
    {
        "email": "test@test.com",
        "password": "12345"
    }
  Response:
    {
      "email":"test@test.com",
      "token": "eyJhbGciOiJIUzI1NiIL0MIwC57rqHyX4sh-4IpPjUiQ...etc"
    }
```

[POST] /api/registrarse
```
Body:
    {
        "email": "test@test.com",
        "password": "12345"
    }
Response:
    {
        "acknowledged": true,
        "insertedId": "62b26eff674e050ad6ce9042",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc..."
    }
```

# -AUTOS-

[GET] /api/autos
```
Response:
    [
        {
        "_id": "62b2502e53e377cdeea58d07",
        "id": "ID1655853102326",
        "marca": "Ford",
        "modelo": "Test",
        "valor": 17000,
        "disponible": true,
        "anio": 2014
      },
      {
          "_id": "62b276617003dbd3872452b9",
          "id": "ID1655862881586",
          "marca": "Nissan",
          "modelo": "GTX",
          "valor": 1250020,
          "disponible": false
      }
    ]
```
[GET] /api/autos?id=ID1655853102326
    
```
Response:
    {
        "_id": "62b2502e53e377cdeea58d07",
        "id": "ID1655853102326",
        "marca": "Ford",
        "modelo": "Test",
        "valor": 17000,
        "disponible": true,
        "anio": 2014
    }
```
[POST] /api/autos
    
```
Body:
    {
        "id": "ID1655864595421",
        "marca": "Nissaaaan",
        "anio": 2012,
        "modelo": "GTX",
        "valor": 1250020,
        "disponible": false
    }
Response:
    {
        "anio":2012,
        "marca":"Nissan",
        "modelo":"GTX",
        "valor":1250020,
        "disponible":false
    }
```
[PATCH] /api/autos
    
```
Body:
    {
        "id": "ID1655864595421",
        "marca": "Nissaaaan",
        "anio": 2012,
        "modelo": "GTX",
        "valor": 1250020,
        "disponible": false
    }
Response:
    {

    }
```
[DELETE] /api/autos?id=ID1655853102326
    
```
Body:
    {

    }
Response:
    {

    }
```

# -VENTAS-

[GET] /api/ventas
```
Response:
    [
        {
        "_id": "62b2502e53e377cdeea58d07",
        "id": "ID1655853102326",
        "marca": "Ford",
        "modelo": "Test",
        "valor": 17000,
        "disponible": true,
        "anio": 2014
      },
      {
          "_id": "62b276617003dbd3872452b9",
          "id": "ID1655862881586",
          "marca": "Nissan",
          "modelo": "GTX",
          "valor": 1250020,
          "disponible": false
      }
    ]
```
[GET] /api/ventas?id=ID1655852420822
    
```
Response:
    {
        "id":"ID1655852420822",
        "valor":3522301,
        "vendedor":"Alan Micheleinn!"
    }
```
[POST] /api/ventas
    
```
Body:
    {
        "id":"ID1655852420822",
        "valor":3522301,
        "vendedor":"Alan Micheleinn!"
    }
Response:
    {
        "id":"ID1655852420822",
        "valor":3522301,
        "vendedor":"Alan Micheleinn!"
    }
```
[PATCH] /api/ventas
    
```
Body:
    {
        "id":"ID1655852420822",
        "valor":3522301,
        "vendedor":"Alan Micheleinn!"
    }
Response:
    {

    }
```
[DELETE] /api/ventas?id=ID1655853102326
    
```
Body:
    {

    }
Response:
    {

    }
```
