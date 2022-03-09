import React, { useState, useEffect } from 'react';
import './index.less';
import MyScrollBox from '@common/components/MyScrollBox';
import RESUME_TOOLBAR_LIST from '@common/constants/resume';
import { onAddToolbar, onDeleteToolbar } from './utils';
import { useDispatch } from 'react-redux';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@src/common/messager';

function ResumeToolBar() {
  const height = document.body.clientHeight;
  const dispatch = useDispatch();

  const [addToolbarList, setAddToolbarList] = useState<TSResume.SliderItem[]>([]);
  const [unAddToolbarList, setUnAddToolbarList] = useState<TSResume.SliderItem[]>([]);


  useEffect(() => {
    if (RESUME_TOOLBAR_LIST.length > 0) {
      let _addToolbarList: TSResume.SliderItem[] = [];
      let _unAddToolbarList: TSResume.SliderItem[] = [];
      RESUME_TOOLBAR_LIST.forEach((s: TSResume.SliderItem) => {
        if (s.require) _addToolbarList.push(s);
        if (!s.require) _unAddToolbarList.push(s);
      });
      setAddToolbarList(_addToolbarList);
      setUnAddToolbarList(_unAddToolbarList);
      changeResumeToolbarKeys(_addToolbarList.map((s: TSResume.SliderItem) => s.key));
    }
  }, []);

  const changeResumeToolbarKeys = (moduleKeys: string[]) => {
    if (moduleKeys.length > 0) {
      dispatch({
        type: 'templateModel/setStore',
        payload: {
          key: 'resumeToolbarKeys',
          values: moduleKeys,
        }
      });
    }
  };

  const onAddSliderAction = (moduleToolbar: TSResume.SliderItem) => {
    const nextAddSliderList = onAddToolbar(addToolbarList, moduleToolbar);
    setAddToolbarList(nextAddSliderList);

    const nextUnAddSliderList = onDeleteToolbar(unAddToolbarList, moduleToolbar);
    setUnAddToolbarList(nextUnAddSliderList);

    changeResumeToolbarKeys(nextAddSliderList.map((s: TSResume.SliderItem) => s.key));
  };

  const onDeleteSliderAction = (moduleSlider: TSResume.SliderItem) => {
    const nextAddSliderList = onDeleteToolbar(addToolbarList, moduleSlider);
    setAddToolbarList(nextAddSliderList);

    const nextUnAddSliderList = onAddToolbar(unAddToolbarList, moduleSlider);
    setUnAddToolbarList(nextUnAddSliderList);
    
    changeResumeToolbarKeys(nextAddSliderList.map((s: TSResume.SliderItem) => s.key));
  };

  return (
    <div styleName="slider">
      <MyScrollBox maxHeight={height - 180}>
        {
          addToolbarList.length > 0 && (
            <div styleName="module">
              <div styleName="title">
                <span styleName="line" />
                已添加模块
              </div>
              <div styleName="content">
                {
                  addToolbarList.map((toolbar: TSResume.SliderItem) => {
                    return (
                      <div 
                        styleName="box" 
                        key={toolbar.key}
                        onClick={() => {
                          Messager.send(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAl, {
                            form_name: toolbar.key
                          });
                        }}
                      >
                        <div styleName="info">
                          <i styleName="icon" />
                          <div styleName="text">
                            <div styleName="name">{toolbar.name}</div>
                            <div styleName="summary">{toolbar.summary}</div>
                          </div>
                          {toolbar.require && <div styleName="tips">必选项</div>}
                          {!toolbar.require && (
                            <div styleName="action">
                              <i styleName="edit" onClick={(e: React.MouseEvent) => {}} />
                              <i
                                styleName="delete"
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation && e.stopPropagation();
                                  onDeleteSliderAction(toolbar);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
        {
          unAddToolbarList.length > 0 && (
            <div styleName="module">
              <div styleName="title">
                <span styleName="line" />
                未添加模块
              </div>
              <div styleName="content">
                {
                  unAddToolbarList.map((toolbar: TSResume.SliderItem) => {
                    return (
                      <div styleName="box" key={toolbar.key} onClick={() => onAddSliderAction(toolbar)}>
                        <div styleName="info">
                          <i styleName="icon" />
                          <div styleName="text">
                            <div styleName="name">{toolbar.name}</div>
                            <div styleName="summary">{toolbar.summary}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }        
      </MyScrollBox>
    </div>
  )
}

export default ResumeToolBar;