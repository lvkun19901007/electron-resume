export interface GStore {
  /**
   * @description 项目路径
   */
  rootPath: string;
  appName: string;
}

const globalModel: TSRcReduxModel.Props<GStore> = {
  namespace: 'globalModel',
  openSeamlessImmutable: true,
  state: {
    appName: 'appName',
    rootPath: '',
  }
};
export default globalModel;