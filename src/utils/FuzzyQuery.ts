const findMostSimilarString = (target, arr, prop) => {
  let maxSimilarity = 0;
  let mostSimilarString = '';
  const stringArray = arr?.map((a: any) => a[prop]);

  // 定义计算Levenshtein Distance的函数
  const levenshteinDistance = (s, t) => {
    const m = s.length;
    const n = t.length;
    const d = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

    // 初始化矩阵
    for (let i = 0; i <= m; i++) {
      d[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      d[0][j] = j;
    }

    // 动态规划填充矩阵
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s[i - 1] === t[j - 1]) {
          d[i][j] = d[i - 1][j - 1];
        } else {
          d[i][j] = Math.min(
            d[i - 1][j - 1] + 1, // 替换
            d[i - 1][j] + 1, // 删除
            d[i][j - 1] + 1, // 插入
          );
        }
      }
    }

    // 计算相似度分数，范围从0到1，1表示完全相同
    return 1 - d[m][n] / Math.max(m, n);
  };

  // 遍历字符串数组，计算每个字符串与目标字符串的相似度
  for (const str of stringArray) {
    const similarity = levenshteinDistance(target, str);
    // 更新最大相似度和对应的字符串
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      mostSimilarString = str;
    }
  }

  return mostSimilarString;
};

export const FuzzyQuery = (str: any, arr: any, prop) => {
  const mostSimilar = findMostSimilarString(str, arr, prop);
  const arrItem: any = arr?.find((a: any) => a.label == mostSimilar);
  return arrItem;
};
