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
  return (
    goalTarget === '' ||
    (!isNaN(goalTarget) &&
      Number.isInteger(Number(goalTarget)) &&
      goalTarget > 0)
  );
};
