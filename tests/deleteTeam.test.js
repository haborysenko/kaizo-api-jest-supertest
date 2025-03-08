const TeamsApi = require("../support/teamsApi");

describe("Teams API - Delete Team", () => {
  let createdTeamId;
  let uniqueTeamName;

  beforeEach(async () => {
    // Generate a unique team name, description for testing
    uniqueTeamName = `Team ${Date.now()}`;
    uniqueTeamDescription = `Description ${Date.now()}`;

    // Create the team and retrieve its ID
    await TeamsApi.createTeam(uniqueTeamName, uniqueTeamDescription);
    createdTeamId = await TeamsApi.getTeamIdByName(uniqueTeamName);
  });

  describe("When deleting a team", () => {
    it("should successfully delete the correct team", async () => {
      // Delete team
      const deleteResponse = await TeamsApi.deleteTeam(createdTeamId);
      expect(deleteResponse.status).toBe(200);
    });
  });
});
