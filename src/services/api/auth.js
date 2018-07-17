export default (client) => ({
  login (username, password) {
    return client
      .post('login/', {
        username: username,
        password: password
      })
      .then(response => response.data.token)
  }
})
