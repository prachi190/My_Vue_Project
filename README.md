
Introduction
Welcome to the Vue.js module developed as part of the second round of interviews for the hiring process. This module serves as a demonstration of skills in Vue.js using the options API structure, Form validations , and Vuex for state management.

Figma Design Specifications

The design specifications for this module can be found in the following Figma file: https://www.figma.com/file/YhbTw3A1UOGBg2iR8dnVS5/Project_management.?type=design&node-id=0-1&mode=design

File Structure
- assets/
  - images/
- components/
- plugins/
- router/
- store/
- services/
- App.vue
- main.js

File Structure Details
Assets: Contains static assets like images, fonts, and styles that are directly referenced in components or templates.

Components: Organized by purpose, with common components stored in the common directory, layout components in the layout directory, and view-specific components in the views directory.

Plugins: Houses Vue plugins and third-party integrations, such as Vuex or Vue Router plugins.

Router: Holds Vue Router configuration files, including route definitions and any route guards.

Store: Contains Vuex store modules for managing application state.

Services: Houses API services and utility functions for making HTTP requests to backend APIs.


App.vue: The root Vue component serving as the entry point for the application.

Main.js: The entry point for the Vue application where the Vue instance is instantiated and global settings or plugins are configured.


How to Run---

Clone this repository to your local machine.

Navigate to the project directory.

Install dependencies using npm install:-

1-npm install -g @vue/cli
2- cd directoryname/src
3- use npm i to install node dependencies

Run the development server using npm run serve.

Open your web browser and go to the provided localhost address to view the application.

To run db.json:-
1-If you haven't installed JSON Server globally, you can do so using npm:
npm install -g json-server
2-Navigate to the directory containing your db.json file and run JSON Server with the following command:
json-server --watch db.json


Contact Information
For any questions or concerns regarding this module, please contact [Prachi] at [prachiverma1908@gmail.com].

Acknowledgments
Special thanks to the hiring team for providing the opportunity to demonstrate skills and knowledge in Vue.js development.


All rights reserved to Prachi Verma @5-march-2024



