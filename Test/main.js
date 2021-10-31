/// <reference path="jquery-3.6.0.js" />

$(() => {
  $("#buttonAll").click(async () => {
    try {
      const countries = await getJSON("https://restcountries.com/v3.1/all");
      displayCountries(countries);
    } catch (err) {
      alert("Error: " + err);
    }
  });

  $("#buttonSearch").click(async () => {
    try {
      const countries = await getJSON(
        "https://restcountries.com/v3.1/name/" + $("#inputSearch").val()
      );
      displayCountries(countries);
    } catch (err) {
      alert("Error: " + err);
    }
  });

  function getJSON(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        success: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }

  function displayCountries(countries) {
    for (const country of countries) {
      let coin = "-";
      if (country.currencies !== ("undefined" && "null" && undefined && null))
        coin = Object.values(country.currencies)[0].name;
      let neighbors = "-";
      if (country.borders !== ("undefined" && "null" && undefined && null))
        neighbors = JSON.stringify(country.borders).slice(1, -1);

      //console.log(coin);

      $("#tableCountries").append(`
            <tr>
              <td>${country.name.common}</td>
              <td>${country.tld}</td>
              <td>${country.capital}</td>
              <td>${coin}</td>
              <td><img src="${country.flags.png}"></td>
              <td>${neighbors}</td>
            </tr>`);
    }
  }
});
