import { ActivitiesMockApi } from 'app/mock-api/pages/activities/api';
import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { IconsMockApi } from 'app/mock-api/ui/icons/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { NotesMockApi } from 'app/mock-api/apps/notes/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { SearchMockApi } from 'app/mock-api/common/search/api';
import { DashboardMockApi } from 'app/mock-api/apps/dashboard/api';
import { TasksMockApi } from 'app/mock-api/apps/tasks/api';
import { UserMockApi } from 'app/mock-api/common/user/api';

export const mockApiServices = [
    ActivitiesMockApi,
    AuthMockApi,
    IconsMockApi,
    NavigationMockApi,
    NotesMockApi,
    NotificationsMockApi,
    SearchMockApi,
    DashboardMockApi,
    TasksMockApi,
    UserMockApi
];
