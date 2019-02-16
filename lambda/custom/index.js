/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const SKILL_NAME = "通ってもいい";
const HELP_MESSAGE = "通ってもいいか聞きたい時は「通ってもいい」と、終わりたい時は「おしまい」と言ってください。どうしますか？";
const HELP_REPROMPT = "どうしますか？";
const FALLBACK_MESSAGE = "";
const FALLBACK_REPROMPT = "";
const STOP_MESSAGE = "さようなら";

const data = [
    "<say-as interpret-as='interjection'>オッケー</say-as>",
    "<say-as interpret-as='interjection'>オッケーです</say-as>",
    "<say-as interpret-as='interjection'>どうぞ</say-as>",
    "<say-as interpret-as='interjection'>どうぞごゆっくり</say-as>",
    "<say-as interpret-as='interjection'>いってらっしゃい</say-as>",
    "<say-as interpret-as='interjection'>もちろんです</say-as>",
    "<say-as interpret-as='interjection'>どうぞ</say-as><say-as interpret-as='interjection'>いってらっしゃい</say-as>",
    "<say-as interpret-as='interjection'>う</say-as><break time='500ms'/><say-as interpret-as='interjection'>うぅ</say-as><break time='500ms'/>まいっか",
    "<say-as interpret-as='interjection'>ええっと</say-as><break time='1000ms'/><say-as interpret-as='interjection'>オッケーです</say-as>",
    "<say-as interpret-as='interjection'>えっとお</say-as><break time='1000ms'/><say-as interpret-as='interjection'>どうぞ</say-as>",
    "<say-as interpret-as='interjection'>んーと</say-as><say-as interpret-as='interjection'>どうぞごゆっくり</say-as>",
    "<say-as interpret-as='interjection'>う</say-as><break time='500ms'/><say-as interpret-as='interjection'>うぅ</say-as><break time='500ms'/><say-as interpret-as='interjection'>ええっと</say-as><break time='1000ms'/><say-as interpret-as='interjection'>オッケーです</say-as>",
    "一分以内に戻ってきてくださいね。",
    "じゅっぷん以内に戻ってきてくださいね。",
    "一時間以内に戻ってきてくださいね。",
    "<say-as interpret-as='interjection'>ごめんなさい</say-as><break time='500ms'/>通ってはいけません。<say-as interpret-as='interjection'>また後ほど</say-as>",
    "<say-as interpret-as='interjection'>ごめんなさい</say-as><break time='500ms'/>今は通れません。<say-as interpret-as='interjection'>ドンマイ</say-as>",
    "<say-as interpret-as='interjection'>ええっと</say-as><break time='1000ms'/><say-as interpret-as='interjection'>ごめんなさい</say-as>",
    "<say-as interpret-as='interjection'>えっとお</say-as><break time='1000ms'/><say-as interpret-as='interjection'>また後ほど</say-as>",
    "<say-as interpret-as='interjection'>んーと</say-as><break time='1000ms'/><say-as interpret-as='interjection'>どうぞ</say-as>"
];

const GetNewFactHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'LaunchRequest'
        || (request.type === 'IntentRequest'
          && request.intent.name === 'GetNewFactIntent');
    },
    handle(handlerInput) {
      const randomFact = data[Math.floor(Math.random() * data.length)];
      const randomFactText = randomFact.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
      const speechOutput = randomFact;
      const smallImageUrl = 'https://s3-ap-northeast-1.amazonaws.com/gosign-alexa-assets/lazily-talk/woman-720x480.png';
      const largeImageUrl = 'https://s3-ap-northeast-1.amazonaws.com/gosign-alexa-assets/lazily-talk/woman-1200x800.png';
  
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .withStandardCard(SKILL_NAME, randomFactText , smallImageUrl, largeImageUrl)
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
