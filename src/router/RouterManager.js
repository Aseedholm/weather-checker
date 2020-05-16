import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import CitySearch from "../search/CitySearch";
import PageHeader from "../page-header/PageHeader";
import './RouterManager.css'
/**
* This class represents the navigation for the Weather Checker web application. The navigation uses
* React-Router-Dom and will route to the City search page and the Weather details page.
*/
export default class RouterManager extends React.Component {
    render() {
        return (
            <div className="router-body">
                <PageHeader/>
                <BrowserRouter>
                    <Route
                        path="/"
                        exact={true}
                        component={CitySearch}
                    />
                </BrowserRouter>

            </div>
        )
    }
}
