# DIGITAL LIBRABRY PORTAL
## FUNCTIONAL REQUIREMENT

### FUNCTIONAL REQUIREMENT 1:AUTHENTIFICATION
- The system should allow the user to enter his personnal informations,log in and create a password

### FUNCTIONAL REQUIREMENT 2:SEARCHING  BOOKS
- The system should be able to allow user to reseach a book,select it and download it from may other alternatives

### FUNCTIONAL REQUIREMENT 3:BORROWING BOOKS
- The system should allow the user to borrow books and give a specific deadline on the day of  giving it back

---

## NON FUNCTIONAL REQUIUREMENT
### Security
All user passwords must be encrypted using a strong hashing algorithm, and all data transmitted between the client and server must use HTTPS with TLS 1.2 or higher.

### Performance
The system must return search results within **2 seconds** for at least **95%** of search requests under normal operating conditions.

### Usability
A new user must be able to complete the registration process and search for a book within **3 MINUTES** without requiring assistance.

## Agile User Stories

### User Story 1
As a library member, I want to search for books by title, author, or ISBN so that I can quickly find the resources I need.

### User Story 2
As a library member, I want to borrow available books online so that I can reserve and access them conveniently.

#### Acceptance Criteria
- The search bar must suggest books after typing 4 characters.
- The system must display whether each book is available or unavailable.
- Selecting a book from the search results must open its detailed information page.