import { SetBrief } from "./set.interface";

interface Variants {
  normal: boolean;
  rever: boolean;
  holo: boolean;
  firstEdition: boolean;
}


export interface Card {
  id: string;
  localId: string | number;
  name: string;
  image: string;
  category: string;
  illustrator: string;
  rarity: string;
  variants: Variants;
  set: SetBrief;
};

export interface CardBrief {
  id: string;
  localId: string;
  name: string;
  image: string;

}