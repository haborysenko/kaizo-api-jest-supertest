const ApiClient = require("./apiClient");
const ApiConfig = require("./apiConfig");
const ApiHelper = require("./apiHelper");

const TEAMS_ENDPOINT = "/teams";

class TeamsApi {
  // Create a team with a required name and description
  static async createTeam(name, description) {
    const requestBody = {
      name,
      description,
      members: [],
      leads: [],
      audit: ApiConfig.getAuditJson(),
    };

    const response = await ApiClient.post(TEAMS_ENDPOINT, requestBody);
    expect(response.status).toBe(200);
    return response;
  }

  // Update an existing team by ID
  static async updateTeam(teamId, name, description, leads = [], members = []) {
    const requestBody = {
      id: teamId,
      name,
      description,
      members,
      leads,
      audit: ApiConfig.getAuditJson(),
    };

    const response = await ApiClient.put(
      `${TEAMS_ENDPOINT}/${teamId}`,
      requestBody
    );
    expect(response.status).toBe(200);
    return response;
  }

  // Get all teams
  static async getAllTeams() {
    const response = await ApiClient.get(TEAMS_ENDPOINT);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    return response;
  }

  // Validate that a retrieved team matches expected details
  static validateTeamData(
    response,
    expectedName,
    expectedDescription,
    expectedId = null,
    expectedMembers = null,
    expectedLeads = null
  ) {
    let team = expectedId
      ? ApiHelper.findEntityById(response, expectedId)
      : ApiHelper.findEntityByName(response, "name", expectedName);

    expect(team).not.toBeNull();
    expect(team.name).toBe(expectedName);
    expect(team.description).toBe(expectedDescription);

    if (expectedMembers) {
      const memberIds = team.members.map((member) => member.id);
      const expectedMemberIds = expectedMembers.map((member) => member.id);
      expect(memberIds).toEqual(expectedMemberIds);
    }

    if (expectedLeads) {
      const leadData = team.leads.map((lead) => ({
        id: lead.id,
        name: lead.name,
      }));
      const expectedLeadData = expectedLeads.map((lead) => ({
        id: lead.id,
        name: lead.name,
      }));
      expect(leadData).toEqual(expectedLeadData);
    }
  }

  // Delete a team by ID
  static async deleteTeam(teamId) {
    const deleteResponse = await ApiClient.delete(
      `${TEAMS_ENDPOINT}/${teamId}`
    );
    expect(deleteResponse.status).toBe(200);
    return deleteResponse;
  }

  // Get team ID by name
  static async getTeamIdByName(teamName) {
    const response = await this.getAllTeams();
    const teams = response.body;

    // Search for teams with the provided name
    const matchingTeams = teams.filter((team) => team.name === teamName);

    // If no team found with the given name, throw an error
    if (matchingTeams.length === 0) {
      throw new Error(`No team found with name: ${teamName}`);
    }

    // Return the ID of the most recently found team
    return matchingTeams[0].id;
  }
}

module.exports = TeamsApi;
