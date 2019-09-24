'use strict';

var aws = require('aws-sdk')

module.exports.proxy = (event, context, callback) => {
  var params = {
    stateMachineArn: 'arn:aws:states:ap-southeast-1:856421899839:stateMachine:HumanApprovalLambdaStateMachine-HWP9KrYUM9MW',
    input: JSON.stringify({})
  }
  var stepfunctions = new aws.StepFunctions()
  stepfunctions.startExecution(params, function (err, data) {
    if (err) {
      console.log('err while executing step function')
      console.log(err)
    } else {
      console.log('started execution of step function')
    }
  })
}
