import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FeedbackNavigationItem, FeedbackNavigationService } from '@feedback/components/navigation';
import { FeedbackMockApiService } from '@feedback/lib/mock-api';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';
import { tasks } from 'app/mock-api/apps/tasks/data';

@Injectable({
    providedIn: 'root'
})
export class SearchMockApi
{
    private readonly _defaultNavigation: FeedbackNavigationItem[] = defaultNavigation;
    private readonly _tasks: any[] = tasks;

    /**
     * Constructor
     */
    constructor(
        private _feedbackMockApiService: FeedbackMockApiService,
        private _feedbackNavigationService: FeedbackNavigationService
    )
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    
    // @ Public methods
    

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // Get the flat navigation and store it
        const flatNavigation = this._feedbackNavigationService.getFlatNavigation(this._defaultNavigation);

        
        // @ Search results - GET
        
        this._feedbackMockApiService
            .onPost('api/common/search')
            .reply(({request}) => {

                // Get the search query
                const query = cloneDeep(request.body.query.toLowerCase());

                // If the search query is an empty string,
                // return an empty array
                if ( query === '' )
                {
                    return [200, {results: []}];
                }


                // Filter the navigation
                const pagesResults = cloneDeep(flatNavigation)
                    .filter(page => (page.title?.toLowerCase().includes(query) || (page.subtitle && page.subtitle.includes(query))));

                // Filter the tasks
                const tasksResults = cloneDeep(this._tasks)
                    .filter(task => task.title.toLowerCase().includes(query));

                // Prepare the results array
                const results = [];


                // If there are page results...
                if ( pagesResults.length > 0 )
                {
                    // Normalize the results
                    pagesResults.forEach((result: any) => {

                        // Add the page title as the value
                        result.value = result.title;
                    });

                    // Add to the results
                    results.push({
                        id     : 'pages',
                        label  : 'Pages',
                        results: pagesResults
                    });
                }

                // If there are tasks results...
                if ( tasksResults.length > 0 )
                {
                    // Normalize the results
                    tasksResults.forEach((result) => {

                        // Add a link
                        result.link = '/apps/tasks/' + result.id;

                        // Add the title as the value
                        result.value = result.title;
                    });

                    // Add to the results
                    results.push({
                        id     : 'tasks',
                        label  : 'Tasks',
                        results: tasksResults
                    });
                }

                // Return the response
                return [200, results];
            });
    }
}
