import type { LucideIcon } from "lucide-react";

export type CalculatorCategory =
  | "unit-conversion"
  | "finance"
  | "real-estate"
  | "lifestyle"
  | "education"
  | "health";

export interface Calculator {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface Category {
  id: CalculatorCategory;
  name: string;
  icon: LucideIcon;
  color: string;
  tools: Calculator[];
}

export interface PopularTool {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}
