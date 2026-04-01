const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');

/**
 * @desc    Get user notifications
 * @route   GET /api/notifications
 * @access  Private
 */
exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.status(200).json({
    success: true,
    data: notifications
  });
});

/**
 * @desc    Mark notification as read
 * @route   PATCH /api/notifications/:id/read
 * @access  Private
 */
exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({ success: false, message: 'Notification not found' });
  }

  // Check ownership
  if (notification.recipient.toString() !== req.user.id) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json({
    success: true,
    data: notification
  });
});

/**
 * @desc    Mark all unread notifications as read
 * @route   PATCH /api/notifications/read-all
 * @access  Private
 */
exports.markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user.id, isRead: false },
    { isRead: true }
  );

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read'
  });
});
