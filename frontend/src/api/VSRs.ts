import { APIResult, get, handleAPIError, post } from "@/api/requests";

export interface VSRJson {
  _id: string;
  name: string;
  date: Date;
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
}

export interface VSRListJson {
  vsrs: VSRJson[];
}

export interface VSR {
  _id: string;
  name: string;
  date: string;
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
}

function parseVSR(vsr: VSRJson) {
  return {
    _id: vsr._id,
    name: vsr.name,
    date: new Date(vsr.date).toISOString(),
    gender: vsr.gender,
    age: vsr.age,
    maritalStatus: vsr.maritalStatus,
    spouseName: vsr.spouseName,
    agesOfBoys: vsr.agesOfBoys,
    agesOfGirls: vsr.agesOfGirls,
    ethnicity: vsr.ethnicity,
    employmentStatus: vsr.employmentStatus,
    incomeLevel: vsr.incomeLevel,
    sizeOfHome: vsr.sizeOfHome,
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

export async function getAllVSRs(): Promise<APIResult<VSR[]>> {
  try {
    const response = await get("/api/vsr");
    const json = (await response.json()) as VSRListJson;
    return { success: true, data: json.vsrs.map(parseVSR) };
  } catch (error) {
    return handleAPIError(error);
  }
}
