const adminId = process.env.REACT_APP_ADMIN_ID;
const secondAdminId = process.env.REACT_APP_SECOND_ADMIN_ID;
const moderatorId = process.env.REACT_APP_MODERATOR_ID;
const userId = process.env.REACT_APP_USER_ID;

if (!adminId || !moderatorId) {
  console.error('Admin ID или Moderator ID не определены в переменных окружения.');
}

export const chatIds = [Number(adminId), Number(secondAdminId), Number(moderatorId), Number(userId)]
