import qs from 'qs'

export default client => ({
  list (bbox, filters) {
    let statuses = []
    if (filters.statuses.published) {
      statuses.push('PUB')
    }
    if (filters.statuses.pending) {
      statuses.push('PEN')
    }
    if (filters.statuses.invalid) {
      statuses.push('INV')
    }

    let severities = []
    if (filters.severities.low) {
      severities.push(1)
    }
    if (filters.severities.medium) {
      severities.push(2)
    }
    if (filters.severities.high) {
      severities.push(3)
    }
    if (filters.severities.dangerous) {
      severities.push(4)
    }
    return client
      .get('poims/', {
        params: {
          in_bbox: bbox,
          status__in: statuses.join(),
          severity__in: severities.join(),
          tags__name__in: filters.tags.join()
        },
        paramsSerializer: (params) => qs.stringify(params, { indices: false })
      })
      .then(response => response.data.results)
  },
  get (slug) {
    return client
      .get(`poims/${slug}/`)
      .then(response => response.data)
  },
  addVote (poimId, vote) {
    return client
      .post('ratings/', {
        poim: poimId,
        vote: vote
      })
      .then(response => response.data)
  },
  addComent (poimId, comment) {
    return client
      .post('comments/', {
        poim: poimId,
        comment: comment
      })
      .then(response => response.data)
  },
  addChangeRequest (poimId, change) {
    return client
      .post('change-requests/', {
        poim: poimId,
        change: change
      })
      .then(response => response.data)
  },
  addPOIM (newPOIMData) {
    return client
      .post('poims/', newPOIMData)
      .then(response => {
        for (let photo of newPOIMData.photos) {
          const form = new FormData()
          form.append('poim', response.data.id)
          form.append('photo', photo)
          client.post('poim-images/', form, { headers: { 'Content-Type': 'multipart/form-data' } })
        }
        return response.data
      })
  }
})
