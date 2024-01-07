import { useEffect, useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useIssuesQuery } from '../../api/endpoints/issues.endpoint';
import { useListsQuery } from '../../api/endpoints/lists.endpoint';
import type { APIERROR } from '../../api/apiTypes';
import Board from './Board';
import Filter from './Filter';
import SS from '../util/SpinningCircle';
import { useAppSelector } from '../../store/hooks';

const Project = () => {
  const projectId = Number(useParams().projectId);
  const issueQuery = useAppSelector((state) => state.query.issue);
  const { data: lists, error: listError } = useListsQuery(projectId);
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const [filteredIssues, setFilteredIssues] = useState<any>(null);

  const { data: issues, error: issueError } = useIssuesQuery(
    { projectId, ...issueQuery },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    setFilteredIssues(issues);
  },[issues])

  useEffect(() => {
    if(searchParams.get('search')) {
      let newIssues = {...filteredIssues};
      for(let key in newIssues) {
        newIssues[key] = newIssues[key].filter((each: any) => each.summary.includes(searchParams.get('search')))
      }
      setFilteredIssues(newIssues);
    } else {
      setFilteredIssues(issues)
    }
  },[searchParams,filteredIssues])

  if (listError && issueError) {
    if ((listError as APIERROR).status === 401 || (issueError as APIERROR).status === 401)
      return <Navigate to='/login' />;
    return (
      <div className='grid h-full grow place-items-center text-xl'>
        You are not part of this project ☝
      </div>
    );
  }

  return (
    <div className='mt-6 flex grow flex-col px-8 sm:px-10'>
      <h1 className='mb-4 text-xl font-semibold text-c-text'>Kanban Board</h1>
      <Filter isEmpty={lists?.length === 0} {...{ projectId, setIsDragDisabled }} />

      {lists ? (
        <Board {...{ lists, filteredIssues, isDragDisabled }} />
      ) : (
        <div className='grid h-[40vh] w-full place-items-center'>
          <SS />
        </div>
      )}
    </div>
  );
};

export default Project;
