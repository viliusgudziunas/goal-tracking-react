export const goalNameValidationService = (goals, goalName) => {
  return (
    goalName === '' ||
    (goals.filter(
      ({ name }) => name.toLowerCase() === goalName.toLowerCase().trim()
    ).length === 0 &&
      !goalName
        .replace(/ /g, '')
        .split('')
        .map(o => isNaN(o))
        .includes(false))
  );
};

export const goalTargetValidationService = goalTarget => {
  return goalTarget === '' || (goalTarget > 0 && goalTarget % 0.5 === 0);
};

export const hoursCompletedValidationService = hours => {
  return hours === '' || (hours > 0 && hours % 0.5 === 0);
};
