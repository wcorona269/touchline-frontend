import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// "3 hours ago". dayjs already ships with the date picker, so this replaces moment(-timezone),
// which was only ever used for this and is one of the heaviest libraries in the bundle.
export const timeAgo = (date) => dayjs(date).fromNow();
