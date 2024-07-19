import { TLoading } from '@types';
import React from 'react'
import LottieHandler from '../LottieHandler/LottieHandler';


type TLoadingProps = {

  status: TLoading,
  type?: string,
  error: null | string;
  children: React.ReactNode;
}
function Loading({status,type,error,children }: TLoadingProps) {
  if(status === "pending"){
    return <p>Loading...</p>
  }
  if(status === "failed")
    {
  return <p><LottieHandler type="error" message={error as string}/></p>
console.log(type)
  }
  return (
    <>
{children}
    </>
  )
}

export default Loading
