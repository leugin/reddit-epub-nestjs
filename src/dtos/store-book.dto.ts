export class StoreBookContent {
  title: string | null;
  author: string | null;
  content: string;
}
export class StoreBookDto {
  uuid: string;
  title: string;
  created_by_id: number | null;
  author: string;
  cover: string;
  description: string | null;
  content: StoreBookContent[];
}
