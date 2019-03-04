import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Cookie from 'js-cookie'
import {MyToast} from "../../util/uitls";

function RequireAuth(WrappedComponent) {
    class Authenticate extends React.Component {
        componentWillMount() {
            var self = this
            this.user = null;
            try {
                self.user = JSON.parse(Cookie.get('cookie_user'))
            } catch (e) {
                MyToast.fail("请先登录", 1)
                this.context.router.history.push('/')
            }

        }

        render() {
            return (<WrappedComponent user={this.user} {...this.props} />)
        }
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }
    return connect()(Authenticate)
}


export default RequireAuth