data "aws_secretsmanager_secret_version" "slack_token" {
  secret_id = "NOTIFICATION_SERVICE_SLACK_TOKEN"
}
data "aws_secretsmanager_secret_version" "slack_signing_secret" {
  secret_id = "NOTIFICATION_SERVICE_SLACK_SIGNING_SECRET"
}