export type ArchiveRecord = {
  id: number;
  original_url: string;
  annotated_url?: string | null;
  model_name?: string | null;
  averageCountPerFrame?: number | null;
};

export type MediaResponse = {
  id: number;
  url: string;
};

export type ModelResponse = {
  id: number;
  name: string;
};

export type ModelsResponse = Array<ModelResponse>;

export type ModelBody = {
  model_id: number;
}

export type Error = {
  error: string;
};
