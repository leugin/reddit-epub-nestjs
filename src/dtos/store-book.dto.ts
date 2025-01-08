export class StoreBookContent {
  title: string | null;
  author: string | null;
  content: string;
}
export class StoreBookDto {
  title: string;
  author: string;
  cover: string;
  description: string | null;
  content: StoreBookContent[];
}
