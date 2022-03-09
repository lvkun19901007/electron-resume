import React, { useEffect } from 'react';
import './index.less';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@src/common/messager';
import * as UseTemplateList from './UseTemplate';
import MyScrollBox from '@common/components/MyScrollBox';

function ResumeContent() {
  const HEADER_ACTION_HEIGHT = 92;
  const height = document.body.clientHeight;
  
  useEffect(() => {
    document.addEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAl, onReceive);
    return () => {
      document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAl, onReceive);
    }
  }, []);

  const onReceive = (e: any) => {
    Messager.receive(e, (data: any) => {
      console.log(data);
    })
  };

  return (
    <MyScrollBox maxHeight={height - HEADER_ACTION_HEIGHT}>
      <UseTemplateList.TemplateOne />
    </MyScrollBox>
  )
}

export default ResumeContent;