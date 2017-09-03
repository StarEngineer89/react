#!/bin/bash

# parameters:
# $1 => bucket
# $2 => cache max age
BUCKET=$1
TTL=$2

# get profile from CircleCI
PROFILE=${AWS_PROFILE:-$DEFAULT}

cd src/client/
zip -r react.zip .
aws s3 --region eu-central-1 cp react.zip s3://sbb-checkout-dev/ --acl public-read



#compress html/css/js files (-n removes the timestamp)
#IFS=$'\n'
#for i in `find src | egrep "\.(html|js|css)$"`; do
#   gzip -n -9 "$i"
#done

#remove the .gz extension
#for i in `find src | egrep "\.(html|js|css)\.gz$"`; do
#   mv "$i" "${i%.*}"
#done

## push to S3
#aws s3 --region eu-central-1 sync src/client/ s3://$BUCKET/ \
#   --include '*' --exclude '*.html' --exclude '*.css' --exclude '*.js' \
#   --acl public-read --cache-control="max-age=$TTL" --delete

# push also gzipped content
#aws s3 --region eu-central-1 sync src/client/ s3://$BUCKET/ --exclude '*' \
#   --include '*.html' --include '*.css' --include '*.js' --acl public-read \
#   --cache-control="max-age=$TTL" --content-encoding="gzip" --delete

#aws s3 --region eu-central-1 ls s3://sbb-test-checkout
