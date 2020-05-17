import React from "react";
import './CitySearch.css'

import WeatherServices from "../service/WeatherServices";

/**
 * This class represents the search functionality/results of the Weather Checker web application.
 * It will accept search parameters such as city/state or zip code and then make an API call to get
 * the weather results for the provided information.
 */
export default class CitySearch extends React.Component {

    //Will give access to URL information.
    constructor(props) {
        super(props);
        this.state = {
            //Search field works by itself, cannot guarantee correct city.
            cityName: '',
            //Search field only works in conjunction with city.
            stateName: '',
            //Search field works by itself
            zipCode: '',
            //Information for returned object.
            cityWeather: {},
            //Used to identify if something was searched.
            searched: false,
            //Used to determine if user wants temperature in celsius (metric) or fahrenheit (imperial).
            temperatureUnit: 'imperial',
            //Used for combined search bar.
            totalSearch: '',
            longitude: '',
            latitude: ''
        };
    };


    componentDidMount() {
        /*Used below link to get geolocation.
            https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
        */
        if ("geolocation" in navigator) {
            //Third parameter for getCurrentPosition
            //Can set age for how long data is kept for user.
            let options = {
                //If true will cause greater power/resource consumption. Don't need pinpoint accuracy.
                enableHighAccuracy: false,
                //maximum amount of time device can take prior to returning a position (in milliseconds).
                timeout: 20000,
                //maximumAge in milliseconds that geolocation information is kept.
                //86400000 = 1 day in milliseconds.
                maximumAge: 86400000
            };
            navigator.geolocation.getCurrentPosition(this.locationFound, this.locationNotFound, options);
            this.setState({
                searched: true
                          })
        } else {
            console.log("Not Available");
        }
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

    /**
     * This function is called when navigator.geolocation.getCurrentPosition successfully finds a
     * location. It will then make a fetch request using WeatherService to get the weather
     * information based on the longitude and latitude of the user.
     *
     * @param position  position information of the user.
     */
    locationFound = (position) => {
        WeatherServices.findCityByLongitudeAndLatitude(position.coords.longitude, position.coords.latitude, this.state.temperatureUnit)
            .then(results => this.setState({
                cityWeather: results,
                cityName: results.name,
               longitude: position.coords.longitude,
               latitude: position.coords.latitude
                                           }));
    };

    /**
     * This function is called when navigator.geolocation.getCurrentPosition is unsuccessful. It
     * provides a message in console for developer to know if approval for geolocation settings was
     * blocked.
     */
    locationNotFound = () => {
        console.log("Denied approval.");
    };

    /**
     * This function accepts a string as an argument and will capitalize the first letter
     * of that string.
     *
     * @param {String}  passedString    the string to be capitalized.
     *
     * @return {String}                 the passed string, but with the first letter capitalized.
     */
    capitalize = (passedString) => {
        let stringToReturn;
        let firstLetter = passedString.charAt(0).toUpperCase();
        stringToReturn = firstLetter + passedString.substr(1, passedString.length-1);
        return stringToReturn;
    };

    /**
     * This function will search for a city based on the variables in the state. It will try to use
     * zip code first, if no zip code has been provided it will see if city/state information has
     * been provided. If city/state have no been provided, it will attempt to search based on just
     * city. If no information has been provided and a search was attempted it will notify the user
     * that valid information need to be provided via an alert message.
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
                                               cityWeather: results
                                           }))
        } else {
            alert("Please enter a valid input. Please provide either a [city name], "
                  + "[city name, state name], or a [zip code] to search for weather results. Do not"
                  + "include [] as part of the search.")
        }
    };

    render() {
        return (
            <div className="city-search-page row">
                {/*div containing the temperature unit / search bar /search button*/}
                <div className="search-bar-input-temp-unit-div row">
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

