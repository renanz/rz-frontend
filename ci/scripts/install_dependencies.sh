#!/bin/bash
set -e
travis_fold start "api.install_dependencies"
    travis_time_start
        echo " | Install Dependencies"
        wget https://releases.hashicorp.com/terraform/"$tf_version"/terraform_"$tf_version"_linux_amd64.zip
        unzip terraform_"$tf_version"_linux_amd64.zip
        sudo mv terraform /usr/local/bin/
        rm terraform_"$tf_version"_linux_amd64.zip
    travis_time_finish
travis_fold end "api.install_dependencies"