import React, { useState } from 'react';
import Aside from './aside/Aside';

const Sidebar = ({type, currentPath, tree, onClickFile, onSearch}) => {
  return (
    <Aside tree={tree} onClickFile={onClickFile} onSearch={onSearch} type={type} currentPath={currentPath}/>
  )
}

export default Sidebar;
