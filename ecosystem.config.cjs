module.exports = {
  apps: [
    {
      name: 'blog',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3000,
      },
    },
  ],
}
