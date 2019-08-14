export const goalNameValidationService = (goals, newGoalName) => {
  return (
    goals.filter(
      ({ name }) => name.toLowerCase() === newGoalName.toLowerCase().trim()
    ).length === 0 &&
    !newGoalName
      .replace(/ /g, '')
      .split('')
      .map(o => isNaN(o))
      .includes(false)
  );
};

export const goalTargetValidationService = goalTarget => {
  return (
    !isNaN(goalTarget) && Number.isInteger(Number(goalTarget)) && goalTarget > 0
  );
};
