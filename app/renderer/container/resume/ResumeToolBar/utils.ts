

/**
 * @description 添加工具条模块
 * @param {TSResume.SliderItem[]} prevToolbarList 上一轮
 * @param {TSResume.SliderItem} currentToolBar 当前目标模块
 * @returns {TSResume.SliderItem[]} nextToolbarList 下一轮
 */
export const onAddToolbar = (
  prevToolbarList: TSResume.SliderItem[],
  currentToolBar: TSResume.SliderItem
): TSResume.SliderItem[] => {
  const addKeys = prevToolbarList.map((s: TSResume.SliderItem) => s.key);
  let nextToolbarList = [...Array.from(prevToolbarList)];
  if (!addKeys.includes(currentToolBar.key)) {
    nextToolbarList.push(currentToolBar);
  }
  return nextToolbarList;
};


/**
 * @description 删除工具条模块
 * @param {TSResume.SliderItem[]} prevToolbarList 上一轮
 * @param {TSResume.SliderItem} currentToolBar 当前目标模块
 * @returns {TSResume.SliderItem[]} nextToolbarList 下一轮
 */
export const onDeleteToolbar = (
  prevToolbarList: TSResume.SliderItem[],
  currentToolBar: TSResume.SliderItem
): TSResume.SliderItem[] => {
  let nextToolbarList = [...Array.from(prevToolbarList)];
  const findIndex = nextToolbarList.findIndex((s) => s.key === currentToolBar.key);
  if (findIndex > -1) nextToolbarList.splice(findIndex, 1);
  return nextToolbarList;
};