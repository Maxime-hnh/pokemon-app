import { Set } from "./set.interface";

export interface Serie {

  id: string;
  name: string;
  logo: string;
  sets: Set[];

  index?: number;
}

export interface SerieBrief {
  id: string;
  name: string;
}