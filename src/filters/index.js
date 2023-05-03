/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label;
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  time = new Date(time) / 1000
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " 分钟");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " 小时");
  } else {
    return pluralize(~~(between / 86400), " 天");
  }
}
