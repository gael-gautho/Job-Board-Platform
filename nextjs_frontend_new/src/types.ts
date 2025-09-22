

export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  employment_type: string;
  experience_type: string;
  salary: string;
  created_at: string;
  description: string;
  requirements: string[];
  has_applied: boolean;
}


export interface MyJwtPayload {
  user_id: string;
  is_recruiter: boolean; 
}
