import Image from 'next/image'
import React from 'react'
type NavBarProps = {
    image: string
}
const NavBar = ({image}:NavBarProps) => {
  return (
    <div className="px-5 py-2">
        <Image src={image} alt="Profile Image" width={50} height={50} style={{borderRadius:"50%"}} />
    </div>
  )
}

export default NavBar