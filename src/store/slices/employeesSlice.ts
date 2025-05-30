import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { EmployeesState } from '@/types';

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
  company: {
    department: string;
    title: string;
  };
}

interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  image: string;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  company: {
    department: string;
    title: string;
  };
}

interface FetchEmployeesResponse {
  users: DummyJsonUser[];
  total: number;
}

const initialState: EmployeesState = {
  employees: [],
  loading: false,
  error: null,
  searchTerm: '',
  selectedDepartments: [],
  selectedRatings: [],
  currentPage: 1,
  hasMore: true,
  total: 0,
};

const USERS_PER_PAGE = 20;

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { getState }) => {
    const state = getState() as { employees: EmployeesState };
    const { currentPage } = state.employees;
    const skip = (currentPage - 1) * USERS_PER_PAGE;
    
    const response = await fetch(
      `https://dummyjson.com/users?limit=${USERS_PER_PAGE}&skip=${skip}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    
    const data = await response.json() as FetchEmployeesResponse;

    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
    const enrichedEmployees = data.users.map((user: DummyJsonUser) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      department: departments[Math.floor(Math.random() * departments.length)],
      performanceRating: Math.floor(Math.random() * 5) + 1,
      image: user.image,
      phone: user.phone,
      address: {
        street: user.address.address,
        city: user.address.city,
        state: user.address.state,
        postalCode: user.address.postalCode,
      },
      company: {
        department: user.company.department,
        title: user.company.title,
      },
    }));

    return {
      employees: enrichedEmployees,
      total: data.total
    };
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedDepartments: (state, action: PayloadAction<string[]>) => {
      state.selectedDepartments = action.payload;
    },
    setSelectedRatings: (state, action: PayloadAction<number[]>) => {
      state.selectedRatings = action.payload;
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    resetEmployees: (state) => {
      state.employees = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        const newEmployees = action.payload.employees.filter(
          (newEmployee: Employee) => 
            !state.employees.some(existing => existing.id === newEmployee.id)
        );
        state.employees = [...state.employees, ...newEmployees];
        state.total = action.payload.total;
        state.hasMore = state.employees.length < action.payload.total;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      });
  },
});

export const { 
  setSearchTerm, 
  setSelectedDepartments, 
  setSelectedRatings,
  incrementPage,
  resetEmployees
} = employeesSlice.actions;

export default employeesSlice.reducer; 