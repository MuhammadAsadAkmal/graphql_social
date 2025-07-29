# GraphQL Social Network - Scalable Architecture

A production-ready NestJS GraphQL application with PostgreSQL, featuring a scalable architecture with proper separation of concerns, error handling, logging, and monitoring.

## 🚀 Features

- **Scalable Architecture**: Modular design with clear separation of concerns
- **GraphQL API**: Code-first approach with Apollo Server
- **Database**: PostgreSQL with TypeORM for robust data management
- **Authentication Ready**: JWT-based authentication structure
- **Rate Limiting**: Built-in protection against API abuse
- **Health Checks**: Application monitoring and status endpoints
- **Error Handling**: Centralized exception management
- **Logging**: Structured logging for debugging and monitoring
- **Configuration Management**: Environment-based configuration
- **Testing**: Comprehensive testing utilities and structure

## 📁 Project Structure

```
src/
├── common/                          # Shared utilities and services
│   ├── dto/                        # Common DTOs
│   │   └── pagination.dto.ts       # Pagination input type
│   ├── exceptions/                 # Custom exception classes
│   │   └── custom.exception.ts     # Base exception and specific exceptions
│   ├── middleware/                 # Custom middleware
│   │   └── rate-limit.middleware.ts # Rate limiting protection
│   ├── services/                   # Shared services
│   │   ├── base.service.ts         # Base CRUD service
│   │   └── logger.service.ts       # Centralized logging
│   └── testing/                    # Testing utilities
│       └── test-utils.ts           # Mock repositories and test helpers
├── config/                         # Configuration management
│   ├── configuration.ts            # Environment-based configuration
│   └── database.config.ts          # Database configuration
├── health/                         # Health check module
│   ├── health.controller.ts        # Health check endpoints
│   └── health.module.ts            # Health module configuration
├── person/                         # Person module
│   ├── dto/                        # Person-specific DTOs
│   │   ├── create-person.dto.ts    # Create person input
│   │   └── update-person.dto.ts    # Update person input
│   ├── person.entity.ts            # Person entity
│   ├── person.service.ts           # Person business logic
│   ├── person.resolver.ts          # GraphQL resolvers
│   └── person.module.ts            # Person module configuration
├── post/                           # Post module
│   ├── post.entity.ts              # Post entity
│   ├── post.service.ts             # Post business logic
│   ├── post.resolver.ts            # GraphQL resolvers
│   └── post.module.ts              # Post module configuration
├── follower/                       # Follower module
│   ├── follower.entity.ts          # Follower entity
│   ├── follower.service.ts         # Follower business logic
│   ├── follower.resolver.ts        # GraphQL resolvers
│   └── follower.module.ts          # Follower module configuration
├── app.module.ts                   # Main application module
└── main.ts                         # Application entry point
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Yarn package manager

### Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=graphql_user
DB_PASSWORD=admin
DB_NAME=graphql_social

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1d

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Cache
CACHE_TTL=60
CACHE_MAX=100
```

### Database Setup

1. Create PostgreSQL database:
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

The application will be available at:
- GraphQL Playground: `http://localhost:3000/graphql`
- Health Check: `http://localhost:3000/health`

## 🔧 Available Scripts

- `yarn start:dev` - Start development server with hot reload
- `yarn build` - Build the application
- `yarn start:prod` - Start production server
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn migration:generate` - Generate new migration
- `yarn migration:run` - Run pending migrations
- `yarn migration:revert` - Revert last migration

## 📊 API Endpoints

### Health Check
- `GET /health` - Application health status

### GraphQL Operations

#### Queries
- `persons` - Get all persons with pagination
- `person(id)` - Get specific person by ID
- `posts` - Get all posts with pagination
- `post(id)` - Get specific post by ID
- `followers` - Get all follower relationships
- `follower(id)` - Get specific follower relationship

#### Mutations
- `createPerson(input)` - Create new person
- `updatePerson(id, input)` - Update person
- `removePerson(id)` - Delete person
- `createPost(input)` - Create new post
- `updatePost(id, input)` - Update post
- `removePost(id)` - Delete post
- `createFollower(input)` - Create follower relationship
- `removeFollower(id)` - Remove follower relationship

#### Subscriptions
- `personCreated` - Subscribe to new person creation

## 🏗️ Architecture Benefits

### 1. **Scalability**
- Modular design allows easy scaling of individual components
- Base service class reduces code duplication
- Configuration management supports multiple environments

### 2. **Maintainability**
- Clear separation of concerns
- Consistent error handling
- Centralized logging
- Type-safe DTOs

### 3. **Reliability**
- Health checks for monitoring
- Rate limiting for protection
- Comprehensive error handling
- Database connection management

### 4. **Developer Experience**
- Hot reload in development
- GraphQL playground for API exploration
- Comprehensive testing utilities
- Code formatting and linting

## 🔒 Security Features

- Rate limiting to prevent abuse
- Environment-based configuration
- JWT-ready authentication structure
- CORS configuration
- Input validation (ready for class-validator)

## 📈 Monitoring & Observability

- Health check endpoints
- Structured logging
- Error tracking
- Database connection monitoring

## 🧪 Testing

The project includes:
- Unit testing utilities
- Mock repository helpers
- End-to-end testing setup
- Test coverage reporting

## 🚀 Deployment Ready

- Environment-based configuration
- Production database settings
- Health check endpoints
- Proper error handling
- Logging for production debugging

## 🔄 Future Enhancements

- Authentication & Authorization
- Caching layer (Redis)
- File upload functionality
- Real-time notifications
- Advanced GraphQL features (federation, etc.)
- Docker containerization
- CI/CD pipeline setup

## 📚 Technologies Used

- **NestJS** - Scalable server-side framework
- **GraphQL** - Query language and runtime
- **Apollo Server** - GraphQL server implementation
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Relational database
- **TypeScript** - Type-safe JavaScript
- **Jest** - Testing framework
- **Class Validator** - Input validation
- **NestJS Terminus** - Health checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
