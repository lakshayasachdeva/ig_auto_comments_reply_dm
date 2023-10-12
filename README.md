# ig_auto_comments_reply_dm
Auto replying to the comment and also sending private message using Google cloud function

There are 2 Google cloud functions. 

function #1 {ig_incoming_msg_webhook} => it is acting as a webhook to read incoming POST calls corresponding to comments on your Instagram posts and saving them in Firestore DB.

function #2 {ig_comments_reply_dm} => Reading records from Firestore DB and then sending reply and private message to customers/users.
