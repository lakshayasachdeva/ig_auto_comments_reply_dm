const axios = require('axios'); 
// const { IgApiClient } = require("instagram-private-api");

const instagramCredentials = {
  pageId:'',
  appId: '',
  appSecret: '',
  accessToken: '',
  pageToken: ''
};

async function sendReplyToComment(json) {
  try {
    const comment = json.entry[0].changes[0].value;
    const commentId = comment.id;
    const replyMessage = 'Thank you for your comment! Please check your messages or messages requests.';

    // Send replies and messages in parallel
    const response = await axios.post(`https://graph.facebook.com/v18.0/${commentId}/replies`, {
      message: replyMessage,
      access_token: instagramCredentials.accessToken,
    });
    return response; // Retu    rn the response data
  } catch (error) {
    console.error('Error sending reply to comment:', error);
    throw error;
  }
}

async function sendDMToUser(json) {

  try {
    const comment = json.entry[0].changes[0].value;
    // const userId = comment.from.id;
    const messagePromise = axios.post(`https://graph.facebook.com/v18.0/${instagramCredentials.pageId}/messages`, {
        recipient:{comment_id: comment.id},
      message: {text:'Hi ❤️, Welcome to Ciao Bella Jewels. If you’re looking for prices, you can check our website: https://ciaobellajewels.in If you need any other help, please let us know here.'},
      access_token: instagramCredentials.pageToken
    });

    const response = await messagePromise; // Wait for the response
    return response; // Return the response data
  } catch (error) {
    console.error('Error sending direct message to user:', error);
    throw error;
  }
}

module.exports = { sendReplyToComment, sendDMToUser };
