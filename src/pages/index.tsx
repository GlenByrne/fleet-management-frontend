import Layout from 'core/Layout/Layout';
import Loading from 'core/Loading';
import { useUpcomingCvrtQuery } from 'generated/graphql';
import { NextPage } from 'next';
import { dateStatus } from 'utilities/dateStatus';
import { getDateClassNames } from 'utilities/getDateClassName';
import { format } from 'date-fns';

const Home: NextPage = () => {
  const { data, loading, error } = useUpcomingCvrtQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="h2">Error</div>;
  }

  if (!data) {
    return <div></div>;
  }

  return (
    <Layout hasQuickActionButton={false} pageSearchable={false}>
      {data.upcomingCVRT?.map((vehicle) => {
        <button
          type="button"
          onClick={() => {}}
          className={getDateClassNames(
            dateStatus(new Date(vehicle?.cvrt?.dueDate))
          )}
        >
          {format(new Date(vehicle?.cvrt?.dueDate), 'dd/MM/yyyy')}
        </button>;
      })}
    </Layout>
  );
};

export default Home;
