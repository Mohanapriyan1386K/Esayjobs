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
  applyType: "walk-in" | "online";
  title: string;
  content: string;
  location: string;
  salary: string;
  company: string;
  applyLink: string;
  description?: string;
  details: {
    companyName: string;
    interviewLocation: string;
    interviewTimings: string;
    interviewDate: string;
    jobRole: string;
    salaryInfo: string;
    graduation: string;
    yearOfPassout: string;
    vacancy: string;
    shift: string;
    shiftTimings: string;
    weeklyOff: string;
    note: string;
    bondAndAgreement: string;
    hrName: string;
    hrNumber: string;
    rounds: string;
    walkInInfo: string;
  };
};