                {/* BEGIN ->Rendering of data from API after a search has been conducted and
                cityWeather information is available.*/}
                {this.state.searched && this.state.cityWeather && this.state.cityWeather.main &&
                 <div className="row city-weather-info">
                     <div className="col-6 city-weather location-text text"> {/*Left column*/}
                         <h1 className="text-responsive">
                             Location:
                         </h1>
                     </div>
                     <div className="col-6 city-weather-right-column-no-color city-weather"> {/*Right column*/}
                         <h1 className="text-responsive">
                             {this.state.cityWeather.name}
                         </h1>
                     </div>

                     <div className="col-6 city-weather description-text text"> {/*Left column*/}
                         <h1 className="text-responsive">
                            Condition:
                         </h1>
                     </div>

                     {this.state.cityWeather.weather &&
                      <div className="col-6 city-weather-right-column-no-color city-weather"> {/*Right column*/}
                          {this.state.cityWeather.weather.map( (condition, index) =>

                              <div className="row-cols-6 condition-image-text" key={index}>
                                      <h1 className="text-responsive condition-text ">
                                          {this.capitalize(condition.description)}
                                      </h1>
                                      <h3>
                                          {/*src is provided by Weather API. alt is provided by
                                            https://via.placeholder.com/50 --free placeholder images.*/}
                                          <img className="weather-image" src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`} alt={`https://via.placeholder.com/50`}/>
                                      </h3>

                              </div>
                          )}
                      </div>
                     }

                     <div className="col-6 city-weather temperature-text text"> {/*Left column*/}
                         <h1 className="text-responsive">
                             Temperature:
                         </h1>

                     </div>

                     <div className="col-6 city-weather city-weather-right-column-color"> {/*Right column*/}

                     </div>


                    <div className="col-6 city-weather temperature-categories-text">{/*Left column*/}
                        <h1 className="text-responsive">
                            Current:
                        </h1>
                    </div>

                     <div className="col-6 city-weather-right-column-color city-weather"> {/*Right column*/}

                         <h1 className="text-responsive">
                             {this.state.cityWeather.main.temp}&#176;
                         </h1>
                     </div>

                     <div className="col-6 city-weather temperature-categories-text">{/*Left column*/}
                         <h1 className="text-responsive">
                             Feels:
                         </h1>
                     </div>

                     <div className="col-6 city-weather-right-column-color city-weather"> {/*Right column*/}
                         <h1 className="text-responsive">
                             {this.state.cityWeather.main.feels_like}&#176;
                         </h1>
                     </div>
                     <div className="col-6 city-weather temperature-categories-text"> {/*Left column*/}
                        <h1 className="text-responsive">
                            Max:
                        </h1>
                     </div>
                     <div className="col-6 city-weather-right-column-color city-weather"> {/*Right column*/}
                         <h1 className="text-responsive">
                             {this.state.cityWeather.main.temp_max}&#176;

                         </h1>
                     </div>

                     <div className="col-6 city-weather temperature-categories-text"> {/*Left column*/}
                         <h1 className="text-responsive">
                             Min:
                         </h1>
                     </div>
                     <div className="col-6 city-weather-right-column-color city-weather"> {/*Right column*/}
                         <h1 className="text-responsive">
                             {this.state.cityWeather.main.temp_min}&#176;
                         </h1>
                     </div>
                     <div className="col-6 city-weather text"> {/*Left column*/}
                         <h1 className="text-responsive">
                             Humidity:
                         </h1>
                     </div>
                     <div className="col-6 city-weather city-weather-right-column-no-color"> {/*Right column*/}
                         <h1 className="text-responsive">
                             {this.state.cityWeather.main.humidity}%
                         </h1>
                     </div>

                     {/*Verify that clouds data is available.*/}
                     {this.state.cityWeather.clouds &&
                            <div className="col-6 city-weather text"> {/*Left column*/}
                                <h1 className="text-responsive" >
                                    Cloud Coverage:
                                </h1>
                            </div>

                     }
                     {this.state.cityWeather.clouds &&
                      <div className="col-6 city-weather city-weather-right-column-no-color"> {/*Right column*/}
                         <h1 className="text-responsive"> {/**/}
                            {this.state.cityWeather.clouds.all}%
                         </h1>
                     </div>

                     }


                 </div>
                }
                {/* END ->Rendering of data from API after a search has been conducted and cityWeather
                 information is available.*/}
            </div>
        )
    }

}

