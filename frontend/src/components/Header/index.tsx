/* eslint-disable @typescript-eslint/no-explicit-any */

import {  ReactNode } from "react";



interface Props{
children: ReactNode | ReactNode[];
isTransparent?: boolean;
}


function Header({children,isTransparent}:Props){
  return (
    <>
      <header className={`sidebar ${ isTransparent? "bg-transparent":"bg-[var(--color-primary)]" }`}>
        {children}
      </header>
    </>
  );
}

export default Header;
