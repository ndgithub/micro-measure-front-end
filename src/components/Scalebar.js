import React from "react";

function Scalebar(props) {
  console.log('renderScalebar')

  let imgContainerRatio = props.size.width / props.containerSizePx;
  let containerSizeUnits = props.imgSizeUnits / imgContainerRatio
  let targetLength = containerSizeUnits * 0.3;

  var setLength_Units;

  if (targetLength < 1) {
    // In case it's in scientific notation
    targetLength = targetLength.toFixed(20)
    setLength_Units = '0.'.split('');

    var targString = targetLength.toString();
    for (let i = 2; i < targString.length; i++) {
      const digit = targString[i];
      if (digit !== '0') {
        if (targString[i] >= 5) {
          setLength_Units.push('5');
          break;
        } else if (targString[i] < 5) {
          setLength_Units.push('1');
          break;
        }
      } else {
        setLength_Units.push('0');
      }
    }
    setLength_Units = parseFloat(setLength_Units.join(""));
  } else {
    setLength_Units = '';
    targetLength = parseInt(targetLength).toString();
    if (targetLength[0] >= 5) {
      setLength_Units += '5';
    } else {
      setLength_Units += '1';
    }
    for (let i = 1; i < targetLength.length; i++) {
      setLength_Units += '0';
    }
    setLength_Units = parseInt(setLength_Units);
  }
  var scalebarWidthPx = (setLength_Units / containerSizeUnits) * props.containerSizePx;
  var scalebarStyle = {
    width: scalebarWidthPx + 'px'
  }
  return (
    <div id="scale-bar">
      <div id="scale-bar-text">{setLength_Units}</div>
      <div id="scale-bar-inner-bar" style={scalebarStyle}></div>
    </div>
  );
}

export default Scalebar;


