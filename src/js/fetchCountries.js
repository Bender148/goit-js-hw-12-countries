import { alert} from '@pnotify/core';

export default function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(response => {
      return response.json();
  })
  .then(result => {
      if (result.status === 404) {
          alert({
              type: "error",
              text: "No matches find"
            })
      } 
      return result
  })
  .catch(error => {
      console.log("error");
  });
}