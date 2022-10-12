const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
  SSH_USERNAME, SSH_HOSTMACHINE, GIT_REF, GIT_REPOSITORY, DESTINATION_PATH,
} = process.env;

module.exports = {
  apps: [],

  deploy: {
    production: {
      user: `${SSH_USERNAME}`,
      host: `${SSH_HOSTMACHINE}`,
      ref: `${GIT_REF}`,
      repo: `${GIT_REPOSITORY}`,
      path: `${DESTINATION_PATH}`,
      'pre-deploy-local': `scp -Cr .env ${SSH_USERNAME}@${SSH_HOSTMACHINE}:${DESTINATION_PATH}/backend`,
      'post-deploy': 'npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};

