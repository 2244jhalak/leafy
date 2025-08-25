# Leafy - Minimal Library Management System 📚

**Leafy** is a minimal library management system built with **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**. The system allows users to view books, perform CRUD operations, borrow books, and see a simple borrow summary—all without authentication or payment integration.

---

## 🌟 Features

### 1. Public Routes 🚀
- All pages are accessible without login or authentication.
- Focused on core book and borrowing functionalities.

### 2. Book Management 🛠️
- **Book List Table**
  - Columns: Title, Author, Genre, ISBN, Copies, Availability, Actions
- **Actions**
  - **Edit Book**: Update book info with real-time UI update.
  - **Delete Book**: Confirmation before removal.
  - **Borrow Book**: Opens a borrow form.
- **Add New Book**
  - Fields: Title, Author, Genre, ISBN, Description, Copies, Available (optional, defaults true)
  - Redirects to book list and updates UI immediately.
- **Business Logic**
  - Book marked unavailable if copies = 0.

### 3. Borrow Book
- Form includes **quantity input**.
- Quantity cannot exceed available copies.
- Submit via API with success/error feedback.
- Redirects to borrow summary after success.
- Borrow date is automatically handled by the backend.

### 4. Borrow Summary
- Displays aggregated list of borrowed books.
- Columns: Book Title, ISBN, Total Quantity Borrowed.
- Retrieved from aggregation API.

---

## 🏠 Landing Page Components
- **Navbar**: Links to All Books, Add Book, Borrow Summary.
- **Book Table/List/Grid**: Displays books with core actions.
- **Footer**: Site info or credits.

---

## 📄 Pages
| Route | Description |
|-------|-------------|
| `/books` | List of all books with view, edit, delete, and borrow options |
| `/create-book` | Form to add a new book |
| `/books/:id` | Detailed view of a single book |
| `/edit-book/:id` | Update an existing book |
| `/borrow/:bookId` | Form to borrow a selected book |
| `/borrow-summary` | Aggregated summary of borrowed books |

---

## 🎨 UI/UX
- Minimalist and clean UI using **Tailwind CSS**.
- Fully responsive layout for mobile, tablet, and desktop.
- Easy navigation and clearly labeled buttons and forms.

---

## ⚡ Bonus Features
| Feature |
|---------|
| Optimistic UI Updates |
| Toast Notifications |
| Responsive Layout |
| Type-Safe Forms |

---

## 🛠️ Tech Stack
- React
- TypeScript
- Redux Toolkit Query (RTK Query)
- Tailwind CSS
- SweetAlert2
- Vite

---

## 🚀 How to Run Locally
1. Clone the repo:

```bash
git clone https://github.com/2244jhalak/leafy.git
cd leafy
npm install
```
npm run dev

