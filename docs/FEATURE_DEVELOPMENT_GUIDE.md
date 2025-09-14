# Feature Development Guide

## 🚀 Quick Start

```bash
npm run dev
npm run test
npm run build
```

## 📁 Create New Feature

```bash
# 1. Create folders
mkdir src/features/your-feature/{pages,components,services}

# 2. Create component
touch src/features/your-feature/pages/YourFeature.tsx
```

## 🔧 Component Template

```typescript
// src/features/your-feature/pages/YourFeature.tsx
import React from 'react';

export const YourFeature: React.FC = () => {
  return (
    <div>
      <h1>Your Feature</h1>
    </div>
  );
};
```

## 🧪 Testing

```typescript
// src/features/your-feature/__tests__/YourFeature.test.tsx
import { render, screen } from '@testing-library/react';
import { YourFeature } from '../pages/YourFeature';

test('renders correctly', () => {
  render(<YourFeature />);
  expect(screen.getByText('Your Feature')).toBeInTheDocument();
});
```

## 🎨 Styling

```scss
// YourFeature.module.scss
.container {
  padding: 20px;

  .title {
    font-size: 24px;
    color: #333;
  }
}
```

## 🔄 State Management

```typescript
// store/yourFeatureStore.ts
import { create } from 'zustand';

export const useYourFeatureStore = create(set => ({
  data: [],
  loading: false,

  fetchData: async () => {
    set({ loading: true });
    // API call
    set({ loading: false });
  },
}));
```

## 🌐 API Integration

```typescript
// services/yourFeature.api.ts
import { apiClient } from '@/shared/utils/api';

export const yourFeatureApi = {
  getData: () => apiClient.get('/your-endpoint'),
  createData: (data: any) => apiClient.post('/your-endpoint', data),
};
```

## 📝 Best Practices

1. **Naming**: Clear, descriptive names
2. **Components**: Small, reusable
3. **Types**: Define TypeScript types
4. **Testing**: Write tests for features
5. **Performance**: Use React.memo when needed

---

**Happy coding!** 🚀
