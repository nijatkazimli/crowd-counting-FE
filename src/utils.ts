import { Insights } from "./api";
import { ModelInsight } from "./api/types";
import { Media, MEDIA_TYPES } from "./constants";

const videoExtensions = [
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".mkv",
  ".webm",
  ".m4v",
  ".mpg",
  ".mpeg",
  ".3gp",
  ".3g2",
  ".m2ts",
  ".ts",
  ".ogv",
];
const imageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".tiff",
  ".svg",
  ".webp",
  ".ico",
  ".heic",
  ".heif",
  ".raw",
  ".ppm",
  ".pgm",
  ".pbm",
  ".pnm",
];

export function getFileTypeFromExtension(url: string): Media | "UNKNOWN" {
  const extension = url.split(".").pop()!.toLowerCase();
  if (videoExtensions.includes(`.${extension}`)) {
    return MEDIA_TYPES.VIDEO;
  } else if (imageExtensions.includes(`.${extension}`)) {
    return MEDIA_TYPES.IMAGE;
  } else {
    return "UNKNOWN";
  }
}

export function truncateUrl(url: string) {
  if (url.length <= 29) return url;
  const start = url.slice(0, 20);
  const end = url.slice(-8);
  return `${start}...${end}`;
}

export function roundNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return "";
  const strNum = num.toString();
  const decimalIndex = strNum.indexOf(".");
  if (decimalIndex === -1) return strNum;
  return strNum.slice(0, decimalIndex + 3);
}

function getModelNameAndUsageCount(insights: Insights | undefined) {
  if (!insights) return undefined;

  return insights.data.reduce((acc, curr) => {
    const modelName = curr.model_name;
    if (!modelName) return acc;
    acc.set(modelName, curr.model_usage_count);
    return acc;
  }, new Map<string, number>());
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function insightsToPieChartSeries(insights: Insights | undefined) {
  const nameAndCounts = getModelNameAndUsageCount(insights);
  if (!nameAndCounts) return [];
  const series: { id: number; value: number; label: string; color: string; }[] = [];
  let index = 0;
  nameAndCounts.forEach((value, key) => {
    series.push({
      id: index++,
      value,
      label: key,
      color: getRandomColor(),
    });
  });
  return series;
}

function transformDataToSeries(data: ModelInsight[]) {
  const categories: (keyof Omit<ModelInsight, 'model_usage_count' | 'model_name'>)[] = 
    ['count_0_5', 'count_5_25', 'count_25_50', 'count_50_100', 'count_100_plus'];

  const series = categories.map(category => ({
    label: category,
    data: data.map(item => item[category])
  }));

  return series;
}

export function insightsToBarChart(insights: Insights | undefined) {
  if (!insights) return undefined;
  const xAxisData = insights.data.map(insight => insight.model_name ?? 'unknown');
  const series = transformDataToSeries(insights.data);
  return { xAxisData, series };
}

export function coalesceNullishString(str: string | null | undefined) {
  if (!str) return 'NA';
  return str;
}
