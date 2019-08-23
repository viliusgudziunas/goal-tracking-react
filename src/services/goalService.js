import { instanceExistsToday, compareDates } from './helpers';

export const type1GoalCompletedService = instances => {
  if (instances.length === 0) return false;
  return instanceExistsToday(instances);
};

export const type2GoalCompletedService = (instances, target) => {
  // const todaysGoal = Math.ceil(target / 7);
  // return hoursCompletedToday >= todaysGoal;
};

export const goalCompletedHoursTodayService = instances => {
  if (instances.length === 0) return 0;
  if (!instanceExistsToday(instances)) return 0;
  const todaysInstances = instances.filter(({ timestamp }) => {
    return compareDates(new Date(timestamp));
  });
  return todaysInstances
    .map(instance => {
      return instance.hours_completed;
    })
    .reduce((totalHours, instanceHours) => {
      return totalHours + instanceHours;
    });
};

export const countGoalInstancesService = timestamp => {
  const lastMonday = new Date();
  lastMonday.setHours(0, 0, 0, 0);
  while (lastMonday.getDay() !== 1) {
    lastMonday.setDate(lastMonday.getDate() - 1);
  }
  return lastMonday < new Date(timestamp);
};
