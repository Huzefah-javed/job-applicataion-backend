import Message from "../schemas/message.schema.js";

export const MessageAction = async (chatId, message, messageType, senderId) => {
  try {
    if (messageType === "offer") {
      await Message.create({
        chatId,
        offerMessage: message,
        senderId,
        messageType: "offer",
      });
    } else if (messageType === "message") {
      await Message.create({ chatId, message, senderId });
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
