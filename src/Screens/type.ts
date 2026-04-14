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
applyLink?:string;
  title: string;
  image?: string;
  description: string;
  company?: string;
  salary?: number;
  location?: string;
  likes: string[]; // array of userIds
  comments: Comment[];
  createdAt: string;
  updatedAt: string;

}