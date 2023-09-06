import { toast } from 'react-toastify';

export const notify = (subject:any,type:string) => type==="sucess" ? toast.success(subject) : toast.error(subject);