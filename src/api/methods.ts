import { v4 as uuidv4 } from "uuid";
import {
  Record,
  ArchiveRecord,
  ModelsResponse,
  MediaResponse,
  ModelBody,
} from "./types";

const baseUrl = "http://localhost:5001";

interface RequestOptions<T> {
  method: RequestInit["method"];
  path: string;
  body?: T;
  headers?: HeadersInit;
}

async function apiMethod<ResponseType, RequestBodyType = undefined>({
  method,
  path,
  body,
  headers,
}: RequestOptions<RequestBodyType>): Promise<ResponseType> {
  const isFormData = body instanceof FormData;

  const defaultHeaders: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...headers,
  };

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
    body: isFormData ? (body as unknown as FormData) : JSON.stringify(body),
  };

  try {
    const response = await fetch(baseUrl + path, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    const data: ResponseType = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function uploadFile(file: File): Promise<MediaResponse> {
  const formData = new FormData();

  const fileNameParts = file.name.split(".");
  const fileExtension = fileNameParts.pop();
  const fileNameWithoutExtension = fileNameParts.join(".");

  const cleanedFileName = fileNameWithoutExtension
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();
  const newFileName = `${cleanedFileName}-${uuidv4()}.${fileExtension?.toLowerCase()}`;

  const newFile = new File([file], newFileName, { type: file.type });
  formData.append("file", newFile);

  try {
    const response = await apiMethod<MediaResponse, FormData>({
      method: "POST",
      path: "/upload",
      body: formData,
    });
    return response;
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw error;
  }
}

export async function fetchModels(): Promise<ModelsResponse> {
  try {
    const response = await apiMethod<ModelsResponse>({
      method: "GET",
      path: "/models",
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch models:", error);
    throw error;
  }
}

export async function fetchRecord(id: string): Promise<Record> {
  try {
    const response = await apiMethod<Record>({
      method: "GET",
      path: `/get/${id}`,
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch record:", error);
    throw error;
  }
}

export async function fetchArchive(): Promise<ArchiveRecord[]> {
  try {
    const response = await apiMethod<ArchiveRecord[]>({
      method: "GET",
      path: "/archive",
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch archive:", error);
    throw error;
  }
}

export async function count(
  mediaId: number,
  modelId: number
): Promise<MediaResponse> {
  try {
    const response = await apiMethod<MediaResponse, ModelBody>({
      method: "PUT",
      path: `/count/${mediaId}`,
      body: {
        model_id: modelId,
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to count:", error);
    throw error;
  }
}
