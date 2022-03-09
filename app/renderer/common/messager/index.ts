export const MESSAGE_EVENT_NAME_MAPS = {
  OPEN_FORM_MODAl: 'open_form_modal', // 简历选择模块
};

class Messager {
  send = (eventName: string, payload: any) => {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          payload: payload
        },
      })
    );
  };

  receive = (e: any, messageHandler: Function) => {
    if (messageHandler) {
      const payload = e?.detail?.payload;
      messageHandler(payload);
    }
  };
}

export default new Messager();