



● Live website URL link ————————> https://rafi-a11.netlify.app/





#
#

# FlavorFusion


# Restaurant Management Website 🍽


## Project Overview


Welcome to the Restaurant Management Website! This project aims to create a modern, user-friendly platform to enhance restaurant operations and improve customer experience. Built with the MERN stack (MongoDB, Express.js, React.js, and Node.js), it focuses on features like online food management, ordering, and staff coordination.

### Live Website
[Live Demo](https://rafi-a11.netlify.app/)

### GitHub Repositories
- [Client Repository](https://github.com/programming-hero-web-course2/b10a11-client-side-hasanRafi2002)
- [Server Repository](https://github.com/programming-hero-web-course2/b10a11-server-side-hasanRafi2002)

---

## Key Features

### Responsive Design 📱
- Fully responsive on mobile, tablet, and desktop.
- Optimized layouts with proper alignment and spacing.
- Pleasing color contrast for accessibility.

### Authentication System 🔒
- Email and password-based login and registration.
- Google login integration.
- Password validation:
  - Must include uppercase, lowercase letters.
  - Minimum length: 6 characters.
- Secure Firebase configuration and MongoDB credentials using environment variables.

### JWT Authentication 🔏
- Secure private routes using JWT.
- Tokens are stored on the client side for both email/password and social login.

### Theme Customization 🎨
- Light and dark mode toggle for a personalized experience.

### Navigation Bar 🌐
- Includes:
  - Website name/logo
  - Home, All Foods, Gallery, and Conditional Login/Logout.
  - Profile image dropdown for logged-in users with links to:
    - My Foods
    - Add Food
    - My Orders

### Dynamic Pages

#### Home Page (Public)
- **Banner Section**: Informative slider with a call-to-action button.
- **Top Foods Section**:
  - Displays top 6 best-selling food items.
  - Includes a details button for each item.
  - "See All" button navigates to All Foods page.
- **Extra Sections**: Two additional engaging sections to captivate visitors.

#### All Foods Page (Public)
- Search functionality to filter foods by name.
- Cards displaying all food items with essential details and a details button.
- Pagination to load items in batches of 9.

#### Single Food Page (Public)
- Comprehensive details of selected food items.
- **Purchase Count**: Tracks purchase frequency.
- **Purchase Button**: Disabled if item is out of stock or exceeds available quantity.

#### Food Purchase Page (Private)
- Form capturing:
  - Food Name, Price, Quantity
  - Buyer details (auto-filled from logged-in user info)
  - Current date as buying date
- Information stored in the database upon successful order.
- Success feedback via toast/alert.

#### Gallery Page (Public)
- A collection of at least 10 images with hover overlay and lightbox functionality.
- Infinite scrolling with animations for image loading.

#### My Foods Page (Private)
- Displays food items added by the logged-in user.
- Update functionality to modify food details securely.

#### Add Food Page (Private)
- Form to add food details including:
  - Name, Image, Category, Quantity, Price
  - Added by (user info), Food Origin, Short description
- Success feedback via toast/alert.

#### My Orders Page (Private)
- List of items ordered by the logged-in user.
- Displays:
  - Food details, purchase date (formatted with Moment.js)
  - Delete option to remove an item from the list.

---

## Deployment Guidelines 📞

### Server Deployment
- Ensure the server works flawlessly in production without throwing CORS, 404, or 504 errors.
- Secure the API endpoints with JWT and validate client-side requests.

### Client Deployment
- Ensure the live link works without errors on landing or reloading any route.
- Add domain authorization for Firebase if using platforms like Netlify or Surge.

---

## Technical Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase, JWT
- **Tools & Libraries**:
  - React Router
  - SweetAlert for notifications
  - Framer Motion for animations
  - Yet-Another-React-Lightbox for gallery
  - Moment.js for date formatting
  - Tanstack Query for API state management

---

## Development Process 🚀

1. **Commit Practices**:
   - 15 meaningful commits on the client side.
   - 8 meaningful commits on the server side.
   - Descriptive commit messages for easy tracking.
2. **Environment Setup**:
   - Firebase and MongoDB credentials stored securely in environment variables.
3. **Testing**:
   - Ensured no errors on reloading private routes.
   - Verified UI responsiveness across devices.
   - Checked JWT and authentication flows thoroughly.

---

## Optional Enhancements 💪

1. Spinner for loading states using CSS animations or libraries.
2. Filtering food items server-side using MongoDB’s `$and` and `$or` operators.
3. Backend pagination for improved performance.
4. Explore animations using Framer Motion.
5. Infinite scrolling for the gallery section.

---

## What I Learned 📚

1. Integrating secure authentication and JWT token management.
2. Building responsive UI using Tailwind CSS.
3. Implementing CRUD operations with MongoDB.
4. Using React Router for seamless navigation.
5. Deploying full-stack applications on production environments.
6. Leveraging React libraries like Framer Motion and Tanstack Query.

---

## How to Run Locally 📖

### Prerequisites
- Node.js
- MongoDB
- Firebase project setup

### Steps
1. Clone the repositories.
   ```bash
   git clone <client-repo-url>
   git clone <server-repo-url>
   ```
2. Install dependencies.
   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```
3. Set up environment variables.
   - Add `.env` files in both client and server directories.
4. Start the development servers.
   ```bash
   cd client
   npm start

   cd ../server
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the project.

---

Enjoy exploring the Restaurant Management Website! 😋
