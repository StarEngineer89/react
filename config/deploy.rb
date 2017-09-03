# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'react'
set :repo_url, 'git@github.com:devsbb/React.git'
set :deploy_to, '/home/deploy/apps/react'

