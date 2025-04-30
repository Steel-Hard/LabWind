/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {  ReactNode } from "react";



interface Props{
children: ReactNode | ReactNode[];
}


function Header({children}:Props){
  return (
    <>
      <header className="sidebar bg-transparent">
        {children}
      </header>
    </>
  );
}

export default Header;
