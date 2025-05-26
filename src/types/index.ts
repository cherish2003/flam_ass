export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  performanceRating: number;
  image: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  company?: {
    department: string;
    title: string;
  };
}

export interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedDepartments: string[];
  selectedRatings: number[];
  currentPage: number;
  hasMore: boolean;
  total: number;
}

export interface BookmarksState {
  bookmarkedEmployees: number[];
}

export interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  sidebarMinimized: boolean;
}

export interface RootState {
  employees: EmployeesState;
  bookmarks: BookmarksState;
  ui: UiState;
} 