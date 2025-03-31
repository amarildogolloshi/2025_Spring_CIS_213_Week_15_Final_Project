import React from 'react';

const Header = ({children}) => {

  return (
    <header className='fixed-top'>
       { children }
    </header>
  )

}

export default Header;