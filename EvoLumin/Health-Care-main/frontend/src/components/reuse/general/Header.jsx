import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-slate-50'>
      <div className='flex justify-around pt-14 pb-6 font-medium'>
        {/* Hidden on small screens, visible on medium screens and up */}
        <div className='hidden md:flex'>
          <p className='mr-14'>Contact</p>
          <p className='mr-14'>About</p>
          <p className='mr-14'>Feedback</p>
          <p className='mr-14'>Blog</p>
        </div>
        {/* Always visible */}
        <div className='flex'>
        <Link  to='/login'>  <p className='mr-14 text-blue-500  bg-gray-100  p-1 rounded-2xl -m-1 pl-3 pr-3 hover:scale-110'>Login</p></Link>
          <Link to='/register'><p className='mr-14 text-blue-500  bg-gray-100  p-1 rounded-2xl -m-1 pl-3 pr-3 hover:scale-110'>Register</p></Link>
        </div>
      </div>
    </div>
  )
}

export default Header
