import React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { Table } from 'reactstrap';
import Layout from '../components/Layout';
import Avatar from '../components/profile/Avatar';
import { MeComponent } from '../generated/apolloComponents';
import Context from '../interfaces/Context';
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from '../lib/redirect';
import withIntl from '../lib/withIntl';

export type Props = {
  intl: InjectedIntl;
};

class Profile extends React.Component<Props, {}> {
  static async getInitialProps(context: Context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/login');
    }

    return { loggedInUser };
  }

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage({
      id: 'profile',
      defaultMessage: 'Profile'
    });

    return (
      <Layout title={title}>
        <h1>{title}</h1>
        <MeComponent>
          {({ data }) => {
            if (data && data.me) {
              return (
                <div>
                  <h2>{data.me.fullName}</h2>
                  <Avatar avatar={data.me.avatar} className="mt-3 mb-3" />
                  <Table>
                    <tbody>
                      <tr>
                        <th>
                          <FormattedMessage id="id" defaultMessage="#" />
                        </th>
                        <td>{data.me.id}</td>
                      </tr>
                      <tr>
                        <th>
                          <FormattedMessage
                            id="first_name"
                            defaultMessage="First name"
                          />
                        </th>
                        <td>{data.me.firstName}</td>
                      </tr>
                      <tr>
                        <th>
                          <FormattedMessage
                            id="last_name"
                            defaultMessage="Last name"
                          />
                        </th>
                        <td>{data.me.lastName}</td>
                      </tr>
                      <tr>
                        <th>
                          <FormattedMessage
                            id="email"
                            defaultMessage="E-mail"
                          />
                        </th>
                        <td>{data.me.email}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              );
            }
            return null;
          }}
        </MeComponent>
      </Layout>
    );
  }
}

export default withIntl(Profile);