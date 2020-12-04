# Flight Movement App (Front-end)

`Live:` https://devchia254-fma-v1.herokuapp.com/

![App Snapshot](./readme_assets/homepage.gif)

This web app is designed to be an online Flight Display Information System like at airports. It is a dashboard that provides general information on monitoring flight statuses of the day. The dashboard also shows weather forecasts and additional information such as Flight Safety.

As a system, users can be registered to be able to schedule flights.

This is the source code of the **Front-end**.
To see the Back-end, [**click here**](https://github.com/devchia254/flight-movement-backend-v1).

## Guide

Register as a user and login to the app to be able to schedule flights, and it will then be displayed on the homepage (if within the range of +-3 days from today).

## Info

- Flights only show a 7-day coverage (Today +-3days)
- Since this is meant to be a dashboard displayed on a large TV for people to observe, a carousel with a self-timer (20 secs) was implemented on the homepage to cater this experience.
- This Front-end was built using React.
- This Full-Stack App is hosted on Heroku using the Free and Hobby Plan (Since it is free, expect a slight delay connecting to the server)
- It is Mobile Responsive.

## Purpose

- Build a Full-Stack CRUD application.
- Solidify my React knowledge and broaden my Full-Stack skills and technologies.
- Develop a project based on client requirements, with the consideration of security practices.

## Features

- User login and registration system that uses JWT Authentication.
- JWT is stored in Local Storage and HTTP Requests handled by Axios.
- Project structured using React Router, with protected routes.
- Forms are created using Formik and validation with Yup.
- Components styled with Material-UI
- Dynamic Navigation Bar based on type of user (Public i.e. No User, User or Admin)
- Weather Forecast fetched from OpenWeatherMap API

## Project Structure

### Source folder Structure

#### Assets

Contains weather fonts and icons, homepage images, and custom theme.

#### Components

Contains either reusable components or components that do not belong to a specific page/route. Custom and protected routes are stored here.

#### Containers

The file structure is based on their routes and each file contain its main parent component and its respective child components. The parent components are stateful meaning they provide state, data, and actions to their child components via props, and also contain side effects.

#### Services

This folder contains functions and classes that handles all of the HTTP requests/responses to the backend.

### Project Flow: React Router, Axios & Local Storage

![Router & Axios Flow](./readme_assets/routerandaxios.png)

The diagram above shows the communication between the Containers and Services(auth). This gives a general idea on how the React components are performing HTTP requests to interact with the Back-End.

#### Containers

- `App` component is the container for React Router (BrowserRouter). It also manages the state for the `NavBar` and `Drawer` components to display the appropriate links based on the type of user.
- `Homepage`, `RegisterPage` , `LoginPage` are components that can be accessed without being a user.
- `SchedulePage` and `UserMgmtPage` are protected routes and only users are able to access these components.

#### Services

- All files serve its specific purpose when performing HTTP requests using Axios.
- `auth-public` fetches flights for the `Homepage` table.
- `auth-service` handles the requests for registering and logging in the user, and more.
- `auth-schedule` handles the CRUD operations for the user when scheduling a flight.
- `auth-admin` is strictly for Admin to manage all users in the app.
- Both `auth-schedule` and `auth-admin` use `auth-header` to retrieve the JWT from the Local Storage and subsequently attach it as a header for their HTTP requests.

## Yarn Dev Packages

A brief description of the packages used below:

- `@material-ui/core` uses Material-UI for styling React Components.
- `@material-ui/pickers` is a Date & Time picker that uses Material-UI.
- `moment` uses Moment.js as a date management library.
- `material-table` is a react data table for Material-UI.
- `notistack` is a snackbar library for displaying notifications to users.
- `formik` is a library for handling React Forms.
- `yup` works in conjunction with formik by providing client-side form validation.
- `typeface-...` are web font files.
- `serve` is used to create production builds for React apps.
- `react-router-dom` is used to implement routing in React apps.

```json
"dependencies": {
    "@date-io/moment": "1.x",
    "@material-ui/core": "^4.9.13",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/pickers": "^3.2.10",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "axios": "^0.20.0",
    "formik": "^2.1.4",
    "material-table": "^1.58.2",
    "moment": "^2.26.0",
    "notistack": "^1.0.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.1",
    "serve": "^11.3.2",
    "typeface-montserrat": "^1.1.13",
    "typeface-nunito": "^1.1.13",
    "typeface-quicksand": "^1.1.13",
    "yup": "^0.28.5"
}
```
