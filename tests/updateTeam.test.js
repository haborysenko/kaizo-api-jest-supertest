const TeamsApi = require("../support/teamsApi");

describe("Teams API - Update Team", () => {
  let createdTeamId;
  let uniqueTeamName;
  let uniqueTeamDescription;

  beforeEach(async () => {
    // Generate a unique team name, description for testing
    uniqueTeamName = `Team ${Date.now()}`;
    uniqueTeamDescription = `Description ${Date.now()}`;

    // Create the team and retrieve its ID
    await TeamsApi.createTeam(uniqueTeamName, uniqueTeamDescription);
    createdTeamId = await TeamsApi.getTeamIdByName(uniqueTeamName);
  });

  afterEach(async () => {
    // Delete the created team after the test
    if (createdTeamId) {
      await TeamsApi.deleteTeam(createdTeamId);
      createdTeamId = null;
    }
  });

  describe("When updating a team", () => {
    const positiveTestData = [
      {
        name: `Updated Team Alpha ${Date.now()}`,
        description: `Updated Alpha Description ${Date.now()}`,
      },
    ];

    positiveTestData.forEach(({ name, description }) => {
      it(`should successfully update team to: ${name}`, async () => {
        // Update team
        const updateResponse = await TeamsApi.updateTeam(
          createdTeamId,
          name,
          description
        );

        expect(updateResponse.status).toBe(200);
        // Check updated values
        TeamsApi.validateTeamData(
          updateResponse,
          name,
          description,
          createdTeamId
        );
      });
    });
  });
});
