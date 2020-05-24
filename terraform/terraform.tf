terraform {
  backend "s3" {
    bucket = "hesto2-terraform-state"
    key = "notification_service"
    region="us-west-2"
    dynamodb_table = "terraform-lock"
  }
}

data "terraform_remote_state" "hesto2_infrastructure" {
  backend = "s3" 
  config = {
    bucket = "hesto2-terraform-state"
    key = "terraform"
    region="us-west-2"
    dynamodb_table = "terraform-lock"
  }
}
data "terraform_remote_state" "ring_worker" {
  backend = "s3" 
  config = {
    bucket = "hesto2-terraform-state"
    key = "ring-worker"
    region="us-west-2"
    dynamodb_table = "terraform-lock"
  }
}

provider "aws" {
  region     = "us-west-2"
}