import React from 'react';
import { Popover, Icon } from 'antd';
import FirebaseUI from './FirebaseUi';


const text = <span>Title</span>;
const content = (
  <FirebaseUI />
);

const buttonWidth = 70;

export default function SignIn(props) {
  return (


    <Popover placement="rightBottom" content={content} trigger="hover">
      <div className='sign-in'> <Icon type="login" /> Sign In</div>
    </Popover>

  )
};


