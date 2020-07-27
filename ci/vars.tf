# Provider variables
variable "access_key" {}
variable "secret_key" {}
variable "aws_region" {
  default = "us-east-1"
}

# Application
variable "app_name" {
  default = "api"
}
variable "app_env" {
  default = "develop"
}
variable "app_ssl_arn" {}
