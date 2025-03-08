const TeamsApi = require("../support/teamsApi");

describe("Teams API - Get All Teams", () => {
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

  it("should retrieve all teams and confirm the created team exists", async () => {
    const response = await TeamsApi.getAllTeams();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    // Check if the team is in the response list
    TeamsApi.validateTeamData(
      response,
      uniqueTeamName,
      uniqueTeamDescription,
      createdTeamId
    );
  });
});
