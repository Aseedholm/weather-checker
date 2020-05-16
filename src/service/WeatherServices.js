const apiKey = 'fb71a69f93b29d7c3ad5ca6d0270914b';

/**
 * This function calls the fetch function contained in the weatherServices class based on the
 * city name searched for by a user. It returns a JSON object in String form, containing weather
 * data for the searched city.
 * @param {String} cityName the name of the city being searched for.
 *
 * @param temperatureUnit   Unit to display temperature in, either Metric or Imperial.
 * @return {String}         The weather data as a String.
 */
export const findCityByName = (cityName, temperatureUnit) => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${temperatureUnit}`)
        .then(response => response.json())

}

/**
 * This function calls the fetch function contained in the weatherServices class based on the
 * city name and state name searched for by a user. It returns a JSON object in String form,
 * containing weather data for the searched city.
 * @param {String} cityName the name of the city being searched for.
 * @param {String} stateName the name of the State the city resides in.
 *
 * @param temperatureUnit   Unit to display temperature in, either Metric or Imperial.
 * @return {String}         The weather data as a String.
 */
export const findCityByNameAndState = (cityName, stateName, temperatureUnit) => {
    //Need to specify country ID otherwise it may not find a result in the United States.
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&appid=${apiKey}&units=${temperatureUnit}`)
        .then(response => response.json())
}

/**
 * This function calls the fetch function contained in the weatherServices class based on the
 * zip code searched for by a user. It returns a JSON object in String form, containing weather
 * data for the searched city (searched by zip code).
 * @param {String} zipCode the zip of the city being searched for.
 *
 * @param temperatureUnit   Unit to display temperature in, either Metric or Imperial.
 * @return {String}         The weather data as a String.
 */
export const findCityByZipCode = (zipCode, temperatureUnit) => {
    //API defaults to US as country code, don't need to specify it.
    //Specifying was also causing issues with the fetch request.
    return fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=${temperatureUnit}`)
        .then(response => response.json())
}

export default {
    findCityByName,
    findCityByNameAndState,
    findCityByZipCode
}
