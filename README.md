# GraphQL Social Network

A NestJS project that uses PostgreSQL as the database with TypeORM and GraphQL (code-first approach). Uses the Apollo driver for GraphQL.

## Features

- **Person Module**: Manage users with posts and followers
- **Post Module**: Create and manage posts by users
- **Follower Module**: Handle following relationships between users
- **GraphQL Subscriptions**: Real-time updates when new persons are created

## Project Structure

```
src/
├── person/
│   ├── person.entity.ts      # Person entity with TypeORM and GraphQL decorators
│   ├── person.service.ts     # Business logic for Person operations
│   ├── person.resolver.ts    # GraphQL queries, mutations, and subscriptions
│   └── person.module.ts      # Person module configuration
├── post/
│   ├── post.entity.ts        # Post entity with TypeORM and GraphQL decorators
│   ├── post.service.ts       # Business logic for Post operations
│   ├── post.resolver.ts      # GraphQL queries and mutations
│   └── post.module.ts        # Post module configuration
├── follower/
│   ├── follower.entity.ts    # Follower entity with TypeORM and GraphQL decorators
│   ├── follower.service.ts   # Business logic for Follower operations
│   ├── follower.resolver.ts  # GraphQL queries and mutations
│   └── follower.module.ts    # Follower module configuration
├── app.module.ts             # Main application module
└── main.ts                   # Application entry point
```

## Entity Relationships

- **Person**: Has many posts and followers
- **Post**: Belongs to one person
- **Follower**: Links two persons (person being followed and the follower)

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Yarn package manager

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE graphql_social;
CREATE USER graphql_user WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE graphql_social TO graphql_user;
```

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn start:dev
```

The application will be available at `http://localhost:3000/graphql`

## GraphQL Operations

### Queries

- `persons`: Get all persons with their posts and followers
- `person(id)`: Get a specific person by ID
- `posts`: Get all posts with their authors
- `post(id)`: Get a specific post by ID
- `followers`: Get all follower relationships
- `follower(id)`: Get a specific follower relationship by ID

### Mutations

- `createPerson(name)`: Create a new person
- `updatePerson(id, name)`: Update a person's name
- `removePerson(id)`: Delete a person
- `createPost(title, content, personId)`: Create a new post
- `updatePost(id, title, content)`: Update a post
- `removePost(id)`: Delete a post
- `createFollower(personId, followerId)`: Create a follower relationship
- `removeFollower(id)`: Remove a follower relationship

### Subscriptions

- `personCreated`: Subscribe to new person creation events

## Example GraphQL Queries

```graphql
# Create a person
mutation {
  createPerson(name: "John Doe") {
    id
    name
  }
}

# Get all persons with their posts
query {
  persons {
    id
    name
    posts {
      id
      title
      content
    }
  }
}

# Subscribe to new person creation
subscription {
  personCreated {
    id
    name
  }
}
```

## Technologies Used

- **NestJS**: Framework for building scalable server-side applications
- **TypeORM**: Object-Relational Mapping for TypeScript and JavaScript
- **GraphQL**: Query language and runtime for APIs
- **Apollo Server**: GraphQL server implementation
- **PostgreSQL**: Relational database
- **TypeScript**: Programming language
