# Simple Weather

A web application for displaying weather forecast information, with support for phones, tablets, laptops/desktops.

## Table of contents

- [Features](#features)
- [Showcase](#showcase)
- [Demo](#demo)
- [Technologies](#technologies)

## Features

- Display current, daily or hourly weather forcast
- Choose between metric (°C, km/h, mm), imperial (°F, mph, in) or scientific (°K, m/s, mm) units
- Choose between light or dark theme
- Units and theme preferences are stored using cookies
- Supports layouts for phones, tablets and laptops/desktops
- Search suggestions for different locations that share the same name
- Recent searched locations

## Showcase

| iPhone 4                         | iPhone 5, SE                            | iPhone 6, 7, 8                             |
| -------------------------------- | --------------------------------------- | ------------------------------------------ |
| ![iPhone 4](images/iPhone_4.jpg) | ![iPhone 5, SE](images/iPhone_5_SE.jpg) | ![iPhone 6, 7, 8](images/iPhone_6_7_8.jpg) |

| iPhone 6, 7, 8 Plus                                  | iPhone X                         | Samsung Galaxy S8                                   |
| ---------------------------------------------------- | -------------------------------- | --------------------------------------------------- |
| ![iPhone 6, 7, 8 Plus](images/iPhone_6_7_8_Plus.jpg) | ![iPhone X](images/iPhone_X.jpg) | ![Samsung Galaxy S8 ](images/Samsung_Galaxy_S8.jpg) |

| iPad                     | iPad PRO                         |
| ------------------------ | -------------------------------- |
| ![iPad](images/iPad.jpg) | ![iPad PRO](images/iPad_Pro.jpg) |

| Laptop/Desktop                               |
| -------------------------------------------- |
| ![Laptop/Desktop](images/Laptop-Desktop.png) |

| OpePlus 7T - Light Mode                         | OnePlus 7T - Dark Mode                        |
| ----------------------------------------------- | --------------------------------------------- |
| ![OpePlus 7T - Light Mode](images/Light_7T.jpg) | ![OpePlus 7T - Dark Mode](images/Dark_7T.jpg) |

## Demo

<!-- Mobile demo: -->

![Mobile demo](images/iphone_v3.gif)

<!-- Tablet/Laptop/Desktop demo: -->

![Tablet/Laptop/Desktop demo](images/laptop_v3.gif)

## Technologies

Project is created with:

- Core:
  - [ReactJS](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [Axios ](https://www.npmjs.com/package/axios)
- Styling:
  - [Material UI](https://material-ui.com/)
  - [Weather Icons](https://erikflowers.github.io/weather-icons/)
- State managment:
  - [Redux](https://redux.js.org/)
  - [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- Other:
  - [Luxon](https://moment.github.io/luxon/)
  - [Universal Cookie](https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie#readme)
- APIs:
  - [OpenWeather](https://openweathermap.org/api)
- Tools:
  - [Postman](https://www.postman.com/)
  - [Google Chrome](https://www.google.com/chrome/)
  - [Responsively App](https://responsively.app/)
  - [VS Code](https://code.visualstudio.com/)

## What would I do differently?

- Make a more granular plan, and stick to it (feature creep is real)
- Create more structured and concise Git commit messages
- Use Storybook for independent component creation
- Use Styled Components for more granular and structured design
- Make components more reusable
