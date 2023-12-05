import { UserRole } from "@prisma/client";
import { IconType } from "react-icons";

// Models
/**
 * Category Model
 */
export interface Category {
  id: number;
  title: string;
  Icon: IconType;
  iconColor: string;
  textColor: string | undefined;
  backgroundColor: string | undefined;
  url: string; // "/..."
  subcategory: Category[] | undefined;
}

/**
 * Flash Message Model
 */
export interface FlashMessage {
  message: string;
  category: string;
}

/**
 * Response Model from Api
 */
export interface responseModel {
  data?: any;
  isSuccess: boolean;
  message: string;
}

/**
 * User Model: Admin or User
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  role: UserRole;
  verified: boolean;
  sessionId: string;
}

// Enums to decide which field we are refering
/**
 * Supplier Enum
 */
export enum SupplierEnum {
  ID = "id",
  NAME = "name",
  EMAIL = "email",
  ADDRESS = "address",
  PHONENO = "phoneNo",
}

/**
 * Color Enum
 */
export enum IconColors {
  WARNING = "warning",
  INFO = "info",
  ERROR = "error",
  SUCCESS = "success",
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

/**
 * User Roles
 */
// export enum UserRole {
//   ADMIN,
//   USER,
// }

/**
 * Trader Role
 */
export enum TraderRole {
  SUPPLIER = "SUPPLIER",
  CUSTOMER = "CUSTOMER",
}

/**
 * Currencies
 */
export enum Currency {
  YUAN,
  MyanmarKyats,
  USD,
}

/**
 * Results
 */
export enum Results {
  REQUIRED_LOGIN = "You need to login to perform this action",
  REQUIRED_LOGOUT = "You need to logged out in order to perform this action",
  SUCCESS = "Operation succeed",
  FAIL = "Operation failed",
  SERVER_ERROR = "Server error",
  CONNECTION_ERROR = "Connection error occcured",
  AUTH_ERROR = "Username or password is incorrect",
}

/**
 * Messages
 */
export enum Messages {
  REQUIRED_LOGIN = "You need to login to perform this action",
  REQUIRED_LOGOUT = "You need to logged out in order to perform this action",
  INVALID_REQUEST = "Unauthorised Request",
}
