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
        cityName: ' ',
        //Search field only works in conjunction with city.
        stateName: ' ',
        //Search field works by itself
        zipCode: ' ',
        //API key required by API for calls.
        apiKey: 'fb71a69f93b29d7c3ad5ca6d0270914b',
        //Information for returned object.
        cityWeather: {}
    }


    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.state.apiKey}`)
            .then(response => response.json())
            // .then(results => this.setState({
            //                                    //TODO: change state using prevState.
            //                                    cityWeather: results
            //                                }))
            .then(resultsTwo => console.log(resultsTwo))

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
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&appid=${this.state.apiKey}`)
            .then(response => response.json())
            // .then(results => this.setState({
            //                                    //TODO: change state using prevState.
            //                                    cityWeather: results
            //                                }))
            .then(resultsTwo => console.log(resultsTwo))
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
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${this.state.apiKey}`)
            .then(response => response.json())
            // .then(results => this.setState({
            //                                    //TODO: change state using prevState.
            //                                    cityWeather: results
            //                                }))
            .then(resultsTwo => console.log(resultsTwo))
    }

    /**
     * This function calls the fetch function contained in the weatherServices class based on the
     * city name, state name, and zip code searched for by a user. It returns a JSON object in
     * String form, containing weather data for the searched city.
     * @param {String} cityName the name of the city being searched for.
     * @param {String} stateName the name of the State the city resides in.
     * @param {String} zipCode the zip of the city being searched for.
     *
     * @return {String}         The weather data as a String.
     */
    findCityByNameAndStateAndZipCode = (cityName, stateName, zipCode) => {
        fetch(`api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&appid={your api key}&appid=${this.state.apiKey}`)
            .then(response => response.json())
            // .then(results => this.setState({
            //                                    //TODO: change state using prevState.
            //                                    cityWeather: results
            //                                }))
            .then(resultsTwo => console.log(resultsTwo))
    }


    render() {
        return (
            <div>
                <h1>
                    SEARCH PAGE
                </h1>
                <button onClick={ () => {
                    this.findCityByZipCode("02169")
                }}>
                    TESTING BUTTON ZIPCODE
                </button>
                <br/>

                <button onClick={ () => {
                    this.findCityByName("Brockton")
                }}>
                    TESTING BUTTON CITY NAME
                </button>
                <br/>

                <button onClick={ () => {
                    this.findCityByNameAndState("Chelsea", "MA")
                }}>
                    TESTING BUTTON CITY + STATE
                </button>
                <br/>

                <button onClick={ () => {
                    this.findCityByNameAndState("Auburn", "MA")
                }}>
                    TESTING BUTTON CITY + STATE + AUBURN
                </button>
                <br/>

            </div>
        )
    }

}
