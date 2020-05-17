import React from "react";
import './PageHeader.css'

/**
 * This function represents the top-banner for the Weather Checker website. It contains the
 * website's name and slogan.
 */
const PageHeader = () =>
    <div className="top-banner">
        <h1 className="title-top-banner">
            Weather Checker
        </h1>
        <br/>
        <h4 className="message-top-banner">
            Check the Weather!
        </h4>
    </div>;

export default PageHeader
