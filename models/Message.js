import {React} from "react";
import {Schema, models, mongoose, model} from "mongoose";
const messages_Schema = new Schema({
    content: {
        type: String,
  
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
       
      },
      receiver: {
        type: String,
        required: true,
      },
      isUser:{
        type: Boolean
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
});
const Message = (models && models.Messages) ? models.Messages : mongoose.model("Messages", messages_Schema);
module.exports = Message;