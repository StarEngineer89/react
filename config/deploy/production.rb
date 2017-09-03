role :web, %w{
  byebuy.production.devguru.co
  byebuy-getgrover.production.devguru.co
}, user: 'deploy'

set :branch, 'production'

set :docker_dockerfile, 'Dockerfile.production'
