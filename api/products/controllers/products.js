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
      _limit: 200,
    };

    if (ctx.query._q) {
      entities = await strapi.services.products.search(ctx.query);
    } else {
      entities = await strapi.services.products.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.products }));
  },
};