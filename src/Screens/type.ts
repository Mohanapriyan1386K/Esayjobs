export type PostType = "job" | "blog";

export interface Comment {
  _id: string;
  userId: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Post {
  _id: string;
  userId: string;
  type: PostType;
  applyType?: "walk-in" | "online" | "email";
  applyLink?: string;
  applyEmail?: string;
  title: string;
  image?: string;
  description: string;
  content?: string;
  company?: string;
  salary?: string;
  location?: string;
  jobtype?: string;
  details?: {
    companyName?: string;
    interviewLocation?: string;
    interviewTimings?: string;
    interviewDate?: string;
    jobRole?: string;
    salaryInfo?: string;
    graduation?: string;
    yearOfPassout?: string;
    vacancy?: string;
    shift?: string;
    shiftTimings?: string;
    weeklyOff?: string;
    note?: string;
    bondAndAgreement?: string;
    hrName?: string;
    hrNumber?: string;
    rounds?: string;
    walkInInfo?: string;
    applyEmail?: string;
  };
  likes: string[]; // array of userIds
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
