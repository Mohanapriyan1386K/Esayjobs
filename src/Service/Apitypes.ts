export type LoginPayloadprops={
    name:string,
    email:string,
    password:string
}

export type SignupPayload = {
  name: string;
  user_name?: string;
  email: string;
  password: string;
  page?:number
  size?:number
};


export type PostQueryParams = {
  limit?: number;
  page?: number;
  title?: string;
  date?: string;
  type?:string;
  company?: string;
  fromDate?: string
  toDate?:string
  userId?:string
};


export type LikeParams={
  _id_post?:string
  _id_user?:string
}

export type PostPayload = {
  userId: string;
  jobtype: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  company: string;
  applyLink: string;
};
