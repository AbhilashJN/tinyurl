const handler = (request, reply) => {
  reply('pongs');
};

module.exports = {
  path: '/ping',
  method: 'GET',
  handler,
};
