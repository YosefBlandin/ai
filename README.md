# Aidonic - Aid Distribution Dashboard

A comprehensive aid distribution management system built with Next.js (Web) and React Native/Expo (Mobile), following clean architecture principles and SOLID design patterns.

## 🏗️ Architecture Overview

This project implements a **vertical slicing architecture** with **Container/Presentation pattern**, ensuring separation of concerns and maintainability across both web and mobile platforms.

### Key Architectural Principles

1. **Container/Presentation Pattern**: Clear separation between business logic (containers) and UI components (presentations)
2. **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
3. **Clean Code**: Readable, maintainable, and testable code structure
4. **Vertical Slicing**: Feature-based organization rather than technical layers
5. **Dependency Injection**: Services are injected rather than directly instantiated

### Project Structure

```
aidonic/
├── src/                          # Web application (Next.js)
│   ├── app/                      # Next.js app directory
│   ├── components/               # Presentation components
│   │   ├── shared/              # Reusable UI components
│   │   ├── distributions/       # Distribution-specific components
│   │   └── charts/              # Chart components
│   ├── containers/              # Container components (business logic)
│   ├── hooks/                   # Custom React hooks
│   ├── services/                # Business logic services
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   └── mocks/                   # Mock data
├── mobile/                      # Mobile application (React Native/Expo)
│   ├── src/
│   │   ├── components/          # Mobile presentation components
│   │   ├── containers/          # Mobile container components
│   │   ├── hooks/               # Mobile custom hooks
│   │   ├── services/            # Mobile services
│   │   ├── types/               # Shared types
│   │   └── screens/             # Mobile screens
│   └── App.tsx                  # Mobile app entry point
└── README.md
```

## 🚀 Features

### Web Dashboard (Next.js)
- **Distribution List**: Table view with filtering and pagination
- **Distribution Details**: Comprehensive view of individual distributions
- **Analytics Dashboard**: Interactive charts showing distribution statistics
- **Responsive Design**: Works on desktop and tablet devices

### Mobile App (React Native/Expo)
- **Distribution List**: Card-based list with pull-to-refresh
- **Distribution Details**: Mobile-optimized detail view
- **Charts Screen**: Touch-friendly analytics
- **Cross-platform**: Works on iOS and Android

### Core Features
- **Filtering**: By region and status
- **Pagination**: Efficient data loading
- **Real-time Updates**: Pull-to-refresh functionality
- **Error Handling**: Comprehensive error boundaries
- **Loading States**: User-friendly loading indicators
- **Responsive Design**: Optimized for all screen sizes

## 🛠️ Technology Stack

### Web (Next.js)
- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React

### Mobile (React Native/Expo)
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **Charts**: React Native Chart Kit
- **Icons**: Expo Vector Icons
- **UI**: Custom components with React Native

### Shared
- **State Management**: Custom hooks with React Context
- **API Layer**: Mock services with realistic delays
- **Type Safety**: Shared TypeScript interfaces
- **Architecture**: Container/Presentation pattern

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- For mobile development: Expo CLI

### Web Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Start production server
npm start
```

### Mobile Application

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check
```

### Test Coverage
- **Unit Tests**: Services, utilities, and custom hooks
- **Component Tests**: Presentation components
- **Integration Tests**: Container components
- **Coverage Threshold**: 70% minimum

## 🏛️ Architectural Decisions

### 1. Container/Presentation Pattern
**Decision**: Separate business logic from UI components
**Rationale**: 
- Clear separation of concerns
- Easier testing and maintenance
- Reusable presentation components
- Business logic centralization

**Implementation**:
```typescript
// Container (business logic)
export const DistributionListContainer = ({ onViewDetails }) => {
  const { distributions, loading, filters, updateFilters } = useDistributions();
  // ... business logic
  return <DistributionList distributions={distributions} onViewDetails={onViewDetails} />;
};

// Presentation (UI only)
export const DistributionList = ({ distributions, onViewDetails }) => {
  // ... UI rendering only
};
```

### 2. Custom Hooks for State Management
**Decision**: Use custom hooks instead of external state management
**Rationale**:
- Simpler than Redux for this use case
- Better TypeScript integration
- Easier testing
- Follows React best practices

### 3. Service Layer Architecture
**Decision**: Implement service layer with dependency injection
**Rationale**:
- Single Responsibility Principle
- Easy to mock for testing
- Clear API boundaries
- Business logic encapsulation

### 4. Vertical Slicing
**Decision**: Organize code by features rather than technical layers
**Rationale**:
- Easier to find related code
- Better team collaboration
- Clearer feature boundaries
- Reduced coupling

### 5. Shared Types
**Decision**: Share TypeScript interfaces between web and mobile
**Rationale**:
- Type safety across platforms
- Single source of truth
- Easier maintenance
- Better developer experience

## 🔧 Development Guidelines

### Code Quality Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality checks

### Component Guidelines
- **Single Responsibility**: Each component has one clear purpose
- **Props Interface**: All props are typed
- **Error Boundaries**: Wrap containers with error boundaries
- **Loading States**: Always show loading indicators
- **Accessibility**: Follow WCAG guidelines

### Testing Guidelines
- **Test Coverage**: Minimum 70% coverage
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions
- **Mock Services**: Use mock data for consistent testing

## 📱 Mobile-Specific Considerations

### Performance
- **FlatList**: Used for efficient list rendering
- **Image Optimization**: Lazy loading and caching
- **Memory Management**: Proper cleanup in useEffect

### User Experience
- **Pull-to-Refresh**: Native mobile interaction
- **Touch Feedback**: Proper touchable components
- **Navigation**: Stack navigation with proper back handling
- **Responsive Design**: Adapts to different screen sizes

### Platform Differences
- **iOS**: Proper safe area handling
- **Android**: Material Design guidelines
- **Cross-platform**: Shared business logic, platform-specific UI

## 🚀 Deployment

### Web Application
- **Vercel**: Recommended for Next.js deployment
- **Environment Variables**: Configure API endpoints
- **Build Optimization**: Automatic code splitting and optimization

### Mobile Application
- **Expo**: Easy deployment with Expo Application Services (EAS)
- **App Stores**: Build for iOS App Store and Google Play Store
- **Over-the-Air Updates**: Update JavaScript without app store approval

## 🔮 Future Enhancements

### Planned Features
- **Real API Integration**: Replace mock services
- **Authentication**: User login and role-based access
- **Offline Support**: Cache data for offline usage
- **Push Notifications**: Real-time updates
- **Advanced Analytics**: More detailed reporting
- **Export Functionality**: PDF and Excel export

### Technical Improvements
- **Performance Monitoring**: Add analytics and monitoring
- **Error Tracking**: Implement error reporting
- **Automated Testing**: CI/CD pipeline
- **Documentation**: API documentation with Swagger
- **Internationalization**: Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Write tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Architecture**: Clean Architecture with SOLID principles
- **Frontend**: React/Next.js and React Native
- **Backend**: Mock services (ready for real API integration)
- **Testing**: Comprehensive test coverage
- **Documentation**: Detailed README and code comments

---

**Note**: This is a demonstration project showcasing modern web and mobile development practices with clean architecture principles. The mock data and services can be easily replaced with real API integrations.