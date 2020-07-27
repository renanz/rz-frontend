resource "aws_s3_bucket" "bucket" {
  bucket           = "${var.app_name}-${var.app_env}"
  force_destroy    = true

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    AppName     = var.app_name
    Environment = var.app_env
    Service     = "S3 Bucket"
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.bucket.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${var.app_name}-${var.app_env}/*"
    }
  ]
}
POLICY
}

locals {
  s3_origin_id     = "S3-Website-${var.app_name}-${var.app_env}-origin"
}


resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  enabled          = true
  aliases          = ["todo.renanzelaya.tech"]

  viewer_certificate {
    acm_certificate_arn            = var.app_ssl_arn
    cloudfront_default_certificate = false
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2018"
  }

  default_root_object = "index.html"
  is_ipv6_enabled     = true
  wait_for_deployment = true


  origin {
    domain_name = aws_s3_bucket.bucket.website_endpoint
    origin_id   = local.s3_origin_id

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["SSLv3", "TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  default_cache_behavior {
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]


    forwarded_values {
      query_string = false

      cookies {
        forward    = "none"
      }
    }

    min_ttl                = 0
    max_ttl                = 31536000
    default_ttl            = 86400
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type     = "none"
    }
  }

  custom_error_response {
    error_code             = 404
    error_caching_min_ttl  = 300
    response_page_path     = "/index.html"
    response_code          = 200
  }

  tags = {
    AppName     = var.app_name
    Environment = var.app_env
    Service     = "Cloudfront"
  }
}

output "s3_url" {
  value = aws_s3_bucket.bucket.website_endpoint
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.cloudfront_distribution.domain_name
}

output "cloudfront_id" {
  value = aws_cloudfront_distribution.cloudfront_distribution.id
}
