const TeamsApi = require("../support/teamsApi");

describe("Teams API - Create Team", () => {
  let createdTeamName = null;

  afterEach(async () => {
    if (createdTeamName) {
      // Find id by name
      createdTeamId = await TeamsApi.getTeamIdByName(createdTeamName);
      await TeamsApi.deleteTeam(createdTeamId);
      createdTeamName = null;
    }
  });

  describe("When creating a team with valid data", () => {
    const positiveTestData = [
      { name: `Team ${Date.now()}`, description: "Description" },
      {
        name: `Team ${Date.now()} Á !@#$%^&)_+><? 123`,
        description: "Description Á !@#$%^&)_+><? 123",
      },
    ];

    positiveTestData.forEach(({ name, description }) => {
      it(`should successfully create and validate the team: ${name}`, async () => {
        createdTeamName = name; // Store team name for deletion

        // Create team and check data
        const response = await TeamsApi.createTeam(name, description);
        TeamsApi.validateTeamData(response, name, description);
      });
    });
  });
});
