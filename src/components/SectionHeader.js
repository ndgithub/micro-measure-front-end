import React from 'react';

const SectionHeader = (props) => {




  return (<div class="section-header">
    <div class="section-header-title">{props.title}</div>
    {props.children}
  </div>

  )
}

export default SectionHeader;