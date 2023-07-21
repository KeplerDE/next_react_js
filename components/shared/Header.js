import React from 'react';
import Link from 'next/link';




class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p className='customClass'> I am styled P element </p>
        <p className='customClassFromFile'> I am styled P element </p>
        <Link style={{'fontSize': '50px'}} href="/"> Home  </Link>{' '} 
        <Link href="/about">About  </Link>
        <Link href="/portfolios">Portfolio   </Link>
        <Link href="/blogs">Blog  </Link>
        <Link href="/cv">CV</Link>
        <style jsx>
         {
          `
          a {
            font-size: 20px;
          };
          .customClass {
            color: red;
          }
          `
         }
        </style>
      </React.Fragment>
    );
  }
}

export default Header;
