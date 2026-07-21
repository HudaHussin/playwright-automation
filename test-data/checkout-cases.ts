import { customers } from './customers';

export const invalidCheckoutCases = [
  {
    name: 'missing first name',
    customer: {
      ...customers.valid,
      firstName: '',
    },
    expectedError: 'Error: First Name is required',
  },
  {
    name: 'missing last name',
    customer: {
      ...customers.valid,
      lastName: '',
    },
    expectedError: 'Error: Last Name is required',
  },
  {
    name: 'missing postal code',
    customer: {
      ...customers.valid,
      postalCode: '',
    },
    expectedError: 'Error: Postal Code is required',
  },
];