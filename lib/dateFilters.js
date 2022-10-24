export function getDaysAgoData(data, daysAgo) {
  const t = new Date();

  const d = new Date(
    Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - daysAgo)
  );
  const d2 = new Date(
    Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - daysAgo * 2)
  );

  const daysAgoData = data
    .filter((item) => new Date(item.date) >= d)
    .sort((a, b) => b.date.localeCompare(a.date));
  const compareData = data
    .filter((item) => new Date(item.date) < d && new Date(item.date) >= d2)
    .sort((a, b) => b.date.localeCompare(a.date));

  return [daysAgoData, compareData];
}

export function getMonthData(data, daysAgo) {
  const t = new Date();

  const d = new Date(
    Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - daysAgo)
  );
  const d2 = new Date(
    Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - daysAgo * 2)
  );

  const daysAgoData = data
    .filter((item) => new Date(item.date) >= d)
    .sort((a, b) => b.date.localeCompare(a.date));
  const compareData = data
    .filter((item) => new Date(item.date) < d && new Date(item.date) >= d2)
    .sort((a, b) => b.date.localeCompare(a.date));

  return [daysAgoData, compareData];
}

export function getYearData(data, daysAgo) {
  const t = new Date();

  const d = new Date(
    Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - daysAgo)
  );
  const d2 = new Date(
    Date.UTC(t.getFullYear(), t.getMonth(), t.getDate() - daysAgo * 2)
  );

  const daysAgoData = data
    .filter((item) => new Date(item.date) >= d)
    .sort((a, b) => b.date.localeCompare(a.date));
  const compareData = data
    .filter((item) => new Date(item.date) < d && new Date(item.date) >= d2)
    .sort((a, b) => b.date.localeCompare(a.date));

  return [daysAgoData, compareData];
}
