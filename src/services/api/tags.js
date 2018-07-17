export default client => ({
  list () {
    return client
      .get('tags/')
      .then(response => response.data)
  }
})
