<a name="top"></a>
# Sunscreen Savvy
A database of sunscreens where users will be able to search and filter for products, write reviews, and save favorites to their account.</p>

<div align="center">
    <h3>Live Site: https://sunscreen-savvy.onrender.com</h3>
    <img 
      src="https://res.cloudinary.com/dwo3u3n4h/image/upload/v1710365705/Savvy_slbiyz.gif" 
      alt="Gif of sunscreen products view with filters for form, type, spf, and price range"
      width="760px"
    >
</div>

### Table of Contents
- [How It's Made](#how-its-made)
  - [Authentication](#authentication)
  - [Database](#database)
  - [React Frontend](#react-frontend)
- [Getting Started](#getting-started)
- [Project Background](#project-background)



<a name="how-its-made"></a>
## How It's Made
<div align="center">
    <h3>Tech Used: JavaScript, React, Node.js, Express, MongoDB, Mongoose, Vite, Tailwind CSS, Passport.js</h3>
    <img 
      src="https://res.cloudinary.com/dwo3u3n4h/image/upload/v1710449156/Screenshot_2024-03-14_at_1.45.09_PM_nbytx0.png"       
      alt="Savvy home page hero and header"
      width="760px"
    >
</div>

I built this full-stack web app in Node.js and started with the MVC (Model-View-Controller) framework to organize my code. After building an MVP, I moved that code to the `backend` directory and created a React app in the `frontend` directory.

The app implements a REST API that enables the frontend to interact with backend services through HTTP requests. In `backend/routes/main.js`, each route is associated with a specific controller file and function responsible for executing the relevant logic. 

For example, all endpoints related to user authentication are directed to `backend/controllers/auth.js`, which contains different functions for user authentication tasks such as signing up, logging in, and logging out. It also has functions for rendering EJS (Embedded JavaScript templating language) views that were used for the MVP — they now serve as admin webpages that users can log in to and access a form for adding sunscreens to the database.

<p align="right">(<a href="#top">back to top</a>)</p>


<a name="authentication"></a>
### Authentication
I configured [Passport.js](https://www.passportjs.org) middleware in `backend/config/passport.js` and used their [local strategy](https://www.passportjs.org/packages/passport-local/) to verify users' login credentials against those stored in the database. The app uses Passport's built-in session strategy to authenticate sessions from page to page, with `express-session` middleware for login session support. 

For creating user accounts, the auth controller's `postSignup` function checks the database for existing user accounts and saves  new user data to the database. The [`validator`](https://www.npmjs.com/package/validator)  library sanitizes and normalizes email addresses in addition to validating user input. If there are any errors when signing up or logging in (e.g. wrong password, invalid email format, username already taken, etc.), appropriate error messages are sent to the user.

<p align="right">(<a href="#top">back to top</a>)</p>


<a name="database"></a>
### Database
I chose to use MongoDB since it allows for more flexibility than a SQL database. Although this app is currently focused on sunscreen products, the product roadmap includes expanding to other skincare product types, each with different properties. Using Mongoose alongside MongoDB empowered me to design a data model with schemas that ensure data integrity and validation — while retaining adaptability for new product types and other changes in future iterations.

The schemas in the `backend/models` folder include models for sunscreen products, brands, and users. The `User.js` model uses the [`bcrypt`](https://www.npmjs.com/package/bcrypt) library to hash and salt passwords. Since the `Sunscreen.js` model needed to include product images, I used [`multer`](https://www.npmjs.com/package/multer) middleware to handle `multipart/form-data` and allow users to upload image files through the admin-side form for adding sunscreens to the database. The image files are then uploaded to [Cloudinary](https://cloudinary.com/), which provides a URL for each image that can be saved as a string in MongoDB with the sunscreen schema.
<p align="right">(<a href="#top">back to top</a>)</p>


<a name="react-frontend"></a>
### React Frontend
I wireframed and designed frontend webpages in Figma and built them with React, using Vite for the development environment. Upon initialization, the `frontend/src/App.jsx` component fetches user data via an Axios HTTP request to the backend server and stores it for global access using React Context API. The app's login, logout, and sign up buttons are conditionally rendered depending on the user's authentication status.  

For a faster user experience, [React Router](https://reactrouter.com/en/main) is used for client-side routing. The main components of the application include pages for user authentication and displaying product lists, with a `Layout` component applied to all pages through nested routes. The component uses React Router's `<Outlet>` to render child route elements and `flex-grow` to ensure it fits the content for each page.

The `Sunscreens` component manages the display and filtering of sunscreen products by making API requests to the backend server. By leveraging query parameters that can handle AND and OR logic (e.g. a mineral sunscreen that is a lotion or a spray), users can filter products based on sunscreen type, form, SPF, and price range. The component also provides functionality for users to remove selected filters. The displayed sunscreens dynamically update based on the filters, providing an interactive user experience for exploring products.

For styling, I used Tailwind CSS with a customized, accessible color palette — along with custom base and component layers. A combination of grid and flexbox makes the UI fully responsive for all mobile, tablet, and desktop screen sizes. On mobile and smaller tablet screens, the `Header` main nav menu that appears at the top of pages on desktop is replaced by a slide-out menu.

<p align="right">(<a href="#top">back to top</a>)</p>



<a name="getting-started"></a>
## Getting Started
1. Install npm packages
```
npm install
```
2. Go to the backend directory and create a .env file in the config folder with the environment variables below. 
```
cd backend
cd config
touch .env
```
You will need a MongoDB account and a Cloudinary account. For [MongoDB](https://www.mongodb.com), add your connection string to DB_STRING. For [Cloudinary](https://cloudinary.com), add your Cloud Name, API key, and API secret.
```
PORT = 2003
ORIGIN = http://localhost:5173
DB_STRING = 
CLOUD_NAME = 
API_KEY = 
API_SECRET = 
```
3. In the backend directory, start the server.
```
npm run dev
```
4. Open another terminal window, navigate to the frontend directory, and start that server.
```
cd frontend
npm run dev
```
5. Go to http://localhost:5173/

<p align="right">(<a href="#top">back to top</a>)</p>



<a name="project-background"></a>
## Project Background
The sun care products market in the United States generated over [$1.7 billion in revenue](https://finance.yahoo.com/news/sun-care-market-worth-usd-163000565.html) in 2020, and is estimated to reach $3 billion by 2031. In order to meet growing consumer demand, companies are developing more products than ever.

It can be really challenging for some people looking to buy a sunscreen to find trustworthy product reviews or reviews that address their needs and concerns. With the overwhelming volume of the sun care market, people often end up buying products that don't work for them — like sunscreens with ingredients that irritate their skin or look chalky on their skin tone.

With Savvy, consumers can gain more insight on which sunscreens will work for their specific needs, decreasing the amount of time and money spent trying to find products and reducing with their environmental impact. Read more on Savvy's [About](https://sunscreen-savvy.onrender.com/about) page.

<div align="center">
    <img 
      src="https://sunscreen-savvy.onrender.com/src/assets/savvy-logo-black.png" 
      alt="Savvy logo" 
      width="200px"
    >
</div>

<p align="right">(<a href="#top">back to top</a>)</p>
