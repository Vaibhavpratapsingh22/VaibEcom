import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
type NavBarProps = {
    image: string
}
const NavBar = ({image}:NavBarProps) => {
  return (
    <div className="px-5 flex justify-end w-full borrder">
        <Image onClick={()=> signOut()} src={image} alt="Profile Image" width={40} height={40} style={{borderRadius:"50%"}} />
    </div>
  )
}

export default NavBar