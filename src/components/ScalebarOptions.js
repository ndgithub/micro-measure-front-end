import React from "react";
import SectionHeader from './SectionHeader';
import { Switch } from 'antd';


class ScalebarOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  componentDidMount() {
  }

  componentDidUpdate() {

  }


  onClickDone = () => {

  }
  render() {
    console.log('whatuuuuuuuuuuuuup');
    return (<>
      <SectionHeader title="SCALEBAR">

        < div className="switch-container">
          <Switch checked={this.props.isScalebarChecked} onClick={(checked) => this.props.onCheckUseScalebar(checked)} size='small' />
        </div>
      </SectionHeader>

    </>)
  }

}

export default ScalebarOptions;
