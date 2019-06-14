import React, { useState } from 'react';
import Aside from './aside/aside';

const Sidebar = ({tree, onClickFile, onSearch}) => {
  return (
    <Aside tree={tree} onClickFile={onClickFile} onSearch={onSearch}/>
  )
}

export default Sidebar;
