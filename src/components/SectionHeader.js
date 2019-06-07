import React from 'react';

const SectionHeader = (props) => {




  return (<div className="section-header">
    <div className="section-header-title">{props.title}</div>
    {props.children}
  </div>

  )
}

export default SectionHeader;