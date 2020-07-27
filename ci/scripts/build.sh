#!/bin/bash
set -e
travis_fold start "frontend.build"
	travis_time_start
		echo " | Starting Build"
    npm run build
	travis_time_finish
travis_fold end "frontend.build"
