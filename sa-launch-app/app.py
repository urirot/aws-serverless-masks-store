#!/usr/bin/env python3

from aws_cdk import core

from sa_launch_cdk.sa_launch_app_stack import SaLaunchAppStack

app = core.App()
SaLaunchAppStack(app, "sa-launch-app", env={'region': 'us-west-2'})

app.synth()
