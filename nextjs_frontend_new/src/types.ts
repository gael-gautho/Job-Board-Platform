

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
  total_applicants: number;

}


export interface Application {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  status: string;
  get_resume: string
  job: Job;
  
}


export interface MyJwtPayload {
  user_id: string;
  is_recruiter: boolean; 
}


export interface UserInfo{
  user_id: string;
  is_recruiter: boolean;
}


export interface ProfileType {
    name: string;
    email: string;
    get_photo?: string;
    desired_position?: string;
    experience?: number;
    location?: string;
    get_resume?: string;
    new_photo?: File;
    new_resume?: File;
}