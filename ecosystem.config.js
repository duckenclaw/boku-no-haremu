module.exports = {
    apps: [
      {
        name: 'haremu-front',
        script: 'npm',
        args: 'run start -- -p 3001'
      }
    ],

    deploy: {
      production: {
        user: 'dent',
        host: '164.92.229.20',
        key: 'deploy.key',
        ref: 'origin/feature/deploy',
        repo: 'git@gitlab.com:42.works/only-haremu/haremu-front.git',
        ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
        fetch: '--all',
        path: '/home/dent/bokunoharemu/haremu-front',
        'post-deploy':
          'git checkout main && npm install && npm run build && pm2 reload ecosystem.config.js --env production'
      }
    }
  };
