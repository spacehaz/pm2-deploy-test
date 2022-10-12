const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
  SSH_USERNAME, SSH_HOSTMACHINE, GIT_REF, GIT_REPOSITORY, DESTINATION_PATH,
} = process.env;

module.exports = {
  apps: [{
    script: 'index.js',
    instances: 'max',
    exec_mode: 'cluster',
  }],

  deploy: {
    production: {
      user: `${SSH_USERNAME}`,
      host: `${SSH_HOSTMACHINE}`,
      ref: `${GIT_REF}`,
      repo: `${GIT_REPOSITORY}`,
      path: `${DESTINATION_PATH}`,
      'pre-deploy-local': `scp -Cr .env ${SSH_USERNAME}@${SSH_HOSTMACHINE}:${DESTINATION_PATH}`,
      'post-deploy': 'npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};

