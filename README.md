# FlavorFusion

### Live Website
[Live Demo](https://rafi-a11.netlify.app/)
# Restaurant Management Website 🍽


![FlavorFusion Screenshot](https://github.com/hasanrafi1122/photos/blob/main/ph-assignment/photo/asgn-11.png?raw=true)

## Project Overview

Welcome to the Restaurant Management Website! This project aims to create a modern, user-friendly platform to enhance restaurant operations and improve customer experience. Built with the MERN stack (MongoDB, Express.js, React.js, and Node.js), it focuses on features like online food management, ordering, and staff coordination.



### GitHub Repositories
- [Client Repository]
- [Server Repository]

## Key Features

### Responsive Design 📱
- Fully responsive on mobile, tablet, and desktop
- Optimized layouts with proper alignment and spacing
- Pleasing color contrast for accessibility

### Authentication System 🔒
- Email and password-based login and registration
- Google login integration
- Password validation:
  - Must include uppercase, lowercase letters
  - Minimum length: 6 characters
- Secure Firebase configuration and MongoDB credentials using environment variables

### JWT Authentication 🔏
- Secure private routes using JWT
- Tokens are stored on the client side for both email/password and social login

### Theme Customization 🎨
- Light and dark mode toggle for a personalized experience

### Navigation Bar 🌐
- Website name/logo
- Home, All Foods, Gallery, and Conditional Login/Logout
- Profile image dropdown for logged-in users with links to:
  - My Foods
  - Add Food
  - My Orders

### Dynamic Pages

#### Home Page (Public)
- Banner Section with informative slider and call-to-action button
- Top Foods Section:
  - Displays top 6 best-selling food items
  - Details button for each item
  - "See All" button navigates to All Foods page
- Two additional engaging sections

#### All Foods Page (Public)
- Search functionality to filter foods by name
- Cards displaying all food items with essential details
- Pagination (9 items per page)

#### Single Food Page (Public)
- Comprehensive food item details
- Purchase count tracking
- Smart purchase button functionality

#### Food Purchase Page (Private)
- Detailed purchase form with:
  - Food details (name, price, quantity)
  - Auto-filled buyer information
  - Automatic date stamping
- Database integration and success notifications

#### Gallery Page (Public)
- 10+ images with hover overlay
- Lightbox functionality
- Infinite scrolling with animations

#### My Foods Page (Private)
- User-specific food item management
- Secure update functionality

#### Add Food Page (Private)
- Comprehensive food addition form
- Success notifications

#### My Orders Page (Private)
- User-specific order history
- Moment.js formatted dates
- Order deletion capability

## Technical Stack

### Frontend
- React.js
- Tailwind CSS
- Firebase Authentication
- React Router DOM
- Tanstack Query

### Backend
- Node.js
- Express.js
- MongoDB
- JWT

### Additional Libraries
- Framer Motion
- SweetAlert
- Yet-Another-React-Lightbox
- Moment.js

## Development Process 🚀

### Version Control
- 15+ meaningful client-side commits
- 8+ meaningful server-side commits
- Descriptive commit messages

### Security
- Environment variable protection
- JWT implementation
- Secure authentication flows

## How to Run Locally 📖

### Prerequisites
- Node.js
- MongoDB
- Firebase project

### Installation Steps
1. Clone repositories:
   ```bash
   git clone <client-repo-url>
   git clone <server-repo-url>
   ```

2. Install dependencies:
   ```bash
   # Client setup
   cd client
   npm install

   # Server setup
   cd ../server
   npm install
   ```

3. Configure environment variables:
   - Create `.env` in client directory
   - Create `.env` in server directory

4. Start development servers:
   ```bash
   # Client
   cd client
   npm start

   # Server
   cd ../server
   npm run dev
   ```

5. Access at [http://localhost:3000](http://localhost:3000)

## Contributing
We welcome contributions! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.# FlavorFusion


