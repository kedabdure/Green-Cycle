# Green Cycle Admin Dashboard Documentation

The **Green Cycle Admin Dashboard** is a robust administrative panel designed to manage key operations efficiently. This dashboard is specifically tailored for the administration of the Green Cycle platform, which focuses on promoting the reuse of furniture and wood materials. The dashboard is designed with a focus on enhancing user experience, simplifying administrative tasks, and streamlining CRUD (Create, Read, Update, Delete) operations.

## Core Features and Functionalities

### 1. **Customer Account Management**
- **Create**: Admins can add new customer accounts with details such as name, email, phone number, and address.
- **Read**: View a comprehensive list of customers with detailed profiles, including contact information and account status.
- **Update**: Edit and update customer account information, such as changing the profile picture, contact details, and status.
- **Delete**: Remove inactive or flagged customer accounts securely.
- **Account Suspension**: Admins have the ability to suspend accounts that violate platform policies.
- **Search and Filter**: Advanced search functionality to filter customer lists based on name, email, or status.

### 2. **Admin Management**
- **Create**: Add new admins with assigned roles (e.g., `ADMIN` or `SUPER_ADMIN`).
- **Read**: View a list of all active and inactive admins with their roles, profile details, and last active status.
- **Update**: Update admin information, including roles, email, and profile pictures.
- **Delete**: Safely remove admin accounts when necessary.
- **Role Management**: Assign or revoke super admin privileges with role-based access control.
- **Audit Logs**: Track changes made by each admin, including profile updates and account modifications.

### 3. **Profile Update**
- **Admin Profile**: Admins can update their personal profile information, including:
  - **Profile Picture**: Upload and change profile images.
  - **Contact Information**: Edit email and phone number.
  - **Password**: Change or reset passwords with secure validation.
- **Real-Time Feedback**: Instant feedback on profile updates with success or error alerts.

### 4. **Order Management**
- **Create**: Admins can manually create new orders with customer information and product details.
- **Read**: Access a detailed overview of all orders, with comprehensive data including order ID, customer name, status, and items ordered.
- **Update**: Modify existing orders, such as changing product details, updating shipping information, or correcting quantities.
- **Delete**: Cancel and remove orders when necessary.
- **Pagination and Sorting**: Enhanced pagination and sorting features for better order tracking.
- **Bulk Actions**: Perform actions on multiple orders simultaneously for faster processing.

### 5. **Order Tracking Control**
- **Real-Time Status Updates**: Update order statuses through different stages: `Pending`, `Start Shipping`, `On the Way`, and `Delivered`.
- **Timeline View**: Display the progress of an order in a clear, step-by-step timeline format.
- **Notifications**: Send notifications to customers when an order status changes.
- **Location Tracking**: Monitor delivery locations and provide detailed tracking updates for customers.
- **Shipping Details**: View and update shipping information and delivery dates as needed.

## Advanced Features
- **Role-Based Authentication**: Secure login with role-specific access controls (e.g., `ADMIN` vs. `SUPER_ADMIN`).
- **Responsive Design**: The dashboard is fully responsive and optimized for different devices.
- **User Feedback**: Integrated with SweetAlert for user-friendly feedback during CRUD operations.
- **Secure Data Handling**: Passwords and sensitive information are protected using bcrypt encryption.
- **Image Upload**: Profile and product images can be uploaded and managed through an integrated ImageKit service.
- **Search and Filter Capabilities**: Utilize advanced search options to filter through customers, orders, and admin records.
- **Dashboard Analytics**: Overview of key metrics, such as the number of active orders, new customers, and completed deliveries.

## Technologies and Tools Used
- **Next.js 14**: Modern React framework for building fast, server-rendered applications.
- **MongoDB**: Database used for storing and managing all user, order, and admin data.
- **MUI (Material-UI)**: UI component library for building an attractive and consistent interface.
- **Tanstack React Query**: Efficient data fetching and caching for improved performance.
- **SweetAlert**: For customizable alert messages during operations.
- **ImageKit**: Image management service for efficient upload and retrieval.
- **bcrypt**: Secure password hashing.

This detailed documentation should provide a comprehensive overview of the **Green Cycle Admin Dashboard**, covering its features and capabilities to support effective administration and order management.
