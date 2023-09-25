# Sunscreen Savvy
This is an in-progress full stack CRUD app that is a user-curated database of sunscreens. Users will be able to create accounts and log in to share reviews of sunscreens and create lists of their favorite products.


## Getting Started
1. Install npm packages with `npm install`
2. Navigate to the backend directory and start the server with `npm run dev`
3. Go to http://localhost:2003/
4. To see the UI built with React, navigate to the frontend directory and start it with `npm run dev`
5. Go to http://localhost:5173/


## Built With
- React
- Vite
- Tailwind CSS
- Express
- MongoDB + Mongoose
- Passport
- Multer
- Cloudinary


## How It's Made
I started this project concentrating on the backend, following the MVC (Model-View-Controller) structure to keep everything organized. I first created the back end directory with EJS (Embedded JavaScript) as the templating engine for a temporary user interface since it was faster for putting together basic pages to show functionality. I'm now building out the front end with React for a more visually appealing and responsive UI (see react branch). More details on how the back end and front end are being made coming soon!


## To Do
- [ ] Complete React front end
- [ ] Add tests with Jest
- [ ] Sunscreen detail page component
- [ ] Autocomplete product search with jQuery
- [ ] Sort and filter product search
- [ ] Product reviews
- [ ] Search reviews with sort and filter
- [ ] Forgot/reset password option
- [ ] Email verification
- [ ] Save lists of products


## Project Problem Statement
It can be really challenging for some people looking to buy sunscreens to find trustworthy product reviews or reviews that address their specific needs/concerns. People often end up buying products that don't work for them, e.g. sunscreens that break them out, irritate their skin, or make them look like a chalky ghost.

With this database, consumers can gain more insight on which sunscreens will work for their specific needs, reducing the amount of time and money spent trying to find products and reducing with their environmental impact.
