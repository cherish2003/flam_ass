import type { Employee } from '@/types';

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

interface DummyJsonResponse {
  users: DummyJsonUser[];
}

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch('https://dummyjson.com/users?limit=20');
  const data = await response.json() as DummyJsonResponse;

  return data.users.map((user: DummyJsonUser) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    age: user.age,
    department: user.company.department,
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
} 