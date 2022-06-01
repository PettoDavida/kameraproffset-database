import { getLoginToken } from "./token";

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

export interface Delivery {
  title: String;
  price: number;
  info: String;
  expectedArrival: Date;
  image: String;
  _id: String;
}
export interface ShipperSelection {
  shipper: Delivery;
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
    method: "POST",
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
