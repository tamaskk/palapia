  export const getCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const countries = await response.json();
      return countries;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  export const getACountry = async (name) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const country = await response.json();
      return country;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }