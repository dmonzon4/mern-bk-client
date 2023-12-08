# Project Name: Bayerische Küche

## [See the App!](https://bk-mern-projekt.netlify.app/)

![App Logo](/public/images/Logo_mern_BK_projekt.png)

## Description

**NOTE -** Bayerische Küche apart from being a specific service to share the richness of Bavarian food, focuses on offering a reservation service in the restaurant, allowing for better organisation and customer service.
#### [Client Repo here](https://github.com/dmonzon4/mern-bk-client.git)
#### [Server Repo here](https://github.com/dmonzon4/mern-bk-server.git)

## Backlog Functionalities

**NOTE -** The functionality to receive confirmation by email can be implemented by finding a suitable service for that purpose.

## Technologies used

**NOTE -** Used technologies in this proyect: 
- HTML
- CSS
- Javascript
- Axios
- React Context
- Mongoose
- MongoDB
- Express
- React
- Node
- React-router-dom
- React-spinners

# Client Structure

## User Stories

**NOTE -**  Actions a user can do in the app:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend

## Client Routes

**NOTE -** Frontend routes:

## React Router Routes (React App)
| Path                                                              | Page                           | Components        | Permissions              | Behavior                                                      |
| ----------------------------------------------------------------- | ------------------------------ | ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                                                               | Home                           |                   | public                   | Home page                                                     |
| `/signup`                                                         | Signup                         |                   | anon only `<IsAnon>`     | Signup form, link to login, navigate to homepage after signup |
| `/login`                                                          | Login                          |                   | anon only `<IsAnon>`     | Login form, link to signup, navigate to homepage after login  |
| `/profile`                                                        | Profile                        |                   | user only `<IsAnon>`     | Navigate to homepage after logout, expire session             |
| `/areas`                                                          | Areas                          |                   | user only `<IsAnon>`     | Shows all Areas                                               |
| `/food-menu`                                                      | FoodMenu                       |                   | user only `<IsAnon>`     | Shows the food menu                                           |
| `/drink-menu`                                                     | DrinkMenu                      |                   | user only `<IsAnon>`     | Shows the drink menu                                          |
| `/reservation`                                                    | Reservation                    |                   | user only `<IsAnon>`     | Shows the reservations list                                   |
| `/reservation/:reservationId/reservation-management`              | ReservationManagement          |                   | user only `<IsAnon>`     | Shows the reservations management                             |
| `/new-reservation`                                                | NewReservation                 |                   | user only `<IsAnon>`     | Shows the reservations form                                   |
| `/admin-management`                                               | Admin-management               |                   | user only `<IsPrivate>`  | Shows the admin management                                    |
| `/admin/area-list`                                                | Area-list                      |                   | user only `<IsPrivate>`  | Shows all available area                                      |
| `/admin/add-area`                                                 | Add Area                       |                   | user only `<IsPrivate>`  | Shows the area form                                           |
| `/admin/product-list	`                                           | Product-list                   |                   | user only `<IsPrivate>`  | Shows the product list                                        |
| `/admin/add-product	`                                             | Add-product                    |                   | user only `<IsPrivate>`  | Shows the product form                                        |
| `/admin/reservation-list`                                         | Reservation-list               |                   | user only `<IsPrivate>`  | Shows all reservations made by users                          |
| `/reservation/:reservationId/reservation-management-admin	`       | Reservation-management-admin   |                   | user only `<IsPrivate>`  | Shows reservation details                                     |
| `/admin/:productId/edit-product`                                  | Edit-product                   |                   | user only `<IsPrivate>`  | Shows product form                                            |
| `/error	`                                                         | Error                          |                   | user only `<IsAnon>`     | Shows error                                                   |
| `/*`                                                              | NotFound                       |                   | user only `<IsAnon>`     | Shows NotFoun error                                           |



## Other Components

- Navbar

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

  
## Context

- auth.context
  
## Links

### Developer

[Developer: Diego Monzon](https://github.com/dmonzon4)



### Project

[Repository Link Client](https://github.com/dmonzon4/mern-bk-client.git)

[Repository Link Server](https://github.com/dmonzon4/mern-bk-server.git)

[Deploy Link](https://bk-mern-projekt.netlify.app/)

### Excalidraw

<!-- [Link ]()

### Slides

[Slides Link](www.your-slides-url-here.com) -->