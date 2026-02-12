fetch('http://localhost:3000/users/cadastro',{
    method: 'POST',
    headers:{ 'Content-Type': 'application/json'},
    body: JSON.stringify({
        "name": "Luan Henrique",
        "email": "consaniluan42@gmail.com",
        "password": "12345678"
    }),
})
.then(response => response.json())
.then(data => console.log(data));

fetch('http://localhost:3000/auth/login',{
    method: 'POST',
    headers:{ 'Content-Type': 'application/json'},
    body: JSON.stringify({
        "email": "consaniluan42@gmail.com",
        "password": "12345678"
    }),
})
.then(response => response.json())
.then(data => console.log(data));

fetch('http://localhost:3000/users/profile',{
    method: 'GET',
    headers:{
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiY29uc2FuaWx1YW40MkBnbWFpbC5jb20iLCJpYXQiOjE3NzA4MjIwMzAsImV4cCI6MTc3MDkwODQzMH0.Z5oTziORjrrrmtZpj_HcAfIXAMa1lDF5BVCXTT86hVk',
        'Content-Type': 'application/json'
        },
})
.then(response => response.json())
.then(data => console.log(data));

fetch('http://localhost:3000/boards',{
    method: 'POST',
    headers:{ 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiY29uc2FuaWx1YW40MkBnbWFpbC5jb20iLCJpYXQiOjE3NzA4MjIwMzAsImV4cCI6MTc3MDkwODQzMH0.Z5oTziORjrrrmtZpj_HcAfIXAMa1lDF5BVCXTT86hVk',
        'Content-Type': 'application/json'},
    body: JSON.stringify({
        "title": "Meu primeiro board"
    }),
})
.then(response => response.json())
.then(data => console.log(data));

fetch('http://localhost:3000/boards',{
    method: 'POST',
    headers:{ 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiY29uc2FuaWx1YW40MkBnbWFpbC5jb20iLCJpYXQiOjE3NzA4MjIwMzAsImV4cCI6MTc3MDkwODQzMH0.Z5oTziORjrrrmtZpj_HcAfIXAMa1lDF5BVCXTT86hVk',
        'Content-Type': 'application/json'},
    body: JSON.stringify({
        "title": "Meu primeiro board"
    }),
})
.then(response => response.json())
.then(data => console.log(data));


fetch('http://localhost:3000/lists',{
    method: 'POST',
    headers:{ 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiY29uc2FuaWx1YW40MkBnbWFpbC5jb20iLCJpYXQiOjE3NzA4MjIwMzAsImV4cCI6MTc3MDkwODQzMH0.Z5oTziORjrrrmtZpj_HcAfIXAMa1lDF5BVCXTT86hVk',
        'Content-Type': 'application/json'},
    body: JSON.stringify({
        "title": "Minha primeira lista",
        "boardId": 1,
    }),
})
.then(response => response.json())
.then(data => console.log(data));


fetch('http://localhost:3000/cards',{
    method: 'POST',
    headers:{ 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiY29uc2FuaWx1YW40MkBnbWFpbC5jb20iLCJpYXQiOjE3NzA4MjIwMzAsImV4cCI6MTc3MDkwODQzMH0.Z5oTziORjrrrmtZpj_HcAfIXAMa1lDF5BVCXTT86hVk',
        'Content-Type': 'application/json'},
    body: JSON.stringify({
        "title": "Meu primeiro card",
        "description": "Descrição do meu primeiro card",
        "listId": 1,
    }),
})
.then(response => response.json())
.then(data => console.log(data));