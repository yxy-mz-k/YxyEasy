/**
 * 通过等级返回需要显示的颜色以及名称
 * @param   String  color   、
 * @return  Boolean
 */
export function getRiskLevelData(v: string) {
  if (v === '4') {
    return {'color': 'red', 'name': '红色'}
  } else if (v === '3') {
    return {'color': 'orange', 'name': '橙色'}
  } else if (v === '2') {
    return {'color': 'yellow', 'name': '黄色'}
  } else if (v === '1') {
    return {'color': 'blue', 'name': '蓝色'}
  } else {
    return {'color': '', 'name': ''}
  }
}
