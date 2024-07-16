import AboutForm from '@/components/tailAdmin/about/aboutForm'
import axios from 'axios'
import React from 'react'

async function AboutId({ params }:{params:{id:string}}) {
  let about;
  try {
    const res = await axios.get(`http://localhost:3000/api/about/${params.id}`)
    about= res.data;
    
  } catch (error) {
    console.log(error);
  }

  return (
    <>
   
     <AboutForm about={about} isUpdate/>
    </>
  )
}

export default AboutId