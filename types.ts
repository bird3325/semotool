// FIX: The import from 'react' is replaced with 'lucide-react' to use the correct type for lucide icons.
import type { LucideIcon } from 'lucide-react';

export type CalculatorCategory = 
  | 'unit-conversion'
  | 'finance'
  | 'real-estate'
  | 'lifestyle'
  | 'education'
  | 'health';

export interface Calculator {
  id: string;
  name: string;
  // FIX: The icon type is changed to LucideIcon to support props like 'size' for lucide-react components.
  icon: LucideIcon;
}

export interface Category {
  id: CalculatorCategory;
  name: string;
  // FIX: The icon type is changed to LucideIcon to support props like 'size' for lucide-react components.
  icon: LucideIcon;
  color: string;
  tools: Calculator[];
}

export interface PopularTool {
    id: string;
    name: string;
    // FIX: The icon type is changed to LucideIcon to support props like 'size' for lucide-react components.
    icon: LucideIcon;
    color: string;
}