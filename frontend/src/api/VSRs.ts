import {
  APIResult,
  assertOk,
  get,
  handleAPIError,
  httpDelete,
  patch,
  post,
  put,
} from "@/api/requests";
import { createAuthHeader } from "@/api/Users";

export interface FurnitureInput {
  furnitureItemId: string;
  quantity: number;
}

export interface VSRJson {
  _id: string;
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  spouseName?: string;
  agesOfBoys: number[];
  agesOfGirls: number[];
  ethnicity: string[];
  employmentStatus: string;
  incomeLevel: string;
  sizeOfHome: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNumber: string;
  email: string;
  branch: string[];
  conflicts: string[];
  dischargeStatus: string;
  serviceConnected: boolean;
  lastRank: string;
  militaryID: number;
  petCompanion: boolean;
  selectedFurnitureItems: FurnitureInput[];
  additionalItems: string;
  dateReceived: string;
  lastUpdated: string;
  status: string;
  hearFrom: string;
}

export interface VSRListJson {
  vsrs: VSRJson[];
}

export interface VSR {
  _id: string;
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  spouseName?: string;
  agesOfBoys: number[];
  agesOfGirls: number[];
  ethnicity: string[];
  employmentStatus: string;
  incomeLevel: string;
  sizeOfHome: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNumber: string;
  email: string;
  branch: string[];
  conflicts: string[];
  dischargeStatus: string;
  serviceConnected: boolean;
  lastRank: string;
  militaryID: number;
  petCompanion: boolean;
  selectedFurnitureItems: FurnitureInput[];
  additionalItems: string;
  dateReceived: Date;
  lastUpdated: Date;
  status: string;
  hearFrom: string;
}

export interface CreateVSRRequest {
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  spouseName?: string;
  agesOfBoys: number[];
  agesOfGirls: number[];
  ethnicity: string[];
  employmentStatus: string;
  incomeLevel: string;
  sizeOfHome: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNumber: string;
  email: string;
  branch: string[];
  conflicts: string[];
  dischargeStatus: string;
  serviceConnected: boolean;
  lastRank: string;
  militaryID: number;
  petCompanion: boolean;
  hearFrom: string;
  selectedFurnitureItems: FurnitureInput[];
  additionalItems: string;
}

export interface UpdateVSRRequest {
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  spouseName?: string;
  agesOfBoys: number[];
  agesOfGirls: number[];
  ethnicity: string[];
  employmentStatus: string;
  incomeLevel: string;
  sizeOfHome: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNumber: string;
  email: string;
  branch: string[];
  conflicts: string[];
  dischargeStatus: string;
  serviceConnected: boolean;
  lastRank: string;
  militaryID: number;
  petCompanion: boolean;
  hearFrom: string;
  selectedFurnitureItems: FurnitureInput[];
  additionalItems: string;
}

function parseVSR(vsr: VSRJson) {
  return {
    ...vsr,
    dateReceived: new Date(vsr.dateReceived),
    lastUpdated: new Date(vsr.lastUpdated),
  };
}

export async function createVSR(vsr: CreateVSRRequest): Promise<APIResult<VSR>> {
  try {
    const response = await post("/api/vsr", vsr);
    const json = (await response.json()) as VSRJson;
    return { success: true, data: parseVSR(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

const incomeMap: { [key: string]: string } = {
  "$50,001 and over": "50000",
  "$25,001 - $50,000": "25000",
  "$12,501 - $25,000": "12500",
  "$12,500 and under": "0",
};

export async function getAllVSRs(
  firebaseToken: string,
  search?: string,
  zipCodes?: string[],
  income?: string,
  status?: string,
): Promise<APIResult<VSR[]>> {
  const searchParams = new URLSearchParams();
  if (search) {
    searchParams.set("search", search);
  }
  if (zipCodes) {
    searchParams.set("zipCode", zipCodes.join(", "));
  }
  if (income) {
    searchParams.set("incomeLevel", incomeMap[income]);
  }
  if (status) {
    searchParams.set("status", status);
  }

  const searchParamsString = searchParams.toString();
  const urlString = `/api/vsr${searchParamsString ? "?" + searchParamsString : ""}`;

  try {
    const response = await get(urlString, createAuthHeader(firebaseToken));
    const json = (await response.json()) as VSRListJson;
    return { success: true, data: json.vsrs.map(parseVSR) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getVSR(id: string, firebaseToken: string): Promise<APIResult<VSR>> {
  try {
    const response = await get(`/api/vsr/${id}`, createAuthHeader(firebaseToken));
    const json = (await response.json()) as VSRJson;
    return { success: true, data: parseVSR(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateVSRStatus(
  id: string,
  status: string,
  firebaseToken: string,
): Promise<APIResult<VSR>> {
  try {
    const response = await patch(
      `/api/vsr/${id}/status`,
      { status },
      createAuthHeader(firebaseToken),
    );
    const json = (await response.json()) as VSRJson;
    return { success: true, data: parseVSR(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function deleteVSR(id: string, firebaseToken: string): Promise<APIResult<null>> {
  try {
    await httpDelete(`/api/vsr/${id}`, createAuthHeader(firebaseToken));
    return { success: true, data: null };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateVSR(
  id: string,
  vsr: UpdateVSRRequest,
  firebaseToken: string,
): Promise<APIResult<VSR>> {
  try {
    const response = await put(`/api/vsr/${id}`, vsr, createAuthHeader(firebaseToken));
    const json = (await response.json()) as VSRJson;
    return { success: true, data: parseVSR(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function bulkExportVSRS(
  firebaseToken: string,
  vsrIds: string[],
  search?: string,
  zipCodes?: string[],
  income?: string,
  status?: string,
): Promise<APIResult<null>> {
  const searchParams = new URLSearchParams();
  if (search) {
    searchParams.set("search", search);
  }
  if (zipCodes) {
    searchParams.set("zipCode", zipCodes.join(", "));
  }
  if (income) {
    searchParams.set("incomeLevel", incomeMap[income]);
  }
  if (status) {
    searchParams.set("status", status);
  }

  if (vsrIds && vsrIds.length > 0) {
    searchParams.set("vsrIds", vsrIds.join(","));
  }

  const searchParamsString = searchParams.toString();
  const urlString = `/api/vsr/bulk_export${searchParamsString ? "?" + searchParamsString : ""}`;

  try {
    const response = await get(urlString, createAuthHeader(firebaseToken));
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("download", `vsrs_${new Date().toISOString()}.xlsx`);
    document.body.appendChild(link);

    link.click();

    window.URL.revokeObjectURL(url);
    return { success: true, data: null };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function exportVSRPDF(firebaseToken: string, vsrId: string): Promise<APIResult<null>> {
  try {
    // Note: we need to fetch from the frontend API, not the backend API
    const response = await fetch(`/next_api/vsr/pdf?id=${vsrId}`, {
      headers: createAuthHeader(firebaseToken),
    });
    await assertOk(response);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("download", `vsr_${vsrId}_${new Date().toISOString()}.pdf`);
    document.body.appendChild(link);

    link.click();

    window.URL.revokeObjectURL(url);
    return { success: true, data: null };
  } catch (error) {
    return handleAPIError(error);
  }
}
