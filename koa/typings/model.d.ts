export interface ArticleScheme {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  tags?: Array<string>;
}
export interface ArticlePageList {
  count: number;
  rows: Array<ArticleScheme>;
}
