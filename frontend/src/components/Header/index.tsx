/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {  ReactNode } from "react";



interface Props{
children: ReactNode | ReactNode[];
isTransparent?: boolean;
}


function Header({children,isTransparent}:Props){
  return (
    <>
      <header className={`sidebar ${ isTransparent? "bg-[var(--color-primary)":"bg-transparent" }]`}>
        {children}
      </header>
    </>
  );
}

export default Header;
