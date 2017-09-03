server "byebuy.staging.devguru.co", user: "deploy", roles: %w(app db web)

set :branch, "staging"
set :docker_dockerfile, 'Dockerfile.staging'
