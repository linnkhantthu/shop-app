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

export interface Trader {
  id: number;
  fullName: string;
  email: string;
  address: string;
  phoneNo: string;
  amount: number | null;
  role: TraderRole;
  userId: number | null;
}

export interface Voucher{
  id: number;
    date: Date;
    currency: Currency;
    amount: number;
    voucherType: VoucherType;
    traderId: number;
    userId: number;
  
}

// Enums to decide which field we are refering
/**
 * Supplier Enum
 */
export enum TraderEnum {
  fullName,
  email,
  address,
  phoneNo,
  amount,
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

export enum VoucherType{
  PURCHASE,
  PURCHASERETURN,
  SALE,
  SALERETURN,
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
