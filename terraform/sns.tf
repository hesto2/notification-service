resource "aws_sns_topic" "app_interaction" {
  name = "app_interaction"
}

resource "aws_sns_topic_policy" "sns_access" {
  arn = "${aws_sns_topic.app_interaction.arn}"
  policy = <<EOF
  {
  "Version": "2008-10-17",
  "Id": "__default_policy_ID",
  "Statement": [
    {
      "Sid": "__default_statement_ID",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "SNS:GetTopicAttributes",
        "SNS:SetTopicAttributes",
        "SNS:AddPermission",
        "SNS:RemovePermission",
        "SNS:DeleteTopic",
        "SNS:Subscribe",
        "SNS:ListSubscriptionsByTopic",
        "SNS:Publish",
        "SNS:Receive"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}
resource "aws_iam_role_policy_attachment" "attachment" {
  role = "${module.api_gateway_lambda.role_name}"
  policy_arn = "${aws_iam_policy.sns_policy.arn}"
}
resource "aws_iam_policy" "sns_policy" {

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "SNS:Publish"
      ],
      "Effect": "Allow",
      "Resource": "${aws_sns_topic.app_interaction.arn}"
    }
  ]
}
EOF
}