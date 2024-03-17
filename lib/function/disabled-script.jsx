const checkIfDisabled = (organizationId) => {
  // Define the URL of your JSON file
  const requestUrl = `https://fluxconsole.com/api/org/${organizationId}`
  // Make the request using fetch
  fetch(requestUrl)
  .then((response) => {
    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then((data) => {
    // Check the 'disabled' property
    if (data.hasOwnProperty('disabled')) {
      if (data.disabled === true) {
        window.location.replace('https://www.modiphy.com/disabled')
      }
    }
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error.message)
  })
}

export {
  checkIfDisabled
}
