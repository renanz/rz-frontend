#!/bin/bash
set -e
travis_fold start "api.deploy"
    echo " | Deploy"
    travis_time_start

        travis_fold start "api.deploy.terraform_init"
          travis_time_start

            echo " | Terraform Init"
            terraform init -upgrade -input=false -backend-config="key=$KEY" -backend-config="bucket=$TERRAFORM_S3_BUCKET"

            echo " | Terraform vars"
            cat ./terraform.tfvars

          travis_time_finish
        travis_fold end "api.deploy.terraform_init"

        travis_fold start "api.deploy.terraform_plan"
          travis_time_start

            echo " | Terraform Plan"
            terraform plan

          travis_time_finish
        travis_fold end "api.deploy.terraform_plan"

        travis_fold start "api.deploy.terraform_apply"
          travis_time_start

            echo " | Terraform apply"
            terraform apply -auto-approve

          travis_time_finish
        travis_fold end "api.deploy.terraform_apply"

    travis_time_finish
travis_fold end "api.deploy"
