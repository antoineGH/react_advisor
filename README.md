# React Advisor

# Table of contents

1. [Project description](#description)
2. [Features](#features)
3. [Installation instructions](#installation)
4. [Project structure](#structure)
5. [Screenshots](#screenshots)

## 1. Project description<a name="description"></a>

Advisor enables travellers to browse interest points for a particular destination. They can use this application to organise their trip by checking the place rating, popularity, previewing a picture and find the location.

### [> View Technical Specifications Advisor](https://templars.guru/app/github/react_advisor/Specifications_Project_Advisor.pdf)

### Project Scope

Advisor is a programming project, that allows its developers to practice client-side programming using API calls.

### References

-   React - https://reactjs.org/
-   React Router - https://reactrouter.com/web/guides/quick-start
-   React Bootstrap - https://react-bootstrap.github.io/
-   React Spinners - http://www.davidhu.io/react-spinners/
-   React Promise Tracker - https://lemoncode.github.io/react-promise-tracker/React
-   Places Autocomplete - https://www.npmjs.com/package/react-places-autocomplete

## 2. Features<a name="features"></a>

The Advisor system provides simple mechanism for users to acquire information.

The following are the main features that are include in the system:

-   Cross Platform Support: Offer support for most of the known and commercial operating systems

-   Search: Search is based on Google Places API and city suggestions

-   Weather: Allows users to get the latest weather update for a specific destination and predictions on the next three days.

-   Interests: Provide users with a list of interests point to visit for a specific destination, each interest, would include more detailed information such as rating, location, picture.

-   Interest Map: The system allows users to check interests directly on a map for their destination.

## 3. Installation instructions<a name="installation"></a>

Versions:

-   Node: 14.15.1
-   Npm: 6.14.8
-   React: 17.0.1

Download code from Github:

```shell
git clone https://github.com/antoineratat/react_advisor.git
```

Navigate to project directory.

```shell
cd react_advisor
```

Install node modules.

```shell
npm install
```

Create .env

```shell
REACT_APP_AUTOCOMPLETE_API_KEY=yourKey
REACT_APP_MAP_API_KEY=yourKey
REACT_APP_FOURSQUARE_API_CLIENT_ID=yourKey
REACT_APP_FOURSQUARE_API_CLIENT_SECRET=yourKey
REACT_APP_OPENWEATHER_API_KEY=yourKey
```

Run the app in development mode. Open http://localhost:3000 to view it in the browser.

```shell
npm start
```

## 4. Project structure<a name="structure"></a>

![Components Screenshot](https://github.com/antoineratat/github_docs/blob/main/react_advisor/Components_Advisor.png?raw=true)

## 5. Screenshots<a name="screenshots"></a>

Main Result Page

![Components Screenshot](https://github.com/antoineratat/github_docs/blob/main/react_advisor/main_search.PNG?raw=true)

Quick Search Component

![Components Screenshot](https://github.com/antoineratat/github_docs/blob/main/react_advisor/quick_search_component.PNG?raw=true)

Weather Component

![Components Screenshot](https://github.com/antoineratat/github_docs/blob/main/react_advisor/weather_component.png?raw=true)
