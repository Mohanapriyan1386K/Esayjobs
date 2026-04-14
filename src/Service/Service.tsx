import api from "./api";
import type {PostPayload, PostQueryParams, SignupPayload } from "./Apitypes";

export const getPost = (params?: PostQueryParams) => {
    return api.get("posts/all", { params });
};

export const Signup=(payload: SignupPayload)=>{
    return api.post("users/create",payload)
}


export const Login=(payload: Partial<SignupPayload>)=>{
    return api.post("auth/login",payload)
}

export const CreatePost = (payload: PostPayload) => {
  return api.post("/posts/create", payload);
};

export const UpdatePost=(id:string,payload:Partial<PostPayload>)=>{
  return api.put(`/posts/update/${id}`,payload)
}

export const likePost = (postId: string, userId: string) => {
  return api.post(`/posts/like/${postId}`, { userId });
};


export const CommandPost = (postId: string, payload: any) => {
  return api.post(`/posts/comment/${postId}`, payload);
};

export const deletePost=(postId:string)=>{
   return api.delete(`/posts/delete/${postId}`)
}