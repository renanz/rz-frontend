provider "aws" {
    access_key = var.access_key
    secret_key = var.secret_key
    region = var.aws_region
}

terraform {
  backend "s3" {
    region = "us-east-1"
  }
}
