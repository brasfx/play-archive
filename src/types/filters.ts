export interface Filters {
  search?: string;
  search_exact?: boolean;
  genres?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  platforms?: string | string[];
  parent_platforms?: string | string[];
}
