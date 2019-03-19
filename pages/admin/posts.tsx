import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage, FormattedRelative, InjectedIntl } from 'react-intl';
import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import Layout from '../../components/admin/Layout';
import PostsPagination from '../../components/admin/Pagination';
import PostsTableHeader from '../../components/admin/PostsTableHeader';
import IconButton from '../../components/IconButton';
import { PostsComponent } from '../../generated/apolloComponents';
import withIntl from '../../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};
export type Stats = {
  skip: number;
  take: number;
};

class Posts extends React.Component<Props, Stats> {
  constructor(props: Props) {
    super(props);
    this.state = {
      skip: 0,
      take: 10
    };
  }

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: 'posts',
      defaultMessage: 'Posts'
    });

    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <PostsComponent variables={this.state}>
          {({ data }) => {
            if (data && data.posts) {
              return (
                <div className="posts-table">
                  <Card>
                    <CardHeader>
                      <IconButton
                        color="primary"
                        onClick={() => Router.push('/admin/post')}
                        icon="plus"
                      >
                        <FormattedMessage
                          id="new_post"
                          defaultMessage="New post"
                        />
                      </IconButton>
                    </CardHeader>
                    <CardBody>
                      <Table hover className="mb-0">
                        <thead>
                          <PostsTableHeader />
                        </thead>
                        {data && data.posts && data.posts.length > 0 ? (
                          <tbody>
                            {data.posts.map((post, key) => {
                              return (
                                <tr key={key}>
                                  <td>
                                    <Link
                                      href={{
                                        pathname: '/admin/post',
                                        query: { id: post.id }
                                      }}
                                      as={'/admin/post/' + post.id}
                                    >
                                      <a>{post.title}</a>
                                    </Link>
                                  </td>
                                  <td>{post.slug}</td>
                                  <td>{post.user.fullName}</td>
                                  <td>
                                    <FormattedRelative value={post.createdAt} />{' '}
                                  </td>
                                  <td>
                                    <FormattedRelative value={post.updatedAt} />{' '}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        ) : (
                          <caption className="text-center">
                            <FormattedMessage
                              id="no_data"
                              defaultMessage="No data"
                            />
                          </caption>
                        )}
                      </Table>
                    </CardBody>
                    <CardFooter>
                      <PostsPagination
                        onChange={skip =>
                          this.setState({ skip: skip * this.state.take })
                        }
                        {...this.state}
                        count={data.postsCount}
                      />
                    </CardFooter>
                  </Card>
                </div>
              );
            }
            return null;
          }}
        </PostsComponent>
      </Layout>
    );
  }
}

export default withIntl(Posts);
