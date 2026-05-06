export type PageType = "cover" | "welcome" | "content" | "video" | "cta";

export interface PageAction {
  label: string;
  type: "primary" | "secondary";
  url?: string;
}

export interface PageData {
  id: number;
  type: PageType;
  title: string;
  subtitle?: string;
  content?: string;
  image?: string;
  videoUrl?: string;
  price?: string;
  actions?: PageAction[];
}

export interface MagazineData {
  id: string;
  clientName: string;
  title: string;
  welcomePhoto: string;
  description: string;
  language: "en" | "ar";
  direction: "ltr" | "rtl";
  pages: PageData[];
}
