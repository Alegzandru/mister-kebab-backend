const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      _limit: -1,
    };

    if (ctx.query._q) {
      entities = await strapi.services.restaurant.search(ctx.query);
    } else {
      entities = await strapi.services.restaurant.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.restaurant }));
  },
};