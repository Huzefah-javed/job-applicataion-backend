import Message from "../schemas/message.schema.js";

export const MessageAction = async (chatId, message, messageType, senderId) => {
  try {
    if (messageType === "offer") {
      const data = await Message.create({
        chatId,
        offerMessage: message,
        senderId,
        messageType: "offer",
      });
      return { success: true, msgId: data._id };
    } else if (messageType === "message") {
      const data = await Message.create({ chatId, message, senderId });
      return { success: true, msgId: data._id };
    }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
