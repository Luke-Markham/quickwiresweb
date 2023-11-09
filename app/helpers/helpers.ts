export function quickWireGoProOnSignUp(timing?: string) {
  const key = "quickWireGoProOnSignUp";
  const storedValue = localStorage.getItem(key);

  if (storedValue) {
    const parsedValue = JSON.parse(storedValue);
    localStorage.removeItem(key);
    return parsedValue;
  }

  const newValue = JSON.stringify({ goPro: true, timing });
  localStorage.setItem(key, newValue);
  return null;
}

export const isPastCurrentDate = (timestamp: {
  seconds: number;
  nanoseconds: number;
}): boolean => {
  const timestampInMillis =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const currentDateInMillis = new Date().getTime();
  return timestampInMillis < currentDateInMillis;
};
