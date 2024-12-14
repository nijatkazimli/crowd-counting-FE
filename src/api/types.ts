export type Record = {
  id: number;
  original_url: string;
  annotated_url?: string | null;
  model_name?: string | null;
  averageCountPerFrame?: number | null;
}

export type ArchiveRecord = Record & {
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
};

export type ModelInsight = {
  count_0_5: number;
  count_100_plus: number;
  count_25_50: number;
  count_50_100: number;
  count_5_25: number;
  model_name: string | null | undefined;
  model_usage_count: number;
};

export type Insights = {
  data: Array<ModelInsight>;
};

export type Error = {
  error: string;
};
