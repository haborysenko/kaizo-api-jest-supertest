class ApiHelper {
  // Find an entity in the response by its name
  static findEntityByName(response, entityName, nameToFind) {
    return (
      response.body.find((entity) => entity[entityName] === nameToFind) || null
    );
  }

  // Find an entity in the response by its ID
  static findEntityById(response, id) {
    return response.body.find((entity) => entity.id === id) || null;
  }
}

module.exports = ApiHelper;
