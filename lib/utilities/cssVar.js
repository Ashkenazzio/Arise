const cssVar = (name) => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }
};

export default cssVar;
