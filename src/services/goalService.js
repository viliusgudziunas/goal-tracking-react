export const goalCompletedService = instances => {
  if (instances.length === 0) return false;
  const maxDate = new Date(
    Math.max(
      ...instances.map(o => {
        return new Date(o.timestamp);
      })
    )
  );
  const currentDate = new Date();
  if (
    currentDate.getFullYear() > maxDate.getFullYear() ||
    currentDate.getMonth() > maxDate.getMonth() ||
    currentDate.getDate() > maxDate.getDate()
  ) {
    return false;
  }
  return true;
};

export const countGoalInstancesService = timestamp => {
  const lastMonday = new Date();
  lastMonday.setHours(0, 0, 0, 0);
  while (lastMonday.getDay() !== 1) {
    lastMonday.setDate(lastMonday.getDate() - 1);
  }
  return lastMonday < new Date(timestamp);
};
