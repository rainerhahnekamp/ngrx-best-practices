export interface Holiday {
  id: number;
  title: string;
  teaser: string;
  description: string;
  imageUrl: string;
  typeId: number;
  durationInDays: number;
  minCount: number;
  maxCount: number;
}
