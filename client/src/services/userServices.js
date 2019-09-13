const apiUrl = "http://localhost:3001/api"

function authHeader() {
   // return authorization header with jwt token
   let user = JSON.parse(localStorage.getItem('user'));

   if (user && user.token) {
      return { 'Authorization': user.token };
   } else {
      return {};
   }
}

export const userService = {
   authHeader,
   login,
   logout,
   register,
   getProj,
   uploadProj,
   updateProj,
   getPendingConnections,
   // getAll,
   // getById,
   // update,
   // delete: _delete
};

function login(email, password) {
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
   };

   return fetch(`${apiUrl}/auth/login`, requestOptions)
      .then(handleResponse)
      .then(user => {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('user', JSON.stringify(user));

         return user;
      });
}
function logout() {
   // remove user from local storage to log user out
   localStorage.removeItem('user');
}
function register(user) {
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
   };

   return fetch(`${apiUrl}/auth/register`, requestOptions)
      .then(handleResponse);
}

const hitProjRoute = (options) => {
   const requestOptions = options.requestOptions
   fetch(`${apiUrl}/projects${options.route}`, requestOptions)
      .then(handleResponse)
      .then(res => res.text())
      .then(text => console.log(text))
}
function getProj(userId) {
   hitProjRoute({
      requestOptions: {
         method: 'GET',
      },
      route: '/user/' + userId
   })
}
function uploadProj(proj) {
   hitProjRoute({
      requestOptions: {
         method: 'POST',
         headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(proj),
      },
      route: '/upload'
   })
}
function updateProj(proj, projectId) {
   hitProjRoute(proj, {
      requestOptions: {
         method: 'PUT',
         headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(proj),
      },
      route: '/update/' + projectId
   })
}

function getPendingConnections() {
   const requestOptions = {
      method: 'GET',
      headers: {
         ...authHeader(),
         'Content-Type': 'application/json', // Probably not necessary
      },
   };
   return fetch(`${apiUrl}/relationships/pending`, requestOptions)
      .then(handleResponse)
      // .then(text => {
      //    console.log(text)
      //    return text
      // })
}

// function getAll() {
//    const requestOptions = {
//        method: 'GET',
//        headers: authHeader()
//    };

//    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function getById(id) {
//    const requestOptions = {
//        method: 'GET',
//        headers: authHeader()
//    };

//    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

// function update(user) {
//    const requestOptions = {
//        method: 'PUT',
//        headers: { ...authHeader(), 'Content-Type': 'application/json' },
//        body: JSON.stringify(user)
//    };

//    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//    const requestOptions = {
//        method: 'DELETE',
//        headers: authHeader()
//    };

//    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

// the service checks if the http response from the api is 401 Unauthorized, logs the user out
// This happens if the JWT token expires or is no longer valid for any reason.

const handleResponse = (response) => {
   return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
         if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
         }

         const error = (data && data.message) || response.statusText;
         return Promise.reject(error);
      }

      return data;
   });
}