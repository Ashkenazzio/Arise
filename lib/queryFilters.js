export function queryTotalByCategory(arr) {
  return Object.entries(
    arr.reduce((acc, curr) => {
      !acc[curr.category.label]
        ? (acc[curr.category.label] = curr.sum)
        : (acc[curr.category.label] = +acc[curr.category.label] + curr.sum);
      return acc;
    }, {})
  ).map(([k, v]) => ({ id: k, title: k, sum: v }));
}

export function getTrend(compareArr, queryArr) {
  const byCategoryWithTrend = [...queryArr];

  for (let i = 0; i < queryArr.length; i++) {
    for (let j = 0; j < compareArr.length; j++) {
      if (queryArr[i].id == compareArr[j].id) {
        const trend =
          ((queryArr[i].sum - compareArr[j].sum) / queryArr[i].sum) * 100;

        byCategoryWithTrend[i].trend = trend;
      }
    }
  }
  return byCategoryWithTrend;
}
