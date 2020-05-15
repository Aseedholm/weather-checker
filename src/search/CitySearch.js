import React from "react";
import {Link} from "react-router-dom";

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
        stateName: ' ',
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
        totalSearch: ''
    }


    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.temperatureUnit !== this.state.temperatureUnit) {
            this.search();
        }

    }

    /**
     * This function will search for a city based on the variables in the state.
     */
    search = () => {
        if(this.state.zipCode !== '') {
            this.findCityByZipCode(this.state.zipCode)
        } else if (this.state.cityName !== '' && this.state.stateName !== '') {
            this.findCityByNameAndState(this.state.cityName, this.state.stateName)
        } else if (this.state.cityName !== '' && this.state.stateName === '') {
            this.findCityByName(this.state.cityName)
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
                                               cityWeather: results
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
            <div>
                <h1>
                    SEARCH PAGE
                </h1>
                <select className="state-select"
                        onChange={(e) => {
                            this.setState({
                                              temperatureUnit: e.target.value
                                          })
                        }}
                        value={this.state.temperatureUnit}>
                    <option value="metric">Celsius</option>
                    <option value="imperial">Fahrenheit</option>
                </select>
                <br/>

                <input type="text"
                       placeholder="City Name"
                       className="city-name-input"
                    //TODO change setState to use prevState.
                       onChange={(e) => this.setState({
                                                          cityName: e.target.value
                                                      })}
                       value={this.state.cityName}/>

                {/*Found at https://www.freeformatter.com/usa-state-list-html-select.html*/}
                <select className="state-select"
                        onChange={(e) => {
                            this.setState({
                                stateName: e.target.value
                                          })
                        }}
                        value={this.state.stateName}>
                    <option value=''></option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>

                <input type="text"
                       placeholder="Zip Code"
                       className="zip-code-input"
                    //TODO change setState to use prevState.
                       onChange={(e) => this.setState({
                                                          zipCode: e.target.value
                                                      })}
                       value={this.state.zipCode}/>

                <input type="text"
                       placeholder="City Name, State or Zip Code"
                       className="search-bar input-group"
                    //TODO change setState to use prevState.
                       onChange={(e) => {
                           let numberRegex = /^[0-9]+$/;
                           let searchInput = e.target.value;
                           searchInput = searchInput.trim();
                           let splitArray = searchInput.split(",");
                           let cityName = '';
                           let stateName = '';
                           let zipCode = '';
                           if (splitArray.length > 1) {
                               cityName = splitArray[0];
                               stateName = splitArray[1];
                           } else if (splitArray.length === 1 && !splitArray[0].match(numberRegex)) {
                               cityName = splitArray[0];
                           } else if (splitArray.length === 1) {
                               zipCode = splitArray[0];
                           }
                           console.log("CITY", cityName);
                           console.log("STATE", stateName);
                           console.log("ZIP CODE", zipCode);
                        this.setState({
                            totalSearch: e.target.value,
                            cityName: cityName,
                            stateName: stateName,
                            zipCode: zipCode
                                      })
                       }}
                       value={this.state.totalSearch}/>
                <br/>

                <button onClick={ () => {
                    this.search();
                    this.setState({
                        searched: true
                                  })
                }}>
                    Search
                </button>
                <br/>


                {this.state.searched && this.state.cityWeather && this.state.cityWeather.main &&
                 <div>
                    <h1>
                        City Name: {this.state.cityWeather.name}

                    </h1>
                     <h1>
                         Weather Description: {this.state.cityWeather.weather[0].description}
                     </h1>
                     <h1>
                         Current Temperature: {this.state.cityWeather.main.temp}
                     </h1>
                     <h1>
                         Temperature feels like: {this.state.cityWeather.main.feels_like}
                     </h1>
                     <h1>
                         Temperature Max: {this.state.cityWeather.main.temp_max}
                     </h1>
                     <h1>
                         Temperature Min: {this.state.cityWeather.main.temp_min}
                     </h1>
                     <h1>
                         Humidity: {this.state.cityWeather.main.humidity}%
                     </h1>
                     <h1>
                         Weather Description: <img src={`http://openweathermap.org/img/wn/${this.state.cityWeather.weather[0].icon}@2x.png`}/>
                     </h1>
                 </div>

                }
            </div>
        )
    }

}
