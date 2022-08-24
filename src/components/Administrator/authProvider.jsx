// const authProvider = {
//     // called when the user attempts to log in
//     login: ({ username }) => {
//         localStorage.setItem('username', username);
//         // accept all username/password combinations
//         return Promise.resolve();
//     },
//     // called when the user clicks on the logout button
//     logout: () => {
//         localStorage.removeItem('username');
//         return Promise.resolve();
//     },
//     // called when the API returns an error
//     checkError: ({ status }) => {
//         if (status === 401 || status === 403) {
//             localStorage.removeItem('username');
//             return Promise.reject();
//         }
//         return Promise.resolve();
//     },
//     // called when the user navigates to a new location, to check for authentication
//     checkAuth: () => {
//         return localStorage.getItem('username')
//             ? Promise.resolve()
//             : Promise.reject();
//     },
//     // called when the user navigates to a new location, to check for permissions / roles
//     getPermissions: () => Promise.resolve(),
// };
const authProvider = ({
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
  }) => ({
    login: loginWithRedirect,
    logout: () => logout({ returnTo: window.location.origin }),
    checkError: () => Promise.resolve(),
    checkAuth: () => (isAuthenticated ? Promise.resolve() : Promise.reject()),
    getPermissions: () => Promise.reject('Unknown method'),
    getIdentity: () =>
      Promise.resolve({
        id: user.id,
        fullName: user.name,
        avatar: user.picture,
      }),
  });
  
export default authProvider;