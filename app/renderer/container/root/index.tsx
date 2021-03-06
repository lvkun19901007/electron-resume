import React, { useEffect } from 'react';
import { shell } from 'electron';
import './index.less';
import { useHistory } from 'react-router';
import Logo from '@assets/logo.png';
import { ROUTER_ENTRY, ROUTER_KEY} from '@common/constants/router';
import { isHttpOrHttpsUrl } from '@common/utils/router';
import { useSelector, useDispatch } from 'react-redux';

function Root() {
  const dispatch = useDispatch();
  const appName = useSelector((state: any) => state.globalModel.appName);
  
  useEffect(() => {
    setTimeout(() => {
      console.log('3s 后修改...');
      dispatch({
        type: 'globalModel/setStore',
        payload: {
          key: 'appName',
          values: 'visResumeBook',
        }
      });
    }, 3000);
  }, []);

  useEffect(() => {
    console.log('appName = ', appName);
  }, [appName]);

  const history = useHistory();
  const onRouterToLink = (router: TSRouter.Item) => {
    if (isHttpOrHttpsUrl(router.url)) {
      shell.openExternal(router.url);
    } else {
      history.push(router.url);
    }
  };
  return (
    <div styleName="root">
      <div styleName="container">
        <img src={Logo} alt="" />
        <div styleName="title">ViseResumeMook</div>
        <div styleName="tips">一个简历制作平台，让你的简历更加出众～</div>
        <div styleName="action">
          {ROUTER_ENTRY.map((router: TSRouter.Item) => (
            <div key={router.key} styleName="item" onClick={() => onRouterToLink(router)}>{router.text}</div>  
          ))}
        </div>
        <div styleName="copyright">
          <div styleName="footer">
            <p styleName="copyright">
              Copyright © 2018-{new Date().getFullYear()} All Rights Reserved. Copyright By pengdaokuan
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Root;