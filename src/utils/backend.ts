import { getLoginToken, getTokenData } from "./token";

// Interface for product data from the backend
export interface ProductBackend {
  _id: String;
  title: String;
  price: number;
  images: String[];
  longInfo: String;
  info: String[];
  category: String[];
  specs: Specs[];
  stock?: number;
  quantity?: number;
}

export interface Specs {
  spectitle: String;
  spec: String;
}

export interface DeliveryBackend {
  _id: String;
  title: String;
  price: number;
  info: String;
  expectedArrival: Date;
}
export interface ShipperSelection {
  shipper: DeliveryBackend;
  checked: boolean;
}

// Interface for just product data
export interface ProductData {
  title: String;
  price: number;
  images: String[];
  longInfo: String;
  info: String[];
  category: String[];
  specs: Specs[];
  stock?: number;
  quantity?: number;
}

// Interface for category data from the backend
export interface CategoryBackend {
  _id: string;
  title: string;
  description: string;
}

// Interface for request data from the backend
export interface RequestBackend {
  _id: String;
  title: String;
  approved: Boolean;
  requestingUserId: String;
  approvingUserId?: String;
  createdAt: Date;
  updateAt: Date;
  adminRequest?: Boolean;
  passwordRequest: Boolean;
}

// Interface for just request data
export interface RequestData {
  title: String;
  passwordRequest: Boolean;
}

export interface Address {
  street: String;
  zipcode: Number;
  city: String;
  firstName: String;
  lastName: String;
  phoneNumber: String;
}

export interface PaymentBackend {
  _id: String;
  title: String;
  desc?: String;
  info: String;
  price: Number;
}

export interface UserBackend {
  _id: String;
  email: String;
  isAdmin: Boolean;
}

export interface OrderBackend {
  userID: String;
  _id: String;
  products: ProductBackend[];
  deliveryAddress: Address;
  deliveryOption: DeliveryBackend;
  sent: Boolean;
  createdAt: Date;
}

// Image Utility

export function uploadImage(image: File) {
  var formData = new FormData();
  formData.append("media", image, image.name);
  let headers: RequestInit = {
    method: "POST",
    body: formData,
  };
  return fetch("http://localhost:3000/api/media", headers);
}

export function uploadMultipleImages(list: FileList) {
  let imageHandles = [];
  for (let i = 0; i < list.length; i++) {
    const file = list[i];
    let image = uploadImage(file);
    imageHandles.push(image);
  }

  return Promise.all(imageHandles);
}

export function getImageUrl(imageId: String) {
  return `http://localhost:3000/api/media/${imageId}`;
}

// Requests Utilities

export async function createRequest(request: RequestData) {
  let token = getLoginToken();
  if (!token) return;

  let headers: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  };

  return fetch("http://localhost:3000/api/requests", headers);
}

export async function approveRequest(requestId: String) {
  let token = getLoginToken();
  if (!token) return;

  let headers: RequestInit = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`http://localhost:3000/api/requests/${requestId}`, headers);
}

export async function denyRequest(requestId: String) {
  let token = getLoginToken();
  if (!token) return;

  let headers: RequestInit = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`http://localhost:3000/api/requests/${requestId}`, headers);
}

export async function getRequestsFromBackend() {
  let token = getLoginToken();
  if (!token) return Promise.reject("Not logged in");

  let headers: RequestInit = {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch("http://localhost:3000/api/requests", headers);
}

export async function getProductsByCategory(id: String) {
  let headers: RequestInit = {
    method: "GET",
  };
  return fetch(`http://localhost:3000/api/products/categories/${id}`, headers);
}

export async function getCategoriesFromBackend() {
  let headers: RequestInit = {
    method: "GET",
  };
  return fetch("http://localhost:3000/api/category", headers);
}

export async function getProducts() {
  let headers: RequestInit = {
    method: "GET",
  };
  return fetch("http://localhost:3000/api/products/", headers);
}

export async function updateProduct(id: String, data: ProductData) {
  let token = getLoginToken();
  if (!token) return Promise.reject("No login token");

  let headers: RequestInit = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(`http://localhost:3000/api/products/${id}`, headers);
}

export async function createOrder(
  products: ProductData[],
  deliveryOption: DeliveryBackend,
  deliveryAddress: Address,
  paymentOption: PaymentBackend
) {
  let token = getLoginToken();
  if (!token) return Promise.reject("No login token");

  let tokenData = getTokenData(token);

  let body = {
    products,
    userID: tokenData.id,
    deliveryOption,
    deliveryAddress,
    paymentOption
  };

  let headers: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  return fetch(`http://localhost:3000/api/order`, headers);
}

export async function getPayments() {
  let token = getLoginToken();
  if (!token) return Promise.reject("No login token");

  let headers: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch("http://localhost:3000/api/payment/", headers);
}

export async function getDeliveries() {
  let headers: RequestInit = {
    method: "GET",
  };

  return fetch("http://localhost:3000/api/delivery/", headers);
}

export async function getUserById(id: String) {
  let token = getLoginToken();
  if (!token) return Promise.reject("No login token");

  let headers: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`http://localhost:3000/api/user/${id}`, headers);
}

export async function getCurrentUser() {
  let token = getLoginToken();
  if (!token) return Promise.reject("No login token");

  let tokenData = getTokenData(token);

  return getUserById(tokenData.id);
}

export async function getOrderById(id: String) {
  let token = getLoginToken();
  if (!token) return Promise.reject("No login token");

  let headers: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`http://localhost:3000/api/order/${id}`, headers);
}
