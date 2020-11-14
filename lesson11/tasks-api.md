# Task tracker (IT)

The base part of the URI path for the tasks API is `/api`.

The media type used in all requests and responses that have content on body is `applicaton/json`.

The following sections describe each API resource.

---

## Check the API

```http
GET /
```

```curl
curl http://localhost:1904/api/
```

- Request:
  - Body: none
- Response:
  - Success:
    - Status code: 200
    - Body example:

    ```json
      {
          "name": "tasks api",
          "version": "1.0.0",
          "description": "PI Tasks API running"
      }
      ```

---

## Obtain all tasks

```http
GET /tasks/
```

```curl
curl http://localhost:1904/api/tasks
```


- Request:
  - Body: none
- Response:
  - Success:
    - Status code: 200
    - Body example:

    ```json
      {
        "tasks": [
          {
            "id": 1,
            "name": "task1",
            "description": "description of task 1"
          },
          {
            "id": 2,
            "name": "task2",
            "description": "description of task 2"
          },
          ...
        ]
      }
    ```

---

## Obtain a specific task

```http
GET /tasks/{id}
```

```curl
curl http://localhost:1904/api/tasks/1
```


- Request:
  - Path parameters:
    - id - The task identifier
  - Body: none
- Response:
  - Success:
    - Status code: 200
    - Body:

    ```json
        {
          "id": 1,
          "name": "task1",
          "description": "description of task 1"
        }
    ```

  - Errors:
    - 400 and 404 (see Common Error Handling section)

---

## Create a task

```http
POST /tasks
```

```curl
curl http://localhost:1904/api/tasks        \
  -X POST                                   \
  -H 'Content-type: application/json'       \
  -d '{                                     \
    "name": "task1",                        \
    "description": "description of task 1"  \
  }'  
```

- Request:
  - Body:
```json
  {
    "name": "task1",
    "description": "description of task 1"
  },  

```

- Response:
  - Success:
    - Status code: 201
    - Headers:
      - Location: `/api/tasks/2`
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "task create",
        "uri": "/api/tasks/2"
      }
    ```
  
---

## Update a task

```http
PUT /tasks/{id}
```

```curl
curl http://localhost:1904/api/tasks/2 \
    -X PUT                              \
    -H 'Content-type: application/json' \
    -d '{               \
    "name": "task11", \
    "description": "description of task 11" \
  }'  
```

- Request:
  - Path parameters:
    - id - The task identifier
  - Body:

```json
  {
    "name": "task11",
    "description": "description of task 11"
  },  

```

- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "task updated",
        "uri": "/api/tasks/2"
      }
    ```

  - Errors:
    - 400 and 404 (see Common Error Handling section)
  
---

## Delete a task

```http
DELETE /tasks/{id}
```

```curl
curl -X DELETE http://localhost:1904/api/tasks/1
```


- Request:
  - Path parameters:
    - id - The task identifier
  - Content-Type: application/json
  - Body: none

- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "task deleted",
        "uri": "/api/tasks/2"
      }
    ```

  - Errors:
    - 404 (see Common Error Handling section)
  
---

## Associate a Book with a task

```http
PUT /tasks/:id/:book-id
```

- Request:
  - Path parameters:
    - id - The task identifier
    - book-id - The book identifier
  - Content-Type: application/json
  - Body: none

- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "Book associated with a task deleted",
        "uri": `/api/tasks/2`
      }
    ```

  - Errors:
    - 404 (see Common Error Handling section)
  
---

## Common Error Handling

This section describes the error handling that is done in every endpoint that produces these erros. This is presented in a separate section to avoid repeating these descriptions wherever it applies.

Every error response has an `application/json` body with the content described for each error.

### 400 - Bad request

Every time the request contains a URI with and invalid QueryString or a Body with invalid Json content for that specific request, the response has a 400 status code with the following sample body:

- Body:

  ```json
      {
        "error": "The request query string is invalid",
        "uri": "/b4/api/tasks/?InvalidQueryString",
      }
  ```

### 404 - Not found

Every time the request contains a URI for a resource not managed by the API, the response has a 404 status code with the following sample body.

- Body:

  ```json
      {
        "error": "Resource not found",
        "uri": "/api/tasks/notfoundtask",
      }
  ```
