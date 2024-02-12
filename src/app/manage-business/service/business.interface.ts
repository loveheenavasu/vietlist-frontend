export interface BusinessCategoryResponse {
  id: number
  name: string
  icon: string
  image: string
  trending: number
  bookmark: boolean
}

export interface TagsResponse {
  id: number
  name: string
  slug: string
  count: any
}

export interface FindBusinessParams {
  city?: string;
  region?: string;
  street?: string;
  zip?: string;
  country?: string;
  post_category?: string;
  price?:any,
  posts_per_page?:any;
  page_no?:any
}
