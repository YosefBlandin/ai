# Aid distribution management system built with Next.js (Web) and React Native/Expo (Mobile).

## Setup and Run Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git

### Quick Start

**Option 1: Traditional Setup**

```bash
# Clone the repository
git clone https://github.com/smartCompliances/monitoring-app
cd aidonic

# Install all dependencies
npm run install:all
npm i -g @expo/ngrok
# Start JSON server and all applications
npm run dev:all

```

### Individual Setup

**1. JSON Server (Required First)**

```bash
# Start the JSON server
npm run dev:server
```

**2. Web Application**

```bash
# In a new terminal
npm run dev:web
# Access at http://localhost:3000
```

**3. Mobile Application**

```bash
# In a new terminal
npm run dev:mobile
# Use Expo Go app or simulator
```

### Access Applications

- **Web App**: http://localhost:3000
- **Mobile Dev Tools**: http://localhost:19002
- **JSON Server API**: http://localhost:3001

## Architecture Overview

### Container/Presentation Pattern

The project implements a clear separation between business logic (containers) and UI components (presentations):

### SOLID Principles Applied

- **Single Responsibility**: Each class/component has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes are substitutable for base classes
- **Interface Segregation**: Clients depend only on interfaces they use
- **Dependency Inversion**: Depend on abstractions, not concretions

### Project Structure

```
aidonic/
├── apps/
│   ├── web/                    # Next.js web application
│   └── mobile/                 # React Native mobile application
├── packages/
│   ├── shared-types/           # Shared TypeScript types
│   ├── shared-services/        # Shared business logic
│   ├── shared-hooks/           # Shared React hooks
│   ├── shared-components/      # Shared UI components
│   └── shared-utils/           # Shared utility functions
├── server/                     # JSON server for mock data
└── tools/                      # Build and development tools
```

### Key Architectural Decisions

1. **Monorepo Structure**: Shared code between web and mobile platforms to prevent duplicating code across repositories, in this way we can foster consistency between apps
2. **TypeScript**: Full type safety across all platforms
3. **Shared Services**: Centralized business logic for consistency
4. **Error Boundaries**: Comprehensive error handling and graceful degradation
5. **Custom Hooks**: Reusable state management logic
6. **Code Quality Tools**: ESLint, Prettier, and Husky for maintaining code standards
7. **Automated Validation**: Pre-commit hooks ensure code quality before commits
8. **Consistent Formatting**: Prettier enforces uniform code style across the project

## Assumptions and Trade-offs

### Assumptions Made

1. **Mock Data**: Used realistic but fictional data for demonstration purposes
2. **Network Configuration**: Assumed local development environment with JSON server
3. **User Experience**: Designed for both desktop and mobile users with responsive design
4. **Data Structure**: Assumed specific distribution data model with beneficiaries
5. **Chart Library**: Chose Recharts for web and react-native-chart-kit for mobile

### Trade-offs Considered

1. **Monorepo vs Separate Repos**: Chose monorepo for code sharing but added complexity, it could be problematic if too many developers are working on the same project, but it can be solved by using github submodules
2. **Testing Strategy**: Focused on unit tests over E2E tests for faster development
3. **Mobile Development**: Used Expo for faster development vs native development

### Design Decisions

1. **Container/Presentation Pattern**: Chosen for clear separation of concerns
2. **TypeScript**: Used throughout for type safety and better developer experience
3. **Shared Services**: Centralized business logic for consistency across platforms
4. **Error Boundaries**: Implemented for graceful error handling

## API Response Examples

**GET /api/distributions**

```json
[
  {
    "id": "dst--001",
    "region": "West Nile",
    "date": "2025-06-15",
    "status": "Planned",
    "beneficiaries": 1200,
    "aidType": "Food",
    "deliveryChannel": "Vouchers"
  },
  {
    "id": "dst--002",
    "region": "Eastern Province",
    "date": "2025-06-10",
    "status": "Completed",
    "beneficiaries": 850,
    "aidType": "Medical",
    "deliveryChannel": "Direct Distribution"
  }
]
```

**GET /api/distributions/dst--001**

```json
{
  "id": "dst--001",
  "region": "West Nile",
  "date": "2025-06-15",
  "status": "Planned",
  "beneficiaries": 1200,
  "aidType": "Food",
  "deliveryChannel": "Vouchers",
  "beneficiaryList": [
    { "id": "bnf--001", "name": "Jane Doe" },
    { "id": "bnf--002", "name": "John Smith" }
  ]
}
```

## Development Commands

```bash
# Linting and code quality
npm run lint          # Run ESLint on all packages
npm run lint:fix      # Fix ESLint issues automatically
npm run format        # Format code with Prettier
npm run format:check  # Check if code is properly formatted

# Type checking
npm run type-check    # Check TypeScript types across all packages

# Testing
npm run test          # Run tests for all packages

# Building
npm run build         # Build all packages
npm run build:web     # Build only web application
npm run build:mobile  # Build only mobile application
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 3000, 3001, and 19000-19002 are available
2. **Dependencies**: Run `npm run install:all` if packages are missing
3. **Mobile Connection**: Ensure mobile device and computer are on the same network
4. **TypeScript Errors**: Run `npm run type-check` to identify type issues

### Mobile Development

For mobile development, ensure your device and computer are on the same network. The mobile app will connect to the JSON server running on your computer.

## License

This project is licensed under the MIT License.

---
