const goalNameValidation = (goals, newGoalName) => {
  return (
    goals.filter(
      ({ name }) => name.toLowerCase() === newGoalName.toLowerCase().trim()
    ).length === 0
  );
};

const checkForNumbers = newGoalName => {
  return newGoalName
    .split('')
    .map(o => isNaN(o))
    .includes(false);
};

const validationService = {
  goalNameValidation,
  checkForNumbers
};

export default validationService;
