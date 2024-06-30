# Lendsqr Front-End Application


## Overview


This application is a comprehensive user management system designed for financial institutions to manage user data, including personal information, employment details, social media links, and financial transactions. Built with Next.js, the application leverages modern web technologies to provide a seamless and efficient user experience.


## Features

- **User Dashboard**: Displays an overview of user statistics, including total users, active users, users with loans, and users with savings. It provides quick access to detailed user profiles and management options.


- **User Details**: Each user's detailed information can be accessed, including personal information, education, employment, social media accounts, and guarantor details. Users can be activated or blacklisted directly from their profile.


- **Dynamic User Data Generation**: The system includes a utility to generate random user data for testing and demonstration purposes.


- **Responsive Design**: The application is fully responsive, ensuring it works well on devices of all sizes from desktops to mobile phones.


- **Sidebar Navigation**: Includes a comprehensive sidebar with navigation links to different sections of the application like Dashboard, Users, Loans, Savings, and Settings.



## Technical Details


### Technologies Used

- **Next.js**: A React framework that enables functionality such as server-side rendering and generating static websites.


- **TypeScript**: Used for adding static type definitions to enhance code quality and understandability.


- **SCSS**: Used for styling components in a modular, maintainable way.


- **React Icons**: Utilized for adding icons across the application, enhancing the UI's aesthetic and usability.

- **React Toastify**: Implemented React Toastify for efficient notification update


### Setup and Installation

1. **Clone the repository:**
   git clone https://github.com/your-repository/lendsqr-fe-test.git


2. **Navigate to the project directory:**
   cd lendsqr-fe-test


3. **Install dependencies:**
   npm install
   
   or if you use Yarn:
    yarn install


4. **Run the development server:**
   npm run dev

   or
    yarn dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


5. **Build for production:**
   npm run build

   or
   yarn build



### Code Structure

- **Components**: Reusable UI components are stored under `components/`, including tables, modals, and layout components.   


- **Pages**: The `app/` directory contains page components like the dashboard and user details page, leveraging Next.js's file-based routing.


- **Styles**: SCSS modules are used for component-specific styling located in the same directory as their respective components.


- **Utilities**: Helper functions scripts are located in `lib/`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



## Contributing

Contributions are welcome! Please feel free to submit a pull request or open issues to improve the application or documentation.


## License

This project is licensed under the MIT License - see the LICENSE file for details.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


