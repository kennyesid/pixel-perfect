export interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  ci: string;
  phoneCountryCode: string;
  phoneNumber: string;
}

export interface VerificationData {
  code: string;
}

export interface AccountData {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface BillingData {
  needsInvoice: boolean;
  businessName?: string;
  nitCi?: string;
}

export interface AddressData {
  city: string;
  street: string;
  numberOrApartment: string;
  reference: string;
}

export interface RegisterFormData {
  personal: PersonalData;
  verification: VerificationData;
  account: AccountData;
  billing: BillingData;
  address: AddressData;
}

export interface LoginCredentials {
  identifier: string; // email o nombre de usuario
  password: string;
  rememberMe?: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  token?: string;
}
