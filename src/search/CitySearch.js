// import React from "react";
// import {Link} from "react-router-dom";
// import './CitySearch.css'
//
// /**
//  * This class represents the search functionality of the Weather Checker web application. It will
//  * accept search parameters such as city/state or zipcode and then make an API call to get the
//  * weather results for the provided information.
//  */
// export default class CitySearch extends React.Component {
//
//     //Will give access to URL information.
//     constructor(props) {
//         super(props);
//     }
//
//     state = {
//         //Search field works by itself, cannot guarantee correct city.
//         cityName: '',
//         //Search field only works in conjunction with city.
//         stateName: '',
//         //Search field works by itself
//         zipCode: '',
//         //API key required by API for calls.
//         apiKey: 'fb71a69f93b29d7c3ad5ca6d0270914b',
//         //Information for returned object.
//         cityWeather: {},
//         //Used to identify if something was searched.
//         searched: false,
//         //Used to determine if user wants temperature in celsius (metric) or fahrenheit (imperial).
//         temperatureUnit: 'imperial',
//         //Used for combined search bar.
//         totalSearch: ''
//     }
//
//
//     componentDidMount() {
//
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevState.temperatureUnit !== this.state.temperatureUnit) {
//             //Checking if zipCode or cityName aren't the default value of '', if they are we don't
//             //try to update search. If either of them are filled, then we can attempt search.
//             //This allows user to switch between C or F without having an error message pop up for
//             //an empty search.
//             if (this.state.zipCode !== '' || this.state.cityName !== '' ){
//                 this.search();
//             }
//
//         }
//
//     }
//
//     // getLocation = () => {
//     //     if (navigator.geolocation) {
//     //         navigator.geolocation.getCurrentPosition(showPosition);
//     //     } else {
//     //         alert("Geolocation is not supported by this browser.");
//     //     }
//     // }
//     //
//     // showPosition = (position) => {
//     //     let userLatitude = position.coords.latitude;
//     //     let userLongitude = position.coords.longitude;
//     // }
//
//     /**
//      * This function will search for a city based on the variables in the state.
//      */
//     search = () => {
//         if(this.state.zipCode !== '') {
//             this.findCityByZipCode(this.state.zipCode);
//         } else if (this.state.cityName !== '' && this.state.stateName !== '') {
//             this.findCityByNameAndState(this.state.cityName, this.state.stateName);
//         } else if (this.state.cityName !== '' && this.state.stateName === '') {
//             this.findCityByName(this.state.cityName);
//         } else {
//             alert("You need to provide either a city name, city name and state name, or a zip code to search for weather results.")
//         }
//     }
//
//     /**
//      * This function calls the fetch function contained in the weatherServices class based on the
//      * city name searched for by a user. It returns a JSON object in String form, containing weather
//      * data for the searched city.
//      * @param {String} cityName the name of the city being searched for.
//      *
//      * @return {String}         The weather data as a String.
//      */
//     findCityByName = (cityName) => {
//         fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.state.apiKey}&units=${this.state.temperatureUnit}`)
//             .then(response => response.json())
//             .then(results => this.setState({
//                                                //TODO: change state using prevState.
//                                                cityWeather: results
//                                            }))
//             // .then(resultsTwo => console.log(resultsTwo))
//
//     }
//
//     /**
//      * This function calls the fetch function contained in the weatherServices class based on the
//      * city name and state name searched for by a user. It returns a JSON object in String form,
//      * containing weather data for the searched city.
//      * @param {String} cityName the name of the city being searched for.
//      * @param {String} stateName the name of the State the city resides in.
//      *
//      * @return {String}         The weather data as a String.
//      */
//     findCityByNameAndState = (cityName, stateName) => {
//         //Need to specify country ID otherwise it may not find a result in the United States.
//         fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&appid=${this.state.apiKey}&units=${this.state.temperatureUnit}`)
//             .then(response => response.json())
//             .then(results => this.setState({
//                                                //TODO: change state using prevState.
//                                                cityWeather: results
//                                            }))
//             // .then(resultsTwo => console.log(resultsTwo))
//     }
//
//     /**
//      * This function calls the fetch function contained in the weatherServices class based on the
//      * zip code searched for by a user. It returns a JSON object in String form, containing weather
//      * data for the searched city (searched by zip code).
//      * @param {String} zipCode the zip of the city being searched for.
//      *
//      * @return {String}         The weather data as a String.
//      */
//     findCityByZipCode = (zipCode) => {
//         //API defaults to US as country code, don't need to specify it.
//         //Specifying was also causing issues with the fetch request.
//         fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${this.state.apiKey}&units=${this.state.temperatureUnit}`)
//             .then(response => response.json())
//             // .then(results => console.log(results))
//             .then(results => this.setState({
//                                                //TODO: change state using prevState.
//                                                cityWeather: results
//                                            }))
//     }
//
//     render() {
//         return (
//             <div className="city-search-page row">
//
//                 <div className="search-bar-input-temp-unit-div row"> {/*div containing the temperature unit / search bar /search button*/}
//                     <select className="unit-select custom-select col-sm-2 col-2"
//                             onChange={(e) => {
//                                 this.setState({
//                                                   temperatureUnit: e.target.value
//                                               })
//                             }}
//                             value={this.state.temperatureUnit}>
//                         <option value="metric">&#8451;</option>
//                         <option value="imperial">&#8457;</option>
//                     </select>
//                     <br/>
//
//                     <input type="text"
//                            placeholder="City Name, State or Zip Code"
//                            className="search-bar col-sm-6 col-6 form-control"
//                         //TODO change setState to use prevState.
//                            onChange={(e) => {
//                                //will be used to determine if input is characters or digits.
//                                let numberRegex = /^[0-9]+$/;
//                                let searchInput = e.target.value;
//                                //remove whitespaces from input
//                                searchInput = searchInput.trim();
//                                //separate input according to comma.
//                                let splitArray = searchInput.split(",");
//                                let cityName = '';
//                                let stateName = '';
//                                let zipCode = '';
//                                //If splitArray is greater than length 1, then there SHOULD be a city
//                                //name and state.
//                                //if length is 1 and the input value isn't digits, then it SHOULD be a
//                                //city name
//                                //if length is 1 and the input value is digits, then it SHOULD be a zip
//                                //code.
//                                if (splitArray.length > 1) {
//                                    cityName = splitArray[0];
//                                    stateName = splitArray[1];
//                                } else if (splitArray.length === 1 && !splitArray[0].match(numberRegex)) {
//                                    cityName = splitArray[0];
//                                } else if (splitArray.length === 1) {
//                                    zipCode = splitArray[0];
//                                }
//                             this.setState({
//                                 totalSearch: e.target.value,
//                                 cityName: cityName,
//                                 stateName: stateName,
//                                 zipCode: zipCode
//                                           })
//                            }}
//                            value={this.state.totalSearch}/>
//                     <br/>
//
//                     <button
//                         className="col-sm-3 col-3 search-button btn"
//                         onClick={ () => {
//                         this.search();
//                         this.setState({
//                             searched: true
//                                       })
//                     }}>
//                         Search
//                     </button>
//                     <br/>
//                 </div> {/*div containing the temperature unit / search bar /search button*/}
//
//                 {this.state.cityWeather.message && this.state.searched &&
//                  <div>
//                      {alert(this.state.cityWeather.message)}
//                      {/*Reset cityWeather after providing the alert. Otherwise alert gets called
//                      whenever search bar is modified until a valid search parameter is given. */}
//                      {this.setState({
//                          cityWeather: {}
//                                     })}
//                  </div>
//                 }
//
//                 {this.state.searched && this.state.cityWeather && this.state.cityWeather.main &&
//                  <div className="row city-weather-info">
//                      <div className="col-12 city-weather-name city-weather">
//                         <h1>
//                             Location: {this.state.cityWeather.name}
//                             <img className="weather-image" src={`http://openweathermap.org/img/wn/${this.state.cityWeather.weather[0].icon}@2x.png`}/>
//                         </h1>
//                      </div>
//
//                      <div className="col-12 city-weather-description city-weather">
//                          <h1>
//                              Description: {this.state.cityWeather.weather[0].description}
//                          </h1>
//
//                      </div>
//
//                      <div className="col-6 city-weather">
//                          <h1 className="temp-text">
//                              Temperature
//                          </h1>
//
//                      </div>
//
//                      <div className="col-6 city-weather-current-temperature city-weather">
//
//                          <h1>
//                              Current: {this.state.cityWeather.main.temp}&#176;
//                          </h1>
//                      </div>
//
//                      <div className="col-12 city-weather-feels-temperature city-weather">
//                          <h1>
//                              Temperature feels like: {this.state.cityWeather.main.feels_like}&#176;
//                          </h1>
//                      </div>
//                      <div className="col-12 city-weather-temperature-max city-weather">
//                          <h1>
//                              Temperature Max: {this.state.cityWeather.main.temp_max}&#176;
//
//                          </h1>
//                      </div>
//
//                      <div className="col-12 city-weather-temperature-min city-weather">
//                          <h1>
//                              Temperature Min: {this.state.cityWeather.main.temp_min}&#176;
//                          </h1>
//                      </div>
//                      <div className="col-12 city-weather city-weather-humidity">
//                          <h1>
//                              Humidity: {this.state.cityWeather.main.humidity}%
//                          </h1>
//                      </div>
//                  </div>
//                 }
//             </div>
//         )
//     }
//
// }
import React from "react";
import {Link} from "react-router-dom";
import './CitySearch.css'

import WeatherServices from "../service/WeatherServices";

/**
 * This class represents the search functionality of the Weather Checker web application. It will
 * accept search parameters such as city/state or zipcode and then make an API call to get the
 * weather results for the provided information.
 */
export default class CitySearch extends React.Component {

    //Will give access to URL information.
    constructor(props) {
        super(props);
    }

    state = {
        //Search field works by itself, cannot guarantee correct city.
        cityName: '',
        //Search field only works in conjunction with city.
        stateName: '',
        //Search field works by itself
        zipCode: '',
        //API key required by API for calls.
        apiKey: 'fb71a69f93b29d7c3ad5ca6d0270914b',
        //Information for returned object.
        cityWeather: {},
        //Used to identify if something was searched.
        searched: false,
        //Used to determine if user wants temperature in celsius (metric) or fahrenheit (imperial).
        temperatureUnit: 'imperial',
        //Used for combined search bar.
        totalSearch: '',
        cityWeatherDescription: ''

    }


    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.temperatureUnit !== this.state.temperatureUnit) {
            //Checking if zipCode or cityName aren't the default value of '', if they are we don't
            //try to update search. If either of them are filled, then we can attempt search.
            //This allows user to switch between C or F without having an error message pop up for
            //an empty search.
            if (this.state.zipCode !== '' || this.state.cityName !== '' ){
                this.search();
            }

        }

    }

    // getLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition);
    //     } else {
    //         alert("Geolocation is not supported by this browser.");
    //     }
    // }
    //
    // showPosition = (position) => {
    //     let userLatitude = position.coords.latitude;
    //     let userLongitude = position.coords.longitude;
    // }

    /**
     * This function accepts a string as an argument and will capitalize the first letter
     * of that string.
     * @param {String} passedString the string to be capitalized.
     *
     * @return {String} The passed string, but with the first letter capitalized.
     */
    capitalize = (passedString) => {
        let stringToReturn;
        let firstLetter = passedString.charAt(0).toUpperCase();
        stringToReturn = firstLetter + passedString.substr(1, passedString.length-1)
        return stringToReturn;
    }

    /**
     * This function will search for a city based on the variables in the state.
     */
    search = () => {
        if(this.state.zipCode !== '') {
            // this.findCityByZipCode(this.state.zipCode);
            WeatherServices.findCityByZipCode(this.state.zipCode, this.state.temperatureUnit)
                .then(results => this.setState({
                                               //TODO: change state using prevState.
                                               cityWeather: results
                                           }))
        } else if (this.state.cityName !== '' && this.state.stateName !== '') {
            WeatherServices.findCityByNameAndState(this.state.cityName, this.state.stateName, this.state.temperatureUnit)
                .then(results => this.setState({
                                               //TODO: change state using prevState.
                                               cityWeather: results
                                           }))
        } else if (this.state.cityName !== '' && this.state.stateName === '') {
            WeatherServices.findCityByName(this.state.cityName, this.state.temperatureUnit)
                .then(results => this.setState({
                                               //TODO: change state using prevState.
                                               cityWeather: results,
                                           }))
        } else {
            alert("You need to provide either a city name, city name and state name, or a zip code to search for weather results.")
        }
    }

    /**
     * This function calls the fetch function contained in the weatherServices class based on the
     * city name searched for by a user. It returns a JSON object in String form, containing weather
     * data for the searched city.
     * @param {String} cityName the name of the city being searched for.
     *
     * @return {String}         The weather data as a String.
     */
    findCityByName = (cityName) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.state.apiKey}&units=${this.state.temperatureUnit}`)
            .then(response => response.json())
            .then(results => this.setState({
                                               //TODO: change state using prevState.
                                               cityWeather: results,
                                               cityWeatherDescription: results.weather[0].description.charAt(0).toUpperCase()
                                           }))
        // .then(resultsTwo => console.log(resultsTwo))

    }

    /**
     * This function calls the fetch function contained in the weatherServices class based on the
     * city name and state name searched for by a user. It returns a JSON object in String form,
     * containing weather data for the searched city.
     * @param {String} cityName the name of the city being searched for.
     * @param {String} stateName the name of the State the city resides in.
     *
     * @return {String}         The weather data as a String.
     */
    findCityByNameAndState = (cityName, stateName) => {
        //Need to specify country ID otherwise it may not find a result in the United States.
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&appid=${this.state.apiKey}&units=${this.state.temperatureUnit}`)
            .then(response => response.json())
            .then(results => this.setState({
                                               //TODO: change state using prevState.
                                               cityWeather: results
                                           }))
        // .then(resultsTwo => console.log(resultsTwo))
    }

    /**
     * This function calls the fetch function contained in the weatherServices class based on the
     * zip code searched for by a user. It returns a JSON object in String form, containing weather
     * data for the searched city (searched by zip code).
     * @param {String} zipCode the zip of the city being searched for.
     *
     * @return {String}         The weather data as a String.
     */
    findCityByZipCode = (zipCode) => {
        //API defaults to US as country code, don't need to specify it.
        //Specifying was also causing issues with the fetch request.
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${this.state.apiKey}&units=${this.state.temperatureUnit}`)
            .then(response => response.json())
            // .then(results => console.log(results))
            .then(results => this.setState({
                                               //TODO: change state using prevState.
                                               cityWeather: results
                                           }))
    }

    render() {
        return (
            <div className="city-search-page row">

                <div className="search-bar-input-temp-unit-div row"> {/*div containing the temperature unit / search bar /search button*/}
                    <select className="unit-select custom-select col-sm-2 col-2"
                            onChange={(e) => {
                                this.setState({
                                                  temperatureUnit: e.target.value
                                              })
                            }}
                            value={this.state.temperatureUnit}>
                        <option value="metric">&#8451;</option>
                        <option value="imperial">&#8457;</option>
                    </select>
                    <br/>

                    <input type="text"
                           placeholder="City Name, State or Zip Code"
                           className="search-bar col-sm-6 col-6 form-control"
                        //TODO change setState to use prevState.
                           onChange={(e) => {
                               //will be used to determine if input is characters or digits.
                               let numberRegex = /^[0-9]+$/;
                               let searchInput = e.target.value;
                               //remove whitespaces from input
                               searchInput = searchInput.trim();
                               //separate input according to comma.
                               let splitArray = searchInput.split(",");
                               let cityName = '';
                               let stateName = '';
                               let zipCode = '';
                               //If splitArray is greater than length 1, then there SHOULD be a city
                               //name and state.
                               //if length is 1 and the input value isn't digits, then it SHOULD be a
                               //city name
                               //if length is 1 and the input value is digits, then it SHOULD be a zip
                               //code.
                               if (splitArray.length > 1) {
                                   cityName = splitArray[0];
                                   stateName = splitArray[1];
                               } else if (splitArray.length === 1 && !splitArray[0].match(numberRegex)) {
                                   cityName = splitArray[0];
                               } else if (splitArray.length === 1) {
                                   zipCode = splitArray[0];
                               }
                               this.setState({
                                                 totalSearch: e.target.value,
                                                 cityName: cityName,
                                                 stateName: stateName,
                                                 zipCode: zipCode
                                             })
                           }}
                           value={this.state.totalSearch}/>
                    <br/>

                    <button
                        className="col-sm-3 col-3 search-button btn"
                        onClick={ () => {
                            this.search();
                            this.setState({
                                              searched: true
                                          })
                        }}>
                        Search
                    </button>
                    <br/>
                </div> {/*div containing the temperature unit / search bar /search button*/}

                {this.state.cityWeather.message && this.state.searched &&
                 <div>
                     {alert(this.state.cityWeather.message)}
                     {/*Reset cityWeather after providing the alert. Otherwise alert gets called
                     whenever search bar is modified until a valid search parameter is given. */}
                     {this.setState({
                                        cityWeather: {}
                                    })}
                 </div>
                }

                {this.state.searched && this.state.cityWeather && this.state.cityWeather.main &&
                 <div className="row city-weather-info">
                     <div className="col-6 city-weather location-text text">
                         <h1>
                             Location:
                         </h1>
                     </div>
                     <div className="col-6 city-weather-name city-weather">
                         <h1>
                             {this.state.cityWeather.name}
                         </h1>
                     </div>

                     <div className="col-6 city-weather description-text text">
                         <h1>
                            Condition:
                         </h1>
                     </div>

                     <div className="col-6 city-weather-description city-weather">
                         <h1>
                             {this.capitalize(this.state.cityWeather.weather[0].description)}
                             <img className="weather-image" src={`http://openweathermap.org/img/wn/${this.state.cityWeather.weather[0].icon}@2x.png`}/>

                         </h1>

                     </div>

                     <div className="col-6 city-weather temperature-text text">
                         <h1 >
                             Temperature:
                         </h1>

                     </div>

                     <div className="col-6 city-weather-current-temperature city-weather">

                         <h1>
                             Current: {this.state.cityWeather.main.temp}&#176;
                         </h1>
                     </div>
                    <div className="col-6 city-weather">
                    </div>
                     <div className="col-6 city-weather-feels-temperature city-weather">
                         <h1>
                             Feels Like: {this.state.cityWeather.main.feels_like}&#176;
                         </h1>
                     </div>
                     <div className="col-6 city-weather">
                     </div>
                     <div className="col-6 city-weather-temperature-max city-weather">
                         <h1>
                             Max: {this.state.cityWeather.main.temp_max}&#176;

                         </h1>
                     </div>

                     <div className="col-6 city-weather">
                     </div>
                     <div className="col-6 city-weather-temperature-min city-weather">
                         <h1>
                             Min: {this.state.cityWeather.main.temp_min}&#176;
                         </h1>
                     </div>
                     <div className="col-6 city-weather text">
                         <h1>
                             Humidity:
                         </h1>
                     </div>
                     <div className="col-6 city-weather city-weather-humidity">
                         <h1>
                             {this.state.cityWeather.main.humidity}%
                         </h1>
                     </div>

                 </div>
                }
            </div>
        )
    }

}

