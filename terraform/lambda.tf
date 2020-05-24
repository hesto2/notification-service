module "api_gateway_lambda" {
  source = "./node_modules/hesto2-terraform-modules/api_gateway_lambda"
  domain_name = "${data.terraform_remote_state.hesto2_infrastructure.outputs.notifications_domain}"
  app_name = "notification_service"
  regional_certificate_arn = "${data.terraform_remote_state.hesto2_infrastructure.outputs.hesto2_regional_certificate_arn}"
  route53_zone_id = "${data.terraform_remote_state.hesto2_infrastructure.outputs.hesto2_zone_id}"
  filename = "deploy.zip"
  lambda_environment_variables = {
    NODE_ENV = "production"
    SLACK_API_TOKEN = "${data.aws_secretsmanager_secret_version.slack_token.secret_string}"
    SLACK_SIGNING_SECRET = "${data.aws_secretsmanager_secret_version.slack_signing_secret.secret_string}"
    SLACK_LISTEN_CHANNEL_ID = "CLWLZFDBM"
    SLACK_BOT_NAME = "Homing Pigeon"
    RING_QUEUE_URL = "${data.terraform_remote_state.ring_worker.outputs.queue_id}"
    INTERACTION_TOPIC_ARN = "${aws_sns_topic.app_interaction.arn}"
    SENTRY_DSN = "${data.terraform_remote_state.hesto2_infrastructure.outputs.notification_service_sentry_dsn}"
  }
}