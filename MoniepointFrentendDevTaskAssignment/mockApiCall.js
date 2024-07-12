async function mockApiCall() {
    return new Promise((resolve, reject) => {
      // Simulate a random success or failure
      setTimeout(() => {
        if (Math.random() > 0.7) {
          resolve('Success: Data fetched!');
        } else {
          reject(new Error('Mock API Call Failed'));
        }
      }, 1000); // This simulates a 1 second delay for the API call
    });
  }
  
  async function fetchWithExponentialBackoff(
    apiCallFunction,
    retries = 5,
    delay = 1000
  ) {
    let attempt = 0;
  
    while (attempt < retries) {
      try {
        return await apiCallFunction();
      } catch (error) {
        attempt++;
        if (attempt === retries) {
          throw error;
        }
        console.log(`Retrying in ${delay}ms... (${attempt}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
  }
  
  // Example of Usage of the Implementation above
  (async () => {
    try {
      let data = await fetchWithExponentialBackoff(mockApiCall);
      console.log('Data fetched successfully:', data);
    } catch (error) {
      console.error(error.message);
    }
  })();
  