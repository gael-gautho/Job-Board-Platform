

export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  experience_level: string;
  created_at: string;
  has_favorited: boolean;
}

export interface MyJwtPayload {
  user_id: string;
  is_recruiter: boolean; 
}
