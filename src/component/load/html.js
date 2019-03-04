import React from 'react';

import Loading from './index'

class Comp extends React.Component {
    render() {
        var self = this;
        return (
            <div>
                <button
                    onClick={() => {
                        self.loading = Loading()
                        setTimeout(() => {
                            self.loading.close()
                        }, 10000)
                    }}
                >show
                </button>
            </div>
        );
    }
}

export default Comp;