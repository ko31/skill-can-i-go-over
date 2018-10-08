/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

//=========================================================================================================================================
//TODO: このコメント行より下の項目に注目してください。
//=========================================================================================================================================

const SKILL_NAME = "通ってもいい";
const HELP_MESSAGE = "通ってもいいか聞きたい時は「通ってもいい」と、終わりたい時は「おしまい」と言ってください。どうしますか？";
const HELP_REPROMPT = "どうしますか？";
const FALLBACK_MESSAGE = "";
const FALLBACK_REPROMPT = "";
const STOP_MESSAGE = "さようなら";

//=========================================================================================================================================
//「TODO: ここから下のデータを自分用にカスタマイズしてください。」
//=========================================================================================================================================

const data = [
    "どうぞ。",
    "どうぞどうぞ。",
    "どうぞ、お通りください。",
    "さあ、どうぞ。",
    "いいですよ。",
    "オッケー。",
    "もちろん。",
    "気を付けていってらっしゃいませ。",
    "うーん、いいでしょう。",
    "そうだなあ、まいっか。",
    "一分以内に戻ってきてくださいね。",
    "じゅっぷん以内に戻ってきてくださいね。",
    "一時間以内に戻ってきてくださいね。",
    "いやです。",
    "今はダメです。",
    "通ってはいけません。"
];


//=========================================================================================================================================
//この行から下のコードに変更を加えると、スキルが動作しなくなるかもしれません。わかる人のみ変更を加えてください。  
//=========================================================================================================================================

const GetNewFactHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'LaunchRequest'
        || (request.type === 'IntentRequest'
          && request.intent.name === 'GetNewFactIntent');
    },
    handle(handlerInput) {
      const randomFact = data[Math.floor(Math.random() * data.length)];
      const speechOutput = randomFact;
  
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .withSimpleCard(SKILL_NAME, randomFact)
        .getResponse();
    },
  };
  
  const HelpHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(HELP_MESSAGE)
        .reprompt(HELP_REPROMPT)
        .getResponse();
    },
  };
  
  const FallbackHandler = {
    // 2018-May-01: AMAZON.FallackIntent は現在 en-US のみ対応しております。
    //              その他の地域・言語では呼び出されませんが、デプロイには問題
    //              ありません。    
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(FALLBACK_MESSAGE)
        .reprompt(FALLBACK_REPROMPT)
        .getResponse();
    },
  };
  
  const ExitHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && (request.intent.name === 'AMAZON.CancelIntent'
          || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(STOP_MESSAGE)
        .getResponse();
    },
  };
  
  const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
  
      return handlerInput.responseBuilder.getResponse();
    },
  };
  
  const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak('Sorry, an error occurred.')
        .reprompt('Sorry, an error occurred.')
        .getResponse();
    },
  };
  
  const skillBuilder = Alexa.SkillBuilders.custom();
  
  exports.handler = skillBuilder
    .addRequestHandlers(
      GetNewFactHandler,
      HelpHandler,
      ExitHandler,
      FallbackHandler,
      SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
