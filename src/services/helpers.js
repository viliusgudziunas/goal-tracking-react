export const compareDates = date => {
  const currentDate = new Date();
  return (
    currentDate.getFullYear() === date.getFullYear() &&
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getDate() === date.getDate()
  );
};

export const instanceExistsToday = instances => {
  const maxDate = new Date(
    Math.max(
      ...instances.map(o => {
        return new Date(o.timestamp);
      })
    )
  );
  return compareDates(maxDate);
};
