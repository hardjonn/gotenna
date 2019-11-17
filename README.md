# GoTenna Gallery

### I've tried to utilize every important aspect of the modern development. Some of them are not app-wide implemented because they are proof-of-concept (i.g. caching implemented for the bottle-neck part of the app and tests cover only one feature)

## Stack

- PHP/Laravel 6
- TypeScript/Angular 8
- SQLite
- Nginx
- Docker

## Why not the infinite pagination?

Infinite images loading can cause performance issues unless you utilize some Virtual Scrolling

## What is implemented

- Redux/NgRx pattern
- JWT Auth
  - with no JWT token refreshing
- Error Handling
  - global as a request interceptor
  - local as handling a response and displaying some message
- Responsive Layout
- Lazy-Loading for js App Modules
- Additional Image Effect (Blur Fx)
- Caching
  - list of the all presented dimensions
- Feature Testing
  - auth feature
- File Uploading and Parsing
  - you can upload a new instance of CSV
- Validation
  - backend
  - frontend
- Routes Guarding
  - you cannot visit /admin if you are not logged in
  - you cannot visit /login if you are logged in
- Containerizing
  - development in a docker based container
  - building and running the app

## Admin Panel Credentials

```
You can upload new CSV file there. Visit /login

Email: admin@gotenna.com
Password: admin
```

## Project has already a predefined SQLite database instance

## How do you run the app - as simple as this

```bash
$> git clone https://github.com/hardjonn/gotenna.git
$> cd gotenna
$> docker compose up -d --build
```

## It will clone, build and run the app

### visit http://localhost:4200 and enjoy the process)
