import { FeedbackNavigationItem } from '@feedback/components/navigation';

export const defaultNavigation: FeedbackNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/dashboard'
    },
    {
        id   : 'feedback',
        title: 'Feedback',
        type : 'basic',
        icon : 'heroicons_outline:chat',
        link : '/feedback'
    },
    {
        id   : 'conversations',
        title: 'Conversations',
        type : 'basic',
        icon : 'heroicons_outline:clock',
        link : '/conversations'
    },
    {
        id   : 'goals',
        title: 'Goals',
        type : 'basic',
        icon : 'heroicons_outline:check-circle',
        link : '/goals'
    },
    {
        id   : 'reflections',
        title: 'Reflections',
        type : 'basic',
        icon : 'heroicons_outline:office-building',
        link : '/reflections'
    },
    {
        id   : 'summary',
        title: 'Summary',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/summary'
    },
];