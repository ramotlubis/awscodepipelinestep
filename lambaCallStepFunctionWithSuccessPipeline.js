'use strict';

var aws = require('aws-sdk')
var codePipeline = new aws.CodePipeline();
function Util() { };

module.exports.proxy = (event, context, callback) => {
  var params = {
    stateMachineArn: 'arn:aws:states:ap-southeast-1:856421899839:stateMachine:HumanApprovalLambdaStateMachine-HWP9KrYUM9MW',
    input: JSON.stringify({}),
	
  }
  
  console.log(event);
  Util.jobId = function (event) {
      console.log(event);
  if ("CodePipeline.job" in event == false) {
    throw Error("Event object does not have expected element 'CodePipeline.job'");
  }
  return event['CodePipeline.job'].id;
}

var jobId = Util.jobId(event);

	Util.signalPipelineSuccess = function (jobId) {
	  console.log("Signaling completion to pipeline for job: " + jobId);
	  var params = {
		jobId: jobId
	  };
	  return codePipeline.putJobSuccessResult(params).promise();
	};


  var stepfunctions = new aws.StepFunctions()
  stepfunctions.startExecution(params, function (err, data) {
    if (err) {
      console.log('err while executing step function')
      console.log(err)
    } else {
      console.log('started execution of step function')
	  
	  //just return success
	  
	  Util.signalPipelineSuccess(jobId);
    }
  })



}