const Notification = require('../models/Notification');
const { emitNotification } = require('./socketUtils');

/**
 * Global helper to create and notify in one go
 * @param {object} params Notification details
 */
exports.createNotification = async ({
  recipient,
  sender,
  title,
  message,
  type = 'system',
  relatedId = null,
  onModel = null
}) => {
  try {
    const notification = await Notification.create({
      recipient,
      sender,
      title,
      message,
      type,
      relatedId,
      onModel
    });

    // Real-time deliver
    emitNotification(recipient, notification);

    return notification;
  } catch (error) {
    console.error('Notification creation failed:', error);
  }
};
