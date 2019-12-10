var app = new Vue({
    el: '#app', // Elemento
    data: { // Parametros
        name: '',
        lname: '',
        username: '',
        pass: '',
        teste: ''
    },
    methods: {
        crearUserRest: function (event) {
            const url = "http://sa-api:4000/sa-auth-ms/resources/users"; // site that doesn’t send Access-Control-*
            fetch(url,{
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"firstName": this.name, "lastName": this.lname, "username": this.username, "password": this.pass})
            }).then(response => response.json())
                .then(response => {
                    alert("Usuario creado satisfactoriamente desde Microservicio:"+"\nfirstName: "+response.firstName+"\nlastName: "+response.lastName+"\npassword: "+response.password+"\nid: "+response.id+"\nusername: "+response.username);
                    window.location.reload(false);
                }).catch(error => { console.log('request failed', error); });
        },
        crearUserGraph:function (event) {
            fetch("http://sa-api:5000/graphql?", {
                "credentials": "omit",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "referrer": "http://sa-api:5000/graphiql",
                "body": "{\"query\":\"mutation {\\n  createUser(user: {\\n    firstName: \\\""+this.name+"\\\"\\n    lastName: \\\""+this.lname+"\\\"\\n    username: \\\""+this.username+"\\\"\\n    password: \\\""+this.pass+"\\\"\\n  }) {\\n    firstName\\n    lastName\\n    id\\n    username\\n    password\\n  }\\n}\",\"variables\":null}",
                "method": "POST",
                "mode": "cors"
            }).then(response => response.json())
                .then(response => {
                    alert("Usuario creado satisfactoriamente desde API Gateway:"+"\nfirstName: "+response.data.createUser.firstName+"\nlastName: "+response.data.createUser.lastName+"\npassword: "+response.data.createUser.password+"\nid: "+response.data.createUser.id+"\nusername: "+response.data.createUser.username);
                    window.location.reload(false);
                }).catch(error => { console.log('request failed', error); });
        }
    }
});
