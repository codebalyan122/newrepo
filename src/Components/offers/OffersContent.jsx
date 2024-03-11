import React from 'react'
import NavbarComponent from '../Navbar';
import Aside from '../Aside';

const OffersContent = () => {
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <h1>Something</h1>
      </div>
    </>
  );
}

export default OffersContent
