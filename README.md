# Home Library Service

This repository contains a NestJS application for managing users, artists, albums, tracks, and favorites.

## Prerequisites

- Node.js (version >= 22.14.0)
- npm (or Yarn)

## Installation

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd SAK74-nodejs2025Q2-service
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure Environment Variables: Create a .env file by copying the provided example:
   ```sh
   cp .env.example .env
   ```
   Adjust _PORT_ value (default is 4000).

## Running the Application

#### Development Mode

Run the application with live reloading:

```sh
npm run start:dev
```

#### Production Mode

1. Build the project:

```sh
npm run build
```

2. Start the application:

```sh
npm run start:prod
```

### Testing

Run All Tests

```sh
npm test
```

\* **App should be launched before !**

### API Documentation

This application uses Swagger for API documentation. Once the application is running, access the docs at:

```sh
http://localhost:<PORT>/docs
```

### Usage

- **Users**: Endpoints under `/user` to create, retrieve, update, and delete users.
- **Artists**: Endpoints under `/artist` to manage artist information.
- **Albums**: Endpoints under `/album` for album creation and management.
- **Tracks**: Endpoints under `/track` to manage tracks.
- **Favorites**: Endpoints under `/favs` to add or remove favorite items.

_For detailed request/response formats, refer to the Swagger documentation._

### Linting and Formatting

- Lint the project:
  ```sh
  npm run lint
  ```
- Format the project:
  ```sh
  npm run format
  ```
- Run both formatting and linting:
  ```sh
  npm run format:lint
  ```
