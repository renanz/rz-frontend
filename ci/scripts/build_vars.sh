echo "access_key=\"$AWS_ACCESS_KEY_ID\"" >> ../terraform.tfvars
echo "secret_key=\"$AWS_SECRET_ACCESS_KEY\"" >> ../terraform.tfvars
echo "aws_region=\"us-east-1\"" >> ../terraform.tfvars
echo "app_name=\"$APP_NAME\"" >> ../terraform.tfvars
echo "app_env=\"$ENV\"" >> ../terraform.tfvars
echo "app_ssl_arn=\"$SSL_CERTIFICATE_ID\"" >> ../terraform.tfvars
