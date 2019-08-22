import { instanceExistsToday, compareDates } from './helpers';

export const type1GoalCompletedService = instances => {
  if (instances.length === 0) return false;
  return instanceExistsToday(instances);
};

export const type2GoalCompletedService = (instances, target) => {
  if (instances.length === 0) return false;
  if (!instanceExistsToday(instances)) return false;
  const todaysInstances = instances.filter(({ timestamp }) => {
    return compareDates(new Date(timestamp));
  });
  const hoursCompletedToday = todaysInstances
    .map(instance => {
      return instance.hours_completed;
    })
    .reduce((totalHours, instanceHours) => {
      return totalHours + instanceHours;
    });
  const todaysGoal = Math.ceil(target / 7);
  return hoursCompletedToday >= todaysGoal;
};

export const countGoalInstancesService = timestamp => {
  const lastMonday = new Date();
  lastMonday.setHours(0, 0, 0, 0);
  while (lastMonday.getDay() !== 1) {
    lastMonday.setDate(lastMonday.getDate() - 1);
  }
  return lastMonday < new Date(timestamp);
};
