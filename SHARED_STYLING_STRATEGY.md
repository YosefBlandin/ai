# 🎨 Shared Styling Strategy

## Overview

This document outlines the comprehensive strategy for sharing styles between the web (Next.js) and mobile (React Native/Expo) applications while maintaining platform-specific optimizations.

## 🏗️ Architecture

### **Three-Layer Approach:**

1. **Design Tokens** (Shared) - Core design values
2. **Platform-Specific Utils** (Web/Mobile) - Platform-optimized implementations  
3. **Shared Component Logic** (Shared) - Common styling patterns

```
shared/
├── design-tokens/          # Core design values
│   ├── colors.ts          # Color palette
│   ├── spacing.ts         # Spacing scale
│   ├── typography.ts      # Font families, sizes, weights
│   ├── shadows.ts         # Shadow definitions
│   ├── radius.ts          # Border radius values
│   └── index.ts           # Exports + semantic mappings
└── styles/
    └── componentStyles.ts # Shared component configurations

src/styles/                 # Web-specific utilities
├── tokens.ts              # Re-exports design tokens
└── utils.ts               # Tailwind CSS implementations

mobile/src/styles/          # Mobile-specific utilities  
├── tokens.ts              # Re-exports design tokens
└── utils.ts               # React Native StyleSheet implementations
```

## 🎯 Design Tokens

### **Colors**
- **Primary**: Blue palette (50-900)
- **Secondary**: Gray palette (50-900)  
- **Status**: Success, Warning, Error palettes
- **Semantic**: Background, Text, Border colors

### **Spacing**
- **Scale**: 4px base unit (xs: 4px → 8xl: 96px)
- **Consistent**: Same spacing across platforms

### **Typography**
- **Font Family**: Inter (web), system fonts (mobile)
- **Sizes**: 12px → 60px scale
- **Weights**: Normal, Medium, Semibold, Bold

### **Shadows**
- **Levels**: sm, md, lg, xl
- **Platform**: CSS box-shadow (web), React Native shadow (mobile)

## 🔧 Platform-Specific Implementations

### **Web (Tailwind CSS)**
```typescript
// Tailwind classes mapped to design tokens
export const createWebStyles = {
  button: {
    base: 'inline-flex items-center justify-center font-medium rounded-md...',
    variants: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700...',
    },
  },
};
```

### **Mobile (React Native StyleSheet)**
```typescript
// StyleSheet objects using design tokens
export const createMobileStyles = {
  button: StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary[500],
    },
  }),
};
```

## 📱 Component Styling

### **Shared Logic**
```typescript
// Common component configurations
export const buttonConfig = {
  variants: {
    primary: {
      backgroundColor: colors.primary[500],
      textColor: colors.text.inverse,
    },
  },
  sizes: {
    sm: { height: 32, padding: 12 },
    md: { height: 40, padding: 16 },
  },
};
```

### **Platform Usage**

**Web:**
```tsx
<button className={cn(
  createWebStyles.button.base,
  createWebStyles.button.variants.primary,
  createWebStyles.button.sizes.md
)}>
  Click me
</button>
```

**Mobile:**
```tsx
<TouchableOpacity style={[
  createMobileStyles.button.base,
  createMobileStyles.button.primary,
  createMobileStyles.button.md
]}>
  <Text>Click me</Text>
</TouchableOpacity>
```

## 🎨 Status System

### **Consistent Status Colors**
```typescript
export const statusColors = {
  planned: {
    background: '#eff6ff',
    text: '#1e40af', 
    border: '#dbeafe',
  },
  completed: {
    background: '#f0fdf4',
    text: '#166534',
    border: '#dcfce7', 
  },
  // ... more statuses
};
```

### **Platform Implementation**

**Web:**
```css
.status-planned {
  @apply bg-blue-100 text-blue-800 border-blue-200;
}
```

**Mobile:**
```typescript
statusBadge: StyleSheet.create({
  planned: {
    backgroundColor: statusColors.planned.background,
    borderColor: statusColors.planned.border,
  },
}),
```

## 🔄 Benefits

### **1. Consistency**
- Same visual design across platforms
- Unified color palette and spacing
- Consistent component behavior

### **2. Maintainability**
- Single source of truth for design tokens
- Easy to update colors/spacing globally
- Reduced duplication

### **3. Developer Experience**
- Type-safe design tokens
- IntelliSense support
- Clear component APIs

### **4. Scalability**
- Easy to add new components
- Simple to extend design system
- Platform-specific optimizations

## 🚀 Usage Examples

### **Adding a New Component**

1. **Define in shared component styles:**
```typescript
export const newComponentConfig = {
  base: { /* shared properties */ },
  variants: { /* different styles */ },
};
```

2. **Implement for web:**
```typescript
export const createWebStyles = {
  newComponent: {
    base: 'flex items-center...',
    variant1: 'bg-blue-500...',
  },
};
```

3. **Implement for mobile:**
```typescript
export const createMobileStyles = {
  newComponent: StyleSheet.create({
    base: { flexDirection: 'row', alignItems: 'center' },
    variant1: { backgroundColor: colors.primary[500] },
  }),
};
```

### **Updating Design Tokens**

1. **Update shared tokens:**
```typescript
export const colors = {
  primary: {
    500: '#3b82f6', // Changed from '#2563eb'
  },
};
```

2. **Automatically applies to both platforms** ✅

## 📋 Best Practices

### **1. Use Design Tokens**
- Always use tokens instead of hardcoded values
- Prefer semantic colors over specific colors
- Use spacing scale consistently

### **2. Platform Optimization**
- Leverage platform-specific features
- Use Tailwind utilities for web
- Use StyleSheet for mobile performance

### **3. Component Consistency**
- Same visual appearance across platforms
- Consistent interaction patterns
- Unified component APIs

### **4. Type Safety**
- Use TypeScript for all tokens
- Define proper interfaces
- Leverage IntelliSense

## 🎯 Future Enhancements

### **Planned Features:**
- **Dark Mode**: Theme switching support
- **Responsive**: Mobile-first design tokens
- **Animation**: Shared animation tokens
- **Accessibility**: WCAG-compliant color contrasts

### **Advanced Features:**
- **CSS-in-JS**: Styled-components integration
- **Design System**: Storybook documentation
- **Testing**: Visual regression testing
- **Automation**: Design token generation from Figma

## 📚 Resources

- [Design Tokens W3C Specification](https://design-tokens.github.io/community-group/format/)
- [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
- [Tailwind CSS](https://tailwindcss.com/)
- [Design System Best Practices](https://bradfrost.com/blog/post/atomic-web-design/)

---

This shared styling strategy ensures **visual consistency**, **maintainability**, and **developer productivity** across both web and mobile platforms while respecting platform-specific optimizations.
