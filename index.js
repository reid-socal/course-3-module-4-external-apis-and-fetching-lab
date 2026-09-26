const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener('DOMContentLoaded', () => {
  const stateInput = document.getElementById('state-input')
  const fetchButton = document.getElementById('fetch-alerts')
  const alertsDisplay = document.getElementById('alerts-display')
  const errorMessage = document.getElementById('error-message')

  fetchButton.addEventListener('click', () => {
    const stateAbbr = stateInput.value
    stateInput.value = ''

    if (!stateAbbr) {
      displayError('Please enter a state abbreviation.')
      return
    }

    fetch(`${weatherApi}${stateAbbr}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then(data => displayAlerts(data))
      .catch(error => displayError(error.message))
  })

  function displayAlerts(data) {
    alertsDisplay.innerHTML = ''

    const summary = document.createElement('p')
    summary.textContent = `${data.title}: ${data.features.length}`
    alertsDisplay.append(summary)

    const list = document.createElement('ul')
    data.features.forEach(feature => {
      const listItem = document.createElement('li')
      listItem.textContent = feature.properties.headline
      list.append(listItem)
    })
    alertsDisplay.append(list)

    clearError()
  }

  function displayError(message) {
    errorMessage.textContent = message
    errorMessage.classList.remove('hidden')
  }

  function clearError() {
    errorMessage.textContent = ''
    errorMessage.classList.add('hidden')
  }
})