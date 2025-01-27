import { IsNotEmpty } from 'class-validator';

export default class RedditFindDto {
  @IsNotEmpty()
  sub_reddit: string;
  @IsNotEmpty()
  search: string;
  title: string | null;
}
