import React, { useState } from 'react';



function Snapshot(props) {
  const [inputValue, setValue] = useState(
    'Untitled'
  );

  const [style, setStyle] = useState({});

  const onKeyDown = (e) => {
    if (e.keyCode === 13) e.target.blur();
  }


  return (
    <div className='snapshot-container'>
      <div className="img-container">
        <img src={props.imgSrc} alt='' className='snapshot'></img>
      </div>
      <div className="snapshot-input-fields">
        <input className='title-input-field' type="text" id="blah" value={inputValue}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => setStyle({ border: 'none' })}
          style={style} />
      </div>
    </div>
  )
}

export default Snapshot;