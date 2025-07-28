# University Society Management System

This repository contains both the frontend and backend for the University Society Management System.

## Frontend

### Features

- **Society Registration Form** with comprehensive validation
- **Multi-step Form Process** with applicant details and society information
- **PDF Generation** for application download
- **Admin Panel** with Google OAuth authentication
- **Responsive Design** with Bootstrap components
- **Dark/Light Mode** toggle
- **Form Validation** using Formik and Yup

### Setup Instructions

#### 1. Prerequisites
- Node.js 16+ and npm
- Backend server running on `http://localhost:8080`

#### 2. Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd society-management-frontend

# Install dependencies
npm install
\`\`\`

#### 3. Configuration

Update the API base URL in `src/config/api.js` if needed:
\`\`\`javascript
const API_BASE_URL = 'http://localhost:8080/api';
\`\`\`

#### 4. Google OAuth Setup

Update the Google Client ID in `src/pages/admin/AdminLogin.jsx`:
\`\`\`javascript
const GOOGLE_CLIENT_ID = 'your-google-client-id';
\`\`\`

#### 5. Run the Application

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

The frontend application will be available at `http://localhost:3000`

### Project Structure

\`\`\`
src/
├── components/           # Reusable components
│   ├── admin/           # Admin panel components
│   ├── ApplicantDetails.jsx
│   ├── SocietyInfo.jsx
│   ├── SeniorTreasurer.jsx
│   └── ...
├── pages/               # Page components
│   ├── admin/          # Admin pages
│   ├── Home.jsx
│   ├── Registration.jsx
│   └── RegistrationForm.jsx
├── context/            # React context
├── config/             # Configuration files
└── App.jsx             # Main app component
\`\`\`

### Key Features

#### Society Registration
- Multi-step form with validation
- Dynamic field arrays for members and events
- PDF generation for applications
- Email notifications

#### Admin Panel
- Google OAuth authentication
- Dashboard with statistics
- Activity logging
- User management

#### Form Components
- Society Information
- Senior Treasurer Details
- Advisory Board Members
- Bank Details
- Office Bearers (President, Vice President, etc.)
- Committee Members
- AGM Date
- Member List
- Planning Events

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Dependencies

- React 18
- React Router DOM
- React Bootstrap
- Formik & Yup (form handling)
- Axios (HTTP client)
- Google OAuth
- jsPDF & html2canvas (PDF generation)

### Environment Variables

Create a `.env` file in the root directory:
\`\`\`
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
\`\`\`

### Usage

1. **Home Page**: Navigate to different sections
2. **Registration**: Fill applicant details and proceed to form
3. **Society Form**: Complete all required sections
4. **Submit**: Send for approval and download PDF
5. **Admin Login**: Access admin panel with authorized Google account
6. **Admin Panel**: Manage societies and view activity logs

### Styling

- Bootstrap 5 for UI components
- Custom CSS for theming
- Dark/Light mode support
- Responsive design

## Backend

### Features

- **Google OAuth Authentication** for authorized admins
- **Multi-level Approval Workflow** (Faculty Dean → SSD → Vice Chancellor)
- **Email Notifications** at each approval stage
- **Activity Logging** for all admin actions
- **JWT Token-based Security**
- **MySQL Database Integration**
- **RESTful API Design**

### Setup Instructions

#### 1. Database Setup

1. Install MySQL and create the database:
   \`\`\`sql
   CREATE DATABASE admin_panel_db;
   \`\`\`

2. Run the initialization script:
   \`\`\`bash
   mysql -u root -p admin_panel_db < database/init.sql
   \`\`\`

#### 2. Application Configuration

Update `src/main/resources/application.properties`:
- Set your MySQL credentials
- Configure Google OAuth client ID and secret
- Set up email SMTP settings

#### 3. Run the Application

\`\`\`bash
mvn spring-boot:run
\`\`\`

The backend will start on `http://localhost:8080`

### API Endpoints

#### Authentication
- `POST /api/auth/google-login` - Admin Google OAuth login
- `POST /api/auth/validate-token` - Validate JWT token

#### Society Management
- `POST /api/approvals` - Submit society registration
- `POST /api/send-email` - Send email notifications

#### Admin Panel
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/activity-logs` - Get activity logs
- `GET /api/admin/all-admins` - Get all admins

### Authorized Admin Emails

- Vice Chancellor: `gsgamage4@gmail.com`
- Faculty Dean: `gihansgamage@gmail.com`
- SSD Admin: `s20369@sci.pdn.ac.lk`

### Development

1. Clone the repository
2. Import as Maven project in your IDE
3. Configure database and OAuth settings
4. Run the application
5. Test with the frontend application

### Support

For issues or questions, contact the development team.
