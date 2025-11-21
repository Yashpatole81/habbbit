import { format, isSameDay, parseISO } from 'date-fns';

export const getTodayDate = () => {
    return format(new Date(), 'yyyy-MM-dd');
};

export const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM dd, yyyy');
};

export const isToday = (dateString: string) => {
    return isSameDay(parseISO(dateString), new Date());
};

export const getDayName = (dateString: string) => {
    return format(parseISO(dateString), 'EEEE');
};
