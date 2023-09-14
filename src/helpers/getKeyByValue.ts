export const getKeyByValue = <T extends Record<string, string>>(
  obj: T,
  value: string | null,
) => Object.keys(obj).find((key) => obj[key] === value) || null;
